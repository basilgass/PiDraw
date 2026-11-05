import type {XY} from "../pidraw.common"
import {distanceAB, nowhere} from "./geometry"

/** A circle: its center and its radius, in pixels. A circle that does not exist has `NaN` for its center and its radius. */
export interface CircleDefinition {
    center: XY,
    radius: number
}

/** Below this, relative to the size of the points, a triangle is flat: its three points are aligned. */
const FLAT = 1e-12

/** Below this, in pixels, a center is on the line: the circle that is tangent to it has no radius. */
const ON_THE_LINE = 1e-9

function noCircle(): CircleDefinition {
    return {center: nowhere(), radius: NaN}
}

/** The circle that goes through three points. It does not exist if they are aligned, or if two of them are the same. */
export function circumcircle(A: XY, B: XY, C: XY): CircleDefinition {
    // Computed from A, to keep the numbers small.
    const bx = B.x - A.x
    const by = B.y - A.y
    const cx = C.x - A.x
    const cy = C.y - A.y
    const d = 2 * (bx * cy - by * cx)

    if (!(Math.abs(d) > FLAT * Math.hypot(bx, by) * Math.hypot(cx, cy))) {
        return noCircle()
    }

    const b2 = bx * bx + by * by
    const c2 = cx * cx + cy * cy
    const ux = (cy * b2 - by * c2) / d
    const uy = (bx * c2 - cx * b2) / d

    return {center: {x: A.x + ux, y: A.y + uy}, radius: Math.hypot(ux, uy)}
}

/** The circle inside a triangle, tangent to its three sides. It does not exist if the points are aligned. */
export function incircle(A: XY, B: XY, C: XY): CircleDefinition {
    const a = distanceAB(B, C)
    const b = distanceAB(C, A)
    const c = distanceAB(A, B)
    const perimeter = a + b + c
    const twiceArea = Math.abs((B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x))

    if (!(twiceArea > FLAT * perimeter * perimeter)) {
        return noCircle()
    }

    // The center is the average of the points, weighted by the length of the opposite sides.
    return {
        center: {
            x: (a * A.x + b * B.x + c * C.x) / perimeter,
            y: (a * A.y + b * B.y + c * C.y) / perimeter
        },
        radius: twiceArea / perimeter
    }
}

/** The circle that has the segment `AB` for diameter. It does not exist if the two points are the same. */
export function circleWithDiameter(A: XY, B: XY): CircleDefinition {
    const radius = distanceAB(A, B) / 2

    if (!(radius > 0)) {
        return noCircle()
    }

    return {center: {x: (A.x + B.x) / 2, y: (A.y + B.y) / 2}, radius}
}

/**
 * The circle of a given center that is tangent to the line through `start` and `end`: its radius is the distance from
 * the center to the line. It does not exist if the center is on the line, or if the line is reduced to a point.
 */
export function circleTangentTo(center: XY, start: XY, end: XY): CircleDefinition {
    const dx = end.x - start.x
    const dy = end.y - start.y
    const length = Math.hypot(dx, dy)

    if (!(length > 0)) {
        return noCircle()
    }

    const radius = Math.abs(dx * (center.y - start.y) - dy * (center.x - start.x)) / length

    if (!(radius > ON_THE_LINE)) {
        return noCircle()
    }

    return {center: {x: center.x, y: center.y}, radius}
}
