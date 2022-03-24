import { Figure } from "../Figure";
import { Rect } from "@svgdotjs/svg.js";
import { Plot } from "../Plot";
export declare class Riemann extends Figure {
    private _plot;
    private _from;
    private _to;
    private _number;
    private _pos;
    private _rectangles;
    constructor(plot: Plot, from: number, to: number, rectangles: number, pos?: number);
    get plot(): Plot;
    get from(): number;
    set from(value: number);
    get to(): number;
    set to(value: number);
    get number(): number;
    set number(value: number);
    get pos(): number;
    set below(value: number);
    get rectangles(): Rect[];
    clean(): void;
    updateFigure(): Riemann;
}
