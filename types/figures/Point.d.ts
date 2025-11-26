import { Shape, Svg } from '@svgdotjs/svg.js';
import { XY } from '../pidraw.common';
import { AbstractFigure } from './AbstractFigure';
import { Line } from './Line';
import { Circle } from './Circle';
import { Plot } from './Plot';
export type ILine = Line | 'Ox' | 'Oy';
export type PointCoordinateType = number | {
    point: Point;
    axis: 'x' | 'y';
};
export interface PointConfigCoordinates {
    x: PointCoordinateType;
    y: PointCoordinateType;
}
export interface IPointConfig {
    coordinates?: PointConfigCoordinates;
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
    intersectionWithCircle?: {
        A: Circle;
        B: Line;
        index: number;
    };
    intersectionBetweenCircles?: {
        A: Circle;
        B: Circle;
        index: number;
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
    evaluation?: {
        fx: Plot;
        x: PointCoordinateType;
    };
    shape?: 'circle' | 'square' | 'crosshair';
    size?: number;
    symmetry?: {
        A: XY;
        B: XY | ILine;
    };
}
export declare class Point extends AbstractFigure {
    constructor(rootSVG: Svg, name: string, values: IPointConfig);
    protected _config: IPointConfig;
    get config(): IPointConfig;
    set config(value: IPointConfig);
    protected _pixels: XY;
    get pixels(): XY;
    set pixels(value: XY);
    get coordinates(): XY;
    get size(): number;
    set size(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    asCircle(size?: number): this;
    asCrosshair(size?: number): this;
    asSquare(size?: number): this;
    computeLabel(): string;
    computed(): this;
    moveLabel(): this;
    _makeShape(): Shape;
}
