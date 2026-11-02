import type {G, Svg} from "@svgdotjs/svg.js"
import type {parser_config} from "./parser/parser.config"
import type {IGridConfig} from "./figures/Grid/Grid.types"
import type {TickSelection} from "./calculus"
import type {Point} from "./figures/Point/Point"
import type {LOOP_STYLE} from "./Animate"
import type {Graph} from "./Graph"
import type {AbstractFigure} from "./figures/AbstractFigure/AbstractFigure"

export type TeXConverterType = (value: string) => string

export interface IGraphDragEvent {
    graph: Graph
    figure: AbstractFigure
}

/** What an update of the graph did: how many figures it reached, out of the figures the graph has. */
export interface IGraphUpdate {
    /** The figures drawn again, and the ones that were moved, whose label was put at its place. */
    updated: number,
    /** The figures of the graph (the grid and the axes of the layout are not among them). */
    total: number
}

/** A point was moved by the mouse: with how many figures this reached. */
export interface IGraphDragMoveEvent extends IGraphDragEvent, IGraphUpdate {
}

export interface IGraphEventMap {
    'dragstart': IGraphDragEvent
    'dragmove': IGraphDragMoveEvent
    'dragend': IGraphDragEvent
}

/**
 * What a figure needs from the graph that owns it: the svg to draw in and the configuration of the coordinate system.
 * A figure depends on this interface only, never on the `Graph` class, which would be an import cycle.
 * The configuration is the live object of the graph: a change of the graph is seen by the figures at once.
 */
export interface IFigureContext {
    readonly rootSVG: Svg
    readonly config: IGraphConfig
}

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

/** What an axis of the coordinate system shows besides its line. */
export interface IAxisDisplay {
    /** The step of the graduation, in units of the axis. Without it the axis is not graduated. */
    step?: number,
    /** What is written at the graduations: the numbers, or fractions of pi. */
    labels?: 'numbers' | 'pi',
    /** The name written at the end of the axis. */
    name?: string,
    /** Which ticks are drawn (`{every: 5}`, `{first: true}`, both): the graduation has a step of 1 when there is no step. */
    marks?: TickSelection,
    /** On which ticks a number is written, or `'none'`. */
    numbers?: TickSelection | 'none',
    /** How far the axis stops from the borders of the drawing, in pixels. */
    padding?: number
}

/** What the graph shows besides the figures. */
export interface IGraphDisplay {
    /** The axes of the coordinate system: both (`true`), or each one with what it shows (`false` for one that is not drawn). */
    axis?: boolean | { x: IAxisDisplay | false, y: IAxisDisplay | false },
    /** The grid: `true` for a step of 1, or its config. */
    grid?: boolean | IGridConfig,
}

export interface IGraphConstructorConfig {
    axis?: {
        x: XY,
        y: XY
    },
    display?: IGraphDisplay,
    height?: number,
    origin?: XY,
    system?: COORDINATE_SYSTEM,
    tex?: TeXConverterType
    width?: number,
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
    }
}

export interface IFigureAnimation {
    from: Point | XY | null,
    to: Point | XY | null,
    duration: number, // in seconds
    easing: 'linear' | 'inOut', // linear | inOut
    delay: number, // in seconds
    loop: LOOP_STYLE,
    callback?: () => void
}
export interface XY {
    x: number,
    y: number
}

/**
 * One member per key of `T`: it has that key, and forbids every other key (`?: never`). Where a plain union would accept
 * an object that mixes the keys of several members, this one is refused by the compiler. For configurations that hold
 * exactly one constraint among several.
 */
export type Exclusive<T> = { [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>> }[keyof T]

export function isXY(obj: unknown): obj is XY {
    // @ts-expect-error : obj is XY
    return obj?.x !== undefined && obj.y !== undefined
}

export function isDOMAIN(obj: unknown): obj is DOMAIN {
    // @ts-expect-error : obj is DOMAIN
    return obj?.min !== undefined && obj.max !== undefined
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



export interface buildInterface<T> {
    create: keyof typeof parser_config,
    config: T
}