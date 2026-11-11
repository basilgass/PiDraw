import {ForeignObject as svgHTML, SVG} from "@svgdotjs/svg.js"
import type {G, Rect, Text as svgLabel} from "@svgdotjs/svg.js"
import type {XY} from "../../pidraw.common"
import {
    alignementDirection,
    DEFAULT_LABEL_POSITION,
    LABEL_PADDING,
    labelCenter,
    labelCenterToward,
    labelPush,
    unitDirection
} from "./Label.constraints"
import type {ILabelConfig, LABEL_POSITION, LabelOptions} from "./Label.types"

type LabelType = svgLabel | svgHTML

/** The text with the characters that are special in HTML written as text. */
function escapeHtml(text: string): string {
    return text.replace(/[&<>"']/g, character => `&#${character.charCodeAt(0)};`)
}

/**
 * The text of a figure, drawn in the group of the figure (`<text>`, or a `foreignObject` for an HTML label), at a place that the
 * figure chooses (`move`) and aligned as asked (`position`).
 *
 * The element is made once: a new text is written in it (`setLabel`), so that it keeps being hidden if it is, and nothing is
 * measured again when neither the text nor the place has changed.
 */
export class Label {
    protected _element: G
    protected _name: string

    constructor(rootG: G, name: string, options: LabelOptions = {}) {
        // The parent group : the figure which the label is attached to.
        this._element = rootG

        // The name of the label - it's the name / id of the label.
        // Uses the name of the base figure.
        this._name = name

        this._config = {
            asHtml: options.asHtml ?? false,
            alignement: options.alignement ?? DEFAULT_LABEL_POSITION,
            away: options.away ?? null,
            push: options.push ?? null,
            clearance: options.clearance ?? 0,
            offset: options.offset ?? {x: 0, y: 0},
            rotate: options.rotate ?? 0,
            size: options.size ?? 'inherit',
            color: options.color ?? null,
            fill: options.fill ?? null,
            ...(options.texConverter === undefined ? {} : {texConverter: options.texConverter})
        }

        // displayName is the text displayed on the label.
        this._displayName = options.text ?? name

        // Position of the label
        this._x = 0
        this._y = 0

        // Create the label shape
        this._shape = this._makeLabel()
    }

    protected _shape: LabelType

    /**
     * The svg element of the label.
     * @internal
     */
    get shape() {
        return this._shape
    }

    protected _config: ILabelConfig

    get config() {
        return this._config
    }

    protected _displayName: string

    /** The text of the label: for an HTML label, what the `texConverter` made of it. */
    get displayName() {
        if (this._config.asHtml && this._config.texConverter) {
            return this._config.texConverter(this._displayName)
        }
        return this._displayName
    }

    protected _x: number

    /** The anchor of the label, in pixels (see {@link move}). */
    get x() {
        return this._x
    }

    protected _y: number

    get y() {
        return this._y
    }

    /** Whether the label is turned along its figure (a line): the figure sets the angle each time it puts the label. */
    autoRotate = false

    get asHtml() {
        return this._config.asHtml
    }

    get alignement() {
        return this._config.alignement
    }

    /** Whether the label is shown (not hidden by {@link hide}). */
    get visible(): boolean {
        return this._shape.css('display') !== 'none'
    }

    hide() {
        this._shape.hide()
        this._background?.hide()
        return this
    }

    show() {
        this._shape.show()
        this._background?.show()
        return this
    }

    /** Take the label out of the svg: its text, and its background if it has one. */
    remove(): this {
        this._shape.remove()
        this._background?.remove()
        this._background = null

        return this
    }

    /**
     * Change the color of the text, its size and the background of the label. What is not given stays. `null` takes the color or the background
     * away. The label is drawn again if that changes something.
     * @param style `size` is a CSS font size (`1.2em`: see `parseLabelSize` for what a user can write), `inherit` for the one of the page.
     */
    setStyle(style: { color?: string | null, fill?: { color: string, opacity: number } | null, size?: string }): this {
        this._config.color = style.color === undefined ? this._config.color : style.color
        this._config.fill = style.fill === undefined ? this._config.fill : style.fill
        this._config.size = style.size ?? this._config.size
        this._paintText()
        this._drawIfChanged()

        return this
    }

    /**
     * Write a new text in the label. Nothing happens if it is the text that is already there; the element is the same, so it is
     * still hidden if it was.
     * @param text the new text; by default the text stays.
     */
    setLabel(text?: string): this {
        if (text === undefined || text === this._displayName) {
            return this
        }

        this._displayName = text
        this._write()
        this._applied = null

        return this
    }

    /**
     * Put the anchor of the label at a place, in pixels, and draw the label there as it is aligned. Nothing is measured again when
     * the anchor, the text and the alignment are the ones it was drawn with.
     */
    move(x: number, y: number): this {
        this._x = x
        this._y = y

        if (this._applied !== this._state()) {
            this._draw()
        }

        return this
    }

    /** Turn the label by an angle in degrees around its anchor. 0 puts it back straight. */
    rotate(angle: number): this {
        for (const element of [this._shape, this._background]) {
            if (element === null) {
                continue
            }

            if (angle === 0) {
                element.attr('transform', null)
            } else {
                element.transform({
                    rotate: angle,
                    origin: {x: this._x, y: this._y}
                })
            }
        }

        return this
    }

    /**
     * Whether an alignment was asked for (a call of {@link position} with one), as opposed to the default one. A figure that
     * chooses a better alignment from where its label lies (an arc) leaves the one that was asked for.
     */
    get alignementGiven(): boolean {
        return this._alignementGiven
    }

    protected _alignementGiven = false

    /** What the label was drawn with (see {@link _state}), or `null` when it must be drawn again. */
    protected _applied: string | null = null

    /** Everything that decides where the label is and how it looks, as one text, to see whether it has to be drawn again. */
    protected _state(): string {
        const {alignement, away, push, clearance, offset, rotate, size, color, fill} = this._config

        return JSON.stringify([this._x, this._y, alignement, away, push, clearance, offset.x, offset.y, rotate, size, this._displayName, color, fill])
    }

    /** The background of the label, behind its text; `null` while the label has none. */
    protected _background: Rect | null = null

    protected _bounds: { x: number, y: number, width: number, height: number } | null = null

    /**
     * The box of the text of the label as it was last drawn, in pixels: its center and its size (without the margin of a background). `null`
     * while the label was never drawn. It is not turned by the rotation of the label.
     */
    get bounds(): { x: number, y: number, width: number, height: number } | null {
        return this._bounds === null ? null : {...this._bounds}
    }

    /**
     * Align the label to its anchor and draw it. What is not given stays what the label has.
     *
     * @param alignement on which side of the anchor the label lies, for example `tl`: the label is above the anchor and to its left.
     * @param offset added to the place, in pixels, the y axis pointing up. A value that is not a number is 0.
     * @param rotate the angle around the anchor, in degrees clockwise on the screen.
     * @param push how far the label is pushed from its anchor, in pixels, in the direction where it lies; `null` asks none, and the
     * label is then pushed by its `clearance`.
     */
    position(alignement?: LABEL_POSITION, offset?: XY, rotate?: number, push?: number | null): this {
        if (alignement !== undefined) {
            this._alignementGiven = true
            // A position that is asked for replaces a direction that a figure chose.
            this._config.away = null
        }

        const wanted = offset ?? this._config.offset

        this._config.alignement = alignement ?? this._config.alignement
        this._config.offset = {x: Number.isNaN(wanted.x) ? 0 : wanted.x, y: Number.isNaN(wanted.y) ? 0 : wanted.y}
        this._config.rotate = rotate ?? this._config.rotate
        this._config.push = push === undefined ? this._config.push : push

        this._draw()

        return this
    }

    /** The size of the text of the label in pixels. An HTML label is measured by the browser; under a virtual DOM it has none. */
    size(): { width: number, height: number } {
        if (this._shape instanceof svgHTML) {
            const content = this._shape.node.firstElementChild
            const width = content?.clientWidth ?? 0
            const height = content?.clientHeight ?? 0

            this._shape.width(width)
            this._shape.height(height)

            return {width, height}
        }

        return {width: this._shape.length(), height: this._shape.bbox().h}
    }

    /**
     * Make the label lie on the side of its anchor that a direction points to, instead of the one of its alignement. The label is drawn
     * again if that changes something.
     * @param direction on the screen (the y axis points down), not necessarily of length 1; `null` (or a null vector) gives the alignement back.
     */
    setAway(direction: XY | null): this {
        this._config.away = direction === null ? null : unitDirection(direction)
        this._drawIfChanged()

        return this
    }

    /**
     * Keep the label this far from its anchor, in pixels, when it was asked no push of its own: a drag handle is over the figure, and its label
     * would be under it. The label is drawn again if that changes something.
     */
    setClearance(pixels: number): this {
        this._config.clearance = pixels
        this._drawIfChanged()

        return this
    }

    /** Draw the label again if what decides where it is changed since it was drawn. Nothing if it was never drawn. */
    protected _drawIfChanged(): void {
        if (this._applied !== null && this._applied !== this._state()) {
            this._draw()
        }
    }

    /** Put the label at its place, turned as it is asked. */
    protected _draw(): void {
        const {alignement, away, push, clearance, offset, rotate} = this._config
        const {width, height} = this.size()
        const anchor = {x: this._x, y: this._y}
        const center = away === null ? labelCenter(alignement, anchor, width, height) : labelCenterToward(anchor, away, width, height)
        const pushed = labelPush(away ?? alignementDirection(alignement), push ?? clearance)
        const x = center.x + offset.x + pushed.x
        const y = center.y - offset.y + pushed.y

        this._shape.center(x, y)
        this._bounds = {x, y, width, height}
        this._drawBackground(x, y, width, height)
        this.rotate(rotate)
        this._applied = this._state()
    }

    /** Put the background behind the text, a margin bigger than it on each side, or take it away when the label has none. */
    protected _drawBackground(x: number, y: number, width: number, height: number): void {
        const {fill} = this._config

        // A background that is not seen (`none`, `transparent`, no opacity) is none: the label has no box.
        if (fill === null || fill.opacity === 0 || fill.color === 'none' || fill.color === 'transparent') {
            this._background?.remove()
            this._background = null

            return
        }

        if (this._background === null) {
            this._background = this._element.rect(0, 0).stroke('none').attr('id', `${this._name}-label-background`)
            this._shape.before(this._background)

            if (!this.visible) {
                this._background.hide()
            }
        }

        this._background
            .size(width + 2 * LABEL_PADDING, height + 2 * LABEL_PADDING)
            .center(x, y)
            .attr({fill: fill.color, 'fill-opacity': fill.opacity})
    }

    /** Write the color of the text: the `fill` of a `<text>`, the `color` of the `div` of an HTML label. */
    protected _paintText(): void {
        if (this._shape instanceof svgHTML) {
            this._write()
        } else {
            this._shape.attr('fill', this._config.color)
            this._shape.css('font-size', this._config.size)
        }
    }

    /** The content of the HTML label: the text made into HTML by the converter, or the text as it is. */
    protected _html(): string {
        return this._config.texConverter ? this.displayName : escapeHtml(this._displayName)
    }

    /** The style of the text of an HTML label. */
    protected _style(): string {
        const color = this._config.color === null ? '' : `; color: ${this._config.color}`

        return `display: block; position: fixed; white-space:nowrap; font-size: ${this._config.size}${color}`
    }

    /** Write the text in the element that exists: the text of a `<text>`, or the `div` of a `foreignObject`. */
    protected _write(): void {
        if (this._shape instanceof svgHTML) {
            this._shape.clear()
            this._shape.add(SVG(`<div style="${this._style()}">${this._html()}</div>`, true))
        } else {
            this._shape.text(this._displayName)
        }
    }

    protected _makeLabel(): LabelType {
        // Create the label.
        const shape = this._config.asHtml
            ? this._element.foreignObject(1, 1).attr('style', "overflow:visible")
            : this._element.text(this._displayName).css('font-size', this._config.size)

        shape.attr('id', `${this._name}-label`)
        this._shape = shape

        if (!(shape instanceof svgHTML) && this._config.color !== null) {
            shape.attr('fill', this._config.color)
        }

        if (shape instanceof svgHTML) {
            this._write()
        }

        return shape
    }
}
