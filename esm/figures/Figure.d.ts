import { Canvas } from "../Canvas";
import { Label } from "./Label";
import { Circle, G, Line, Path, Shape } from "@svgdotjs/svg.js";
export declare type svgShape = Shape | G | Line | Path | Circle;
export declare class Figure {
    #private;
    constructor(canvas: Canvas, name: string);
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
    get canvas(): Canvas;
    get svg(): Shape;
    set freeze(value: Boolean);
    set name(value: string);
    set svg(value: Shape);
}
