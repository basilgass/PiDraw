import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
import { IPoint } from "../variables/interfaces";
export declare class Arc extends Figure {
    private _center;
    private _start;
    private _end;
    private _radius;
    private _radiusReference;
    constructor(graph: Graph, name: string, center: Point, start: Point, stop: Point, radius?: number | Point);
    private _angle;
    get angle(): number;
    private _mark;
    get mark(): boolean;
    set mark(value: boolean);
    private _square;
    get square(): boolean;
    set square(value: boolean);
    private _sector;
    get sector(): boolean;
    set sector(value: boolean);
    get getRadius(): number;
    get isSquare(): boolean;
    generateName(): string;
    updateFigure(): Arc;
    polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): IPoint;
    cartesianToAngle(origin: Point, handle: Point): number;
    getAngles(): {
        start: number;
        end: number;
    };
    getPath(): string;
    private _describeSquare;
    private _describeArc;
}
