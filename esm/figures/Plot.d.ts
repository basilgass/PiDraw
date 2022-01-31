import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { IPoint } from "../variables/interfaces";
import { Riemann } from "./PlotPlugins/Riemann";
import { Follow } from "./PlotPlugins/Follow";
import { FillBetween } from "./PlotPlugins/FillBetween";
export interface PlotConfig {
    domain: {
        min: number;
        max: number;
    };
    samples: number;
}
export declare class Plot extends Figure {
    #private;
    constructor(graph: Graph, name: string, fn: Function | string, config?: PlotConfig);
    generateName(): string;
    updateFigure(): Plot;
    updatePlugins(): Plot;
    plot(fn: string | Function, speed?: number): Plot;
    riemann(from: number, to: number, rectangles: number, below?: boolean): Riemann;
    follow(showTangent?: boolean): Follow;
    fillBetween(plot: Plot, from: number, to: number, samples?: number): FillBetween;
    getPartialPath(from: number, to: number, samples?: number, reversed?: boolean, firstToken?: string): string;
    evaluate(x: number): IPoint;
}
