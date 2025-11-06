import { Shape, Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
export declare class Path extends AbstractFigure {
    constructor(rootSVG: Svg, name: string, path?: string);
    protected _d: string;
    get d(): string;
    set d(path: string);
    computed(): this;
    moveLabel(): this;
    _makeShape(): Shape;
}
