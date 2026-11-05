import type {XY} from "../pidraw.common"
import {type mathLine, mathVector, nowhere} from "./geometry"

/**
 * The visible part of a line in a canvas of `width` x `height` pixels, as its two end points.
 *
 * @param origin a point of the line, in pixels.
 * @param direction direction of the line, in pixels. The line is drawn from the border of the canvas that is behind
 * the origin to the one that is ahead.
 * @param padding distance kept from the borders. With `half_axis`, the distance the line extends behind the origin.
 * @param half_axis draw only the part ahead of the origin.
 * @param length when given (not 0), the line ends at `origin + length * direction` instead of the border.
 * @returns `null` if the line is outside of the canvas or if `direction` is null.
 */
export function computeLine(
    origin: XY,
    direction: XY,
    width: number,
    height: number,
    padding = 0,
    half_axis = false,
    length?: number,
): [XY, XY] | null {
    if (direction.x === 0 && direction.y === 0) {
        return null
    }

    // A length of 0 means no length.
    const fixedLength = length !== undefined && length !== 0 ? length : null

    let x1: number
    let y1: number
    let x2: number
    let y2: number

    if (direction.x === 0) {
        // vertical line
        x1 = x2 = origin.x
        y1 = half_axis ?
            origin.y - Math.sign(direction.y) * padding :
            (direction.y > 0 ? padding : height - padding)
        y2 = fixedLength !== null ?
            origin.y + fixedLength * direction.y :
            (direction.y > 0 ? height - padding : padding)
    } else if (direction.y === 0) {
        // horizontal line
        y1 = y2 = origin.y
        x1 = half_axis ?
            origin.x - Math.sign(direction.x) * padding :
            (direction.x > 0 ? padding : width - padding)
        x2 = fixedLength !== null ?
            origin.x + fixedLength * direction.x :
            (direction.x > 0 ? width - padding : padding)
    } else {
        // diagonal line: the line is origin + k * direction, with k from -k_start to k_end.
        let k_start: number
        let k_end: number

        if (direction.x > 0) {
            k_start = half_axis ?
                -padding / direction.x :
                fixedLength ?? (origin.x - padding) / direction.x
            k_end = fixedLength ?? (width - origin.x - padding) / direction.x
        } else {
            k_start = half_axis ?
                -padding / direction.x :
                fixedLength ?? (width - origin.x - padding) / direction.x
            k_end = fixedLength ?? (origin.x - padding) / direction.x
        }

        // The coefficients must be positive
        k_start = Math.abs(k_start)
        k_end = Math.abs(k_end)

        x1 = origin.x - k_start * direction.x
        y1 = origin.y - k_start * direction.y
        x2 = origin.x + k_end * direction.x
        y2 = origin.y + k_end * direction.y
    }

    // Determine if the line is visible in the canvas
    if (
        (x1 > width && x2 > width) ||
        (x1 < 0 && x2 < 0) ||
        (y1 > height && y2 > height) ||
        (y1 < 0 && y2 < 0)
    ) {
        return null
    }

    return [{x: x1, y: y1}, {x: x2, y: y2}]
}

/**
 * The part of a segment that is inside a canvas of `width` x `height` pixels, keeping its direction.
 *
 * @returns `null` if no part of the segment is in the canvas.
 */
export function clipSegment(a: XY, b: XY, width: number, height: number): [XY, XY] | null {
    const dx = b.x - a.x
    const dy = b.y - a.y

    // Liang-Barsky: for each border, `p` is how fast the segment goes outside and `q` the distance to it.
    const borders: [number, number][] = [[-dx, a.x], [dx, width - a.x], [-dy, a.y], [dy, height - a.y]]

    let start = 0
    let end = 1

    for (const [p, q] of borders) {
        if (p === 0) {
            // Parallel to the border: either inside it, or outside for good.
            if (q < 0) {
                return null
            }

            continue
        }

        const t = q / p

        if (p < 0) {
            start = Math.max(start, t)
        } else {
            end = Math.min(end, t)
        }

        if (start > end) {
            return null
        }
    }

    return [{x: a.x + start * dx, y: a.y + start * dy}, {x: a.x + end * dx, y: a.y + end * dy}]
}

/** A line given by one of its points and a direction vector. */
export interface LineDefinition {
    point: XY,
    direction: XY
}

/** The mediator of the segment `AB`: through its middle, perpendicular to it. */
export function mediatorOf(A: XY, B: XY): LineDefinition {
    return {
        point: {x: (A.x + B.x) / 2, y: (A.y + B.y) / 2},
        direction: {x: A.y - B.y, y: B.x - A.x}
    }
}

/**
 * The bisector of the angle `B` - `vertex` - `C`: through the vertex, between the two sides. Only the directions of the
 * sides count, not their lengths.
 *
 * @returns a direction with `NaN` components if a side is reduced to the vertex.
 */
export function bisectorOfAngle(vertex: XY, B: XY, C: XY): LineDefinition {
    const sideB = new mathVector(vertex, B)
    const sideC = new mathVector(vertex, C)
    const direction = {
        x: sideB.x / sideB.norm + sideC.x / sideC.norm,
        y: sideB.y / sideB.norm + sideC.y / sideC.norm
    }

    // A straight angle: the sides point opposite ways, the bisector is perpendicular to them.
    if (Math.hypot(direction.x, direction.y) < 1e-12) {
        return {point: vertex, direction: {x: -sideB.y, y: sideB.x}}
    }

    return {point: vertex, direction}
}

/**
 * A bisector of two lines. Two lines that cross have two bisectors, perpendicular to each other, through their common
 * point: the first has the sum of the unit vectors of the directions of the lines as direction, the other (`alternative`)
 * has their difference. Two parallel lines (or the same line) have only one bisector, the line in the middle of them.
 *
 * @returns `NaN` components if a line has a null direction, or for the other bisector of parallel lines.
 */
export function bisectorOfLines(d1: mathLine, d2: mathLine, alternative = false): LineDefinition {
    const crossing = d1.intersection(d2)

    if (crossing === null) {
        if (alternative) {
            return {point: nowhere(), direction: nowhere()}
        }

        const foot = d2.projection(d1.A)

        return {
            point: {x: (d1.A.x + foot.x) / 2, y: (d1.A.y + foot.y) / 2},
            direction: {x: d1.director.x, y: d1.director.y}
        }
    }

    const u1 = d1.director.unit
    const u2 = d2.director.unit

    const sign = alternative ? -1 : 1

    return {point: crossing, direction: {x: u1.x + sign * u2.x, y: u1.y + sign * u2.y}}
}
