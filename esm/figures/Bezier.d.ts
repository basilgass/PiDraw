import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
export declare class Bezier extends Figure {
    private _path;
    private _points;
    private _ratio;
    constructor(graph: Graph, name: string, values: (string | Point | {
        point: string | Point;
        control: string;
        ratio?: number;
    })[]);
    get points(): {
        point: Point;
        control: string;
    }[];
    get path(): string;
    get ratio(): number;
    set ratio(value: number);
    definePoints(values: (string | Point | {
        point: string | Point;
        control: string;
        ratio?: number;
    })[]): void;
    generateName(): string;
    isFlat(control: string): boolean;
    isVertical(control: string): boolean;
    getCtrlPoint(p0: Point, p1: Point | {
        x: number;
        y: number;
        px: number;
        py: number;
    }, p2: Point, control?: string, ratio?: number): {
        x: number;
        y: number;
        px: number;
        py: number;
    };
    getCurve(): string;
    plot(values?: (string | Point | {
        point: string | Point;
        control: string;
        ratio?: number;
    })[], speed?: number): Bezier;
    updateFigure(): Bezier;
}
