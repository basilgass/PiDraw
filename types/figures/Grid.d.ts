import { Svg } from "@svgdotjs/svg.js";
import { AbstractFigure } from "./AbstractFigure";
import type { XY } from "../pidraw.common";
interface IGridConfig {
    axis: {
        x: XY;
        y: XY;
    };
    scale?: {
        x: number;
        y: number;
    };
    origin: XY;
    width: number;
    height: number;
    subdivisions: number;
}
export declare class Grid extends AbstractFigure {
    #private;
    get config(): IGridConfig;
    set config(value: IGridConfig);
    constructor(rootSVG: Svg, name: string, values: IGridConfig);
    computed(): this;
    moveLabel(): this;
}
export {};
//# sourceMappingURL=Grid.d.ts.map