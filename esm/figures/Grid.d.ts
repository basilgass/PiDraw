import { Canvas } from "../Canvas";
import { IPoint } from "../interfaces";
import { Figure } from "./Figure";
export interface gridConfig {
    axisX: number;
    axisY: number;
    type: gridType;
}
export declare enum gridType {
    ORTHOGONAL = 4,
    TRIANGLE = 3,
    HEXAGONAL = 6
}
export declare class Grid extends Figure {
    #private;
    constructor(canvas: Canvas, name: string, config?: gridConfig);
    load(): Grid;
    show(): Grid;
    hide(): Grid;
    nearestPoint: (pt: IPoint) => IPoint;
}
