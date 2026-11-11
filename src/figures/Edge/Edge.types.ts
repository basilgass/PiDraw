import type {EdgeSide} from "../../calculus"
import type {Point} from "../Point/Point"

export type {EdgeSide}

/**
 * An edge: a curve from a point to another that stops at their borders (a node has one, a point that is not a node is its own border),
 * or, from a point to itself, a loop.
 *
 * The points are kept in the config, so the edge is drawn again when one of them moves or changes its size.
 */
export interface IEdgeConfig {
    /** Where the edge starts. */
    from: Point,
    /** Where the edge ends. The same point as `from` makes a loop. */
    to: Point,
    /**
     * How much the edge is bent: the middle of it is moved sideways by this part of the distance between the points, to the left of the way
     * for a positive number and to the right for a negative one, as seen on the screen. 0 (the default) is a straight line. Not for a loop.
     */
    curve?: number,
    /** The side of the point where a loop is: `'t'` (the default), `'r'`, `'b'` or `'l'`. Only for a loop (`from` is `to`); `loop` and `side` are options of other figures, so the option is `loopSide`. */
    loopSide?: EdgeSide
}
