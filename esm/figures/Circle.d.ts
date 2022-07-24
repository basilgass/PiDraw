import { Graph } from "../Graph";
import { Figure } from "./Figure";
import { Point } from "./Point";
export declare class Circle extends Figure {
    _center: Point;
    _radius: number | Point;
    constructor(graph: Graph, name: string, center: Point, radius: number | Point);
    get tex(): string;
    get center(): Point;
    set center(value: Point);
    get radius(): number | Point;
    set radius(value: number | Point);
    getRadiusAsPixels(): number;
    generateName(): string;
    updateFigure(): Circle;
}
