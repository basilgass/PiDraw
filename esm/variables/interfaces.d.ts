import { G } from "@svgdotjs/svg.js";
import { GRIDTYPE } from "./enums";
export interface IDrawConfig {
    origin?: {
        x: number;
        y: number;
    };
    grid?: {
        x: number;
        y: number;
        type?: GRIDTYPE;
    };
}
export interface IDrawConfigWidthHeight extends IDrawConfig {
    width: number;
    height: number;
}
export interface IDrawConfigUnitWidthHeight extends IDrawConfig {
    dx: number;
    dy: number;
    pixelsPerUnit: number;
}
export interface IDrawConfigUnitMinMax extends IDrawConfig {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    pixelsPerUnit: number;
}
export interface ILayers {
    background: G;
    grids: G;
    axis: G;
    main: G;
    plots: G;
    foreground: G;
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
