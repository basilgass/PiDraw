import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { IPoint } from "../variables/interfaces";
import { Riemann } from "./PlotPlugins/Riemann";
import { Follow } from "./PlotPlugins/Follow";
import { FillBetween } from "./PlotPlugins/FillBetween";
import { NumExp } from "../Calculus";
export interface PlotConfig {
    domain: {
        min: number;
        max: number;
    };
    samples: number;
    animate: boolean;
}
export declare class Plot extends Figure {
    private _config;
    private _precision;
    private _fx;
    private _rawFx;
    private _plugins;
    constructor(graph: Graph, name: string, fn: Function | string, config?: PlotConfig);
    get fx(): Function | NumExp;
    get plugins(): any[];
    generateName(): string;
    updatePlugins(): Plot;
    plot(fn: string | Function, speed?: number): Plot;
    riemann(from: number, to: number, rectangles: number, pos?: number): Riemann;
    follow(showTangent?: boolean): Follow;
    fillBetween(plot: Plot, from: number, to: number, samples?: number, name?: string): FillBetween;
    getPartialPath(from: number, to: number, samples?: number, reversed?: boolean, firstToken?: string): string;
    evaluate(x: number): IPoint;
    private _parse;
    private _getFlatPath;
    private _getPath;
    remove(): void;
}
