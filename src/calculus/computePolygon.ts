import type {XY} from "../pidraw.common"
import {nearestOnPolyline, pathNumber} from "./computeCurve"
import {cartesianToAngle, distanceAB, isDefinedPosition, nowhere, polarToCartesian} from "./geometry"

// The vertices of a regular polygon, or a regular star polygon, in pixels. Angles are in degrees, counterclockwise as seen on the
// screen (the y axis of the screen points down, see `polarToCartesian`).

/** A polygon: its vertices, and the closed paths that are drawn through them (the indices of the vertices, in order). */
export interface PolygonShape {
    vertices: XY[],
    cycles: number[][]
}

export function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b)
}

/**
 * The closed paths of the regular polygon `{sides/step}`: the vertices are joined `step` by `step`. A step of 1 is the convex
 * polygon; `{5/2}` is the pentagram. When `sides` and `step` have a common divisor the figure is made of several polygons:
 * `{6/2}` is two triangles.
 */
export function polygonCycles(sides: number, step = 1): number[][] {
    const count = gcd(sides, step)
    const length = sides / count

    return Array.from({length: count}, (_, start) => Array.from({length}, (__, i) => (start + i * step) % sides))
}

/**
 * The regular polygon `{sides/step}` of a given center and radius, its first vertex above the center, then counterclockwise.
 *
 * @returns `null` if the polygon does not exist: a position or a radius that does not exist, or a radius that is not greater than 0.
 */
export function regularPolygon(center: XY, radius: number, sides: number, step = 1): PolygonShape | null {
    if (!isDefinedPosition(center) || !Number.isFinite(radius) || radius <= 0) {
        return null
    }

    const vertices = Array.from({length: sides}, (_, i) => polarToCartesian(center.x, center.y, radius, 90 + i * 360 / sides))

    return {vertices, cycles: polygonCycles(sides, step)}
}

/**
 * The regular polygon `{sides/step}` that has the segment `[AB]` for one of its sides (`step` of 1), or for one of the segments of
 * its star: two vertices that the star joins. The polygon is on the left of `A` to `B` as seen on the screen, and `A`, `B` come
 * in this order counterclockwise.
 *
 * @returns `null` if the polygon does not exist: a position that does not exist, or `A` and `B` at the same place.
 */
export function regularPolygonOnSide(A: XY, B: XY, sides: number, step = 1): PolygonShape | null {
    const length = isDefinedPosition(A) && isDefinedPosition(B) ? distanceAB(A, B) : NaN

    if (!Number.isFinite(length) || length === 0) {
        return null
    }

    const angle = Math.PI * step / sides
    const direction = cartesianToAngle(A, B)
    // The center is on the left of the segment, at the distance that makes the angle at the center the one of the side.
    const center = polarToCartesian((A.x + B.x) / 2, (A.y + B.y) / 2, length / (2 * Math.tan(angle)), direction + 90)
    const radius = length / (2 * Math.sin(angle))
    const first = cartesianToAngle(center, A)
    const vertices = Array.from({length: sides}, (_, i) => polarToCartesian(center.x, center.y, radius, first + i * 360 / sides))

    return {vertices, cycles: polygonCycles(sides, step)}
}

/** The center of the vertices of a polygon, where its label goes. */
export function polygonCentroid(vertices: XY[]): XY {
    const sum = vertices.reduce((acc, p) => ({x: acc.x + p.x, y: acc.y + p.y}), {x: 0, y: 0})

    return {x: sum.x / vertices.length, y: sum.y / vertices.length}
}

/**
 * The point of the outline of a polygon that is the closest to a position (the inside is not followed). A star made of several
 * polygons is looked at polygon by polygon.
 *
 * @returns the point (a position of its own).
 */
export function nearestOnPolygon(shape: PolygonShape, position: XY): XY {
    let best = nowhere()
    let distance = Infinity

    for (const cycle of shape.cycles) {
        const outline = [...cycle, cycle[0]].map(index => shape.vertices[index])
        const candidate = nearestOnPolyline(outline, position)
        const d = Math.hypot(candidate.x - position.x, candidate.y - position.y)

        if (d < distance) {
            distance = d
            best = candidate
        }
    }

    return best
}

/** The svg path of a polygon: one closed path per cycle, with 2 decimals at most. */
export function polygonPath(shape: PolygonShape): string {
    return shape.cycles
        .map(cycle => cycle.map((index, i) => `${i === 0 ? 'M' : 'L'} ${pathNumber(shape.vertices[index].x)} ${pathNumber(shape.vertices[index].y)}`).join(' ') + ' Z')
        .join(' ')
}
