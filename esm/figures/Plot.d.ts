import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { IPoint } from "../variables/interfaces";
import { Riemann } from "./PlotPlugins/Riemann";
import { Follow } from "./PlotPlugins/Follow";
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
    evaluate(x: number): IPoint;
}
