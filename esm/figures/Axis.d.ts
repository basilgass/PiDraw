import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { AXIS } from "../variables/enums";
export declare class Axis extends Figure {
    constructor(canvas: Graph, name: string, orientation: AXIS);
    generateName(): string;
}
