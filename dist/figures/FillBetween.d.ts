import { Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { DOMAIN } from '../pidraw.common';
import { Plot } from './Plot';

export interface IFillBetweenConfig {
    expressions: [Plot, Plot];
    domain?: DOMAIN;
    image?: DOMAIN;
}
export declare class FillBetween extends AbstractFigure {
    #private;
    get config(): IFillBetweenConfig;
    set config(value: IFillBetweenConfig);
    get domain(): DOMAIN;
    get image(): DOMAIN;
    constructor(rootSVG: Svg, name: string, values: IFillBetweenConfig);
    computed(): this;
    moveLabel(): this;
}
