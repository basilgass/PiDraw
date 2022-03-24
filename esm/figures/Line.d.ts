import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
import { Line as mathLine } from "pimath/esm/maths/geometry";
export interface LineConfig {
    rule: string;
    value?: Figure | number | string;
    k?: number;
}
export declare enum LINECONSTRUCTION {
    PARALLEL = "parallel",
    PERPENDICULAR = "perpendicular",
    TANGENT = "tangent",
    SLOPE = "slope"
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
    private _segment;
    get segment(): boolean;
    set segment(value: boolean);
    asSegment(value?: boolean): Line;
    asVector(value?: boolean): Line;
    generateName(): string;
    updateFigure(): Line;
    private _updateLineThroughAandB;
    private _updateLineFromConstruction;
}
