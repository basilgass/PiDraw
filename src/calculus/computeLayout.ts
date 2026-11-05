import {InvalidArgumentError, NotImplementedError} from "../errors"
import {CoordinateSystem, type Domain, type IGraphConfig, type XY} from "../pidraw.common"
import type {IGraphConstructorConfig, IGraphDisplay} from "../Graph.types"

// The size of the drawing and where its origin and its axes are, from the window of the coordinate system and the length of a unit.
// Pure maths: `Draw` reads the parameters, `Graph` draws.

/**
 * How many pixels a centimeter is. A centimeter is 28.45274 points of TeX, and a pixel is 0.75 point in TikZ (see `AbstractFigure`),
 * so a unit of 2 cm is written `x=2cm` in TikZ exactly.
 */
export const PX_PER_CM = 28.45274 / 0.75

/** The size of a graph that is given none, in pixels. */
const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600

/** The values of `object` that are not `undefined`: a key that is `undefined` leaves the default. */
function defined<T extends object>(object: T | undefined): Partial<T> {
    return Object.fromEntries(Object.entries(object ?? {}).filter(([, value]) => value !== undefined)) as Partial<T>
}

/**
 * The configuration and the display of a graph from what its constructor is given, with the defaults: 800 x 600 pixels, the origin
 * in the middle, a unit of 1 cm on each axis, the grid and the axes. Only the keys of the configuration are kept (`display` and `tex`
 * are not part of it), and a value that is `undefined` is the default.
 * @throws InvalidArgumentError, NotImplementedError if the configuration is not valid (see `checkGraphConfig`).
 */
export function resolveGraphConfig(config?: IGraphConstructorConfig): { config: IGraphConfig, display: IGraphDisplay } {
    const width = config?.width ?? DEFAULT_WIDTH
    const height = config?.height ?? DEFAULT_HEIGHT

    const resolved: IGraphConfig = {
        width,
        height,
        origin: {...(config?.origin ?? {x: width / 2, y: height / 2})},
        system: config?.system ?? CoordinateSystem.CARTESIAN_2D,
        axis: {
            x: {...(config?.axis?.x ?? {x: PX_PER_CM, y: 0})},
            y: {...(config?.axis?.y ?? {x: 0, y: -PX_PER_CM})}
        }
    }

    checkGraphConfig(resolved)

    return {config: resolved, display: {grid: true, axis: true, ...defined(config?.display)}}
}

/**
 * Check the configuration of a graph.
 * @throws InvalidArgumentError if the width or the height is not a finite number greater than 0, the origin is not a finite position, or
 * an axis is not a finite vector with a length.
 * @throws NotImplementedError if the coordinate system is not the cartesian one: it cannot be drawn yet.
 */
export function checkGraphConfig(config: IGraphConfig): void {
    const fail = (what: string, value: unknown, expected: string) =>
        new InvalidArgumentError(`Invalid ${what} ${typeof value === 'number' ? String(value) : JSON.stringify(value)} for the graph: expected ${expected}`)
    const finite = ({x, y}: XY) => Number.isFinite(x) && Number.isFinite(y)

    for (const side of ['width', 'height'] as const) {
        if (!(Number.isFinite(config[side]) && config[side] > 0)) {
            throw fail(side, config[side], 'a finite number greater than 0')
        }
    }

    if (!finite(config.origin)) {
        throw fail('origin', config.origin, 'a position with finite coordinates')
    }

    for (const name of ['x', 'y'] as const) {
        const vector = config.axis[name]

        if (!finite(vector) || Math.hypot(vector.x, vector.y) === 0) {
            throw fail(`vector of the axis ${name}`, vector, 'a finite vector that is not null')
        }
    }

    if (config.system !== CoordinateSystem.CARTESIAN_2D) {
        throw new NotImplementedError(`The coordinate system "${config.system}" cannot be drawn yet`)
    }
}

/** The part of the coordinate system that the drawing shows, and the length of a unit of each axis in centimeters. */
export interface LayoutSpec {
    x: Pick<Domain, 'min' | 'max'>,
    y: Pick<Domain, 'min' | 'max'>,
    /** Centimeters per unit. */
    unit: { x: number, y: number }
}

/** What `Graph` needs to draw: the size of the drawing in pixels, the origin, and the vector of a unit of each axis (y points up). */
export interface LayoutGeometry {
    width: number,
    height: number,
    origin: XY,
    axis: { x: XY, y: XY }
}

/**
 * The geometry of a drawing that shows `x` and `y` with units of `unit` centimeters: the drawing is as big as the window, whatever
 * the size of the page it is in.
 */
export function layoutGeometry({x, y, unit}: LayoutSpec): LayoutGeometry {
    const scaleX = unit.x * PX_PER_CM
    const scaleY = unit.y * PX_PER_CM

    return {
        width: (x.max - x.min) * scaleX,
        height: (y.max - y.min) * scaleY,
        origin: {x: -x.min * scaleX, y: y.max * scaleY},
        axis: {x: {x: scaleX, y: 0}, y: {x: 0, y: -scaleY}}
    }
}

/** How far from the border of the drawing an axis is when it is drawn there, in pixels. */
export const EDGE_MARGIN = 2

/** Where an axis is drawn: a point of it in pixels, whether it was moved to a border, and the side of its numbers (see `IAxisOptions`). */
export interface AxisPlacement {
    A: XY,
    displaced: boolean,
    side: 'left' | 'right'
}

/** An axis is orthogonal to the other one up to this, in pixels. */
const ORTHOGONAL = 1e-9

/**
 * Where the axes of the coordinate system are drawn. An axis is on its line (the one through the origin), unless that line is out of
 * the drawing: it is then drawn at the nearest border, `EDGE_MARGIN` pixels inside of it, with its numbers on the side of the inside of the
 * drawing. The position of its zero does not change: it is the point of the axis that is the origin, even out of the drawing.
 *
 * Only axes that are orthogonal (the x axis horizontal, the y axis vertical) are moved; the others stay on their line.
 *
 * @param axis the vector of one unit of each axis, in pixels.
 */
export function axisPlacement(origin: XY, width: number, height: number, axis: { x: XY, y: XY }): { x: AxisPlacement, y: AxisPlacement } {
    const orthogonal = Math.abs(axis.x.y) <= ORTHOGONAL && Math.abs(axis.y.x) <= ORTHOGONAL
    const stay = (side: 'left' | 'right'): AxisPlacement => ({A: {...origin}, displaced: false, side})

    if (!orthogonal) {
        return {x: stay('right'), y: stay('left')}
    }

    // The right of a way (dx, dy) on the screen, where y points down, is (-dy, dx): the side of the inside is the one that faces the center.
    const inside = (A: XY, direction: XY): 'left' | 'right' =>
        (-direction.y) * (width / 2 - A.x) + direction.x * (height / 2 - A.y) > 0 ? 'right' : 'left'
    const edge = (value: number, size: number) => value < 0 ? EDGE_MARGIN : size - EDGE_MARGIN

    // The x axis is moved up or down, the y axis to the left or to the right.
    const x: AxisPlacement = origin.y < 0 || origin.y > height
        ? (() => {
            const A = {x: origin.x, y: edge(origin.y, height)}

            return {A, displaced: true, side: inside(A, axis.x)}
        })()
        : stay('right')
    const y: AxisPlacement = origin.x < 0 || origin.x > width
        ? (() => {
            const A = {x: edge(origin.x, width), y: origin.y}

            return {A, displaced: true, side: inside(A, axis.y)}
        })()
        : stay('left')

    return {x, y}
}
