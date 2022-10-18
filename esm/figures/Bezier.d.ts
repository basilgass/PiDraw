import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
import { Line } from "./Line";
export declare type BezierPoint = {
    point: Point;
    control: string;
    ratio: number;
    c1?: {
        x: number;
        y: number;
        point?: Point;
        segment?: Line;
    };
    c2?: {
        x: number;
        y: number;
        point?: Point;
        segment?: Line;
    };
};
export declare class Bezier extends Figure {
    private _path;
    private _points;
    private _ratio;
    private _showControlPoints;
    constructor(graph: Graph, name: string, values: (string | Point | {
        point: string | Point;
        control: string;
        ratio?: number;
    })[]);
    get points(): BezierPoint[];
    get path(): string;
    get ratio(): number;
    set ratio(value: number);
    get showControlPoints(): boolean;
    set showControlPoints(value: boolean);
    _resetControlPoints(): void;
    _resetAllPoints(): void;
    definePoints(values: (string | Point | {
        point: string | Point;
        control: string;
        ratio?: number;
    })[]): void;
    _updateControlPoints(): string;
    generateName(): string;
    isSmooth(control: string): boolean;
    isFlat(control: string): boolean;
    isVertical(control: string): boolean;
    getCurve(): string;
    plot(values?: (string | Point | {
        point: string | Point;
        control: string;
        ratio?: number;
    })[], speed?: number): Bezier;
    updateFigure(): Bezier;
}
