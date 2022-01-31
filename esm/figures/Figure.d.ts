import { Graph } from "../Graph";
import { Label } from "./Label";
import { Shape } from "@svgdotjs/svg.js";
export declare class Figure {
    #private;
    constructor(graph: Graph, name: string);
    draw(): void;
    update(): void;
    updateFigure(): Figure;
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
    get freeze(): Boolean;
    get name(): string;
    get label(): Label;
    get graph(): Graph;
    get svg(): Shape;
    set freeze(value: Boolean);
    set name(value: string);
    set svg(value: Shape);
}
