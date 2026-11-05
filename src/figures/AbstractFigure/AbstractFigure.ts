import type {G, Path, Shape, Svg} from "@svgdotjs/svg.js"
import type {IFigureAppearanceConfig, IFigureContext, XY} from "../../pidraw.common"
import type {IControlsFigure} from "../../controls/controls.types"
import {Label} from "../Label/Label"
import {checkLabelContent, renderLabelContent} from "../Label/Label.constraints"
import type {ILabelConfig, LabelContent, LabelFieldName, LabelFields} from "../Label/Label.types"
import {createMarker, MARKER_SHAPES} from "../../svg/marker"
import {InvalidArgumentError} from "../../errors"
import {checkVector} from "./AbstractFigure.constraints"
import {isDefinedPosition} from "../../calculus"
import {
    tikzAxis,
    tikzCoordinates,
    tikzLabelNode,
    tikzLabelText,
    tikzLength,
    tikzRadius,
    tikzSamples,
    tikzStyle,
    tikzUnits,
    tikzView
} from "./AbstractFigure.tikz"

/** The end of a figure that has a marker: `'none'` removes the markers of both ends. */
export type MarkerSide = 'start' | 'end' | 'both' | 'none'

/** What a marker is made of. */
export interface IMarkOptions {
    /** Where to put it. Both ends by default. */
    side?: MarkerSide
    /** Its size, a number greater than 0. 10 by default. */
    size?: number
    /** Its shape: `'->'` for an arrow (default), `'x'` for a cross or `'|'` for a bar. */
    shape?: string
}

/** How the label of a figure is made. */
export type ILabelOptions = Partial<Pick<ILabelConfig, 'asHtml' | 'texConverter'>>

const MARKER_SIDES: string[] = ['start', 'end', 'both', 'none']

/** The dash pattern of `dash()` without a value, in pixels (a dash, then a gap): the same at any scale, resolution or zoom. */
export const DEFAULT_DASH = '6 4'

/** A color and its opacity, from 0 (transparent) to 1 (opaque, the default). */
export interface IColorValue {
    color: string
    opacity?: number
}

/**
 * Read a color: its name (`'red'`, `'#ff0000'`), or the name with an opacity.
 * @throws InvalidArgumentError if the color is empty, if a name is written `'color/opacity'` (it is `{color, opacity}`), or if the opacity
 * is not a number from 0 to 1.
 */
function readColor(value: string | IColorValue): { color: string, opacity: number } {
    const {color, opacity} = typeof value === 'string' ? {color: value, opacity: undefined} : value

    if (typeof color !== 'string' || color.trim() === '') {
        throw new InvalidArgumentError(`Invalid color ${JSON.stringify(color)}: expected the name of a color`)
    }

    // A slash is the old way to write an opacity: it would be taken for the name of the color.
    if (typeof value === 'string' && color.includes('/')) {
        throw new InvalidArgumentError(`Invalid color "${color}": an opacity is written {color: 'red', opacity: 0.5}`)
    }

    if (opacity === undefined) {
        return {color, opacity: 1}
    }

    if (typeof opacity !== 'number' || !(opacity >= 0 && opacity <= 1)) {
        throw new InvalidArgumentError(`Invalid opacity ${String(opacity)} for the color "${color}": expected a number from 0 to 1`)
    }

    return {color, opacity}
}

/**
 * The base of every figure of a drawing (point, line, plot, circle...).
 *
 * A figure owns a group of the svg, named after it (`<g id="name">`), which holds its shape, and its label. It keeps
 * the appearance (fill, stroke, dashes, markers) and applies it to its shape, and it can be moved, scaled, hidden and
 * labelled. It reads the configuration of the graph it belongs to through its context, never from the graph itself.
 *
 * A figure that extends this class draws itself in `computed()` and puts its label in `moveLabel()`, and it ends
 * `computed()` by applying the appearance (`this.fill().stroke()`), because it usually builds a new shape.
 */
/** The stroke and the fill of a figure that was just made: a black line of 1 pixel, and no fill. */
function defaultAppearance(): IFigureAppearanceConfig {
    return {
        stroke: {
            color: 'black',
            width: 1,
            opacity: 1.0
        },
        fill: {
            color: 'transparent',
            opacity: 1.0
        }
    }
}

export abstract class AbstractFigure {
    protected _context: IFigureContext

    constructor(context: IFigureContext, name: string) {
        this._context = context
        this._rootSVG = context.rootSVG
        this._name = name
        this._static = false
        this._isDraggable = false

        this._label = null
        this._labelContent = name
        this._element = this._rootSVG.group().attr('id', this._name)

        this._appearance = defaultAppearance()

        this._shape = this._element.path()
    }

    protected _rootSVG: Svg

    get rootSVG() {
        return this._rootSVG
    }

    protected _name: string

    get name() {
        return this._name
    }

    protected _element: G

    get element() {
        return this._element
    }

    protected _shape: Shape

    get shape() {
        return this._shape
    }

    /** Replace the shape of the figure: the previous shape is removed from the svg. */
    set shape(value: Shape) {
        if (value !== this._shape) {
            this._shape.remove()
        }

        this._shape = value
    }

    protected _appearance: IFigureAppearanceConfig

    get appearance() {
        return this._appearance
    }

    set appearance(value) {
        this._appearance = value
    }

    protected _static: boolean

    /** A static figure does not follow what it depends on: `update` leaves it unless it is forced (`static` option). */
    get static() {
        return this._static
    }

    set static(value: boolean) {
        this._static = value
    }

    protected _isDraggable: boolean

    /** A draggable figure is moved by the user: `update` leaves it unless it is forced. */
    get isDraggable() {
        return this._isDraggable
    }

    set isDraggable(value: boolean) {
        this._isDraggable = value
    }

    protected _label: Label | null

    /** What the label shows: a text, or texts and fields that the figure computes (see {@link labelFields}). */
    protected _labelContent: LabelContent

    /** The figure that the label is pushed away from, if it was asked (`label=A/>O`). */
    protected _labelReference: AbstractFigure | null = null

    /** The figure that the label is pushed away from (see {@link setLabelReference}), or `null`. */
    get labelReference(): AbstractFigure | null {
        return this._labelReference
    }

    /** How far the label is kept from the figure when it was asked no push of its own, in pixels (see {@link setLabelClearance}). */
    protected _labelClearance = 0

    get label() {
        return this._label
    }

    protected _controls: Partial<IControlsFigure> = {}

    /**
     * What the themes keep on the figure (the animation of a point, the steps of a presentation...), by the name of the theme. The figure does not
     * know what the entries mean: a theme writes its own with {@link setControl}, after it checked the value, and reads it back here.
     */
    get controls(): Readonly<Partial<IControlsFigure>> {
        return this._controls
    }

    /**
     * Keep a value for a theme, or take it away with `null`. The figure tells its context, which tells the controllers of the graph.
     * The value is not checked: the theme does it (see `setSlide`, `setAnimation`).
     */
    setControl<K extends keyof IControlsFigure>(key: K, value: IControlsFigure[K] | null): this {
        if (value === null) {
            Reflect.deleteProperty(this._controls, key)
        } else {
            this._controls[key] = value
        }

        this._context.figureChanged?.(this._name)

        return this
    }

    /** The reasons for which the figure is hidden besides `hide()` and the lack of a position (see {@link setHiddenBy}). */
    protected _hiders = new Set<string>()

    /** Whether the figure has a position (see {@link _setDefined}). */
    protected _defined = true

    /**
     * Whether a point can follow the figure: whether {@link follow} puts a position on it. A figure that overrides `follow` overrides
     * this too, and `Follow` accepts only such figures.
     */
    readonly followable: boolean = false

    /**
     * Whether the label of another figure can be pushed away from this one (see {@link setLabelReference}): whether
     * {@link referenceAnchorPoint} puts a position on it. A figure that overrides that overrides this too.
     */
    readonly referenceable: boolean = false

    /**
     * The point of the figure that a label is pushed away from, in pixels: the position of a point, the center of a circle or an arc, the
     * center of the vertices of a polygon.
     * @returns `null` for a figure that is not {@link referenceable}, or that has no position now.
     */
    referenceAnchorPoint(): XY | null {
        return null
    }

    get graphConfig() {
        return this._context.config
    }

    /**
     * Draw the figure again from its current state (its configuration and what it depends on), and apply the
     * appearance. Called by `update`, and by the constructor of the figure once it is ready.
     */
    abstract computed(): this

    /**
     * The configuration the figure is made from, and the same object until the figure is given another one. The graph reads in it the
     * figures this one depends on (a line through two points...) to draw it again when they move.
     */
    abstract get config(): object

    /**
     * Hide the figure, or show it again, for a reason that has a name (`slide` for a presentation). The figure is hidden as long as one
     * reason holds; `hide()` and the lack of a position are other causes, which this does not touch. The label goes with the figure.
     */
    setHiddenBy(reason: string, hidden: boolean): this {
        if (hidden) {
            this._hiders.add(reason)
        } else {
            this._hiders.delete(reason)
        }

        this._applyVisibility()

        return this
    }

    /** Whether the figure is hidden for this reason (see {@link setHiddenBy}). */
    isHiddenBy(reason: string): boolean {
        return this._hiders.has(reason)
    }

    /** Hide the figure, and its label. */
    hide(): this {
        this._element.hide()
        return this
    }

    show(): this {
        this._element.show()
        return this
    }

    /** Hide the figure but its label (`hide()` hides both). */
    hideShape(): this {
        this._element.children().forEach((child) => {
            if (child.attr('id') !== `${this._name}-label`) {
                child.hide()
            }
        })

        return this
    }

    /**
     * Take away what was asked of the figure since it was made, so that a figure that is given another configuration looks like a new one:
     * the appearance, the dashes and the markers, the moves and the scales of the shape, the label, what the themes kept (`controls`), whether the user holds it,
     * and whether it is hidden. The shape and the configuration stay as they are (the shape is made again, in the default style, by the
     * next `config`), and so does `static`, which the figure or its owner sets.
     */
    resetStyle(): this {
        this._appearance = defaultAppearance()
        this._dasharray = null
        this._markerStart = null
        this._markerEnd = null
        this._shape.attr('transform', null)

        this._label?.shape.remove()
        this._label = null
        this._labelContent = this._name
        this._labelReference = null

        this._isDraggable = false

        // What the themes kept on the figure goes too, and they are told.
        if (Object.keys(this._controls).length > 0) {
            this._controls = {}
            this._context.figureChanged?.(this._name)
        }

        // A figure that was never hidden has no `style`: show it again only if it was, and leave no empty `style` behind.
        if (this._element.css('display') === 'none') {
            this._element.show()

            if (this._element.attr('style') === '') {
                this._element.attr('style', null)
            }
        }

        return this
    }

    /** The shapes that carry the stroke of the figure: its shape, unless the figure draws several. */
    strokeable(): Shape[] {
        return [this._shape]
    }

    /** The shapes that carry the fill of the figure: its shape, unless the figure draws several. */
    fillable(): Shape[] {
        return [this._shape]
    }

    /**
     * Fill the figure, or apply the current fill again when called without a color.
     *
     * @param color the name of a color, or `{color, opacity}` (opacity from 0 to 1), for instance `{color: 'red', opacity: 0.5}`.
     * The opacity only concerns the fill: it is the `fill-opacity` of the shape.
     * @throws InvalidArgumentError if the color or the opacity is invalid. The figure is then left unchanged.
     */
    fill(color?: string | IColorValue): this {
        if (color !== undefined) {
            const parsed = readColor(color)
            this._appearance.fill.color = parsed.color
            this._appearance.fill.opacity = parsed.opacity
        }

        this.fillable().forEach((shape) => {
            shape.fill(this._appearance.fill)
        })

        return this
    }

    /**
     * Apply the current stroke again. Every figure does it after it builds a new shape. The markers and the dashes of
     * the figure follow the stroke.
     */
    stroke(): this
    /**
     * Stroke the figure with a color, and keep the width.
     *
     * @param color the name of a color, or `{color, opacity}` (opacity from 0 to 1). The opacity only concerns the stroke: it is the
     * `stroke-opacity` of the shape.
     * @throws InvalidArgumentError if the color or the opacity is invalid. The figure is then left unchanged.
     */
    stroke(color: string | IColorValue): this
    /** Stroke the figure with a width, and keep the color. */
    stroke(strokeWidth: number): this
    /**
     * Stroke the figure with a color and a width.
     *
     * @param color the name of a color, or `{color, opacity}`.
     * @param strokeWidth width of the stroke.
     * @throws InvalidArgumentError if the color or the opacity is invalid. The figure is then left unchanged.
     */
    stroke(color: string | IColorValue, strokeWidth: number): this
    stroke(color?: string | IColorValue | number, strokeWidth?: number): this {
        if (typeof color === 'string' || typeof color === 'object') {
            const parsed = readColor(color)
            this._appearance.stroke.color = parsed.color
            this._appearance.stroke.opacity = parsed.opacity
            this._appearance.stroke.width = strokeWidth ?? this._appearance.stroke.width
        }

        if (typeof color === 'number' && strokeWidth === undefined) {
            this._appearance.stroke.width = color
        }

        this.strokeable().forEach((shape) => {
            shape.stroke(this._appearance.stroke)

            if (this._dasharray !== null) {
                shape.stroke({dasharray: this._dasharray})
            }
        })

        this._styleMarkers()

        return this
    }

    /** The dash pattern asked by `dash()`, kept to be applied with the stroke. `null` for a continuous stroke. */
    protected _dasharray: string | null = null

    /** The shape of the marker on each end, asked by `mark()`. `null` for none. Kept to be written in TikZ. */
    protected _markerStart: string | null = null
    protected _markerEnd: string | null = null

    /** Give the markers of the shape the color and the width of the stroke. */
    protected _styleMarkers(): void {
        [this._shape.reference('marker-start'), this._shape.reference('marker-end')]
            .filter(x => x !== null)
            .forEach((marker) => {
                marker.children().forEach((m) => {
                    m.attr({
                        fill: this._appearance.stroke.color,
                        stroke: this._appearance.stroke.color,
                        'stroke-width': this._appearance.stroke.width
                    })
                })
            })
    }

    /**
     * Draw the stroke as dashes. The pattern is kept: it is applied again by every `stroke()`, so a figure that builds
     * a new shape keeps its dashes.
     *
     * @param dasharray lengths of the dashes and of the gaps, in pixels (`'5'`, `'5 2'`, `'5,2,1'`), or 'none' for a
     * continuous stroke. By default, `DEFAULT_DASH`: pixels, so the dashes look the same at any scale, resolution or zoom.
     * @throws InvalidArgumentError if the pattern is not made of positive numbers. The figure is then left unchanged.
     */
    dash(dasharray?: string | number): this {
        // The parser gives a number for "dash=5".
        const pattern = String(dasharray ?? DEFAULT_DASH).trim()

        if (!/^(none|\d+(\.\d+)?([\s,]+\d+(\.\d+)?)*)$/.test(pattern)) {
            throw new InvalidArgumentError(`Invalid dash pattern "${pattern}": expected 'none' or lengths like '5' or '5 2'`)
        }

        this._dasharray = pattern === 'none' ? null : pattern
        this.strokeable().forEach((shape) => {
            shape.stroke({dasharray: pattern})
        })

        return this
    }

    /** Draw the stroke as dots: dashes of 3 pixels. */
    dot(): this {
        return this.dash(3)
    }

    /**
     * Remove everything the figure drew, but its label: the label stays in the svg until it is replaced. The shape of
     * the figure is removed too, so the figure must set a new `shape` afterward.
     */
    clear(): this {
        this._element.children().forEach((child) => {
            if (child.attr('id') !== `${this._name}-label`) {
                child.remove()
            }
        })

        return this
    }

    /**
     * Draw the figure again (`computed`) and update its label, to follow what it depends on.
     *
     * @param forceUpdate a figure that is `static` (it does not depend on anything that moves, as the axes) or
     * `isDraggable` (the user moves it) is left as it is, unless this is `true`.
     */
    update(forceUpdate?: boolean): this {
        if (
            (this.static || this._isDraggable)
            && forceUpdate !== true) {
            return this
        }

        this.computed()

        // Update the label.
        this.updateLabel()

        return this
    }

    /**
     * Give a label to the figure. A figure has one label: a previous one is removed from the svg.
     *
     * @param content a text, or texts and fields (`{field, digits}`) that the figure computes and keeps up to date.
     * The text is written as it is: `@` is a character like any other. By default, the name of the figure.
     * @throws InvalidArgumentError if the content has a field the figure cannot show (see {@link labelFields}), or a
     * number of digits that is not an integer of 0 or more. The figure is then left as it was.
     * @param options `asHtml` writes the label in HTML, for the text of a `texConverter`.
     */
    addLabel(content?: LabelContent, options: ILabelOptions = {}): Label {
        const {asHtml, texConverter} = options
        const labelContent = content ?? this._name
        checkLabelContent(labelContent, this.labelFields(), this._name)

        this._label?.shape.remove()
        this._labelContent = labelContent

        this._label = new Label(
            this._element,
            this._name,
            {
                text: renderLabelContent(labelContent, this.labelFields(), {tex: asHtml ?? false}),
                asHtml: asHtml ?? false,
                ...(texConverter === undefined ? {} : {texConverter})
            })

        this.updateLabel()
        return this._label
    }

    /**
     * Say whether the figure has a position. A figure without one is not drawn: its group gets `visibility="hidden"`, which
     * `hide()` (`display`) does not touch, so a figure hidden on purpose stays hidden when its position comes back.
     */
    protected _setDefined(defined: boolean): void {
        this._defined = defined
        this._applyVisibility()
    }

    /** The group is hidden (`visibility`) when the figure has no position or a reason hides it; `hide()` (`display`) is apart. */
    protected _applyVisibility(): void {
        this._element.attr("visibility", this._defined && this._hiders.size === 0 ? null : "hidden")
    }

    /** A position in pixels as a TikZ coordinate, in units of the coordinate system and with 5 decimals at most: `1.5,-2`. */
    protected _tikzCoordinates(pixels: XY): string {
        return tikzCoordinates(pixels, this.graphConfig)
    }

    /**
     * The length of one unit of each axis of the coordinate system, as TikZ lengths. A figure that needs a length of its own
     * (a pgfplots axis) sets the unit vectors of the picture to these: the picture of a graph must use them too.
     */
    protected _tikzUnits(): { x: string, y: string } {
        return tikzUnits(this.graphConfig)
    }

    /** The part of the coordinate system that the drawing shows, in units. */
    protected _tikzView(): { x: [number, number], y: [number, number] } {
        return tikzView(this.graphConfig)
    }

    /**
     * The lines of a pgfplots `axis` with no axis drawn, that covers the drawing and has the units of the coordinate system:
     * what is in it, written in the units of the coordinate system (`\addplot`), lands on the other figures (the `tikzpicture`
     * must have these units too, see {@link _tikzUnits}). The package `pgfplots` is needed.
     *
     * @param content the lines in the axis.
     * @param restrict the values of `x` and `y` that are kept: a point out of them is not a point of the curve (an asymptote)
     * and cuts the line.
     */
    protected _tikzAxis(content: string[], restrict: { x?: [number, number], y?: [number, number] } = {}): string[] {
        return tikzAxis(this.graphConfig, content, restrict)
    }

    /**
     * How many samples pgfplots takes for a curve that starts from `intervals` intervals: it does not refine the curve where it
     * bends, as the drawing does, so it takes more.
     */
    protected _tikzSamples(intervals: number): number {
        return tikzSamples(intervals)
    }

    /**
     * The appearance of a curve as the options of an `\addplot`, with the `\definecolor` it needs.
     * @throws InvalidArgumentError if a color has no TikZ equivalent, or if the curve has a fill: a curve has none in TikZ, a
     * `fillbetween` fills the area under it.
     */
    protected _tikzCurveStyle(): { definitions: string[], options: string[] } {
        const style = this._tikzStyle()

        if (style.options.some(option => option.startsWith('fill='))) {
            throw new InvalidArgumentError(`The curve "${this._name}" has a fill, which has no equivalent in TikZ: use a fillbetween`)
        }

        return style
    }

    /** A length in pixels as a TikZ length in points: `7.5pt`. */
    protected _tikzLength(pixels: number): string {
        return tikzLength(pixels)
    }

    /**
     * A radius in pixels as the options of a TikZ circle or arc, in units of the coordinate system: `radius=2`. When the axes
     * have different scales it is written for each axis (`x radius=2, y radius=1`), so that the figure stays round like on screen.
     */
    protected _tikzRadius(pixels: number): string {
        return tikzRadius(pixels, this.graphConfig)
    }

    /**
     * Which parts of the figure the drawing shows, and so the TikZ code must write: nothing when the figure is hidden
     * (`hide`) or not visible (a point without a position), only the label when the shape is hidden (`!`), only the
     * shape when the label is hidden (`?`).
     */
    protected _tikzShown(): { shape: boolean, label: boolean } {
        if (this._element.css('display') === 'none' || this._element.attr('visibility') === 'hidden') {
            return {shape: false, label: false}
        }

        return {
            shape: this._shape.css('display') !== 'none',
            label: this._label?.visible === true
        }
    }

    /** Put the label at its place, which depends on the figure (the middle of a line, beside a point...). */
    abstract moveLabel(): this

    /**
     * The TikZ code of the figure, to include in a LaTeX file: a fragment of commands (`\draw`, `\node`...) that goes
     * inside a `tikzpicture`, which it does not write. The coordinates are in the units of the coordinate system, not
     * in pixels: the `tikzpicture` sets the scale (`x=...cm, y=...cm`). The figure writes its label too, and the
     * `\definecolor` it needs, so the fragment does not depend on the preamble but for the libraries it names
     * (`tikz`, and `arrows.meta` for the cross marker; `pgfplots` for the figures that draw a function).
     *
     * @throws InvalidArgumentError if the appearance of the figure has no TikZ equivalent (a color that is neither
     * hexadecimal nor a name of CSS).
     * @throws NotImplementedError if the figure cannot be written in TikZ yet.
     */
    abstract tikz(): string

    /**
     * The options of a TikZ path for the appearance of the figure (stroke, fill, dashes, markers), and the
     * `\definecolor` they need. Defaults are written too: the width of the stroke is not the one of TikZ.
     * @throws InvalidArgumentError if a color has no TikZ equivalent.
     */
    protected _tikzStyle(): { definitions: string[], options: string[] } {
        return tikzStyle(this._appearance, this._dasharray, {start: this._markerStart, end: this._markerEnd})
    }

    /**
     * A `\draw` of the figure with its appearance, preceded by the `\definecolor` it needs.
     * @param path the path to draw, in TikZ (`(0,0) -- (1,2)`), without the `;`.
     * @throws InvalidArgumentError if a color has no TikZ equivalent.
     */
    protected _tikzDraw(path: string): string {
        const {definitions, options} = this._tikzStyle()
        return [...definitions, `\\draw[${options.join(', ')}] ${path};`].join('\n')
    }

    /**
     * The `\node` of the label of the figure, or an empty string without a label. The text is written as it is.
     * @param at where the figure puts its label, in the units of the coordinate system (`'1,2'`).
     */
    protected _tikzLabel(at: string): string {
        if (!this._label) {
            return ''
        }

        return tikzLabelNode(this._label.config, at, this._tikzLabelText())
    }

    /**
     * The text of the label in TikZ. A label written in TeX (`tex`) is a formula (`A_1`, `\theta`): it is put between `$`, unless
     * it has some already, because LaTeX does not accept a subscript or a command of mathematics in a text.
     */
    protected _tikzLabelText(): string {
        return tikzLabelText(this.computeLabel(), this._label?.asHtml === true)
    }

    /** How far from the figure its label is put, in pixels, when the figure puts it beside itself. */
    protected readonly _labelGap: number = 8

    /** Update the text of the label (`computeLabel`) and put it at its place (`moveLabel`). Nothing without a label. */
    updateLabel(): this {
        if (!this._label) {
            return this
        }

        // if the label is dynamic, update it.
        this._label.setLabel(this.computeLabel())

        // Move the label position
        this.moveLabel()
        this._orientLabel()

        return this
    }

    /**
     * Push the label away from another figure: it lies on the side of its anchor that is opposite to the reference, wherever the reference
     * is (a point of a circle, away from the center). The label follows the reference when it moves (`Graph.update`). Without a
     * reference, the label goes back to the side that the figure chooses for it.
     *
     * @param reference the figure, or `null` for none. A figure whose position changes the label stays the one it was built on: it is not
     * a dependency, so a reference never makes a cycle.
     * @throws InvalidArgumentError if the figure has no point to be pushed away from (a line, a curve: see {@link referenceable}).
     */
    setLabelReference(reference: AbstractFigure | null): this {
        if (reference !== null && !reference.referenceable) {
            throw new InvalidArgumentError(
                `The figure "${reference.name}" cannot be the reference of a label: expected a point, a circle, an arc or a polygon`
            )
        }

        // A label that lost its reference lies where the figure puts it again.
        if (reference === null && this._labelReference !== null) {
            this._label?.setAway(null)
        }

        this._labelReference = reference
        this.updateLabel()

        return this
    }

    /**
     * Keep the label this far from the figure, in pixels, in the direction where it lies, when the label was asked no push of its own.
     * A point that has a drag handle (a disc over the point) needs it: the handle is over its label.
     */
    setLabelClearance(pixels: number): this {
        this._labelClearance = pixels
        this._label?.setClearance(pixels)

        return this
    }

    /**
     * Turn the label to the side opposite to its reference, once the figure has put its anchor. A label whose anchor is the point it is
     * pushed from (a circle, whose label is at its center) lies in no direction and is left where it is.
     */
    protected _orientLabel(): void {
        const label = this._label

        if (!label) {
            return
        }

        label.setClearance(this._labelClearance)

        const from = this._labelReference?.referenceAnchorPoint()

        if (from === undefined || from === null || !isDefinedPosition(from) || !isDefinedPosition({x: label.x, y: label.y})) {
            return
        }

        label.setAway({x: label.x - from.x, y: label.y - from.y})
    }

    /**
     * The fields the label of this figure can show, by name, with how to compute the text of each one for a number of
     * decimals (the coordinates of a point, the length of a segment). None by default. Called every time the label is
     * updated, so a figure can offer different fields as its configuration changes.
     */
    labelFields(): LabelFields {
        return {}
    }

    /**
     * The field that a `@` alone shows in a label: the most classical value of the figure (the coordinates of a point, the
     * length of a segment, the angle of an arc). `null` when there is a doubt, and `@` then has to name its field (`@area`).
     * It is one of {@link labelFields}.
     */
    defaultLabelField(): LabelFieldName | null {
        return null
    }

    /**
     * The first field of the content of the label, `null` when it is a text without a field. A figure that has more than one
     * place for its label (the sector of an arc, the inside of a polygon) chooses it with this field.
     */
    protected _firstLabelField(): LabelFieldName | null {
        if (typeof this._labelContent === 'string') {
            return null
        }

        const first = this._labelContent.find(part => typeof part !== 'string')

        return first === undefined || typeof first === 'string' ? null : first.field
    }

    /**
     * The text of the label: its content, with the fields computed from the current state of the figure. The name of
     * the figure without a label.
     * @throws InvalidArgumentError if the label has a field that the figure no longer offers.
     */
    computeLabel(): string {
        return this._label ? renderLabelContent(this._labelContent, this.labelFields(), {tex: this._label.asHtml}) : this._name
    }

    /**
     * Move the shape of the figure by a vector given in the units of the coordinate system. Each move is added to
     * the previous ones.
     *
     * @param pos the vector `{x, y}`. A number is a move along the Ox axis, `move({x: pos, y: 0})`.
     * @throws InvalidArgumentError if `pos` is not a finite number nor a `{x, y}` of finite numbers.
     */
    move(pos: number): this
    move(pos: XY): this
    move(pos: XY | number): this {
        const delta = checkVector(typeof pos === 'number' ? {x: pos, y: 0} : pos, 'move')
        const {x: ox, y: oy} = this.graphConfig.axis

        // The pixels of a vector are its components on the two axes: the scales of x and y, and oblique axes, count.
        this._shape.translate(
            delta.x * ox.x + delta.y * oy.x,
            delta.x * ox.y + delta.y * oy.y
        )

        return this
    }

    /**
     * Scale the shape of the figure around its center. Each scale is multiplied with the previous ones. The label
     * of the figure is not scaled.
     *
     * @param value the factors `{x, y}`. A number is the same factor on both axes.
     * @throws InvalidArgumentError if `value` is not a finite number nor a `{x, y}` of finite numbers.
     */
    scale(value: XY | number): this {
        const factor = checkVector(typeof value === 'number' ? {x: value, y: value} : value, 'scale')

        this._shape.scale(factor.x, factor.y)
        return this
    }

    /**
     * Put a marker (an arrow head, a cross or a bar) on the ends of the figure. The marker takes the color and the
     * width of the stroke, whatever the order of the calls. The other end is left as it is.
     *
     * @param options the side ('start', 'end' or 'both', the default; 'none' removes the markers of both ends, and works on
     * any figure), the size (default 10) and the shape ('->' for an arrow, the default, 'x' for a cross or '|' for a bar).
     * @throws InvalidArgumentError if the side, the size or the shape is invalid, or if the shape of the figure
     * cannot carry a marker (only the lines, the polylines, the polygons and the paths can). The figure is then left
     * unchanged.
     */
    mark(options: IMarkOptions = {}): this {
        const {side = 'both', size = 10, shape: form = '->'} = options

        if (!MARKER_SIDES.includes(side)) {
            throw new InvalidArgumentError(`Invalid marker position "${side}": expected 'start', 'end', 'both' or 'none'`)
        }

        if (!Number.isFinite(size) || size <= 0) {
            throw new InvalidArgumentError(`Invalid marker size ${size}: expected a number greater than 0`)
        }

        if (!MARKER_SHAPES.includes(form)) {
            throw new InvalidArgumentError(`Invalid marker shape "${form}": expected ${MARKER_SHAPES.map(s => `'${s}'`).join(', ')}`)
        }

        if (side === 'none') {
            this._shape.attr({'marker-start': null, 'marker-end': null})
            this._markerStart = null
            this._markerEnd = null
            return this
        }

        if (!('marker' in this._shape)) {
            throw new InvalidArgumentError(
                `The figure "${this._name}" cannot have a marker: its shape is a ${this._shape.type}`
            )
        }

        const path = this._shape as Path
        const marker = createMarker(this._rootSVG, this.name, size, form)

        if (side !== 'end') {
            path.marker('start', marker)
            this._markerStart = form
        }

        if (side !== 'start') {
            path.marker('end', marker)
            this._markerEnd = form
        }

        // The marker was drawn in black: it takes the stroke of the figure.
        this._styleMarkers()

        return this
    }

    /**
     * Where a point dragged by the user to (`x`, `y`) lands on the figure: the point of the figure that a point
     * following it takes. Used by the drag of a point (`drag=<figure>`) and by the `Follow` figure.
     * A figure that a point can follow overrides it (a line projects the point on the line, a circle on the circle,
     * a plot takes the point of the curve at the same abscissa). By default, the point is not constrained.
     *
     * @param x abscissa of the dragged point, in pixels.
     * @param y ordinate of the dragged point, in pixels.
     * @returns the position on the figure, in pixels.
     */
    follow(x: number, y: number): XY {
        return {x, y}
    }

    /**
     * Release what the figure holds outside of its group of the svg (an event listener, for instance): called when the graph removes the
     * figure. Nothing by default.
     */
    dispose(): void {
        // Nothing to release by default.
    }
}