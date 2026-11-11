import type {Exclusive, XY} from "../../pidraw.common"
import type {NodeAnchor, NodeShape} from "../../calculus"
import type {Circle} from "../Circle/Circle"
import type {Line} from "../Line/Line"
import type {Plot} from "../Plot/Plot"
import type {Point} from "./Point"

/** A number in units of the coordinate system, or what gives one: the abscissa / ordinate of a point, a distance. */
export type PointCoordinateType = number | { point: Point, axis: 'x' | 'y' } | { point1: Point, point2: Point }

export interface PointConfigCoordinates {
    x: PointCoordinateType,
    y: PointCoordinateType,
}

export type PointShape = 'circle' | 'square' | 'crosshair'

/**
 * How a point finds its position: each key is a constraint, and a point has exactly one. The `XY` are positions in
 * pixels (a `Point` fits), the distances are in units of the coordinate system.
 */
export interface PointConstraints {
    /** A point given by its coordinates, in units of the coordinate system. */
    coordinates: PointConfigCoordinates,
    /** Moves from `point` along an axis, a line (or its normal if `perpendicular`) or a vector `AB` (then `distance` is a factor). */
    direction: {
        point: XY,
        direction: Line | { A: XY, B: XY },
        distance: number,
        perpendicular?: boolean
    },
    /** The point of the curve `fx` at the abscissa `x`, in units of the coordinate system. No position where `fx` is not defined. */
    evaluation: { fx: Plot, x: PointCoordinateType },
    /** The common point of two lines or axes. No position if they are parallel. */
    intersection: { A: Line, B: Line },
    /** `index` is the rank (0 or 1) of the intersection among the two. No position if there is no such intersection. */
    intersectionBetweenCircles: { A: Circle, B: Circle, index: number },
    /** `index` is the rank (0 or 1) of the intersection among the two. No position if there is no such intersection. */
    intersectionWithCircle: { A: Circle, B: Line, index: number },
    /** The middle of two points. */
    middle: { A: XY, B: XY },
    /** The foot of the perpendicular from `point` to a line or an axis. */
    projection: { axis: Line, point: XY },
    /** The symmetric of `A` about a point, a line or an axis. */
    symmetry: { A: XY, B: XY | Line },
    /** A named place of the node of a point (`A.tr`): on its border, or its center. No position while the node has none. */
    anchor: { node: Point, position: NodeAnchor },
}

/** Exactly one of the {@link PointConstraints}. */
export type PointConstraint = Exclusive<PointConstraints>

export interface IPointOptions {
    /** `'circle'` by default. */
    shape?: PointShape,
    /**
     * Side of the box that holds the shape, in units of the svg: the diameter of the circle, the side of the square,
     * the width of the cross. By default 5 for a circle, 10 for the others.
     */
    size?: number,
    /**
     * The point is a node: a box (`'rect'`, `'round'`, `'diamond'` or `'circle'`) around its label, as big as the label asks, instead of
     * a mark. Not with a `shape` or a `size`.
     */
    node?: NodeShape,
}

export type IPointConfig = PointConstraint & IPointOptions

/** The config of a point as it keeps it: the shape and the size are always there, by default or as asked. */
export type IPointResolvedConfig = IPointConfig & Required<Pick<IPointOptions, 'shape' | 'size'>>
