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
import { Arc } from "./figures/Arc";
import { Parser } from "./Parser";
export declare class Graph {
    constructor(containerID: string | HTMLElement, config?: GraphConfig);
    private _container;
    get container(): HTMLElement;
    private _svg;
    get svg(): Svg;
    private _width;
    get width(): number;
    private _height;
    get height(): number;
    private _origin;
    get origin(): IPoint;
    set origin(value: IPoint);
    private _pixelsPerUnit;
    get pixelsPerUnit(): IPoint;
    private _figures;
    get figures(): Figure[];
    private _points;
    get points(): {
        [p: string]: Point;
    };
    private _freeze;
    get freeze(): boolean;
    private _layers;
    get layers(): ILayers;
    private _markers;
    get markers(): {
        start: Marker;
        end: Marker;
    };
    get unitXDomain(): {
        min: number;
        max: number;
    };
    get unitYDomain(): {
        min: number;
        max: number;
    };
    distanceToPixels(distance: number, direction?: AXIS): number;
    unitsToPixels(point: IPoint): IPoint;
    pixelsToUnits(point: IPoint): IPoint;
    getFigure(name: string): Figure;
    getPoint(name: Point | string): Point;
    axis(): {
        x: Axis;
        y: Axis;
    };
    point(x: number, y: number, name?: string): Point;
    segment(A: Point | string, B: Point | string, name?: string): Line;
    vector(A: Point | string, B: Point | string, name?: string): Line;
    line(A: Point | string, B: Point | string, construction?: LineConfig, name?: string): Line;
    parallel(line: Line, P: Point | string, name?: string): Line;
    perpendicular(line: Line, P: Point | string, name?: string): Line;
    circle(center: Point | IPoint | string, radius: number, name?: string): Circle;
    plot(fn: Function | string, config?: PlotConfig, name?: string): Plot;
    arc(A: Point | string, O: Point | string, B: Point | string, radius?: number | Point, name?: string): Arc;
    update(): Graph;
    createMarker(scale: number): {
        start: Marker;
        end: Marker;
    };
    parse(construction: string): Parser;
    private _initSetWidthAndHeight;
    private _initGetContainerId;
    private _initCreateSVG;
    private _validateFigure;
}
