import type {Path} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import {
    curvePath,
    endOfCurve,
    NumExp,
    nowhere,
    numberCorrection,
    PIXELS_PER_SAMPLE,
    sampleCurve,
    toCoordinates,
    toPixels
} from "../../calculus"
import {compile, constructionOf, resolveExpression} from "./Plot.constraints"
import type {IPlotConfig} from "./Plot.types"

/** The function of a plot that does not exist: it is not defined anywhere. */
const UNDEFINED_FUNCTION = '0/0'

/**
 * The graph of a function `y = f(x)`, given by its expression or by a parabola through three points (see {@link IPlotConfig}).
 *
 * The curve is sampled where it bends, not everywhere (see `sampleCurve`): a line is two points, and the drawn line is never
 * farther than `tolerance` pixels from the real curve. It is cut where the function is not defined, outside of `image`, and
 * where it jumps (an asymptote). Only what is seen is drawn, inside of `domain`.
 *
 * A plot that does not exist (a parabola through points that have the same abscissa) is not drawn, and its function is `NaN`
 * everywhere. It is drawn again when it exists again.
 */
export class Plot extends AbstractFigure {
    /** The label is this far, in pixels, from the end of the curve. */
    protected override readonly _labelGap: number = 6

    /**
     * @throws InvalidArgumentError if `values` does not hold exactly one construction, an option is not valid, or the function
     * uses a variable other than `x`.
     * @throws ParseError if the expression cannot be read.
     * Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IPlotConfig) {
        // Before the figure draws anything in the svg.
        const compiled = compile(values, name, context.config)

        super(context, name)

        this._config = {...values}
        this._fx = compiled?.expression ?? ''
        this._numExp = compiled?.numExp ?? new NumExp(UNDEFINED_FUNCTION)
        this._labelAnchor = null
        this._range = null

        this._makeShape()
        this._draw(compiled !== null)
    }

    protected _fx: string

    protected _numExp: NumExp

    /** The function, compiled. It is `NaN` everywhere for a plot that does not exist. */
    get numExp(): NumExp {
        return this._numExp
    }

    protected _config: IPlotConfig

    get config(): IPlotConfig {
        return this._config
    }

    /**
     * Replace the config of the plot: it is drawn again, and its label follows.
     * @throws InvalidArgumentError, ParseError if `value` is not a valid config (see the constructor). The plot is then left as it was.
     */
    set config(value: IPlotConfig) {
        const compiled = compile(value, this.name, this.graphConfig)

        this._config = {...value}
        this._fx = compiled?.expression ?? ''
        this._numExp = compiled?.numExp ?? new NumExp(UNDEFINED_FUNCTION)
        this._draw(compiled !== null)
        this.updateLabel()
    }

    /** Find the function again (the points of a parabola may have moved) and draw it. */
    computed(): this {
        const expression = resolveExpression(constructionOf(this._config, this.name), this._config, this.graphConfig)

        if (expression !== this._fx) {
            this._fx = expression ?? ''
            this._numExp = expression === null ? new NumExp(UNDEFINED_FUNCTION) : new NumExp(expression)
        }

        return this._draw(expression !== null)
    }

    /** The value of the function at `x`, in units of the coordinate system. `NaN` where it is not defined. */
    valueAt(x: number): number {
        return this._numExp.evaluate({x})
    }

    /** The point of the curve at `x`, in pixels. `NaN` for the ordinate where the function is not defined. */
    evaluate(x: number): XY {
        return toPixels({x, y: this.valueAt(x)}, this.graphConfig)
    }

    /** The point of the curve above or below a position, in pixels. A position where the function is not defined gives `NaN`. */
    override readonly followable = true

    override follow(x: number, y: number): XY {
        return this.evaluate(toCoordinates({x, y}, this.graphConfig).x)
    }

    /** Sample the function, and draw the curve. A plot that does not exist is not drawn. */
    protected _draw(exists: boolean): this {
        const shape = this.shape as Path
        this._setDefined(exists)
        this._labelAnchor = null
        this._range = null

        if (!exists) {
            shape.plot(curvePath([], 0))
            return this
        }

        const graph = this.graphConfig
        const {origin, width, height} = graph
        const scaleX = graph.axis.x.x
        const scaleY = graph.axis.y.y

        // What is seen, with a unit to spare, and no more than the domain.
        const seen = {min: -origin.x / scaleX - 1, max: (width - origin.x) / scaleX + 1}
        const from = Math.max(this._config.domain?.min ?? seen.min, seen.min)
        const to = Math.min(this._config.domain?.max ?? seen.max, seen.max)
        const image = this._config.image ?? {min: -Infinity, max: Infinity}
        const threshold = height * (this._config.asymptoteThreshold ?? 10)
        const values: Record<string, number> = {x: 0}

        if (from > to) {
            shape.plot(curvePath([], 0))
            return this
        }

        const at = (x: number): XY => {
            values.x = x
            const y = this._numExp.evaluate(values)

            return Number.isNaN(y) || y < image.min || y > image.max ? nowhere() : {x: origin.x + x * scaleX, y: origin.y + y * scaleY}
        }

        const view = {left: 0, right: width, top: 0, bottom: height}
        const intervals = (to - from) * (this._config.samples ?? Math.abs(scaleX) / PIXELS_PER_SAMPLE)
        const points = sampleCurve(at, from, to, {
            intervals,
            tolerance: this._config.tolerance ?? 0.5,
            maxDepth: this._config.maxDepth ?? 6,
            view,
            bound: threshold
        })

        shape.plot(curvePath(points, threshold))
        this._range = {from, to, intervals}
        this._labelAnchor = endOfCurve(points, width, height)

        return this
    }

    protected _labelAnchor: { point: XY, direction: XY } | null

    /** The values of `x` that were drawn, or `null` if nothing is drawn. */
    protected _range: { from: number, to: number, intervals: number } | null

    /**
     * Put the label at the end of the curve that is seen, on the free side: under a curve that rises, over a curve that falls,
     * and to the left, inside of the drawing. The alignment that was asked for (`label=f/tl`) is kept.
     */
    moveLabel(): this {
        if (!this.label || this._labelAnchor === null) {
            return this
        }

        const {point, rising} = this._labelPlace(this._labelAnchor)

        if (!this.label.alignementGiven) {
            this.label.config.alignement = rising ? 'bl' : 'tl'
        }

        this.label.move(point.x, point.y)

        return this
    }

    /**
     * The plot as TikZ: a pgfplots `axis` with no axis drawn, that covers the drawing and has the units of the coordinate
     * system, and in it the function (the package `pgfplots` is needed). Then the label, as a node. The curve is sampled
     * by pgfplots, not by PiDraw: an asymptote cuts it, and what is out of `image` is not drawn. Nothing for a plot that is
     * hidden, does not exist or is not seen.
     * @throws InvalidArgumentError if the appearance of the plot has no TikZ equivalent (see {@link AbstractFigure.tikz}), or if
     * it has a fill: a function is filled by `fillbetween`.
     */
    tikz(): string {
        const shown = this._tikzShown()
        const axis = shown.shape ? this._tikzPlot() : ''
        const label = shown.label && this._labelAnchor !== null ? this._tikzLabel(this._tikzCoordinates(this._labelPlace(this._labelAnchor).point)) : ''

        return [axis, label].filter(part => part !== '').join('\n')
    }

    /** Where the label is, in pixels, and whether the curve rises there: a little to the left, on the free side. */
    protected _labelPlace({point, direction}: { point: XY, direction: XY }): { point: XY, rising: boolean } {
        // The y axis of the screen points down.
        const rising = direction.y < 0

        return {point: {x: point.x - this._labelGap, y: point.y + (rising ? this._labelGap : -this._labelGap)}, rising}
    }

    /** The `axis` of pgfplots with the function, or an empty string if nothing is drawn. */
    protected _tikzPlot(): string {
        if (this._range === null) {
            return ''
        }

        const {definitions, options} = this._tikzCurveStyle()
        const [yMin, yMax] = this._tikzView().y

        // A value far above or below what is seen is not a point of the curve (an asymptote), but the line still reaches the border.
        const image = this._config.image ?? {min: -Infinity, max: Infinity}
        const low = Math.max(image.min, yMin - (yMax - yMin))
        const high = Math.min(image.max, yMax + (yMax - yMin))

        if (low > high) {
            return ''
        }

        const number = (value: number) => numberCorrection(value, 5)
        const plotOptions = [`domain=${number(this._range.from)}:${number(this._range.to)}`, `samples=${this._tikzSamples(this._range.intervals)}`, ...options]

        return [
            ...definitions,
            ...this._tikzAxis([`\\addplot[${plotOptions.join(', ')}] {${this._numExp.toPgf()}};`], {y: [low, high]})
        ].join('\n')
    }

    _makeShape() {
        this.clear()

        // Create the path
        this.shape = this.element.path('M0 0')

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }
}
