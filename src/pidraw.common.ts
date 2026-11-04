import type {Svg} from "@svgdotjs/svg.js"

/** A position or a vector, in pixels or in units of the coordinate system according to the function that takes it. */
export interface XY {
    x: number,
    y: number
}

/** An interval `[min, max]`, optionally about one axis only. */
export interface Domain {
    /** The axis the interval is about, when it matters. */
    axis?: 'x' | 'y',
    max: number
    min: number,
}

/** The vector of one unit of each axis, in pixels. */
export interface AxisVectors {
    x: XY,
    y: XY
}

/**
 * One member per key of `T`: it has that key, and forbids every other key (`?: never`). Where a plain union would accept
 * an object that mixes the keys of several members, this one is refused by the compiler. For configurations that hold
 * exactly one constraint among several.
 */
export type Exclusive<T> = { [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>> }[keyof T]

/** Whether the object has an `x` and a `y` that are not `undefined`. Their value is not checked (`NaN` passes). */
export function isXY(obj: unknown): obj is XY {
    return hasDefined(obj, ['x', 'y'])
}

/** Whether the object has a `min` and a `max` that are not `undefined`. Their value is not checked, and `axis` is optional. */
export function isDomain(obj: unknown): obj is Domain {
    return hasDefined(obj, ['min', 'max'])
}

function hasDefined(obj: unknown, keys: readonly string[]): boolean {
    if (typeof obj !== 'object' || obj === null) {
        return false
    }

    const fields = obj as Record<string, unknown>
    return keys.every(key => fields[key] !== undefined)
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

/** The coordinate system of a graph, in pixels. */
export interface IGraphConfig {
    axis: AxisVectors,
    height: number,
    /** Where the point (0, 0) is, in pixels from the top left corner of the drawing. */
    origin: XY,
    system: CoordinateSystem,
    width: number,
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

/** The layers of the drawing, from the back to the front: this is the order in which the graph creates them. */
export enum LayerName {
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

/** The names of the two axes of the graph, which no figure can take. */
export enum Axes {
    X = 'Ox',
    Y = 'Oy'
}

export enum CoordinateSystem {
    CARTESIAN_2D = 'cartesian_2d',
    /** Accepted by the type, but a graph refuses it: it cannot be drawn yet (`NotImplementedError`). */
    POLAR = 'polar',
}
