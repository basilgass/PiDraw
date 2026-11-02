import type {Path} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import type {LabelFields} from "../Label/Label.types"
import {
    type FillBetweenRun,
    fillBetweenArea,
    fillBetweenPath,
    fillBetweenRuns,
    numberCorrection,
    PIXELS_PER_SAMPLE,
    toCoordinates
} from "../../calculus"
import {checkFillBetween, domainOf} from "./FillBetween.constraints"
import type {IFillBetweenConfig} from "./FillBetween.types"

/** The curves are never farther than this, in pixels, from the real ones. */
const TOLERANCE = 0.5

/** How many times an interval may be cut in two to follow a curve that bends. */
const MAX_DEPTH = 6

/** Where a curve is taken for an asymptote, in heights of the graph (like a plot). */
const ASYMPTOTE_THRESHOLD = 10

/**
 * The area between two plots, or between a plot and the x axis (see {@link IFillBetweenConfig}).
 *
 * It is found from the functions of the plots, not from what they draw, every time it is computed, so it follows them when they
 * change. It is cut in pieces where a plot does not exist or has an asymptote. Only what is seen is drawn, like a plot. An area that
 * is nowhere (the plots do not exist, or have no abscissa in common) is not drawn.
 */
export class FillBetween extends AbstractFigure {
    /**
     * @throws InvalidArgumentError if a plot is not a `Plot`, the domain is not valid or the plots have no abscissa in common
     * (see {@link checkFillBetween}). Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IFillBetweenConfig) {
        // Before the figure draws anything in the svg.
        checkFillBetween(values, name)

        super(context, name)

        this._config = FillBetween._copy(values)
        this._runs = []
        this._range = null

        this._makeShape()
        this.computed()
    }

    /** A copy of a config, so that the domain that was given is not the one of the area. */
    protected static _copy(values: IFillBetweenConfig): IFillBetweenConfig {
        return values.domain === undefined ? {...values} : {...values, domain: {min: values.domain.min, max: values.domain.max}}
    }

    protected _config: IFillBetweenConfig

    get config(): IFillBetweenConfig {
        return this._config
    }

    /**
     * Replace the config of the area: it is drawn again, and its label follows.
     * @throws InvalidArgumentError if `value` is not a valid config (see the constructor). The area is then left as it was.
     */
    set config(value: IFillBetweenConfig) {
        checkFillBetween(value, this.name)

        this._config = FillBetween._copy(value)
        this.computed()
        this.updateLabel()
    }

    /** The pieces of the area that are drawn, in pixels. */
    protected _runs: FillBetweenRun[]

    /** The abscissas that were drawn and the intervals the curves started from, or `null` if nothing is drawn. */
    protected _range: { from: number, to: number, intervals: number } | null

    /** The area that is drawn, in units of the coordinate system squared. `NaN` when nothing is drawn. */
    get area(): number {
        if (this._runs.length === 0) {
            return NaN
        }

        const {x, y} = this.graphConfig.axis

        return fillBetweenArea(this._runs) / Math.abs(x.x * y.y)
    }

    /** Find the area again from the plots, and draw it. An area that is nowhere is not drawn. */
    computed(): this {
        const graph = this.graphConfig
        const {origin, width, height} = graph
        const scaleX = graph.axis.x.x

        this._runs = []
        this._range = null

        // What is seen, with a unit to spare, and no more than the domain.
        const seen = {min: -origin.x / scaleX - 1, max: (width - origin.x) / scaleX + 1}
        const asked = domainOf(this._config) ?? seen
        const from = Math.max(asked.min, seen.min)
        const to = Math.min(asked.max, seen.max)

        if (from < to) {
            const {plot, other} = this._config
            const intervals = (to - from) * Math.abs(scaleX) / PIXELS_PER_SAMPLE

            this._runs = fillBetweenRuns(
                (x) => plot.evaluate(x),
                other === undefined ? null : (x) => other.evaluate(x),
                origin.y,
                {min: from, max: to},
                (pixel) => toCoordinates({x: pixel, y: 0}, graph).x,
                {
                    intervals,
                    tolerance: TOLERANCE,
                    maxDepth: MAX_DEPTH,
                    view: {left: 0, right: width, top: 0, bottom: height},
                    bound: height * ASYMPTOTE_THRESHOLD
                }
            )
            this._range = this._runs.length === 0 ? null : {from, to, intervals}
        }

        this._setDefined(this._runs.length > 0)
        ;(this.shape as Path).plot(fillBetweenPath(this._runs))

        return this
    }

    /** The area can be shown in the label. */
    override labelFields(): LabelFields {
        return {
            area: (digits) => numberCorrection(this.area, digits).toString()
        }
    }

    /** Where the label is, in pixels: the middle of the area. `null` when nothing is drawn. */
    protected _labelPlace(): XY | null {
        const points = this._runs.flatMap(({first, second}) => [...first, ...second])

        if (points.length === 0) {
            return null
        }

        const xs = points.map(p => p.x)
        const ys = points.map(p => p.y)

        return {x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2}
    }

    /** Put the label at the middle of the area. The alignment that was asked for (`label=z/tl`) is kept. */
    moveLabel(): this {
        const place = this._labelPlace()

        if (!this.label || place === null) {
            return this
        }

        if (!this.label.alignementGiven) {
            this.label.config.alignement = 'mc'
        }

        this.label.move(place.x, place.y)

        return this
    }

    /**
     * The area as TikZ: a pgfplots `axis` with the two curves (or the x axis) as named paths and the area between them
     * (`fill between`), then the label as a node. The packages `pgfplots` and its library `fillbetween` are needed
     * (`\usepgfplotslibrary{fillbetween}`). The curves are sampled by pgfplots, not by PiDraw: an asymptote cuts them. Nothing
     * for an area that is hidden or not drawn.
     * @throws InvalidArgumentError if the appearance has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()
        const place = this._labelPlace()

        if (this._range === null || place === null || (!shown.shape && !shown.label)) {
            return ''
        }

        return [
            shown.shape ? this._tikzArea(this._range) : '',
            shown.label ? this._tikzLabel(this._tikzCoordinates(place)) : ''
        ].filter(part => part !== '').join('\n')
    }

    /** The `axis` of pgfplots with the area. */
    protected _tikzArea({from, to, intervals}: { from: number, to: number, intervals: number }): string {
        const {definitions, options} = this._tikzStyle()
        const {plot, other} = this._config
        const [yMin, yMax] = this._tikzView().y
        const number = (value: number) => numberCorrection(value, 5)
        const first = `pidraw-${this.name}-1`
        const second = `pidraw-${this.name}-2`
        const curve = (path: string, figure: typeof plot) =>
            `\\addplot[name path=${path}, draw=none, domain=${number(from)}:${number(to)}, samples=${this._tikzSamples(intervals)}] {${figure.numExp.toPgf()}};`

        return [
            ...definitions,
            ...this._tikzAxis([
                curve(first, plot),
                other === undefined ? `\\path[name path=${second}] (axis cs:${number(from)},0) -- (axis cs:${number(to)},0);` : curve(second, other),
                `\\addplot[${options.join(', ')}] fill between[of=${first} and ${second}];`
            ], {y: [yMin - (yMax - yMin), yMax + (yMax - yMin)]})
        ].join('\n')
    }

    _makeShape() {
        this.clear()

        // The area is one path.
        this.shape = this.element.path('M 0 0')

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }
}
