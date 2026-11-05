import type {XY} from "../pidraw.common"

/** Relative to the size of the equation of a circle and a line, under which the line touches the circle. */
const TANGENT = 1e-12

/** Relative to the larger radius, under which two circles touch. */
const TOUCH = 1e-6

/**
 * The points where a line cuts a circle, in the order of the line from `start` to `end`: two points, one when the line
 * touches the circle, or `null` when it misses it. The line is the whole line, not only the part between `start` and `end`.
 *
 * @returns `null` too if the line is reduced to a point, or if a number is not finite.
 */
export function intersectionCircleLine(center: XY, radius: number, start: XY, end: XY): XY[] | null {
    const dx = end.x - start.x
    const dy = end.y - start.y
    const fx = start.x - center.x
    const fy = start.y - center.y
    const a = dx * dx + dy * dy

    if (![a, fx, fy, radius].every(Number.isFinite) || !(a > 0)) {
        return null
    }

    const b = 2 * (dx * fx + dy * fy)
    const c = fx * fx + fy * fy - radius * radius
    const discriminant = b * b - 4 * a * c
    const scale = b * b + Math.abs(4 * a * c)
    const at = (t: number): XY => ({x: start.x + t * dx, y: start.y + t * dy})

    if (discriminant < -TANGENT * scale) {
        return null
    }

    if (discriminant <= TANGENT * scale) {
        return [at(-b / (2 * a))]
    }

    const root = Math.sqrt(discriminant)

    return [at((-b - root) / (2 * a)), at((-b + root) / (2 * a))]
}

/**
 * The points where two circles cross: two points, one when they touch (from outside or inside), or `null` when they are
 * apart, one is inside the other, or they have the same center (that includes the same circle).
 *
 * @returns `null` too if a number is not finite.
 */
export function intersectionCircleCircle(c0: XY, r0: number, c1: XY, r1: number): XY[] | null {
    const dx = c1.x - c0.x
    const dy = c1.y - c0.y
    const d = Math.hypot(dx, dy)

    if (![d, r0, r1].every(Number.isFinite) || d === 0) {
        return null
    }

    const tolerance = TOUCH * Math.max(r0, r1)

    if (d > r0 + r1 + tolerance || d < Math.abs(r0 - r1) - tolerance) {
        return null
    }

    // `a` is the distance from the first center to the line between the two points, along the line of the centers.
    const a = (r0 * r0 - r1 * r1 + d * d) / (2 * d)
    // `h` is the half of the distance between the two points. It is rounded to 0 when the circles only touch.
    const h = Math.sqrt(Math.max(0, r0 * r0 - a * a))
    const px = c0.x + a * dx / d
    const py = c0.y + a * dy / d

    if (h <= tolerance) {
        return [{x: px, y: py}]
    }

    const rx = -dy * (h / d)
    const ry = dx * (h / d)

    return [{x: px + rx, y: py + ry}, {x: px - rx, y: py - ry}]
}
