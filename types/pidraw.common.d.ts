import { ForeignObject as svgHTML, G, Text as svgLabel } from '@svgdotjs/svg.js';
import { parser_config } from './parser/parser.config';
import { Point } from './figures/Point';
import { LOOP_STYLE } from './Animate';
export type TeXConverterType = (value: string) => string;
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
export interface IGraphAxisType {
    x: boolean | number | IAxisConfig;
    y: boolean | number | IAxisConfig;
}
export interface IGraphDisplay {
    axis?: boolean | IGraphAxisType;
    grid?: boolean | IGraphAxisType;
    subgrid?: number;
}
export interface IGraphConstructorConfig {
    axis?: {
        x: XY;
        y: XY;
    };
    display?: IGraphDisplay;
    height?: number;
    origin?: XY;
    ppu?: number;
    system?: COORDINATE_SYSTEM;
    tex?: TeXConverterType;
    width?: number;
}
export interface IAxisConfig {
    color?: string;
    half?: boolean;
    length?: number;
    padding?: number;
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
    FIXED = "fixed",// two points
    PARALLEL = "parallel",// a point and a vector
    PERPENDICULAR = "perpendicular",// a point and a vector
    TANGENT = "tangent",// a point and a circle
    MEDIATOR = "mediator",// two points
    SLOPE = "slope",// a point and a slope
    BISECTOR = "bisector"
}
export declare enum POLYGON_CONSTRAINT {
    FIXED = "fixed",
    REGULAR = "regular",
    STAR = "star"
}
export type LabelType = svgLabel | svgHTML | null;
export declare enum BEZIERCONTROL {
    SMOOTH = "smooth",
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal",
    UP = "up",
    DOWN = "down",
    RIGHT = "right",
    LEFT = "left"
}
export interface buildInterface<T> {
    create: keyof typeof parser_config;
    config: T;
}
