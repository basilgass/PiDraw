import { Graph } from "../Graph";
import { Figure } from "./Figure";
export declare class Label extends Figure {
    constructor(canvas: Graph, name: string);
    generateName(): string;
}
