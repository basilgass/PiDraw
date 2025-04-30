import { Svg, Shape } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { Plot } from './Plot';
export interface IFollowConfig {
    follow: Plot;
    tangent?: boolean;
    size?: number;
}
export declare class Follow extends AbstractFigure {
    #private;
    get config(): IFollowConfig;
    set config(value: IFollowConfig);
    constructor(rootSVG: Svg, name: string, values: IFollowConfig);
    computed(): this;
    moveLabel(): this;
    strokeable(): Shape[];
    fillable(): Shape[];
}
