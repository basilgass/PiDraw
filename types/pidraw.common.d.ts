import type { Svg } from "@svgdotjs/svg.js";
import type { IMeasure } from "./calculus/units";
export interface XY {
    x: number;
    y: number;
}
export interface Domain {
    axis?: 'x' | 'y';
    max: number;
    min: number;
}
export interface AxisVectors {
    x: XY;
    y: XY;
}
export type Exclusive<T> = {
    [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];
export declare function isXY(obj: unknown): obj is XY;
export declare function isDomain(obj: unknown): obj is Domain;
export interface IFigureContext {
    readonly rootSVG: Svg;
    readonly config: IGraphConfig;
    figureChanged?(name: string): void;
}
export interface IGraphConfig {
    axis: AxisVectors;
    height: number;
    origin: XY;
    measure?: IMeasure;
    system: CoordinateSystem;
    width: number;
}
export interface IFigureAppearanceConfig {
    fill: {
        color: string;
        opacity: number;
    };
    stroke: {
        color: string;
        width: number;
        opacity: number;
    };
}
export declare enum LayerName {
    BACKGROUND = "background",
    GRIDS = "grids",
    AXIS = "axis",
    MAIN = "main",
    PLOTS_BACKGROUND = "plots_BG",
    PLOTS = "plots",
    PLOTS_FOREGROUND = "plots_FG",
    FOREGROUND = "foreground",
    POINTS = "points",
    INTERACTIVE = "interactive",
    TEMPORARY = "temporary"
}
export declare enum Axes {
    X = "Ox",
    Y = "Oy"
}
export declare enum CoordinateSystem {
    CARTESIAN_2D = "cartesian_2d",
    POLAR = "polar"
}
//# sourceMappingURL=pidraw.common.d.ts.map