import { Graph } from "../Graph";
import { Figure } from "./Figure";
export declare class Label extends Figure {
    constructor(graph: Graph, name: string);
    generateName(): string;
}
