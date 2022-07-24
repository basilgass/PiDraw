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
    private _scale;
    private _shape;
    private _constrain;
    constructor(graph: Graph, name: string, pixels: IPoint);
    private _x;
    get x(): number;
    set x(value: number);
    private _y;
    get y(): number;
    set y(value: number);
    get coord(): IPoint;
    get tex(): string;
    generateName(): string;
    asCross(): Point;
    asCircle(size?: number): Point;
    setSize(value: number): Point;
    getDistanceTo(value: Figure): number;
    updateFigure(): Point;
    updateLabel(): Point;
    /**
     * Constrain the point to be the middle of two other points.
     * @param {Point} A
     * @param {Point} B
     * @returns {Point}
     */
    middleOf(A: Point, B: Point): Point;
    draggable(grid?: Grid): Point;
    private _updateShape;
    private _updateCoordinate;
}
