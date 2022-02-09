import {Graph} from "../Graph";
import {Figure} from "./Figure";
import {Point} from "./Point";
import {Circle as svgCircle} from "@svgdotjs/svg.js";

export class Circle extends Figure {
    _center: Point;
    _radius: number | Point;

    constructor(graph: Graph, name: string, center: Point, radius: number | Point) {
        super(graph, name);

        this._center = center

        this._radius = radius

        this.generateName()

        // Create the shape

        this.svg = graph.svg.circle(
            this.getRadiusAsPixels() * 2
        ).stroke('black').fill('none');


        return this
    }

    get center(): Point {
        return this._center;
    }

    set center(value: Point) {
        this._center.x = value.x
        this._center.y = value.y
    }

    get radius(): number | Point {
        return this._radius;
    }

    set radius(value: number | Point) {
        this._radius = value;
    }

    getRadiusAsPixels(): number {
        let radius = 100
        if (this._radius instanceof Point) {
            radius = Math.sqrt(
                (this._radius.x - this._center.x) ** 2 +
                (this._radius.y - this._center.y) ** 2
            )
        } else if (typeof this._radius === 'number') {
            radius = this.graph.distanceToPixels(this._radius)
        }

        return radius
    }

    generateName(): string {
        if (this.name === undefined) {
            let n = this.graph.figures.filter(fig => fig instanceof Circle).length + 1

            this.name = `C_${n}`
        }

        return this.name
    }

    updateFigure(): Circle {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) {
            return this
        }
        // No center is given
        if (!this._center) {
            return this
        }
        // No radius is given
        if (this._radius <= 0) {
            return this
        }

        this.svg.center(this._center.x, this._center.y)

        if (this.svg instanceof svgCircle) {
            this.svg.radius(this.getRadiusAsPixels())
        }

        return this
    }
}