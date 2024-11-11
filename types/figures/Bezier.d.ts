import { AbstractFigure } from "./AbstractFigure";
import type { XY } from "../pidraw.common";
import { Svg } from "@svgdotjs/svg.js";
export interface IBezierPointInterface {
    controls: {
        left: XY;
        right: XY;
    };
    coordinates: XY;
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
    fromPoints(points: XY[]): void;
    moveLabel(): this;
    get points(): IBezierPointInterface[];
    set points(value: IBezierPointInterface[]);
}
//# sourceMappingURL=Bezier.d.ts.map