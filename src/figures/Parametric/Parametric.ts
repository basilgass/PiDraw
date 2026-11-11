import type {Path} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import type {LABEL_POSITION} from "../Label/Label.types"
import {labelBesideWay} from "../Label/Label.constraints"
import {
    curvePath,
    endOfCurve,
    nearestOnPolyline,
    nowhere,
    numberCorrection,
    PIXELS_PER_SAMPLE,
    sampleCurve,
    toPixels
} from "../../calculus"
import {compile, type ParametricFunctions} from "./Parametric.constraints"
import type {IParametricConfig} from "./Parametric.types"

/** The domain when none is given: one turn of a circle of the parameter in radians. */
const DEFAULT_DOMAIN = {min: 0, max: 2 * Math.PI}

/** At least this many intervals first, whatever the extent of the domain: the scale of the parameter is not known. */
const MINIMUM_INTERVALS = 64

/**
 * A curve given by a point `(x(t), y(t))` that moves with a parameter `t` (see {@link IParametricConfig}).
 *
 * The curve is sampled where it bends, not everywhere (see `sampleCurve`): the drawn line is never farther than `tolerance`
 * pixels from the real curve. It is cut where a function is not defined, and where the curve jumps far (an asymptote).
 */
export class Parametric extends AbstractFigure {
    protected override get _className(): string {
        return 'pidraw-parametric'
    }

    /**
     * @throws InvalidArgumentError if a function is not text or uses a variable other than `t`, or an option is not valid.
     * @throws ParseError if a function cannot be read.
     * Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IParametricConfig) {
        // Before the figure draws anything in the svg.
        const functions = compile(values, name)

        super(context, name)

        this._config = {...values, expressions: {...values.expressions}}
        this._numExp = functions
        this._labelAnchor = null
        this._range = null
        this._points = []

        this._makeShape()
        this._draw()
    }

    protected _numExp: ParametricFunctions

    protected _config: IParametricConfig

    get config(): IParametricConfig {
        return this._config
    }

    /**
     * Replace the config of the curve: its functions are compiled again, it is drawn again, and its label follows.
     * @throws InvalidArgumentError, ParseError if `value` is not a valid config (see the constructor). The curve is then left as it was.
     */
    set config(value: IParametricConfig) {
        const functions = compile(value, this.name)

        this._config = {...value, expressions: {...value.expressions}}
        this._numExp = functions
        this._draw()
        this.updateLabel()
    }

    /** Draw the curve again. */
    computed(): this {
        return this._draw()
    }

    /** The point of the curve at `t`, in units of the coordinate system. `NaN` where a function is not defined. */
    valueAt(t: number): XY {
        return {x: this._numExp.x.evaluate({t}), y: this._numExp.y.evaluate({t})}
    }

    /** The point of the curve at `t`, in pixels. `NaN` where a function is not defined. */
    evaluate(t: number): XY {
        return toPixels(this.valueAt(t), this.graphConfig)
    }

    /** Sample the curve, and draw it. */
    protected _draw(): this {
        const graph = this.graphConfig
        const {width, height} = graph
        const domain = this._config.domain ?? DEFAULT_DOMAIN
        const threshold = height * (this._config.asymptoteThreshold ?? 10)
        const values: Record<string, number> = {t: 0}

        const at = (t: number): XY => {
            values.t = t
            const x = this._numExp.x.evaluate(values)
            const y = this._numExp.y.evaluate(values)

            return Number.isFinite(x) && Number.isFinite(y) ? toPixels({x, y}, graph) : nowhere()
        }

        const intervals = this._config.samples === undefined
            ? Math.max(MINIMUM_INTERVALS, (domain.max - domain.min) * Math.abs(graph.axis.x.x) / PIXELS_PER_SAMPLE)
            : (domain.max - domain.min) * this._config.samples
        const points = sampleCurve(at, domain.min, domain.max, {
            intervals,
            tolerance: this._config.tolerance ?? 0.5,
            maxDepth: this._config.maxDepth ?? 6,
            view: {left: 0, right: width, top: 0, bottom: height},
            bound: threshold
        })

        ;(this.shape as Path).plot(curvePath(points, threshold))
        this._range = {from: domain.min, to: domain.max, intervals}
        this._points = points
        this._labelAnchor = endOfCurve(points, width, height)

        return this
    }

    /** The points of the polyline that is drawn, in pixels: the points that do not exist cut it. */
    protected _points: XY[]

    override readonly followable = true

    /** The point of the curve that is the closest to a position, in pixels: `NaN` when the curve is not drawn anywhere. */
    override follow(x: number, y: number): XY {
        return nearestOnPolyline(this._points, {x, y})
    }

    /** The values of `t` that were drawn, and the intervals the curve started from. */
    protected _range: { from: number, to: number, intervals: number } | null

    protected _labelAnchor: { point: XY, direction: XY } | null

    /**
     * Where the label is, in pixels, and how it is aligned: at the end of the curve that is seen, on the left of the way the
     * curve goes (above a curve that goes to the right).
     */
    protected _labelPlace({point, direction}: { point: XY, direction: XY }): { point: XY, alignement: LABEL_POSITION } {
        return labelBesideWay(point, direction, this._labelGap)
    }

    /** Put the label at the end of the curve that is seen. The alignment that was asked for (`label=f/tl`) is kept. */
    moveLabel(): this {
        if (!this.label || this._labelAnchor === null) {
            return this
        }

        const {point, alignement} = this._labelPlace(this._labelAnchor)

        if (!this.label.alignementGiven) {
            this.label.config.alignement = alignement
        }

        this.label.move(point.x, point.y)

        return this
    }

    /**
     * The curve as TikZ: a pgfplots `axis` with no axis drawn, that covers the drawing and has the units of the coordinate
     * system, and in it the curve (the package `pgfplots` is needed). Then the label, as a node. The curve is sampled by
     * pgfplots, not by PiDraw: where a function is not defined it is cut. Nothing for a curve that is hidden.
     * @throws InvalidArgumentError if the appearance of the curve has no TikZ equivalent (see {@link AbstractFigure.tikz}), or if
     * it has a fill.
     */
    tikz(): string {
        const shown = this._tikzShown()
        const curve = shown.shape ? this._tikzCurve() : ''
        const label = shown.label && this._labelAnchor !== null ? this._tikzLabel(this._tikzCoordinates(this._labelPlace(this._labelAnchor).point)) : ''

        return [curve, label].filter(part => part !== '').join('\n')
    }

    /** The `axis` of pgfplots with the curve. */
    protected _tikzCurve(): string {
        if (this._range === null) {
            return ''
        }

        const {definitions, options} = this._tikzCurveStyle()
        const view = this._tikzView()
        const number = (value: number) => numberCorrection(value, 5)
        const around = ([min, max]: [number, number]): [number, number] => [min - (max - min), max + (max - min)]
        const rename = {t: 'x'}
        const plotOptions = [
            `domain=${number(this._range.from)}:${number(this._range.to)}`,
            `samples=${this._tikzSamples(this._range.intervals)}`,
            ...options
        ]

        return [
            ...definitions,
            ...this._tikzAxis(
                [`\\addplot[${plotOptions.join(', ')}] ({${this._numExp.x.toPgf(rename)}}, {${this._numExp.y.toPgf(rename)}});`],
                {x: around(view.x), y: around(view.y)}
            )
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
