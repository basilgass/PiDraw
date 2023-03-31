import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {Point} from "./Point";
import {Polygon as svgPolygon} from "@svgdotjs/svg.js";
import {distanceAB, mathVector} from "../Calculus";

export class Polygon extends Figure {
    constructor(graph: Graph, name: string, points: Point[]) {
        super(graph, name);

        this.generateName()

        this.svg = this.graph.svg.polygon().fill('none').stroke({color: 'black', width: 1});

        // Generate the polygon
        this._points = points
        this.plot()
    }

    private _points: Point[]

    get points(): Point[] {
        return this._points;
    }

    set points(value: Point[]) {
        this._points = value;
    }

    regular(sides: number, radius: number | Point): Polygon {
        this._sides = sides
        this._radius = radius

        this.plot()

        return this
    }

    private _sides: number

    get sides(): number {
        return this._sides;
    }

    set sides(value: number) {
        this._sides = value;
    }

    private _radius: number|Point

    get radius(): number|Point {
        return this._radius;
    }

    set radius(value: number|Point) {
        this._radius = value;
    }

    generateName(): string {
        return super.generateName();
    }

    plot(): Polygon {

        if (this.svg instanceof svgPolygon && this.points.length > 1) {
            this.svg.plot(this.points.map(pt => `${pt.x},${pt.y}`).join(' '))
            return this
        }

        if (this.svg instanceof svgPolygon && this.points.length === 1 && this._radius && this._sides > 2) {
            // Draw a regular polygon - first point is at top or the radius point
            let r: number,
                plotPoints = [],
                OP: mathVector
            if(this._radius instanceof Point){
                r = distanceAB(this._radius, this.points[0])
            }else{
                r = this.graph.distanceToPixels(this._radius)
            }

            OP = new mathVector(
                this._points[0],
                this._radius instanceof Point ?
                    this._radius :
                    {x: this._points[0].x, y: this._points[0].y - r}
            )

            for(let i=0; i<this._sides; i++){
                plotPoints.push({
                    x: this._points[0].x + OP.x,
                    y: this._points[0].y + OP.y
                })

                // Rotate the vector
                OP.rotate(360/this._sides)
            }

            this.svg.plot(plotPoints.map(pt => `${pt.x},${pt.y}`).join(' '))
            return this
        }
        return this
    }

    updateFigure(): Polygon {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) {
            return this
        }

        this.plot()
        return this
    }

}