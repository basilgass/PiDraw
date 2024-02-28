import { Graph } from "../Graph";
import { Figure } from "./Figure";
import { IPoint } from "../variables/interfaces";
import { AXIS, POINTCONSTRAIN, POINTSHAPE } from "../variables/enums";
import { Circle } from "./Circle";
import { Line } from "./Line";
import { StepValueType } from "../parser/parseStep";
export interface PointConfig {
    data?: any;
    type: POINTCONSTRAIN;
}
export declare class Point extends Figure {
    get shape(): POINTSHAPE;
    private _constrain;
    private _scale;
    private _shape;
    private _trace;
    private _isTracing;
    private _hiddenPoint;
    private _defaultScale;
    private _x;
    private _y;
    constructor(graph: Graph, name: string, pixels: IPoint);
    get isTracing(): {
        enabled: boolean;
        color: string;
        width: number;
    };
    set isTracing(value: {
        enabled: boolean;
        color: string;
        width: number;
    });
    get hiddenPoint(): boolean;
    set hiddenPoint(value: boolean);
    get defaultScale(): number;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get coord(): IPoint;
    set coord(value: IPoint);
    set coordX(value: number);
    set coordY(value: number);
    get coordAsTex(): string;
    addUnit(value: number, axis?: AXIS): Point;
    asCross(): Point;
    asCircle(size?: number): Point;
    asSquare(size?: number): Point;
    asTick(size?: number): Point;
    setSize(value: number): Point;
    getDistanceTo(value: Figure, byDefault?: number): number;
    updateFigure(): Point;
    updateLabel(): Point;
    generateName(): string;
    generateDisplayName(): Point;
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
            d?: [number, number];
        };
        callback?: Function;
    }): Point;
    makeInvisible(value?: boolean): Point;
    isInvisible(): Boolean;
    trace(color?: string, width?: number): void;
    private _updateShape;
    private _updateCoordinate;
    private _updateOneCoordinate;
}
