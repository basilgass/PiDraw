import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { plotConfig } from "../variables/interfaces";
export declare class Plot extends Figure {
    #private;
    constructor(canvas: Graph, name: string, fn: Function | string, config?: plotConfig);
    generateName(): string;
    updateFigure(): Plot;
    plot(fn: string | Function, speed?: number): Plot;
    riemann(from: number, to: number, n: number, below: boolean): void;
}
