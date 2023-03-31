import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
import { IPoint } from "../variables/interfaces";
import { mathLine, mathVector } from "../Calculus";
export interface LineConfig {
    k?: number;
    rule: string;
    value?: Figure | number | string;
    options?: Figure[];
}
export declare enum LINECONSTRUCTION {
    PARALLEL = "parallel",
    PERPENDICULAR = "perpendicular",
    TANGENT = "tangent",
    SLOPE = "slope",
    BISSECTOR = "bissector"
}
export declare class Line extends Figure {
    constructor(graph: Graph, name: string, A: Point, B: Point, construction?: LineConfig);
    private _A;
    get A(): Point;
    private _B;
    get B(): Point;
    private _construction;
    get construction(): LineConfig;
    private _math;
    get math(): mathLine;
    private _scale;
    get scale(): number;
    set scale(value: number);
    private _segment;
    get segment(): boolean;
    set segment(value: boolean);
    private _segmentEnd;
    get segmentEnd(): boolean;
    set segmentEnd(value: boolean);
    private _segmentStart;
    get segmentStart(): boolean;
    set segmentStart(value: boolean);
    get d(): mathVector;
    asSegment(value?: boolean, scale?: number): Line;
    asVector(value?: boolean, scale?: number): Line;
    generateName(): string;
    updateFigure(): Line;
    getPointOnLine(): IPoint;
    private _addMarker;
    private _updateLineThroughAandB;
    private _updateLineFromConstruction;
}
