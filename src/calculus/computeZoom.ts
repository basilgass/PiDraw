import {InvalidArgumentError} from "../errors"
import type {Domain, IGraphConfig, XY} from "../pidraw.common"
import {toCoordinates} from "./coordinates"

// Zoom and move of the window on the coordinate system: pure maths on the layout. The size of the drawing (`width`, `height`) never changes, only
// the length of a unit and the place of the origin do, so what is seen is a smaller or a bigger part of the plane.

/** The part of the plane that a drawing shows, in units of the coordinate system. */
export interface ViewWindow {
    x: Pick<Domain, 'min' | 'max'>,
    y: Pick<Domain, 'min' | 'max'>
}

/** How far the length of a unit can go from the one at the start, as a factor: a zoom is bounded between `min` and `max` times it. */
export const ZOOM_LIMITS = {min: 1 / 100, max: 100}

/** Axes are orthogonal up to this, in pixels. */
const ORTHOGONAL = 1e-9

const finite = (value: XY): boolean => Number.isFinite(value.x) && Number.isFinite(value.y)

function checkPosition(value: XY, name: string): void {
    if (!finite(value)) {
        throw new InvalidArgumentError(`Invalid ${name} (${value.x}, ${value.y}): expected a position with finite numbers`)
    }
}

/** @throws InvalidArgumentError if `factor` is not a finite number greater than 0. */
function checkFactor(factor: number): void {
    if (!Number.isFinite(factor) || factor <= 0) {
        throw new InvalidArgumentError(`Invalid zoom factor ${factor}: expected a finite number greater than 0`)
    }
}

/**
 * The layout where the units are `factor` times longer (the part seen is `factor` times smaller), and the point `center` of the drawing, in
 * pixels, is where it was: the point of the plane that is under it stays there.
 * @throws InvalidArgumentError if `factor` is not a finite number greater than 0, or `center` has a number that is not finite.
 */
export function zoomLayout(config: IGraphConfig, factor: number, center: XY): IGraphConfig {
    checkFactor(factor)
    checkPosition(center, 'center')

    const scaled = (axis: XY): XY => ({x: axis.x * factor, y: axis.y * factor})

    return {
        ...config,
        axis: {x: scaled(config.axis.x), y: scaled(config.axis.y)},
        origin: {x: center.x + (config.origin.x - center.x) * factor, y: center.y + (config.origin.y - center.y) * factor}
    }
}

/**
 * The layout where the origin is moved by `delta` pixels: the plane slides under the drawing.
 * @throws InvalidArgumentError if `delta` has a number that is not finite.
 */
export function moveLayout(config: IGraphConfig, delta: XY): IGraphConfig {
    checkPosition(delta, 'move')

    return {...config, origin: {x: config.origin.x + delta.x, y: config.origin.y + delta.y}}
}

/**
 * The layout that shows exactly `window`, each axis with its own length of unit.
 * @throws InvalidArgumentError if the window is not a part of the plane (numbers that are finite, `min` below `max`), or if the axes are not
 * the usual ones: orthogonal, the x axis to the right and the y axis up.
 */
export function windowLayout(config: IGraphConfig, window: ViewWindow): IGraphConfig {
    const {x, y} = window

    if (![x.min, x.max, y.min, y.max].every(Number.isFinite) || x.min >= x.max || y.min >= y.max) {
        throw new InvalidArgumentError(`Invalid window x ${x.min}:${x.max}, y ${y.min}:${y.max}: expected finite numbers, each min below its max`)
    }

    const {axis} = config
    const usual = Math.abs(axis.x.y) <= ORTHOGONAL && Math.abs(axis.y.x) <= ORTHOGONAL && axis.x.x > 0 && axis.y.y < 0

    if (!usual) {
        throw new InvalidArgumentError('A window can be shown only with the usual axes: orthogonal, the x axis to the right and the y axis up')
    }

    const scaleX = config.width / (x.max - x.min)
    const scaleY = config.height / (y.max - y.min)

    return {
        ...config,
        axis: {x: {x: scaleX, y: 0}, y: {x: 0, y: -scaleY}},
        origin: {x: -x.min * scaleX, y: y.max * scaleY}
    }
}

/**
 * The part of the plane that the drawing shows: the smallest window that holds its four corners.
 * @throws MathError if the two axes are collinear (a pixel has then no coordinates).
 */
export function visibleWindow(config: IGraphConfig): ViewWindow {
    const corners = [{x: 0, y: 0}, {x: config.width, y: 0}, {x: 0, y: config.height}, {x: config.width, y: config.height}]
        .map(corner => toCoordinates(corner, config))

    const xs = corners.map(corner => corner.x)
    const ys = corners.map(corner => corner.y)

    return {x: {min: Math.min(...xs), max: Math.max(...xs)}, y: {min: Math.min(...ys), max: Math.max(...ys)}}
}

/** How long the unit of each axis is, compared with the one of `home`: 2 for a unit twice as long. */
export function zoomRatio(config: IGraphConfig, home: IGraphConfig): XY {
    const length = (axis: XY) => Math.hypot(axis.x, axis.y)

    return {x: length(config.axis.x) / length(home.axis.x), y: length(config.axis.y) / length(home.axis.y)}
}

/**
 * `factor`, or the nearest factor that keeps the units of both axes between `limits.min` and `limits.max` times the ones of `home` (`ratio` is where
 * they are now, see {@link zoomRatio}). If the two axes are so different that no factor satisfies both, the factor is 1: nothing changes.
 */
export function boundedFactor(factor: number, ratio: XY, limits: { min: number, max: number } = ZOOM_LIMITS): number {
    checkFactor(factor)

    const lowest = Math.max(limits.min / ratio.x, limits.min / ratio.y)
    const highest = Math.min(limits.max / ratio.x, limits.max / ratio.y)

    return lowest > highest ? 1 : Math.min(Math.max(factor, lowest), highest)
}
