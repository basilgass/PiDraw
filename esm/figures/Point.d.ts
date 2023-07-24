import { Graph } from "../Graph";
import { Figure } from "./Figure";
import { IPoint } from "../variables/interfaces";
import { AXIS, POINTCONSTRAIN } from "../variables/enums";
import { Circle } from "./Circle";
import { Line } from "./Line";
import { StepValueType } from "../parser/parseStep";
export interface PointConfig {
    data?: any;
    type: POINTCONSTRAIN;
}
export declare class Point extends Figure {
    private _constrain;
    private _scale;
    private _shape;
    constructor(graph: Graph, name: string, pixels: IPoint);
    private _defaultScale;
    get defaultScale(): number;
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
    get coordAsTex(): string;
    addUnit(value: number, axis?: AXIS): Point;
    generateName(): string;
    generateDisplayName(): Point;
    asCross(): Point;
    asCircle(size?: number): Point;
    asSquare(size?: number): Point;
    setSize(value: number): Point;
    getDistanceTo(value: Figure, byDefault?: number): number;
    updateFigure(): Point;
    updateLabel(): Point;
    /**
     * Constrain the point to be the middle of two other points.
     * @param {Point} A
     * @param {Point} B
     * @returns {Point}
     */
    middleOf(A: Point, B: Point): Point;
    intersectionOf(a: Line, b: Line | Circle, k?: number): Point;
    fromVector(A: Point, B: Point, scale: number, X?: Point): Point;
    fromDirection(A: Point, d: Line, size: number | StepValueType, perpendicular: boolean): Point;
    fromCoord(ptX: StepValueType, ptY: StepValueType): Point;
    /**
     * Constrain the point to be bound to an axis or projection
     * @param A: Point
     * @param to: Line | string
     */
    projection(A: Point, to: Line | string): Point;
    symmetry(A: Point, of: Line | Point | string): Point;
    draggable(options: {
        constrain?: string | Figure;
        bounds?: {
            x?: [number, number];
            y?: [number, number];
        };
        callback?: Function;
    }): Point;
    private _updateShape;
    private _updateCoordinate;
}
