import type {Path} from "@svgdotjs/svg.js"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFigureContext, XY} from "../../pidraw.common"
import type {LabelFields} from "../Label/Label.types"
import {numberCorrection, pathNumber, type RiemannRectangle, riemannRectangles, riemannSum, toPixels} from "../../calculus"
import {checkRiemann, DEFAULT_POSITION, DEFAULT_RECTANGLES, domainOf} from "./Riemann.constraints"
import type {IRiemannConfig} from "./Riemann.types"

/**
 * The Riemann sum of a plot: rectangles from the x axis to the graph, the domain cut in intervals of the same width (see
 * {@link IRiemannConfig}). Its sum is a field of its label.
 *
 * It is found again every time it is computed, so it follows its plot when the plot changes. Where the plot is not defined there is no
 * rectangle; a sum without any rectangle (the plot does not exist) is not drawn.
 */
export class Riemann extends AbstractFigure {
    /** The label is this far, in pixels, above the highest rectangle. */
    protected override readonly _labelGap: number = 6

    /**
     * @throws InvalidArgumentError if the plot is not a `Plot`, there is no domain, the domain, the number of rectangles or the position
     * is not valid (see `checkRiemann`). Nothing is left in the svg.
     */
    constructor(context: IFigureContext, name: string, values: IRiemannConfig) {
        // Before the figure draws anything in the svg.
        checkRiemann(values, name)

        super(context, name)

        this._config = Riemann._copy(values)
        this._rectangles = []

        this._makeShape()
        this.computed()
    }

    /** A copy of a config, so that the domain that was given is not the one of the sum. */
    protected static _copy(values: IRiemannConfig): IRiemannConfig {
        return values.domain === undefined ? {...values} : {...values, domain: {min: values.domain.min, max: values.domain.max}}
    }

    protected _config: IRiemannConfig

    get config(): IRiemannConfig {
        return this._config
    }

    /**
     * Replace the config of the sum: it is drawn again, and its label follows.
     * @throws InvalidArgumentError if `value` is not a valid config (see the constructor). The sum is then left as it was.
     */
    set config(value: IRiemannConfig) {
        checkRiemann(value, this.name)

        this._config = Riemann._copy(value)
        this.computed()
        this.updateLabel()
    }

    /** How many rectangles the domain is cut in. */
    get rectangles(): number {
        return this._config.rectangles ?? DEFAULT_RECTANGLES
    }

    /** @throws InvalidArgumentError if `value` is not an integer from 1 to 1000. The sum is then left as it was. */
    set rectangles(value: number) {
        this.config = {...this._config, rectangles: value}
    }

    /** Where the plot is read in each interval: 0 at its left end, 0.5 at its middle, 1 at its right end. */
    get position(): number {
        return this._config.position ?? DEFAULT_POSITION
    }

    /** @throws InvalidArgumentError if `value` is not a number from 0 to 1. The sum is then left as it was. */
    set position(value: number) {
        this.config = {...this._config, position: value}
    }

    /** The rectangles that are drawn, in units of the coordinate system. A copy, empty when the sum is not drawn. */
    get rectanglesDrawn(): RiemannRectangle[] {
        return this._rectangles.map(rectangle => ({...rectangle}))
    }

    protected _rectangles: RiemannRectangle[]

    /** The sum of the areas of the rectangles, in units. `NaN` when the sum is not drawn. */
    get sum(): number {
        return this._rectangles.length === 0 ? NaN : riemannSum(this._rectangles)
    }

    /** Find the rectangles again from the plot, and draw them. A sum without any rectangle is not drawn. */
    computed(): this {
        const domain = domainOf(this._config)
        const plot = this._config.plot

        this._rectangles = domain === null ? [] : riemannRectangles((x) => plot.valueAt(x), domain, this.rectangles, this.position)
        this._setDefined(this._rectangles.length > 0)
        ;(this.shape as Path).plot(this._path())

        return this
    }

    /** The rectangles as a svg path: one closed polygon each. */
    protected _path(): string {
        if (this._rectangles.length === 0) {
            return 'M 0 0'
        }

        const at = (x: number, y: number) => {
            const pixels = toPixels({x, y}, this.graphConfig)

            return `${pathNumber(pixels.x)} ${pathNumber(pixels.y)}`
        }

        return this._rectangles
            .map(({x0, x1, y}) => `M ${at(x0, 0)} L ${at(x1, 0)} L ${at(x1, y)} L ${at(x0, y)} Z`)
            .join(' ')
    }

    /** Where the label is, in pixels: above the highest rectangle, in the middle of the domain. `null` when the sum is not drawn. */
    protected _labelPlace(): XY | null {
        const domain = domainOf(this._config)

        if (domain === null || this._rectangles.length === 0) {
            return null
        }

        const top = Math.max(0, ...this._rectangles.map(({y}) => y))
        const {x, y} = toPixels({x: (domain.min + domain.max) / 2, y: top}, this.graphConfig)

        return {x, y: y - this._labelGap}
    }

    /** The sum and the number of rectangles can be shown in the label. */
    override labelFields(): LabelFields {
        return {
            sum: (digits) => numberCorrection(this.sum, digits).toString(),
            rectangles: () => String(this.rectangles)
        }
    }

    /** Put the label above the highest rectangle. The alignment that was asked for (`label=r/bl`) is kept. */
    moveLabel(): this {
        const place = this._labelPlace()

        if (!this.label || place === null) {
            return this
        }

        if (!this.label.alignementGiven) {
            this.label.config.alignement = 'tc'
        }

        this.label.move(place.x, place.y)

        return this
    }

    /**
     * The rectangles as TikZ (`\draw (x0,0) rectangle (x1,y) ...`), then the label. Nothing for a sum that is hidden or not drawn.
     * @throws InvalidArgumentError if the appearance of the sum has no TikZ equivalent (see {@link AbstractFigure.tikz}).
     */
    tikz(): string {
        const shown = this._tikzShown()
        const place = this._labelPlace()

        if (place === null || (!shown.shape && !shown.label)) {
            return ''
        }

        const at = (x: number, y: number) => `(${this._tikzCoordinates(toPixels({x, y}, this.graphConfig))})`
        const path = this._rectangles.map(({x0, x1, y}) => `${at(x0, 0)} rectangle ${at(x1, y)}`).join(' ')

        return [
            shown.shape ? this._tikzDraw(path) : '',
            shown.label ? this._tikzLabel(this._tikzCoordinates(place)) : ''
        ].filter(part => part !== '').join('\n')
    }

    _makeShape() {
        this.clear()

        // The rectangles are one path.
        this.shape = this.element.path('M 0 0')

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }
}
