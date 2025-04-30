import { AbstractFigure } from './AbstractFigure';
import { BEZIERCONTROL, XY } from '../pidraw.common';
import { Svg } from '@svgdotjs/svg.js';
interface IBezierControlPointInterface extends XY {
    point?: XY;
}
interface pointWithName extends XY {
    name: string;
}
export interface IBezierPointInterface {
    controls: {
        type: BEZIERCONTROL;
        ratio: number;
        left: IBezierControlPointInterface | null;
        right: IBezierControlPointInterface | null;
    };
    point: pointWithName;
}
export interface IBezierConfig {
    points: IBezierPointInterface[];
}
export declare class Bezier extends AbstractFigure {
    #private;
    constructor(rootSVG: Svg, name: string, values: IBezierConfig);
    computed(): this;
    get config(): IBezierConfig;
    set config(value: IBezierConfig);
    getPointByName(name: string): IBezierPointInterface | undefined;
    moveLabel(): this;
    get points(): IBezierPointInterface[];
    set points(values: IBezierPointInterface[]);
    setControlRatio(name: string, ratio: number): this;
    setControlType(name: string, type: BEZIERCONTROL): this;
}
export {};
