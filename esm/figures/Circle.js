"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const Figure_1 = require("./Figure");
const Point_1 = require("./Point");
const svg_js_1 = require("@svgdotjs/svg.js");
class Circle extends Figure_1.Figure {
    _center;
    _radius;
    constructor(graph, name, center, radius) {
        super(graph, name);
        this._center = center;
        this._radius = radius;
        this.generateName();
        // Create the shape
        this.svg = graph.svg.circle(this.getRadiusAsPixels() * 2).stroke('black').fill('none');
        return this;
    }
    get center() {
        return this._center;
    }
    set center(value) {
        this._center.x = value.x;
        this._center.y = value.y;
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
    }
    getRadiusAsPixels() {
        let radius = 100;
        if (this._radius instanceof Point_1.Point) {
            radius = Math.sqrt((this._radius.x - this._center.x) ** 2 +
                (this._radius.y - this._center.y) ** 2);
        }
        else if (typeof this._radius === 'number') {
            radius = this.graph.distanceToPixels(this._radius);
        }
        return radius;
    }
    generateName() {
        if (this.name === undefined) {
            let n = this.graph.figures.filter(fig => fig instanceof Circle).length + 1;
            this.name = `C_${n}`;
        }
        return this.name;
    }
    updateFigure() {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) {
            return this;
        }
        // No center is given
        if (!this._center) {
            return this;
        }
        // No radius is given
        if (this._radius <= 0) {
            return this;
        }
        this.svg.center(this._center.x, this._center.y);
        if (this.svg instanceof svg_js_1.Circle) {
            this.svg.radius(this.getRadiusAsPixels());
        }
        return this;
    }
}
exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map