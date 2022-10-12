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
    name?: string;
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
    get displayName(): string;
    set displayName(value: string);
    constructor(graph: Graph, name: string, config?: LabelConfig);
    center(): Label;
    middle(): Label;
    generateName(): string;
    updateFigure(): Label;
}
