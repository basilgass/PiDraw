import { Svg } from '@svgdotjs/svg.js';
import { XY } from '../pidraw.common';
import { AbstractFigure } from './AbstractFigure';
import { Line } from './Line';
export type ILine = Line | 'Ox' | 'Oy';
export interface IPointConfig {
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
    intersection?: {
        A: ILine;
        B: ILine;
    };
    middle?: {
        A: XY;
        B: XY;
    };
    pixels?: XY;
    projection?: {
        axis: ILine;
        point: XY;
    };
    shape?: 'circle' | 'square' | 'crosshair';
    size?: number;
    symmetry?: {
        A: XY;
        B: XY | ILine;
    };
}
export declare class Point extends AbstractFigure {
    #private;
    constructor(rootSVG: Svg, name: string, values: IPointConfig);
    asCircle(size?: number): this;
    asCrosshair(size?: number): this;
    asSquare(size?: number): this;
    computeLabel(): string;
    computed(): this;
    get config(): IPointConfig;
    set config(value: IPointConfig);
    get coordinates(): XY;
    moveLabel(): this;
    get pixels(): XY;
    set pixels(value: XY);
    get size(): number;
    set size(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
}
