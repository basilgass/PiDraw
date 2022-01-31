import { Graph } from "../Graph";
import { Figure } from "./Figure";
import { Point } from "./Point";
export declare class Circle extends Figure {
    #private;
    constructor(graph: Graph, name: string, center: Point, radius: number | Point);
    get center(): Point;
    set center(value: Point);
    get radius(): number | Point;
    set radius(value: number | Point);
    getRadiusAsPixels(): number;
    generateName(): string;
    updateFigure(): Circle;
}
