import type {XY} from "../pidraw.common"
import {cartesianToAngle, distanceAB, isDefinedPosition, nowhere, polarToCartesian} from "./geometry"

/** Below this, an angle in degrees is taken for zero. */
const ANGLE_EPSILON = 1e-9

/**
 * The angle, in degrees in [0, 360), swept counterclockwise from the direction `from` to the direction `to` (both in degrees).
 * Two directions that are the same give 0, never 360.
 */
export function counterclockwiseSweep(from: number, to: number): number {
    const sweep = (((to - from) % 360) + 360) % 360

    return sweep < ANGLE_EPSILON || sweep > 360 - ANGLE_EPSILON ? 0 : sweep
}

/**
 * The point of an arc that is the closest to a position, in pixels. In the angle of the arc it is on the circle, in the direction of
 * the position; outside of it, it is the end of the arc that is the closest.
 *
 * @param from the direction of the start of the arc from the center, in degrees.
 * @param sweep what the arc covers, in degrees, from `from`: counterclockwise, or clockwise with `clockwise`.
 * @returns the point (a position of its own), or `nowhere()` if the arc does not exist or the position is the center, which is
 * as far as possible from every point of the arc.
 */
export function nearestOnArc(center: XY, radius: number, from: number, sweep: number, clockwise: boolean, position: XY): XY {
    if (!isDefinedPosition(center) || !Number.isFinite(radius) || !Number.isFinite(from) || !Number.isFinite(sweep)
        || distanceAB(center, position) === 0) {
        return nowhere()
    }

    const direction = cartesianToAngle(center, position)
    const covered = clockwise ? counterclockwiseSweep(direction, from) : counterclockwiseSweep(from, direction)

    if (covered <= sweep) {
        return polarToCartesian(center.x, center.y, radius, direction)
    }

    const start = polarToCartesian(center.x, center.y, radius, from)
    const end = polarToCartesian(center.x, center.y, radius, clockwise ? from - sweep : from + sweep)

    return distanceAB(start, position) <= distanceAB(end, position) ? start : end
}

/** The length of an arc of a given radius that covers `sweep` degrees. */
export function arcLength(radius: number, sweep: number): number {
    return radius * sweep * Math.PI / 180
}

/** The area of the sector of a given radius that covers `sweep` degrees. */
export function sectorArea(radius: number, sweep: number): number {
    return radius * radius * sweep * Math.PI / 360
}
