import { Svg } from "@svgdotjs/svg.js";
import { AbstractFigure } from "./AbstractFigure";
import type { DOMAIN, XY } from "../pidraw.common";
export interface IParametricConfig {
    expressions: {
        x: string;
        y: string;
    };
    domain?: DOMAIN;
    samples?: number;
}
export declare class Parametric extends AbstractFigure {
    #private;
    get config(): IParametricConfig;
    set config(value: IParametricConfig);
    constructor(rootSVG: Svg, name: string, values: IParametricConfig);
    computed(): this;
    moveLabel(): this;
    evaluate(t: number): XY;
}
//# sourceMappingURL=Parametric.d.ts.map