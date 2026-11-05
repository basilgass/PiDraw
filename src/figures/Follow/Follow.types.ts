import type {XY} from "../../pidraw.common"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"

/**
 * A point that follows the mouse along a figure, and the tangent of the figure at that point.
 *
 * The figure must be one that a point can follow (`followable`): a line, a circle, a plot, a parametric curve.
 */
export interface IFollowConfig {
    /** The figure the point follows. */
    follow: AbstractFigure,
    /** Draw the tangent of the figure at the point. Not drawn by default. */
    tangent?: boolean,
    /** The diameter of the point, in pixels. 10 by default. */
    size?: number,
    /**
     * Where the point is before the mouse moves, in pixels (a `Point` fits): the point of the figure that is the closest to it. By
     * default the origin of the coordinate system.
     */
    at?: XY
}
