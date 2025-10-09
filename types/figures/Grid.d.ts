import { Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { XY } from '../pidraw.common';
interface IGridConfig {
    axis: {
        x: XY;
        y: XY;
    };
    scale?: {
        x: number;
        y: number;
    };
    origin: XY;
    width: number;
    height: number;
    subdivisions: number;
}
export declare class Grid extends AbstractFigure {
    #private;
    constructor(rootSVG: Svg, name: string, values: IGridConfig);
    get config(): IGridConfig;
    set config(value: IGridConfig);
    computed(): this;
    moveLabel(): this;
}
export {};
