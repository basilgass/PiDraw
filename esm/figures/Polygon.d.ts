import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
export declare class Polygon extends Figure {
    constructor(graph: Graph, name: string, points: Point[]);
    private _points;
    get points(): Point[];
    set points(value: Point[]);
    regular(sides: number, radius: number | Point): Polygon;
    private _sides;
    get sides(): number;
    set sides(value: number);
    private _radius;
    get radius(): number | Point;
    set radius(value: number | Point);
    generateName(): string;
    plot(): Polygon;
    updateFigure(): Polygon;
}
