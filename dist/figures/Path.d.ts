import { Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
export declare class Path extends AbstractFigure {
    #private;
    constructor(rootSVG: Svg, name: string, path?: string);
    computed(): this;
    get d(): string;
    set d(path: string);
    moveLabel(): this;
}
