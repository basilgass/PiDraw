import { Figure, IFigureConfig } from "../../Figure"
import { Path } from "@svgdotjs/svg.js"
import { IPlot } from "../../pidraw.interface"

export class FillBetween extends Figure {
    private _from: number
    private _to: number
    private _samples: number
    private _d: string

    private _plot1: IPlot
    private _plot2: IPlot | null

    constructor(config: IFigureConfig, plot1: IPlot, plot2: IPlot | null, from: number, to: number, samples: number) {
        super(config)

        this._from = from < to ? +from : +to
        this._to = from < to ? +to : +from
        this._samples = samples
        this._d = ''

        this._plot1 = plot1
        this._plot2 = plot2

        this.svg = this.rootSVG.path(this._d)
            .fill({ color: 'yellow', opacity: 0.2 })
            .stroke({ width: 1, color: 'black' })

        this.graph.layers.plotsBG.add(this.svg)

        this.updateFigure()

    }

    clean() {
        this.svg.remove()
    }

    updateFigure(): this {
        const d1 = this._plot1.getPartialPath(this._from, this._to, this._samples)
        let d2

        if (this._plot2 !== null) {
            d2 = this._plot2.getPartialPath(this._from, this._to, this._samples, true)
        } else {
            // Assume the "second plot" is the Ox axes.
            const pt1 = this.graph.unitsToPixels({ x: this._to, y: 0 }),
                pt2 = this.graph.unitsToPixels({ x: this._from, y: 0 })

            d2 = `L${pt1.x},${pt1.y} L${pt2.x},${pt2.y}`
        }

        if (this.svg instanceof Path) {
            this.svg.plot(`${d1} ${d2} Z`)
        }

        return this
    }

    color(color: string): this {
        this.svg.fill(color)
        return this
    }
}
