"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
const Figure_1 = require("./Figure");
const Point_1 = require("./Point");
const svg_js_1 = require("@svgdotjs/svg.js");
const Calculus_1 = require("../Calculus");
class Polygon extends Figure_1.Figure {
    constructor(graph, name, points) {
        super(graph, name);
        this.generateName();
        this.svg = this.graph.svg.polygon().fill('none').stroke({ color: 'black', width: 1 });
        // Generate the polygon
        this._points = points;
        this.plot();
    }
    _points;
    get points() {
        return this._points;
    }
    set points(value) {
        this._points = value;
    }
    regular(sides, radius) {
        this._sides = sides;
        this._radius = radius;
        this.plot();
        return this;
    }
    _sides;
    get sides() {
        return this._sides;
    }
    set sides(value) {
        this._sides = value;
    }
    _radius;
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
    }
    generateName() {
        return super.generateName();
    }
    plot() {
        if (this.svg instanceof svg_js_1.Polygon && this.points.length > 1) {
            this.svg.plot(this.points.map(pt => `${pt.x},${pt.y}`).join(' '));
            return this;
        }
        if (this.svg instanceof svg_js_1.Polygon && this.points.length === 1 && this._radius && this._sides > 2) {
            // Draw a regular polygon - first point is at top or the radius point
            let r, plotPoints = [], OP;
            if (this._radius instanceof Point_1.Point) {
                r = (0, Calculus_1.distanceAB)(this._radius, this.points[0]);
            }
            else {
                r = this.graph.distanceToPixels(this._radius);
            }
            OP = new Calculus_1.mathVector(this._points[0], this._radius instanceof Point_1.Point ?
                this._radius :
                { x: this._points[0].x, y: this._points[0].y - r });
            for (let i = 0; i < this._sides; i++) {
                plotPoints.push({
                    x: this._points[0].x + OP.x,
                    y: this._points[0].y + OP.y
                });
                // Rotate the vector
                OP.rotate(360 / this._sides);
            }
            this.svg.plot(plotPoints.map(pt => `${pt.x},${pt.y}`).join(' '));
            return this;
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