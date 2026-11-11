import type {Path} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import type {LABEL_POSITION} from "../Label/Label.types"
import {labelBesideWay} from "../Label/Label.constraints"
import {type BezierSegment, bezierMiddle, bezierPath, bezierPolyline, nearestOnPolyline} from "../../calculus"
import {constructionOf, resolveConstraint} from "./Bezier.constraints"
import type {IBezierConfig} from "./Bezier.types"

/**
 * A Bézier curve, found from exactly one construction: the smooth curve that goes through points (a direction and a ratio can be
 * given at each one, and the curve can be closed), or the curve pulled by 3 or 4 control points (see {@link IBezierConfig}).
 *
 * A curve that does not exist (a position that does not exist) is not drawn: it is drawn again when it exists again.
 */
export class Bezier extends AbstractFigure {
    protected override get _className(): string {
        return 'pidraw-bezier'
    }

    /**
     * @throws InvalidArgumentError if `values` does not hold exactly one construction, or has a value that is not valid: too few
     * points, a position that is not `{x, y}`, a direction or a ratio that is not valid, `closed` with control points. Nothing is
     * left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IBezierConfig) {
        // Before the figure draws anything in the svg.
        resolveConstraint(constructionOf(values, name), values, name)

        super(context, name)

        this._config = Bezier._copy(values)
        this._segments = null

        this._makeShape()
        this.computed()
    }

    /** A copy of a config, so that the lists that were given are not the ones of the curve. */
    protected static _copy(values: IBezierConfig): IBezierConfig {
        return {
            ...values,
            ...(values.through === undefined ? {} : {through: values.through.map(point => ({...point}))}),
            ...(values.controls === undefined ? {} : {controls: [...values.controls]})
        } as IBezierConfig
    }

    protected _config: IBezierConfig

    get config(): IBezierConfig {
        return this._config
    }

    /**
     * Replace the construction of the curve: it finds its place again, and its shape and its label follow.
     * @throws InvalidArgumentError if `value` is not a valid config (see the constructor). The curve is then left as it was.
     */
    set config(value: IBezierConfig) {
        const found = resolveConstraint(constructionOf(value, this.name), value, this.name)

        this._config = Bezier._copy(value)
        this._place(found)
        this.updateLabel()
    }

    protected _segments: BezierSegment[] | null

    /** The cubic curves that are drawn, in pixels. A copy, empty when the curve does not exist. */
    get segments(): BezierSegment[] {
        return this._segments === null ? [] : this._segments.map(({start, control1, control2, end}) => ({
            start: {...start}, control1: {...control1}, control2: {...control2}, end: {...end}
        }))
    }

    /** Join the last point to the first one: the curve is closed, and smooth there too. */
    asClosed(): this {
        this.config = {...this._config, closed: true}

        return this
    }

    /** Find the curve from its construction and draw it. A curve that does not exist is not drawn (see the class). */
    computed(): this {
        return this._place(resolveConstraint(constructionOf(this._config, this.name), this._config, this.name))
    }

    /** Keep the curves that the construction gave, and draw them. */
    protected _place(segments: BezierSegment[] | null): this {
        this._segments = segments
        this._setDefined(segments !== null)
        ;(this.shape as Path).plot(segments === null ? 'M 0 0' : bezierPath(segments, this._config.closed === true))

        return this
    }

    override readonly followable = true

    /** The point of the curve that is the closest to a position, in pixels: `NaN` when the curve does not exist. */
    override follow(x: number, y: number): XY {
        return nearestOnPolyline(this._segments === null ? [] : bezierPolyline(this._segments), {x, y})
    }

    /** Where the label is, in pixels, and how it is aligned: half way along the curve, on the left of the way it goes. */
    protected _labelPlace(): { point: XY, alignement: LABEL_POSITION } | null {
        const middle = this._segments === null ? null : bezierMiddle(this._segments)

        return middle === null ? null : labelBesideWay(middle.point, middle.direction, this._labelGap)
    }

    /** Put the label half way along the curve. The alignment that was asked for (`label=b/tl`) is kept. */
    moveLabel(): this {
        const place = this._labelPlace()

        if (!this.label || place === null) {
            return this
        }

        if (!this.label.alignementGiven) {
            this.label.config.alignement = place.alignement
        }

        this.label.move(place.point.x, place.point.y)

        return this
    }

    /**
     * The curve as TikZ: its cubic curves joined (`\draw (A) .. controls (C1) and (C2) .. (B)`), closed with `cycle` for a closed
     * curve, then its label. Nothing for a curve that is hidden or does not exist.
     * @throws InvalidArgumentError if the appearance of the curve has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()
        const place = this._labelPlace()

        if (this._segments === null || place === null || (!shown.shape && !shown.label)) {
            return ''
        }

        const at = (point: XY) => `(${this._tikzCoordinates(point)})`
        const closed = this._config.closed === true
        const curves = this._segments.map(({control1, control2, end}, index, all) =>
            `.. controls ${at(control1)} and ${at(control2)} .. ${closed && index === all.length - 1 ? 'cycle' : at(end)}`)
        const path = [at(this._segments[0].start), ...curves].join(' ')

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
