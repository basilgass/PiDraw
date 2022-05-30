import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { IPoint } from "../variables/interfaces";
import { PlotConfig } from "./Plot";
export declare class Parametric extends Figure {
    private _config;
    private _fx;
    private _fy;
    private _plugins;
    private _precision;
    private _riemann;
    constructor(graph: Graph, name: string, fn: {
        x: Function | string;
        y: Function | string;
    }, config?: PlotConfig);
    generateName(): string;
    updateFigure(): Parametric;
    updatePlugins(): Parametric;
    plot(fn: {
        x: string | Function;
        y: string | Function;
    }, speed?: number): Parametric;
    evaluate(t: number): IPoint;
    remove(): void;
    private _parse;
    private _getPath;
}
