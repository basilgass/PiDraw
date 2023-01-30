import { Graph } from "../Graph";
import { Figure } from "./Figure";
import { ForeignObject } from "@svgdotjs/svg.js";
import { IPoint } from "../variables/interfaces";
export declare enum LABELPOS {
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center",
    TOP = "top",
    BOTTOM = "bottom",
    MIDDLE = "middle"
}
export interface LabelConfig {
    el: Figure;
    name?: string;
    offset?: {
        x: number;
        y: number;
    };
    position?: {
        horizontal: string;
        vertical: string;
    };
}
export declare class Label extends Figure {
    private _config;
    private _html;
    private _isHtml;
    constructor(graph: Graph, name: string, config?: LabelConfig);
    get isHtml(): Boolean;
    set isHtml(value: Boolean);
    get html(): ForeignObject;
    get displayName(): string;
    set displayName(value: string);
    addHtml(value: string): Label;
    offset(value: IPoint): Label;
    position(value: string): Label;
    center(): Label;
    middle(): Label;
    generateName(): string;
    updateFigure(): Label;
}
