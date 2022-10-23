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
    position?: {
        horizontal: string;
        vertical: string;
    };
    offset?: {
        x: number;
        y: number;
    };
}
export declare class Label extends Figure {
    private _config;
    constructor(graph: Graph, name: string, config?: LabelConfig);
    private _isHtml;
    get isHtml(): Boolean;
    set isHtml(value: Boolean);
    private _html;
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
