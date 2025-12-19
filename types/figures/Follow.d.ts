import { Circle as svgCircle, G, Line as svgLine, Shape, Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { XY } from '../pidraw.common';
import { Plot } from './Plot';
export interface IFollowConfig {
    follow: Plot;
    tangent?: boolean;
    size?: number;
}
export declare class Follow extends AbstractFigure {
    protected _reference: XY;
    protected _delta: XY;
    protected _point: svgCircle;
    protected _tangent: svgLine;
    constructor(rootSVG: Svg, name: string, values: IFollowConfig);
    protected _config: IFollowConfig;
    get config(): IFollowConfig;
    set config(value: IFollowConfig);
    _makeShape(): G;
    computed(): this;
    moveLabel(): this;
    strokeable(): Shape[];
    fillable(): Shape[];
}
