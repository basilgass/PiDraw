import { Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { DOMAIN, XY } from '../pidraw.common';
import { NumExp } from '../Calculus';
export interface IParametricConfig {
    expressions: {
        x: string;
        y: string;
    };
    domain?: DOMAIN;
    samples?: number;
}
export declare class Parametric extends AbstractFigure {
    protected _numExp: {
        x: NumExp;
        y: NumExp;
    };
    constructor(rootSVG: Svg, name: string, values: IParametricConfig);
    protected _config: IParametricConfig;
    get config(): IParametricConfig;
    set config(value: IParametricConfig);
    _makeShape(): import('@svgdotjs/svg.js').Shape;
    computed(): this;
    moveLabel(): this;
    evaluate(t: number): XY;
}
