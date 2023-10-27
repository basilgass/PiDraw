import { G } from "@svgdotjs/svg.js";
import { GRIDTYPE } from "./enums";
export interface IDrawConfig {
    grid?: {
        x: number;
        y: number;
        type?: GRIDTYPE;
    };
    origin?: {
        x: number;
        y: number;
    };
}
export interface IDrawConfigWidthHeight extends IDrawConfig {
    height: number;
    width: number;
}
export interface IDrawConfigUnitWidthHeight extends IDrawConfig {
    dx: number;
    dy: number;
    pixelsPerUnit?: number;
}
export interface IDrawConfigUnitMinMax extends IDrawConfig {
    pixelsPerUnit?: number;
    xMax: number;
    xMin: number;
    yMax: number;
    yMin: number;
}
export interface ILayers {
    axis: G;
    background: G;
    foreground: G;
    grids: G;
    main: G;
    plots: G;
    plotsBG: G;
    plotsFG: G;
    points: G;
}
export declare function isDrawConfigWidthHeight(config: any): config is IDrawConfigWidthHeight;
export declare function isDrawConfigUnitWidthHeight(config: any): config is IDrawConfigUnitWidthHeight;
export declare function isDrawConfigUnitMinMax(config: any): config is IDrawConfigUnitMinMax;
export declare function isXY(config: any): config is IPoint;
export interface IPoint {
    x: number;
    y: number;
}
