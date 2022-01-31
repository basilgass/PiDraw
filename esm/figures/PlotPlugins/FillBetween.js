"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillBetween = void 0;
const Figure_1 = require("../Figure");
const Plot_1 = require("../Plot");
const svg_js_1 = require("@svgdotjs/svg.js");
class FillBetween extends Figure_1.Figure {
    #plot;
    #plot2;
    #from;
    #to;
    #samples;
    #d;
    constructor(plot, plot2, from, to, samples) {
        super(plot.graph, '');
        this.#plot = plot;
        this.#plot2 = plot2;
        this.#from = from;
        this.#to = to;
        this.#samples = samples;
        this.#d = '';
        this.svg = this.graph.svg.path(this.#d)
            .fill({ color: 'yellow', opacity: 0.2 })
            .stroke({ width: 1, color: 'black' });
        this.graph.layers.plots.add(this.svg);
        this.updateFigure();
    }
    get plot() {
        return this.#plot;
    }
    clean() {
        this.svg.remove();
    }
    updateFigure() {
        let d1 = this.#plot.getPartialPath(this.#from, this.#to, this.#samples), d2;
        if (this.#plot2 instanceof Plot_1.Plot) {
            d2 = this.#plot2.getPartialPath(this.#from, this.#to, this.#samples, true);
        }
        else {
            let pt1 = this.graph.unitsToPixels({ x: this.#to, y: 0 }), pt2 = this.graph.unitsToPixels({ x: this.#from, y: 0 });
            d2 = `L${pt1.x},${pt1.y} L${pt2.x},${pt2.y}`;
        }
        if (this.svg instanceof svg_js_1.Path) {
            this.svg.plot(`${d1} ${d2} Z`);
        }
        return this;
    }
}
exports.FillBetween = FillBetween;
//# sourceMappingURL=FillBetween.js.map