import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
export declare class Polygon extends Figure {
    private _points;
    get points(): Point[];
    set points(value: Point[]);
    constructor(graph: Graph, name: string, points: Point[]);
    generateName(): string;
    plot(): Polygon;
    updateFigure(): Polygon;
}
