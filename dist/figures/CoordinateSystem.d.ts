import { Svg, Line as svgLine } from '@svgdotjs/svg.js';
import { COORDINATE_SYSTEM, IAxisConfig, XY } from '../pidraw.common';
import { AbstractFigure } from './AbstractFigure';

export interface ICoordinateSystem {
    x: {
        direction: XY;
    } & IAxisConfig;
    y: {
        direction: XY;
    } & IAxisConfig;
}
export declare class CoordinateSystem extends AbstractFigure {
    #private;
    get config(): ICoordinateSystem;
    set config(value: ICoordinateSystem);
    get xAxis(): svgLine;
    get yAxis(): svgLine;
    constructor(rootSVG: Svg, name: string, values: COORDINATE_SYSTEM | ICoordinateSystem);
    computed(): this;
    moveLabel(): this;
}
