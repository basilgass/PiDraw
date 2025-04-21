import { Svg } from "@svgdotjs/svg.js";
import { AbstractFigure } from "./AbstractFigure";
import type { DOMAIN, XY } from "../pidraw.common";
export interface IPlotConfig {
    expression: string;
    domain?: DOMAIN;
    image?: DOMAIN;
    samples?: number;
}
export declare class Plot extends AbstractFigure {
    #private;
    get config(): IPlotConfig;
    set config(value: IPlotConfig);
    constructor(rootSVG: Svg, name: string, values: IPlotConfig);
    computed(): this;
    moveLabel(): this;
    evaluate(x: number, asCoordinates?: boolean): XY;
    follow(x: number, y: number): XY;
}
//# sourceMappingURL=Plot.d.ts.map