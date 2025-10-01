import { Svg } from '@svgdotjs/svg.js';
import { AbstractFigure } from './AbstractFigure';
import { XY } from '../pidraw.common';
export interface IArcConfig {
    start: XY;
    center: XY;
    end: XY;
    radius?: number | XY;
    morphToSquare?: boolean;
    sector?: boolean;
    mark?: boolean;
}
export declare class Arc extends AbstractFigure {
    #private;
    constructor(rootSVG: Svg, name: string, values: IArcConfig);
    get config(): IArcConfig;
    set config(value: IArcConfig);
    get center(): XY;
    get start(): XY;
    get end(): XY;
    get radius(): number;
    get angle(): number;
    get isSquare(): boolean;
    computed(): this;
    moveLabel(): this;
    /**
     * Calculate the start and end angle of an arc
     * @returns {{startAngle: number, endAngle: number}}
     */
    getAngles(): {
        start: number;
        end: number;
    };
    getPath(): string;
    private _describeSquare;
    private _describeArc;
}
