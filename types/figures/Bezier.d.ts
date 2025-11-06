import { AbstractFigure } from './AbstractFigure';
import { BEZIERCONTROL, XY } from '../pidraw.common';
import { Shape, Svg } from '@svgdotjs/svg.js';
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
    constructor(rootSVG: Svg, name: string, values: IBezierConfig);
    protected _config: IBezierConfig;
    get config(): IBezierConfig;
    set config(value: IBezierConfig);
    protected _points: IBezierPointInterface[];
    get points(): IBezierPointInterface[];
    set points(values: IBezierPointInterface[]);
    computed(): this;
    getPointByName(name: string): IBezierPointInterface | undefined;
    moveLabel(): this;
    setControlRatio(name: string, ratio: number): this;
    setControlType(name: string, type: BEZIERCONTROL): this;
    _makeShape(): Shape;
}
export {};
