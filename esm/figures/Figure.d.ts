import { Graph } from "../Graph";
import { Label } from "./Label";
import { Shape } from "@svgdotjs/svg.js";
export declare class Figure {
    constructor(graph: Graph, name: string);
    private _graph;
    get graph(): Graph;
    private _freeze;
    get freeze(): Boolean;
    set freeze(value: Boolean);
    private _name;
    get name(): string;
    set name(value: string);
    private _svg;
    get svg(): Shape;
    set svg(value: Shape);
    private _label;
    get label(): Label;
    set label(value: Label);
    draw(): void;
    update(): void;
    updateFigure(): Figure;
    updateLabel(): Figure;
    remove(): void;
    generateName(): string;
    dash(value: number | string): Figure;
    width(value: number): Figure;
    thin(): Figure;
    ultrathin(): Figure;
    thick(): Figure;
    ultrathick(): Figure;
    color(value: string): Figure;
    stroke(value: {
        width?: number;
        color?: string;
        opacity?: number;
    }): Figure;
}
