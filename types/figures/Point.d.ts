import { Svg } from "@svgdotjs/svg.js";
import type { XY } from "../pidraw.common";
import { AbstractFigure } from "./AbstractFigure";
import { Line } from "./Line";
import type { Circle } from "./Circle";
export type ILine = Line | 'Ox' | 'Oy';
export interface IPointConfig {
    coordinates?: XY;
    direction?: {
        point: XY;
        direction: ILine | {
            A: XY;
            B: XY;
        };
        distance: number;
        perpendicular?: boolean;
    };
    intersection?: {
        A: ILine;
        B: ILine;
    };
    circle_intersection?: {
        A: Circle;
        B: Line;
        index: number;
    };
    middle?: {
        A: XY;
        B: XY;
    };
    pixels?: XY;
    projection?: {
        axis: ILine;
        point: XY;
    };
    shape?: 'circle' | 'square' | 'crosshair';
    size?: number;
    symmetry?: {
        A: XY;
        B: XY | ILine;
    };
}
export declare class Point extends AbstractFigure {
    #private;
    constructor(rootSVG: Svg, name: string, values: IPointConfig);
    get config(): IPointConfig;
    set config(value: IPointConfig);
    get coordinates(): XY;
    get pixels(): XY;
    set pixels(value: XY);
    get size(): number;
    set size(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    asCircle(size?: number): this;
    asCrosshair(size?: number): this;
    asSquare(size?: number): this;
    computeLabel(): string;
    computed(): this;
    moveLabel(): this;
}
//# sourceMappingURL=Point.d.ts.map