"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
const Figure_1 = require("./Figure");
const svg_js_1 = require("@svgdotjs/svg.js");
class Polygon extends Figure_1.Figure {
    _points;
    get points() {
        return this._points;
    }
    set points(value) {
        this._points = value;
    }
    constructor(graph, name, points) {
        // TODO : build the polygon class
        super(graph, name);
        this.generateName();
        this.svg = this.graph.svg.polygon().fill('none').stroke({ color: 'black', width: 1 });
        this._points = points;
        this.plot();
    }
    generateName() {
        return super.generateName();
    }
    plot() {
        if (this.svg instanceof svg_js_1.Polygon && this.points.length > 0) {
            this.svg.plot(this.points.map(pt => `${pt.x},${pt.y}`).join(' '));
        }
        return this;
    }
    updateFigure() {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) {
            return this;
        }
        this.plot();
        return this;
    }
}
exports.Polygon = Polygon;
//# sourceMappingURL=Polygon.js.map