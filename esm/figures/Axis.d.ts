import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { AXIS } from "../variables/enums";
export declare class Axis extends Figure {
    private _minaxis;
    private _offset;
    private _orientation;
    constructor(graph: Graph, name: string, orientation: AXIS);
    get minaxis(): boolean;
    set minaxis(value: boolean);
    generateName(): string;
    update(): Axis;
    setMinAxis(minaxis: boolean): Axis;
    private _generateCoordinates;
}
