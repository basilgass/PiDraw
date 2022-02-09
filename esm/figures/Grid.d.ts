import { Graph } from "../Graph";
import { IPoint } from "../variables/interfaces";
import { Figure } from "./Figure";
import { GRIDTYPE } from "../variables/enums";
export interface GridConfig {
    axisX: number;
    axisY: number;
    type: GRIDTYPE;
}
export declare class Grid extends Figure {
    _config: GridConfig;
    constructor(graph: Graph, name: string, config?: GridConfig);
    load(): Grid;
    show(): Grid;
    hide(): Grid;
    nearestPoint: (pt: IPoint) => IPoint;
}
