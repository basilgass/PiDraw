import { Svg } from '@svgdotjs/svg.js';
import { XY } from '../pidraw.common';
import { AbstractFigure } from './AbstractFigure';
import { Line } from './Line';
export type ILine = Line | 'Ox' | 'Oy';
export interface IPointConfig {
    shape?: 'circle' | 'square' | 'crosshair';
    size?: number;
    pixels?: XY;
    coordinates?: XY;
    direction?: {
        point: XY;
        direction: ILine | {
            A: XY;
            B: XY;
        };
        distance: number;
        perpendicular?: boolean;
    };
    middle?: {
        A: XY;
        B: XY;
    };
    intersection?: {
        A: ILine;
        B: ILine;
    };
    projection?: {
        axis: ILine;
        point: XY;
    };
    symmetry?: {
        A: XY;
        B: XY | ILine;
    };
}
export declare class Point extends AbstractFigure {
    #private;
    get config(): IPointConfig;
    set config(value: IPointConfig);
    get size(): number;
    set size(value: number);
    constructor(rootSVG: Svg, name: string, values: IPointConfig);
    get pixels(): XY;
    set pixels(value: XY);
    get coordinates(): XY;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    asCircle(size?: number): this;
    asSquare(size?: number): this;
    asCrosshair(size?: number): this;
    computed(): this;
    moveLabel(): this;
    computeLabel(): string;
}
