import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {Point} from "./Point";
import {Circle as svgCircle, Polygon as svgPolygon} from "@svgdotjs/svg.js";

export class Polygon extends Figure{
    private _points: Point[]

    get points(): Point[] {
        return this._points;
    }

    set points(value: Point[]) {
        this._points = value;
    }

    constructor(graph: Graph, name: string, points: Point[]) {
        // TODO : build the polygon class
        super(graph, name);

        this.generateName()

        this.svg = this.graph.svg.polygon().fill('none').stroke({color: 'black', width: 1});

        this._points = points
        this.plot()
    }

    generateName(): string {
        return super.generateName();
    }

    plot():Polygon{

        if(this.svg instanceof svgPolygon && this.points.length>0) {
            this.svg.plot(this.points.map(pt => `${pt.x},${pt.y}`).join(' '))
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