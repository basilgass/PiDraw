import { Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { Plot } from './Plot';
import { DOMAIN } from '../pidraw.common';
export interface IRiemannConfig {
    follow: Plot;
    domain: DOMAIN;
    rectangles: number;
    position: number;
}
export declare class Riemann extends AbstractFigure {
    #private;
    get config(): IRiemannConfig;
    set config(value: IRiemannConfig);
    get rectangles(): number;
    set rectangles(value: number);
    get position(): number;
    set position(value: number);
    constructor(rootSVG: Svg, name: string, values: IRiemannConfig);
    computed(): this;
    moveLabel(): this;
}
