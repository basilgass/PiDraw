import { AbstractFigure } from "./AbstractFigure";
import type { XY } from "../pidraw.common";
import { Svg } from "@svgdotjs/svg.js";
import { mathLine } from "../Calculus";
export type ILineType = 'segment' | 'ray' | 'line' | 'vector';
export interface ILineConfig {
    bisector?: {
        d1: Line;
        d2: Line;
    } | {
        A: XY;
        B: XY;
        C: XY;
    };
    director?: {
        A: XY;
        d: XY;
    };
    mediator?: {
        A: XY;
        B: XY;
    };
    parallel?: {
        to: Line;
        through: XY;
    };
    perpendicular?: {
        to: Line;
        through: XY;
    };
    shape?: ILineType;
    through?: {
        A: XY;
        B: XY;
    };
}
export declare class Line extends AbstractFigure {
    #private;
    constructor(rootSVG: Svg, name: string, values: ILineConfig);
    get angle(): number;
    get config(): ILineConfig;
    set config(value: ILineConfig);
    get direction(): XY;
    get end(): XY;
    set end(value: XY);
    get math(): mathLine;
    get normal(): XY;
    get start(): XY;
    set start(value: XY);
    computed(): this;
    follow(x: number, y: number): XY;
    move(x: number | XY): this;
    moveLabel(): this;
}
//# sourceMappingURL=Line.d.ts.map