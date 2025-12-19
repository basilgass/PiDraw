import { Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { DOMAIN, XY } from '../pidraw.common';
import { NumExp } from '../Calculus';
export interface IPlotConfig {
    expression: string | null;
    quadratic?: XY[];
    domain?: DOMAIN;
    image?: DOMAIN;
    samples?: number;
}
export declare class Plot extends AbstractFigure {
    protected _numExp: NumExp;
    protected _fx: string;
    constructor(rootSVG: Svg, name: string, values: IPlotConfig);
    protected _config: IPlotConfig;
    get config(): IPlotConfig;
    set config(value: IPlotConfig);
    computed(): this;
    moveLabel(): this;
    evaluate(x: number, asCoordinates?: boolean): XY;
    follow(x: number, y: number): XY;
    _getExpression(): string;
    _makeShape(): import('@svgdotjs/svg.js').Shape;
    _calculatePointsCoordinates(domain: DOMAIN, samples: number, expr: NumExp, image: DOMAIN): XY[];
}
