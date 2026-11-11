import type {Mask, Path, Rect} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import type {ILabelConfig, LABEL_POSITION} from "../Label/Label.types"
import {LABEL_PADDING, labelAlignementToward, labelBesideWay} from "../Label/Label.constraints"
import {
    type BezierSegment,
    bezierMiddle,
    bezierPath,
    bezierPolyline,
    DEFAULT_LOOP_SIDE,
    loopDirection,
    nearestOnPolyline
} from "../../calculus"
import {checkEdge, isLoop, resolveEdge} from "./Edge.constraints"
import type {IEdgeConfig} from "./Edge.types"

/** How far the mask of the line of an edge reaches, in pixels, around the origin of the svg: further than any drawing. */
const CUT_REACH = 100000

/**
 * An edge: a straight line or a curve from a point to another, which stops at the border of the nodes it joins (a point that is not a node
 * is its own border), or, from a point to itself, a loop on one of its sides (see {@link IEdgeConfig}).
 *
 * An edge that does not exist (a point without a position, two points at the same place) is not drawn: it is drawn again when it exists
 * again. Its label is beside it, on the left of the way it goes, or on it with a position (`label=yes/mc`).
 */
export class Edge extends AbstractFigure {
    protected override get _className(): string {
        return 'pidraw-edge'
    }

    /**
     * @throws InvalidArgumentError if `values` is not a valid config (see {@link IEdgeConfig}). Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IEdgeConfig) {
        // Before the figure draws anything in the svg.
        checkEdge(values, name)

        super(context, name)

        this._config = {...values}
        this._segments = null

        this._makeShape()
        this.computed()
    }

    protected _config: IEdgeConfig

    get config(): IEdgeConfig {
        return this._config
    }

    /**
     * Replace the config of the edge: it finds its place again, and its shape and its label follow.
     * @throws InvalidArgumentError if `value` is not a valid config (see the constructor). The edge is then left as it was.
     */
    set config(value: IEdgeConfig) {
        checkEdge(value, this.name)

        this._config = {...value}
        this.computed()
        this.updateLabel()
    }

    protected _segments: BezierSegment[] | null

    /** The cubic curves that are drawn, in pixels. A copy, empty when the edge does not exist. */
    get segments(): BezierSegment[] {
        return this._segments === null ? [] : this._segments.map(({start, control1, control2, end}) => ({
            start: {...start}, control1: {...control1}, control2: {...control2}, end: {...end}
        }))
    }

    /** Whether the edge starts and ends at the same point. */
    get isLoop(): boolean {
        return isLoop(this._config)
    }

    /** Find the curve from the points it joins, and draw it. An edge that does not exist is not drawn (see the class). */
    computed(): this {
        this._segments = resolveEdge(this._config)
        this._setDefined(this._segments !== null)
        ;(this.shape as Path).plot(this._segments === null ? 'M 0 0' : bezierPath(this._segments))

        return this
    }

    override readonly followable = true

    /** The point of the edge that is the closest to a position, in pixels: `NaN` when the edge does not exist. */
    override follow(x: number, y: number): XY {
        return nearestOnPolyline(this._segments === null ? [] : bezierPolyline(this._segments), {x, y})
    }

    /**
     * Where the label is, in pixels, and how it is aligned. Beside the edge, on the left of the way it goes, by default; on the edge when a
     * position was asked (`label=yes/mc`); for a loop, on the side of it that is away from its point.
     */
    protected _labelPlace(): { point: XY, alignement: LABEL_POSITION, away: XY | null } | null {
        const middle = this._segments === null ? null : bezierMiddle(this._segments)

        if (middle === null) {
            return null
        }

        if (this.label?.alignementGiven) {
            return {point: middle.point, alignement: this.label.alignement, away: null}
        }

        if (isLoop(this._config)) {
            const away = loopDirection(this._config.loopSide ?? DEFAULT_LOOP_SIDE)

            return {point: middle.point, alignement: labelAlignementToward(away.x, away.y), away}
        }

        return {...labelBesideWay(middle.point, middle.direction, this._labelGap), away: null}
    }

    /** Put the label at its place (see {@link _labelPlace}). The alignment that was asked for is kept. */
    moveLabel(): this {
        const place = this._labelPlace()

        if (!this.label || place === null) {
            this._removeCut()

            return this
        }

        if (!this.label.alignementGiven) {
            this.label.config.alignement = place.alignement
            this.label.config.away = place.away
        }

        this.label.move(place.point.x, place.point.y)
        this._updateCut()

        return this
    }

    /** The mask of the line of the edge, which makes a hole in it where the label is: `null` while the line is whole. */
    protected _cut: Mask | null = null

    /** The part of the mask that is the hole (black: the line is not seen there). */
    protected _hole: Rect | null = null

    /**
     * Whether the label of the edge hides the line behind it: a label that is on the line (`label=yes/mc`) and shown, when no background was asked for
     * (`labelFill`: a background of its own colors the box, `labelFill=none` leaves the line whole). The hole is a mask of the line, and not a color
     * like the page's, so it works on any background of the page.
     */
    get cutsLine(): boolean {
        const label = this.label

        return label !== null && label.visible && label.alignementGiven && label.alignement === 'mc'
            && this._labelStyle.fill === undefined && this._segments !== null
    }

    /** Make, move or take away the hole that the label makes in the line (see {@link cutsLine}). */
    protected _updateCut(): void {
        const bounds = this.cutsLine ? this.label?.bounds ?? null : null

        if (bounds === null) {
            this._removeCut()

            return
        }

        if (this._cut === null || this._hole === null) {
            const id = `${this.name}-label-cut`
            const mask = this._rootSVG.defs().mask().attr({id, maskUnits: 'userSpaceOnUse', x: -CUT_REACH, y: -CUT_REACH, width: 2 * CUT_REACH, height: 2 * CUT_REACH})

            mask.rect(2 * CUT_REACH, 2 * CUT_REACH).move(-CUT_REACH, -CUT_REACH).fill('white')
            this._hole = mask.rect(0, 0).fill('black')
            this._cut = mask
            this.shape.attr('mask', `url(#${id})`)
        }

        this._hole.size(bounds.width + 2 * LABEL_PADDING, bounds.height + 2 * LABEL_PADDING).center(bounds.x, bounds.y)

        if (this.label?.config.rotate) {
            this._hole.transform({rotate: this.label.config.rotate, origin: {x: bounds.x, y: bounds.y}})
        } else {
            this._hole.attr('transform', null)
        }
    }

    /** Make the line whole again. */
    protected _removeCut(): void {
        if (this._cut !== null) {
            this._cut.remove()
            this._cut = null
            this._hole = null
            this.shape.attr('mask', null)
        }
    }

    /** A background that is asked for (or taken away) decides whether the line has a hole. */
    override setLabelStyle(style: Parameters<AbstractFigure['setLabelStyle']>[0]): this {
        super.setLabelStyle(style)
        this._updateCut()

        return this
    }

    /** The mask is in the definitions of the svg, outside of the group of the edge: it goes with the edge. */
    override dispose(): void {
        this._removeCut()
        super.dispose()
    }

    /** TikZ has no mask: the label of an edge that cuts its line is written with a white background, as the margin of the hole. */
    protected override _tikzLabelConfig(config: ILabelConfig): ILabelConfig {
        return this.cutsLine ? {...config, fill: {color: 'white', opacity: 1}} : config
    }

    /**
     * The edge as TikZ: a line, or its cubic curves (`\draw (A) .. controls (C1) and (C2) .. (B)`), then its label. Nothing for an edge that is
     * hidden or does not exist.
     * @throws InvalidArgumentError if the appearance of the edge has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()
        const place = this._labelPlace()

        if (this._segments === null || place === null || (!shown.shape && !shown.label)) {
            return ''
        }

        const at = (point: XY) => `(${this._tikzCoordinates(point)})`
        const curved = this._config.curve !== undefined && this._config.curve !== 0 || isLoop(this._config)
        const path = curved
            ? [at(this._segments[0].start), ...this._segments.map(({control1, control2, end}) => `.. controls ${at(control1)} and ${at(control2)} .. ${at(end)}`)].join(' ')
            : `${at(this._segments[0].start)} -- ${at(this._segments[0].end)}`

        return [
            shown.shape ? this._tikzDraw(path) : '',
            shown.label ? this._tikzLabel(this._tikzCoordinates(place.point)) : ''
        ].filter(part => part !== '').join('\n')
    }

    _makeShape() {
        this.clear()

        // Create the path
        this.shape = this.element.path('M 0 0')

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }
}
