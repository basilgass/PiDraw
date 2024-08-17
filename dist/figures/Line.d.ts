import { AbstractFigure } from './AbstractFigure';
import { XY } from '../pidraw.common';
import { Svg } from '@svgdotjs/svg.js';
import { mathLine } from '../Calculus';

export type ILineType = 'segment' | 'ray' | 'line' | 'vector';
export interface ILineConfig {
    through?: {
        A: XY;
        B: XY;
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
    bisector?: {
        d1: Line;
        d2: Line;
    } | {
        A: XY;
        B: XY;
        C: XY;
    };
    shape?: ILineType;
}
export declare class Line extends AbstractFigure {
    #private;
    get config(): ILineConfig;
    set config(value: ILineConfig);
    get start(): XY;
    set start(value: XY);
    get end(): XY;
    set end(value: XY);
    get angle(): number;
    constructor(rootSVG: Svg, name: string, values: ILineConfig);
    get direction(): XY;
    get normal(): XY;
    get math(): mathLine;
    computed(): this;
    moveLabel(): this;
    move(pos: number): this;
    move(pos: XY): this;
    follow(x: number, y: number): XY;
}
