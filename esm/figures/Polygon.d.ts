import { Figure } from "./Figure";
import { Graph } from "../Graph";
export declare class Polygon extends Figure {
    constructor(graph: Graph, name: string);
    generateName(): string;
}
