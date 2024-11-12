import { AbstractFigure } from './AbstractFigure';
import { XY } from '../pidraw.common';
import { Svg } from '@svgdotjs/svg.js';
import { mathLine } from '../Calculus';
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
    computed(): this;
    get config(): ILineConfig;
    set config(value: ILineConfig);
    get direction(): XY;
    get end(): XY;
    set end(value: XY);
    follow(x: number, y: number): XY;
    get math(): mathLine;
    move(x: number | XY): this;
    moveLabel(): this;
    get normal(): XY;
    get start(): XY;
    set start(value: XY);
}
