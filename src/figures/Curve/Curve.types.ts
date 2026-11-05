import type {Domain} from "../../pidraw.common"

/** How a curve (`Plot`, `Parametric`) is sampled and drawn. */
export interface CurveOptions {
    /** The values of the variable that are drawn. The default is the one of each figure. */
    domain?: Domain,
    /** How many samples per unit of the variable the curve starts from, before it is refined where it bends. */
    samples?: number,
    /** How far from the curve the drawn line may be, in pixels. 0.5 by default. */
    tolerance?: number,
    /** How many times an interval may be cut in two to follow a curve that bends. 6 by default. */
    maxDepth?: number,
    /**
     * Where a curve is taken for an asymptote, in heights of the graph: a point farther than this from the origin is not
     * drawn, and the curve is cut where it jumps farther than this. 10 by default.
     */
    asymptoteThreshold?: number
}
