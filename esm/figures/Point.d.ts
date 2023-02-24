import { Graph } from "../Graph";
import { Figure } from "./Figure";
import { IPoint } from "../variables/interfaces";
import { Grid } from "./Grid";
import { AXIS, POINTCONSTRAIN } from "../variables/enums";
import { Line } from "./Line";
import { Vector } from "pimath/esm/maths/geometry/vector";
export interface PointConfig {
    data?: any;
    type: POINTCONSTRAIN;
}
export declare class Point extends Figure {
    private _constrain;
    private _scale;
    private _shape;
    constructor(graph: Graph, name: string, pixels: IPoint);
    private _x;
    get x(): number;
    set x(value: number);
    private _y;
    get y(): number;
    set y(value: number);
    get coord(): IPoint;
    set coord(value: IPoint);
    set coordX(value: number);
    set coordY(value: number);
    get tex(): string;
    get coordAsTex(): string;
    addUnit(value: number, axis?: AXIS): Point;
    generateName(): string;
    asCross(): Point;
    asCircle(size?: number): Point;
    asSquare(size?: number, orientation?: Vector): Point;
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
    intersectionOf(a: Line, b: Line): Point;
    fromVector(A: Point, B: Point, scale: number): Point;
    /**
     * Constrain the point to be bound to an axis or projection
     * @param A: Point
     * @param to: Line | string
     */
    projection(A: Point, to: Line | string): Point;
    symmetry(A: Point, of: Line | Point | string): Point;
    draggable(options: {
        grid?: Grid;
        constrain?: (string | Figure)[];
        callback?: Function;
    }): Point;
    private _updateShape;
    private _updateCoordinate;
}
