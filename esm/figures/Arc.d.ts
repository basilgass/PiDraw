import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
export declare class Arc extends Figure {
    #private;
    constructor(graph: Graph, name: string, center: Point, start: Point, stop: Point);
    generateName(): string;
}
