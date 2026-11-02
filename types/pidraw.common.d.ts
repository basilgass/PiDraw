import type { G, Svg } from "@svgdotjs/svg.js";
import type { parser_config } from "./parser/parser.config";
import type { IGridConfig } from "./figures/Grid/Grid.types";
import type { TickSelection } from "./calculus";
import type { Point } from "./figures/Point/Point";
import type { LOOP_STYLE } from "./Animate";
import type { Graph } from "./Graph";
import type { AbstractFigure } from "./figures/AbstractFigure/AbstractFigure";
export type TeXConverterType = (value: string) => string;
export interface IGraphDragEvent {
    graph: Graph;
    figure: AbstractFigure;
}
export interface IGraphUpdate {
    updated: number;
    total: number;
}
export interface IGraphDragMoveEvent extends IGraphDragEvent, IGraphUpdate {
}
export interface IGraphEventMap {
    'dragstart': IGraphDragEvent;
    'dragmove': IGraphDragMoveEvent;
    'dragend': IGraphDragEvent;
}
export interface IFigureContext {
    readonly rootSVG: Svg;
    readonly config: IGraphConfig;
}
export interface IGraphConfig {
    axis: {
        x: XY;
        y: XY;
    };
    height: number;
    origin: XY;
    system: COORDINATE_SYSTEM;
    width: number;
}
export interface IAxisDisplay {
    step?: number;
    labels?: 'numbers' | 'pi';
    name?: string;
    marks?: TickSelection;
    numbers?: TickSelection | 'none';
    padding?: number;
}
export interface IGraphDisplay {
    axis?: boolean | {
        x: IAxisDisplay | false;
        y: IAxisDisplay | false;
    };
    grid?: boolean | IGridConfig;
}
export interface IGraphConstructorConfig {
    axis?: {
        x: XY;
        y: XY;
    };
    display?: IGraphDisplay;
    height?: number;
    origin?: XY;
    system?: COORDINATE_SYSTEM;
    tex?: TeXConverterType;
    width?: number;
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
export interface IFigureAnimation {
    from: Point | XY | null;
    to: Point | XY | null;
    duration: number;
    easing: 'linear' | 'inOut';
    delay: number;
    loop: LOOP_STYLE;
    callback?: () => void;
}
export interface XY {
    x: number;
    y: number;
}
export type Exclusive<T> = {
    [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];
export declare function isXY(obj: unknown): obj is XY;
export declare function isDOMAIN(obj: unknown): obj is DOMAIN;
export interface DOMAIN {
    axis?: 'x' | 'y';
    max: number;
    min: number;
}
export declare enum LAYER_NAME {
    BACKGROUND = "background",
    GRIDS = "grids",
    AXIS = "axis",
    MAIN = "main",
    PLOTS_BACKGROUND = "plots_BG",
    PLOTS = "plots",
    PLOTS_FOREGROUND = "plots_FG",
    FOREGROUND = "foreground",
    POINTS = "points",
    INTERACTIVE = "interactive"
}
export type ILayers = Record<LAYER_NAME, G>;
export declare enum AXIS {
    'X' = "Ox",
    'Y' = "Oy"
}
export declare enum COORDINATE_SYSTEM {
    'CARTESIAN_2D' = "cartesian_2d",
    'POLAR' = "polar"
}
export declare enum POINTCONSTRAINT {
    FREE = "free",
    FIXED = "fixed",
    MIDDLE = "middle",
    PROJECTION = "projection",
    INTERSECTION_LINES = "intersection_lines",
    FOLLOW = "follow",
    DIRECTION = "direction",
    VECTOR = "vector",
    INTERSECTION_CIRCLE_LINE = "intersection_circle_line",
    INTERSECTION_CIRCLES = "intersection_circles",
    SYMMETRY = "symmetry",
    COORDINATES = "coordinates"
}
export declare enum LINECONSTRAINT {
    FIXED = "fixed",
    PARALLEL = "parallel",
    PERPENDICULAR = "perpendicular",
    TANGENT = "tangent",
    MEDIATOR = "mediator",
    SLOPE = "slope",
    BISECTOR = "bisector"
}
export interface buildInterface<T> {
    create: keyof typeof parser_config;
    config: T;
}
//# sourceMappingURL=pidraw.common.d.ts.map