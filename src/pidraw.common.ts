import {ForeignObject as svgHTML, G, Text as svgLabel} from "@svgdotjs/svg.js"
import type {parser_config} from "./parser/parser.config"

export type TeXConverterType = (value: string) => string

export interface IGraphConfig {
    axis: {
        x: XY,
        y: XY
    }
    height: number,
    origin: XY,
    system: COORDINATE_SYSTEM,
    width: number,
}

export interface IGraphDisplay {
    axis?: boolean | { x: boolean | number | IAxisConfig, y: boolean | number | IAxisConfig },
    grid?: boolean,
    subgrid?: number,
}

export interface IGraphConstructorConfig {
    axis?: {
        x: XY,
        y: XY
    },
    display?: IGraphDisplay,
    height?: number,
    origin?: XY,
    ppu?: number,
    system?: COORDINATE_SYSTEM,
    tex?: TeXConverterType
    width?: number,
}

export interface IAxisConfig {
    color?: string,
    half?: boolean,
    length?: number
    padding?: number,
}

export interface IFigureAppearanceConfig {
    fill: {
        color: string,
        opacity: number
    },
    stroke: {
        color: string,
        width: number,
        opacity: number
    },
}

export interface XY {
    x: number,
    y: number
}

export function isXY(obj: unknown): obj is XY {
    // @ts-expect-error : obj is XY
    return obj !== null && obj !== undefined && obj.x !== undefined && obj.y !== undefined
}

export function isDOMAIN(obj: unknown): obj is DOMAIN {
    // @ts-expect-error : obj is DOMAIN
    return obj !== null && obj !== undefined && obj.min !== undefined && obj.max !== undefined
}


export interface DOMAIN {
    axis?: 'x' | 'y',
    max: number
    min: number,
}

export enum LAYER_NAME {
    BACKGROUND = 'background',
    GRIDS = 'grids',
    AXIS = 'axis',
    MAIN = 'main',
    PLOTS_BACKGROUND = 'plots_BG',
    PLOTS = 'plots',
    PLOTS_FOREGROUND = 'plots_FG',
    FOREGROUND = 'foreground',
    POINTS = 'points',
    INTERACTIVE = 'interactive',
}

export type ILayers = Record<LAYER_NAME, G>

export enum AXIS {
    'X' = 'Ox',
    'Y' = 'Oy'
}

export enum COORDINATE_SYSTEM {
    'CARTESIAN_2D' = 'cartesian_2d',
    'POLAR' = 'polar',
}

export enum POINTCONSTRAINT {
    FREE = 'free',
    FIXED = 'fixed',
    MIDDLE = 'middle',
    PROJECTION = 'projection',
    INTERSECTION_LINES = 'intersection_lines',
    FOLLOW = 'follow',
    DIRECTION = 'direction',
    VECTOR = 'vector',
    INTERSECTION_CIRCLE_LINE = 'intersection_circle_line',
    INTERSECTION_CIRCLES = 'intersection_circles',
    SYMMETRY = 'symmetry',
    COORDINATES = 'coordinates',
}

export enum LINECONSTRAINT {
    FIXED = 'fixed',                    // two points
    PARALLEL = 'parallel',              // a point and a vector
    PERPENDICULAR = 'perpendicular',    // a point and a vector
    TANGENT = 'tangent',                // a point and a circle
    MEDIATOR = "mediator",              // two points
    SLOPE = 'slope',                    // a point and a slope
    BISECTOR = "bisector",            // two lines
}

export enum POLYGON_CONSTRAINT {
    FIXED = 'fixed',
    REGULAR = 'regular',
    STAR = 'star'
}

export type LabelType = svgLabel | svgHTML | null

export enum BEZIERCONTROL {
    SMOOTH = 'smooth',
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}


export interface buildInterface<T> {
    create: keyof typeof parser_config,
    config: T
}