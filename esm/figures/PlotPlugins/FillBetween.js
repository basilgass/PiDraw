"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillBetween = void 0;
const Figure_1 = require("../Figure");
const Plot_1 = require("../Plot");
const svg_js_1 = require("@svgdotjs/svg.js");
class FillBetween extends Figure_1.Figure {
    _plot;
    _plot2;
    _from;
    _to;
    _samples;
    _d;
    constructor(plot, plot2, from, to, samples, name) {
        super(plot.graph, name || '');
        this._plot = plot;
        this._plot2 = plot2;
        this._from = from < to ? +from : +to;
        this._to = from < to ? +to : +from;
        this._samples = samples;
        this._d = '';
        this.svg = this.graph.svg.path(this._d)
            .fill({ color: 'yellow', opacity: 0.2 })
            .stroke({ width: 1, color: 'black' });
        this.graph.layers.plotsBG.add(this.svg);
        this.updateFigure();
    }
    get plot() {
        return this._plot;
    }
    clean() {
        this.svg.remove();
    }
    updateFigure() {
        let d1 = this._plot.getPartialPath(this._from, this._to, this._samples), d2;
        if (this._plot2 instanceof Plot_1.Plot) {
            d2 = this._plot2.getPartialPath(this._from, this._to, this._samples, true);
        }
        else {
            // Assume the "second plot" is the Ox axes.
            let pt1 = this.graph.unitsToPixels({ x: this._to, y: 0 }), pt2 = this.graph.unitsToPixels({ x: this._from, y: 0 });
            d2 = `L${pt1.x},${pt1.y} L${pt2.x},${pt2.y}`;
        }
        if (this.svg instanceof svg_js_1.Path) {
            this.svg.plot(`${d1} ${d2} Z`);
        }
        return this;
    }
    color(color) {
        this.svg.fill(color);
        return this;
    }
}
exports.FillBetween = FillBetween;
//# sourceMappingURL=FillBetween.js.map