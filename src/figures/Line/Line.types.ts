import type {Exclusive, XY} from "../../pidraw.common"
import type {Line} from "./Line"
import type {Plot} from "../Plot/Plot"

/** What a line is: a whole line, a ray (from its first point), a segment or a vector (an arrow at its end). */
export type ILineType = 'segment' | 'ray' | 'line' | 'vector'

/**
 * How a line finds its place: each key is a constraint, and a line has exactly one. The `XY` are positions in pixels (a
 * `Point` fits); a slope and an equation are in units of the coordinate system.
 */
export interface LineConstraints {
    /**
     * The bisector of an angle (`A` is the vertex), or of two lines or axes: by default the one of the sum of their directions,
     * the other one with `alternative`.
     */
    bisector: { d1: Line, d2: Line, alternative?: boolean } | { A: XY, B: XY, C: XY },
    /** Through `A`, with the vector `d` in pixels. */
    director: { A: XY, d: XY },
    /** An equation in `x` and `y`: `y=2x+1`, `3x=6`, `2x-3y+6=0`. */
    equation: string,
    /** The mediator of the segment `AB`. */
    mediator: { A: XY, B: XY },
    /** Parallel to a line or an axis, through a point. */
    parallel: { to: Line, through: XY },
    /** Perpendicular to a line or an axis, through a point. */
    perpendicular: { to: Line, through: XY },
    /** Through `A`, with a slope in units of the coordinate system. */
    slope: { A: XY, slope: number },
    /** Through two points. The only constraint, with `director`, of a segment and a vector. */
    through: { A: XY, B: XY },
    /** The tangent to the curve `f` at the abscissa of `A`, through `A`. */
    tangent: { f: Plot, A: XY }
}

/** Exactly one of the {@link LineConstraints}. */
export type LineConstraint = Exclusive<LineConstraints>

export interface ILineOptions {
    /** `'line'` by default. */
    shape?: ILineType
}

export type ILineConfig = LineConstraint & ILineOptions

/** The config of a line as it keeps it: the shape is always there, by default or as asked. */
export type ILineResolvedConfig = ILineConfig & Required<ILineOptions>
