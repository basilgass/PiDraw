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
    constructor(rootSVG: Svg, name: string, values: IPolygonConfig);
    protected _config: IPolygonConfig;
    get config(): IPolygonConfig;
    set config(value: IPolygonConfig);
    get vertices(): XY[] | undefined;
    get radius(): number;
    _figuresXYtoArray(): [number, number][];
    _makeShape(): import('@svgdotjs/svg.js').Shape;
    computed(): this;
    update(): this;
    moveLabel(): this;
}
