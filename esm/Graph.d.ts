import { Marker, Svg } from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js';
import { ILayers, IPoint } from "./variables/interfaces";
import { Figure } from "./figures/Figure";
import { Circle } from "./figures/Circle";
import { Point } from "./figures/Point";
import { Line, LineConfig } from "./figures/Line";
import { Plot, PlotConfig } from "./figures/Plot";
import { Axis } from "./figures/Axis";
import { AXIS } from "./variables/enums";
import { GraphConfig } from "./variables/types";
export declare class Graph {
    #private;
    constructor(containerID: string | HTMLElement, config?: GraphConfig);
    get container(): HTMLElement;
    get svg(): Svg;
    get width(): number;
    get height(): number;
    get origin(): IPoint;
    set origin(value: IPoint);
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
    get layers(): ILayers;
    distanceToPixels(distance: number, direction?: AXIS): number;
    unitsToPixels(point: IPoint): IPoint;
    pixelsToUnits(point: IPoint): IPoint;
    getFigure(name: string): Figure;
    getPoint(name: string): Point;
    axis(): {
        x: Axis;
        y: Axis;
    };
    point(x: number, y: number, name?: string): Point;
    line(A: Point | string, B: Point | string, construction?: LineConfig, name?: string): Line;
    circle(center: Point | IPoint, radius: number, name?: string): Circle;
    plot(fn: Function | string, config?: PlotConfig, name?: string): Plot;
    update(): Graph;
    private _initSetWidthAndHeight;
    private _initGetContainerId;
    private _initCreateSVG;
    createMarker(scale: number): {
        start: Marker;
        end: Marker;
    };
}
