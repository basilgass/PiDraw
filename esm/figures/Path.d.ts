import { Figure } from "./Figure";
import { Graph } from "../Graph";
export declare class Path extends Figure {
    private _d;
    constructor(graph: Graph, name: string, d: string);
    plot(d: string): Path;
    generateName(): string;
}
