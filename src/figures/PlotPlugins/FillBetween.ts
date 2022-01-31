import {Figure} from "../Figure";
import {Plot} from "../Plot";
import {Path} from "@svgdotjs/svg.js";

export class FillBetween extends Figure {
    #plot: Plot
    #plot2: Plot
    #from: number
    #to: number
    #samples: number
    #d: string

    constructor(plot: Plot, plot2: Plot, from: number, to: number, samples: number) {
        super(plot.graph, '');

        this.#plot = plot
        this.#plot2 = plot2
        this.#from = from
        this.#to = to
        this.#samples = samples
        this.#d = ''

        this.svg = this.graph.svg.path(this.#d)
            .fill({color: 'yellow', opacity: 0.2})
            .stroke({width: 1, color: 'black'})
        this.graph.layers.plots.add(this.svg)

        this.updateFigure()

    }

    get plot(): Plot {
        return this.#plot;
    }

    clean() {
        this.svg.remove()
    }

    updateFigure(): FillBetween {
        let d1 = this.#plot.getPartialPath(this.#from, this.#to, this.#samples),
            d2

        if (this.#plot2 instanceof Plot) {
            d2 = this.#plot2.getPartialPath(this.#from, this.#to, this.#samples, true)
        } else {
            // Assume the "second plot" is the Ox axes.
            let pt1 = this.graph.unitsToPixels({x: this.#to, y: 0}),
                pt2 = this.graph.unitsToPixels({x: this.#from, y: 0})

            d2 = `L${pt1.x},${pt1.y} L${pt2.x},${pt2.y}`
        }

        if (this.svg instanceof Path) {
            this.svg.plot(`${d1} ${d2} Z`)
        }

        return this
    }
}