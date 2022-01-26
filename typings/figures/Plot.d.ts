import { Figure } from "./Figure";
import { Canvas } from "../Canvas";
export interface plotConfig {
    domain: {
        min: number;
        max: number;
    };
    samples: number;
}
export declare class Plot extends Figure {
    #private;
    constructor(canvas: Canvas, name: string, fn: Function | string, config?: plotConfig);
    generateName(): string;
    updateFigure(): Plot;
    plot(fn: string | Function, speed?: number): Plot;
    riemann(from: number, to: number, n: number, below: boolean): void;
}
