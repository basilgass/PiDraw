import type {BezierDirection} from "../../calculus"
import type {Exclusive, XY} from "../../pidraw.common"

export type {BezierDirection}

/** A point that a smooth curve goes through, and how the curve goes through it. */
export interface BezierPoint {
    /** A position in pixels (a `Point` fits). */
    point: XY,
    /**
     * The direction of the curve at the point: `'horizontal'` or `'vertical'` (the sense is the one that goes toward the other points),
     * or an angle in degrees, counterclockwise as seen on the screen. By default the curve is smooth: it goes along the line between
     * the neighbours of the point.
     */
    direction?: BezierDirection,
    /** How far the control points are from the point, as a part of the distance between its neighbours. 0.2 by default; a number greater than 0. */
    ratio?: number
}

/** The constructions of a Bézier curve, by the key of the config that holds them. */
export interface BezierConstraints {
    /** The smooth curve that goes through the points, 2 or more. */
    through: BezierPoint[],
    /** The curve pulled by 3 (a quadratic curve) or 4 (a cubic curve) control points: it starts at the first, ends at the last, and is not on the others. */
    controls: XY[]
}

/** How a Bézier curve is drawn, whatever its construction. */
export interface BezierOptions {
    /** The last point is joined to the first one, and the curve is smooth there too. Only for a curve through at least 3 points. */
    closed?: boolean
}

/**
 * A Bézier curve is given by exactly one construction.
 *
 * A curve that does not exist (a position that does not exist) is not drawn.
 */
export type IBezierConfig = Exclusive<BezierConstraints> & BezierOptions
