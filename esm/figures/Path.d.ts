import { Figure } from "./Figure";
import { Graph } from "../Graph";
export declare class Path extends Figure {
    constructor(graph: Graph, name: string);
    generateName(): string;
}
