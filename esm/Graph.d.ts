import { Marker, Svg } from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js';
import { ILayers, IPoint } from "./variables/interfaces";
import { Figure } from "./figures/Figure";
import { Circle } from "./figures/Circle";
import { Point } from "./figures/Point";
import { Grid } from "./figures/Grid";
import { Line, LineConfig } from "./figures/Line";
import { Plot, PlotConfig } from "./figures/Plot";
import { Axis } from "./figures/Axis";
import { AXIS } from "./variables/enums";
import { GraphConfig } from "./variables/types";
import { Arc } from "./figures/Arc";
import { Parser } from "./Parser";
export declare class Graph {
    /**
     * Create the main graph canvas element
     * config: {origin: {x: number, y: number}, grid: {x: number, y: number, type: GRIDTYPE}}
     * config (dim pixels): {... width: number, height: number}
     * config (dim units): {... dx: number, dy: number, pixelsPerUnit: number}
     * config (plot wise): {... xMin: number, xMax: number, yMin: number, yMax: number, pixelsPerUnit: number}
     * @param {string | HTMLElement} containerID
     * @param {GraphConfig} config
     */
    constructor(containerID: string | HTMLElement, config?: GraphConfig);
    /**
     * HTML container
     * @type {HTMLElement}
     * @private
     */
    private _container;
    get container(): HTMLElement;
    /**
     * SVG.js main element
     * @type {Svg}
     * @private
     */
    private _svg;
    get svg(): Svg;
    /**
     * Number of pixels on the graph
     * @type {number}
     * @private
     */
    private _width;
    get width(): number;
    /**
     * Number of pixels in the graph
     * @type {number}
     * @private
     */
    private _height;
    get height(): number;
    /**
     * Origin position in unit coordinate
     * @type {IPoint}
     * @private
     */
    private _origin;
    get origin(): IPoint;
    set origin(value: IPoint);
    /**
     * Number of pixels per unit.
     * @type {IPoint}
     * @private
     */
    private _pixelsPerUnit;
    get pixelsPerUnit(): IPoint;
    /**
     * List of all figures drawn in the graph.
     * @type {Figure[]}
     * @private
     */
    private _figures;
    get figures(): Figure[];
    /**
     * List of all points by name. Used to quickly get a point.
     * @type {{[p: string]: Point}}
     * @private
     */
    private _points;
    get points(): {
        [p: string]: Point;
    };
    /**
     * Determine if all the graph must be drawn or not.
     * @type {boolean}
     * @private
     */
    private _freeze;
    get freeze(): boolean;
    /**
     * Layers of the graph
     * @type {ILayers}
     * @private
     */
    private _layers;
    get layers(): ILayers;
    /**
     * Default markers for start and end
     * @type {{start: Marker, end: Marker}}
     * @private
     */
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
    getGrid(name?: string): Grid;
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
    updateLayout(config: GraphConfig): Graph;
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
