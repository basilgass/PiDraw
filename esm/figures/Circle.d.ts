import { Graph } from "../Graph";
import { Figure } from "./Figure";
import { Point } from "./Point";
export declare class Circle extends Figure {
    constructor(graph: Graph, name: string, center: Point, radius: number | Point);
    _center: Point;
    get center(): Point;
    set center(value: Point);
    _radius: number | Point;
    get radius(): number | Point;
    set radius(value: number | Point);
    get tex(): string;
    getRadiusAsPixels(): number;
    generateName(): string;
    updateFigure(): Circle;
}
