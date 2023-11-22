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
    template?: string;
}
export declare class Label extends Figure {
    private _config;
    private _currentDisplayName;
    constructor(graph: Graph, name: string, config?: LabelConfig);
    private _isConverting;
    get isConverting(): boolean;
    set isConverting(value: boolean);
    private _html;
    get html(): ForeignObject;
    private _isHtml;
    get isHtml(): Boolean;
    set isHtml(value: Boolean);
    private _isTex;
    get isTex(): Boolean;
    set isTex(value: Boolean);
    get displayName(): string;
    set displayName(value: string);
    updateFigure(): Label;
    generateName(): string;
    hide(): Figure;
    show(): Figure;
    isShown(): Boolean;
    get template(): string;
    set template(value: string);
    updatePositionAndWidth(): Label;
    addHtml(value: string): Label;
    offset(value: IPoint): Label;
    position(value: string): Label;
    center(): Label;
    middle(): Label;
}
