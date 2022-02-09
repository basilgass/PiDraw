import { Graph } from "../Graph";
import { Figure } from "./Figure";
export declare enum LABELPOS {
    LEFT = "left",
    RIGHT = "right",
    CENTER = "cener",
    TOP = "top",
    BOTTOM = "bottom",
    MIDDLE = "middle"
}
export interface LabelConfig {
    el: Figure;
    position?: {
        horizontal: string;
        vertical: string;
    };
    offset?: {
        dx: number;
        dy: number;
    };
}
export declare class Label extends Figure {
    private _config;
    constructor(graph: Graph, name: string, config?: LabelConfig);
    generateName(): string;
    updateFigure(): Label;
}
