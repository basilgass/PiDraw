import { Figure } from "./Figure";
import { Graph } from "../Graph";
export declare class Path extends Figure {
    constructor(canvas: Graph, name: string);
    generateName(): string;
}
