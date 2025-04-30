import { Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { XY } from '../pidraw.common';
export interface IPolygonConfig {
    vertices?: XY[];
    regular?: {
        center: XY;
        radius: number | XY;
        sides: number;
    };
    mark?: {
        center?: {
            length?: number;
        };
    };
}
export declare class Polygon extends AbstractFigure {
    #private;
    get config(): IPolygonConfig;
    set config(value: IPolygonConfig);
    get vertices(): XY[] | undefined;
    get radius(): number;
    constructor(rootSVG: Svg, name: string, values: IPolygonConfig);
    computed(): this;
    update(): this;
    moveLabel(): this;
}
