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
    /**
     * Get coordinate by radius / angle
     * Reference: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
     * @param centerX
     * @param centerY
     * @param radius
     * @param angleInDegrees
     */
    polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): IPoint;
    /**
     * get the angle from Ox to OP, where O is origin and P is the handle
     * @param {Point} origin
     * @param {Point} handle
     * @returns {number}
     */
    cartesianToAngle(origin: Point, handle: Point): number;
    /**
     * Calculate the start and end angle of an arc
     * @returns {{startAngle: number, endAngle: number}}
     */
    getAngles(): {
        start: number;
        end: number;
    };
    getPath(): string;
    private _describeSquare;
    private _describeArc;
    angleDirection(enable: Boolean): Arc;
}
