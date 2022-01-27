import { Graph } from "../Graph";
import { gridConfig, IPoint } from "../variables/interfaces";
import { Figure } from "./Figure";
export declare class Grid extends Figure {
    #private;
    constructor(canvas: Graph, name: string, config?: gridConfig);
    load(): Grid;
    show(): Grid;
    hide(): Grid;
    nearestPoint: (pt: IPoint) => IPoint;
}
