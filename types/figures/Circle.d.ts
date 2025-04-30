import { Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { XY } from '../pidraw.common';
import { Line } from './Line';
export interface ICircleConfig {
    center: XY;
    radius: number | XY;
}
export declare class Circle extends AbstractFigure {
    #private;
    constructor(rootSVG: Svg, name: string, values: ICircleConfig);
    get config(): ICircleConfig;
    set config(value: ICircleConfig);
    get center(): XY;
    get radius(): number;
    computed(): this;
    moveLabel(): this;
    follow(x: number, y: number): XY;
    intersectionWithLine(line: Line, segment?: boolean): XY[] | null;
}
