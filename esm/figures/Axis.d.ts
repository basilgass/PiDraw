import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { AXIS } from "../variables/enums";
export declare class Axis extends Figure {
    private _orientation;
    private _offset;
    constructor(graph: Graph, name: string, orientation: AXIS);
    generateName(): string;
    update(): Axis;
    private _generateCoordinates;
}
