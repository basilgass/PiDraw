import {Graph} from "../Graph";
import {Figure} from "./Figure";
import {Point} from "./Point";
import {Circle as svgCircle} from "@svgdotjs/svg.js";
import {Line} from "./Line";
// import {Circle as mathCircle} from "pimath/esm/maths/geometry/circle"
// import {Point as mathPoint} from "pimath/esm/maths/geometry/point"

export class Circle extends Figure {
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

    _center: Point;

    get center(): Point {
        return this._center;
    }

    set center(value: Point) {
        this._center.x = value.x
        this._center.y = value.y
    }

    _radius: number | Point;

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
        if(!(this._radius instanceof Point) && this._radius<=0){
            return this
        }

        this.svg.center(this._center.x, this._center.y)

        if (this.svg instanceof svgCircle) {
            this.svg.radius(this.getRadiusAsPixels())
        }

        return this
    }

    // interectionWith(d: Line, name?: string): Point[] {
    //     if (name === undefined) name = "I"
    //
    //     // Get the intersection of the circle with the line.
    //     const m: number = d.math.slope,
    //         h: number = d.math.ordinate,
    //         r: number = this.getRadiusAsPixels(),
    //         c1: number = this.center.x,
    //         c2: number = this.center.y,
    //         a: number = m ** 2 + 1,
    //         b: number = -2 * c1 + 2 * m * (h - c2),
    //         c: number = c1 ** 2 + (h - c2) ** 2 - r ** 2,
    //         delta = b ** 2 - 4 * a * c
    //
    //     if (delta < 0) {
    //         return []
    //     } else if (delta === 0) {
    //
    //         const pt = this.graph.point(
    //             -b / (2 * a),
    //             m * (-b / (2 * a)) + h,
    //             name + '1')
    //         pt.asCircle().svg.fill('black')
    //         return [pt]
    //     } else {
    //         const x1 = (-b + Math.sqrt(delta)) / (2 * a),
    //             x2 = (-b - Math.sqrt(delta)) / (2 * a),
    //             p1 = this.graph.point(
    //                 x1,
    //                 m * x1 + h,
    //                 name + '1',
    //                 true
    //             ),
    //             p2 = this.graph.point(
    //                 x2,
    //                 m * x2 + h,
    //                 name + '2',
    //                 true
    //             )
    //
    //         p1.svg.fill('black')
    //         p2.svg.fill('black')
    //         return [p1, p2,]
    //
    //     }
    // }
}