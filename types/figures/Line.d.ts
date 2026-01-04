import { AbstractFigure } from './AbstractFigure';
import { XY } from '../pidraw.common';
import { Shape, Svg } from '@svgdotjs/svg.js';
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
    equation?: string;
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
    constructor(rootSVG: Svg, name: string, values: ILineConfig);
    protected _config: ILineConfig;
    get config(): ILineConfig;
    set config(value: ILineConfig);
    protected _end: XY;
    get end(): XY;
    set end(value: XY);
    protected _start: XY;
    get start(): XY;
    set start(value: XY);
    get angle(): number;
    get direction(): XY;
    get math(): mathLine;
    get normal(): XY;
    computed(): this;
    follow(x: number, y: number): XY;
    move(x: number | XY): this;
    moveLabel(): this;
    _makeShape(): Shape;
}
