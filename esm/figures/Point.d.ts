import { Graph } from "../Graph";
import { Figure } from "./Figure";
import { IPoint } from "../variables/interfaces";
import { Grid } from "./Grid";
import { POINTCONSTRAIN } from "../variables/enums";
export interface PointConfig {
    type: POINTCONSTRAIN;
    data?: any;
}
export declare class Point extends Figure {
    #private;
    constructor(graph: Graph, name: string, pixels: IPoint);
    generateName(): string;
    asCross(): Point;
    asCircle(): Point;
    setSize(value: number): Point;
    updateFigure(): Point;
    middleOf(A: Point, B: Point): Point;
    draggable(grid?: Grid): Point;
    get x(): number;
    get y(): number;
    set x(value: number);
    set y(value: number);
    get coord(): IPoint;
}
