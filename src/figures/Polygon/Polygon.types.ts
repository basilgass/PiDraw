import type {Exclusive, XY} from "../../pidraw.common"

/** The radius of a regular polygon: a number, in units of the x axis, or the distance between two positions. */
export type PolygonRadius = number | { point1: XY, point2: XY }

/** The polygon that goes through the points, in this order. */
export type PolygonVertices = XY[]

/**
 * The regular polygon of a center and a radius, with `sides` sides (an integer from 3 to 1000). Its first vertex is above the
 * center, then they follow counterclockwise.
 *
 * `star` makes it a regular star polygon `{sides/star}`: the vertices are joined `star` by `star` (`{5/2}` is the pentagram),
 * with `star` an integer from 1 (the convex polygon, the default) to less than half of `sides`. When `sides` and `star` have a
 * common divisor the figure is made of several polygons: `{6/2}` is two triangles.
 */
export interface PolygonRegular {
    center: XY,
    radius: PolygonRadius,
    sides: number,
    star?: number
}

/**
 * The regular polygon that has the segment `[AB]` for a side, on the left of `A` to `B` as seen on the screen (swap `A` and `B`
 * for the other side). `A` and `B` are two consecutive vertices, in this order counterclockwise.
 *
 * With `star`, `[AB]` is one of the segments of the star `{sides/star}`: two vertices that the star joins.
 */
export interface PolygonOnSide {
    A: XY,
    B: XY,
    sides: number,
    star?: number
}

/** The constructions of a polygon, by the key of the config that holds them. */
export interface PolygonConstraints {
    vertices: PolygonVertices,
    regular: PolygonRegular,
    onSide: PolygonOnSide
}

/**
 * A polygon is given by exactly one construction.
 *
 * A polygon that does not exist (a position that does not exist, a radius that is not greater than 0, two vertices of a side that
 * are the same) is not drawn.
 */
export type IPolygonConfig = Exclusive<PolygonConstraints>
