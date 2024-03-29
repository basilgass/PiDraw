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
import { Parametric } from "./figures/Parametric";
import { Bezier, BezierPoint } from "./figures/Bezier";
import { Path } from "./figures/Path";
import { Polygon } from "./figures/Polygon";
export declare class Graph {
    get config(): GraphConfig;
    set config(value: GraphConfig);
    private _config;
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
     * List of all figures drawn in the graph.
     * @type {Figure[]}
     * @private
     */
    private _figures;
    get figures(): Figure[];
    /**
     * Determine if all the graph must be drawn or not.
     * @type {boolean}
     * @private
     */
    private _freeze;
    get freeze(): boolean;
    set freeze(value: boolean);
    /**
     * Number of pixels in the graph
     * @type {number}
     * @private
     */
    private _height;
    get height(): number;
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
    set pixelsPerUnit(value: IPoint);
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
    get clientDimensions(): {
        width: number;
        height: number;
    };
    get clientWidth(): number;
    get clientHeight(): number;
    private _texConverter;
    set texConverter(value: {
        toTex: Function;
        options: {};
    });
    get unitXDomain(): {
        min: number;
        max: number;
    };
    get unitYDomain(): {
        min: number;
        max: number;
    };
    toTex(value: string): Promise<string>;
    distanceToPixels(distance: number, direction?: AXIS): number;
    distanceToUnit(pixelDistance: number, direction?: AXIS): number;
    unitsToPixels(point: IPoint): IPoint;
    pixelsToUnits(point: IPoint): IPoint;
    getFigure(name: string): Figure;
    getGrid(name?: string): Grid;
    getPoint(name: Point | string): Point;
    axis(): {
        x: Axis;
        y: Axis;
    };
    point(x: number, y: number, name?: string, asPixel?: boolean): Point;
    segment(A: Point | string, B: Point | string, name?: string): Line;
    vector(A: Point | string, B: Point | string, name?: string): Line;
    line(A: Point | string, B: Point | string, construction?: LineConfig, name?: string): Line;
    parallel(line: Line, P: Point | string, name?: string): Line;
    perpendicular(line: Line, P: Point | string, name?: string): Line;
    circle(center: Point | IPoint | string, radius: number | Point, name?: string): Circle;
    polygon(points: Point[] | IPoint[] | string[], name?: string): Polygon;
    plot(fn: Function | string, config?: PlotConfig, name?: string): Plot;
    path(d: string, name?: string): Path;
    parametric(fx: Function | string, fy: Function | string, config?: PlotConfig, name?: string): Parametric;
    arc(A: Point | string, O: Point | string, B: Point | string, radius?: number | Point, name?: string): Arc;
    bezier(values: (Point | string | BezierPoint)[], name?: string): Bezier;
    update(): Graph;
    updateLayout(config: GraphConfig, updateConstructions?: boolean): Graph;
    createMarker(scale: number): {
        start: Marker;
        end: Marker;
    };
    parse(construction: string, parameters?: string): Parser;
    /** get all parser helper keys */
    get parseHelper(): {
        [Key: string]: {
            description: string;
            parameters: string;
        };
    };
    private _initSetWidthAndHeight;
    private _initGetContainerId;
    private _initCreateSVG;
    private _validateFigure;
}
