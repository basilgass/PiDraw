import type {XY} from "../../pidraw.common"
import type {Line} from "../Line/Line"

/**
 * The radius of a circle: a number, in units of the x axis; a position in pixels (a `Point` fits), a point of the circle,
 * so the radius is its distance to the center; or two positions, the radius is the distance between them.
 */
export type CircleRadius = number | XY | { point1: XY, point2: XY }

/** A circle given by its center (a position in pixels, a `Point` fits) and its radius. */
export interface CircleByRadius {
    center: XY,
    radius: CircleRadius
}

/** The circle that goes through three points (the circumscribed circle of the triangle). */
export interface CircleThrough {
    through: { A: XY, B: XY, C: XY }
}

/**
 * The circle of a given center that is tangent to a line, or to one of the axes `'Ox'` and `'Oy'` (the horizontal and the
 * vertical through the origin): the radius is the distance from the center to it.
 */
export interface CircleTangent {
    tangent: { center: XY, to: Line }
}

/** The circle that has the segment `AB` for diameter. */
export interface CircleDiameter {
    diameter: { A: XY, B: XY }
}

/** The circle inside the triangle `ABC`, tangent to its three sides. */
export interface CircleInscribed {
    inscribed: { A: XY, B: XY, C: XY }
}

/** The keys of every construction of a circle. */
export type CircleKeys = keyof (CircleByRadius & CircleThrough & CircleTangent & CircleDiameter & CircleInscribed)

/** One construction of a circle, with the keys of the others forbidden: the members of {@link ICircleConfig}. */
export type CircleOnly<T> = T & Partial<Record<Exclude<CircleKeys, keyof T>, never>>

/** A circle is given by exactly one construction. */
export type ICircleConfig =
    CircleOnly<CircleByRadius>
    | CircleOnly<CircleThrough>
    | CircleOnly<CircleTangent>
    | CircleOnly<CircleDiameter>
    | CircleOnly<CircleInscribed>
