import { G, Marker, Svg } from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js';
import { DrawConfig, IPoint } from "./interfaces";
import { Figure } from "./figures/Figure";
import { Circle } from "./figures/Circle";
import { Point } from "./figures/Point";
import { ConstructionSettings, Line } from "./figures/Line";
import { Plot, plotConfig } from "./figures/Plot";
import { Axis } from "./figures/Axis";
export declare enum LAYER {
    BACKGROUND = "background",
    GRIDS = "grids",
    AXIS = "axis",
    MAIN = "main",
    PLOTS = "plots",
    FOREGROUND = "foreground",
    POINTS = "points"
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
export declare class Canvas {
    #private;
    constructor(containerID: string | HTMLElement, config?: DrawConfig);
    private _initSetWidthAndHeight;
    private _initGetContainerId;
    private _initCreateSVG;
    distanceToPixels(distance: number): number;
    unitsToPixels(point: IPoint): IPoint;
    pixelsToUnits(point: IPoint): IPoint;
    getFigure(name: string): Figure;
    getPoint(name: string): Point;
    axis(): {
        x: Axis;
        y: Axis;
    };
    point(x: number, y: number, name?: string): Point;
    line(A: Point | string, B: Point | string, construction?: ConstructionSettings, name?: string): Line;
    circle(center: Point | IPoint, radius: number, name?: string): Circle;
    plot(fn: Function | string, config?: plotConfig, name?: string): Plot;
    update(): Canvas;
    get container(): HTMLElement;
    get svg(): Svg;
    get width(): number;
    get height(): number;
    get origin(): IPoint;
    get figures(): Figure[];
    get freeze(): boolean;
    get unitXDomain(): {
        min: number;
        max: number;
    };
    get unitYDomain(): {
        min: number;
        max: number;
    };
    get points(): {
        [p: string]: Point;
    };
    get pixelsPerUnit(): IPoint;
    get markers(): {
        start: Marker;
        end: Marker;
    };
}
