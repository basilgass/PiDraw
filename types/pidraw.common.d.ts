import { ForeignObject as svgHTML, G, Text as svgLabel } from "@svgdotjs/svg.js";
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
export interface IGraphDisplay {
    axis?: boolean | {
        x: boolean | number | IAxisConfig;
        y: boolean | number | IAxisConfig;
    };
    grid?: boolean;
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
    FIXED = "fixed",
    PARALLEL = "parallel",
    PERPENDICULAR = "perpendicular",
    TANGENT = "tangent",
    MEDIATOR = "mediator",
    SLOPE = "slope",
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
    HORIZONTAL = "horizontal"
}
//# sourceMappingURL=pidraw.common.d.ts.map