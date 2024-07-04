import { G, Text as svgLabel, ForeignObject as svgHTML } from "@svgdotjs/svg.js"

export interface IGraphConfig {
    width: number,
    height: number,
    origin: XY,
    system: COORDINATE_SYSTEM,
    axis: {
        x: XY,
        y: XY,
        z?: XY
    }
}

export interface IGraphDisplay {
    grid?: boolean,
    subgrid?: number,
    axis?: boolean | { x?: boolean | number | IAxisConfig, y?: boolean | number | IAxisConfig, z?: boolean | number | IAxisConfig },
}
export interface IGraphConstructorConfig {
    width?: number,
    height?: number,
    origin?: XY,
    system?: COORDINATE_SYSTEM,
    ppu?: number,
    axis?: {
        x: XY,
        y: XY,
        z?: XY
    },
    display?: IGraphDisplay,
    tex?: (value: string) => string
}

export interface IAxisConfig {
    color?: string,
    padding?: number,
    half?: boolean,
    length?: number
}

export interface IFigureAppearanceConfig {
    stroke: {
        color: string,
        width: number,
        opacity: number
    },
    fill: {
        color: string,
        opacity: number
    },
}

export interface XY {
    x: number,
    y: number
}

export function isXY(obj: unknown): obj is XY {
    return obj !== null &&
        obj !== undefined &&
        (
            (
                Object.hasOwn(obj as object, 'x') &&
                Object.hasOwn(obj as object, 'y')
            ) ||
            obj.constructor.name === 'Point'
        )
}

export function isDOMAIN(obj: unknown): obj is DOMAIN {
    return obj !== null &&
        obj !== undefined &&
        (
            (
                Object.hasOwn(obj as object, 'min') &&
                Object.hasOwn(obj as object, 'max')
            )
        )
}

export function isLine(obj: unknown): obj is { follow: 'x' | 'y' | 'z', start: XY, direction: XY } {
    return obj !== null &&
        typeof obj === 'object' &&
        obj.constructor.name === 'Line'
}

export function isXYZ(obj: unknown): obj is XY {
    return (typeof obj === 'object') &&
        obj !== null &&
        Object.hasOwn(obj, 'x') &&
        Object.hasOwn(obj, 'y') &&
        Object.hasOwn(obj, 'z')
}

export interface XYZ {
    x: number,
    y: number,
    z: number
}

export interface DOMAIN {
    min: number,
    max: number
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
    'Y' = 'Oy',
    'Z' = 'Oz'
}

export enum COORDINATE_SYSTEM {
    'CARTESIAN_2D' = 'cartesian_2d',
    'CARTESIAN_3D' = 'cartesian_3d',
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