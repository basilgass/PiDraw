import {Graph} from "../Graph";
import {Figure} from "./Figure";
import {Point} from "./Point";
import {Circle as svgCircle} from "@svgdotjs/svg.js";

export class Circle extends Figure {
    #center: Point;
    #radius: number | Point;

    constructor(canvas: Graph, name: string, center: Point, radius: number | Point) {
        super(canvas, name);

        this.#center = center

        this.#radius = radius

        this.generateName()

        // Create the shape

        this.svg = canvas.svg.circle(
            this.getRadiusAsPixels() * 2
        ).stroke('black').fill('none');


        return this
    }

    get center(): Point {
        return this.#center;
    }

    set center(value: Point) {
        this.#center.x = value.x
        this.#center.y = value.y
    }

    get radius(): number | Point {
        return this.#radius;
    }

    set radius(value: number | Point) {
        this.#radius = value;
    }

    getRadiusAsPixels(): number {
        let radius = 100
        if (this.#radius instanceof Point) {
            radius = Math.sqrt(
                (this.#radius.x - this.#center.x) ** 2 +
                (this.#radius.y - this.#center.y) ** 2
            )
        } else if (typeof this.#radius === 'number') {
            radius = this.canvas.distanceToPixels(this.#radius)
        }

        return radius
    }

    generateName(): string {
        if (this.name === undefined) {
            let n = this.canvas.figures.filter(fig => fig instanceof Circle).length + 1

            this.name = `C_${n}`
        }

        return this.name
    }

    updateFigure(): Circle {
        // The update mechanism is frozen.
        if (this.freeze || this.canvas.freeze) {
            return this
        }
        // No center is given
        if (!this.#center) {
            return this
        }
        // No radius is given
        if (this.#radius <= 0) {
            return this
        }

        this.svg.center(this.#center.x, this.#center.y)

        if (this.svg instanceof svgCircle) {
            this.svg.radius(this.getRadiusAsPixels())
        }

        return this
    }
}