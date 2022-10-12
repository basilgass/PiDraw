import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
export declare class Bezier extends Figure {
    private _path;
    private _points;
    constructor(graph: Graph, name: string, values: (Point | string)[]);
    get points(): {
        point: Point;
        control: string;
    }[];
    get path(): string;
    definePoints(values: (string | Point)[]): void;
    generateName(): string;
    isFlat(control: string): boolean;
    getCtrlPoint(p0: Point, p1: Point | {
        x: number;
        y: number;
        px: number;
        py: number;
    }, p2: Point, ratio?: number): {
        x: number;
        y: number;
        px: number;
        py: number;
    };
    getCurve(): string;
    plot(values?: (Point | string)[], speed?: number): Bezier;
    updateFigure(): Bezier;
}
