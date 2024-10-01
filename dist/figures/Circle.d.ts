import { Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { XY } from '../pidraw.common';
export interface ICircleConfig {
    center: XY;
    radius: number | XY;
}
export declare class Circle extends AbstractFigure {
    #private;
    get config(): ICircleConfig;
    set config(value: ICircleConfig);
    get center(): XY;
    get radius(): number;
    constructor(rootSVG: Svg, name: string, values: ICircleConfig);
    computed(): this;
    moveLabel(): this;
    follow(x: number, y: number): XY;
}
