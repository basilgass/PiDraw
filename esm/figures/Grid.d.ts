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
    constructor(graph: Graph, name: string, config?: GridConfig);
    private _config;
    get config(): GridConfig;
    set config(value: GridConfig);
    load(): Grid;
    show(): Grid;
    hide(): Grid;
    nearestPoint: (pt: IPoint) => IPoint;
    update(): Grid;
}
