import {Figure} from "../Figure";
import {Plot} from "../Plot";
import {Path} from "@svgdotjs/svg.js";

export class FillBetween extends Figure {
    private _plot: Plot
    private _plot2: Plot
    private _from: number
    private _to: number
    private _samples: number
    private _d: string

    constructor(plot: Plot, plot2: Plot, from: number, to: number, samples: number) {
        super(plot.graph, '');

        this._plot = plot
        this._plot2 = plot2
        this._from = from<to?+from:+to
        this._to = from<to?+to:+from
        this._samples = samples
        this._d = ''

        this.svg = this.graph.svg.path(this._d)
            .fill({color: 'yellow', opacity: 0.2})
            .stroke({width: 1, color: 'black'})
        this.graph.layers.plotsBG.add(this.svg)

        this.updateFigure()

    }

    get plot(): Plot {
        return this._plot;
    }

    clean() {
        this.svg.remove()
    }

    updateFigure(): FillBetween {
        let d1 = this._plot.getPartialPath(this._from, this._to, this._samples),
            d2

        if (this._plot2 instanceof Plot) {
            d2 = this._plot2.getPartialPath(this._from, this._to, this._samples, true)
        } else {
            // Assume the "second plot" is the Ox axes.
            let pt1 = this.graph.unitsToPixels({x: this._to, y: 0}),
                pt2 = this.graph.unitsToPixels({x: this._from, y: 0})

            d2 = `L${pt1.x},${pt1.y} L${pt2.x},${pt2.y}`
        }

        if (this.svg instanceof Path) {
            this.svg.plot(`${d1} ${d2} Z`)
        }

        return this
    }
}