import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
import { Line as mathLine } from "pimath/esm/maths/geometry/line";
import { Vector } from "pimath/esm/maths/geometry/vector";
export interface LineConfig {
    k?: number;
    rule: string;
    value?: Figure | number | string;
}
export declare enum LINECONSTRUCTION {
    PARALLEL = "parallel",
    PERPENDICULAR = "perpendicular",
    TANGENT = "tangent",
    SLOPE = "slope"
}
export declare class Line extends Figure {
    private _A;
    private _B;
    private _construction;
    private _math;
    private _segment;
    private _segmentEnd;
    private _segmentStart;
    constructor(graph: Graph, name: string, A: Point, B: Point, construction?: LineConfig);
    get tex(): string;
    get texMath(): {
        canonical: string;
        mxh: string;
        parametric: string;
    };
    get d(): Vector;
    get A(): Point;
    get B(): Point;
    get construction(): LineConfig;
    get math(): mathLine;
    get segment(): boolean;
    set segment(value: boolean);
    get segmentStart(): boolean;
    set segmentStart(value: boolean);
    get segmentEnd(): boolean;
    set segmentEnd(value: boolean);
    asSegment(value?: boolean): Line;
    asVector(value?: boolean): Line;
    generateName(): string;
    updateFigure(): Line;
    private _updateLineThroughAandB;
    private _updateLineFromConstruction;
}
