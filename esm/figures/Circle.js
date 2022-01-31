"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const Figure_1 = require("./Figure");
const Point_1 = require("./Point");
const svg_js_1 = require("@svgdotjs/svg.js");
class Circle extends Figure_1.Figure {
    #center;
    #radius;
    constructor(graph, name, center, radius) {
        super(graph, name);
        this.#center = center;
        this.#radius = radius;
        this.generateName();
        this.svg = graph.svg.circle(this.getRadiusAsPixels() * 2).stroke('black').fill('none');
        return this;
    }
    get center() {
        return this.#center;
    }
    set center(value) {
        this.#center.x = value.x;
        this.#center.y = value.y;
    }
    get radius() {
        return this.#radius;
    }
    set radius(value) {
        this.#radius = value;
    }
    getRadiusAsPixels() {
        let radius = 100;
        if (this.#radius instanceof Point_1.Point) {
            radius = Math.sqrt((this.#radius.x - this.#center.x) ** 2 +
                (this.#radius.y - this.#center.y) ** 2);
        }
        else if (typeof this.#radius === 'number') {
            radius = this.graph.distanceToPixels(this.#radius);
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
        if (this.freeze || this.graph.freeze) {
            return this;
        }
        if (!this.#center) {
            return this;
        }
        if (this.#radius <= 0) {
            return this;
        }
        this.svg.center(this.#center.x, this.#center.y);
        if (this.svg instanceof svg_js_1.Circle) {
            this.svg.radius(this.getRadiusAsPixels());
        }
        return this;
    }
}
exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map