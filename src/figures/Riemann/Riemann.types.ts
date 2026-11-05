import type {Domain} from "../../pidraw.common"
import type {Plot} from "../Plot/Plot"

/**
 * A Riemann sum: rectangles from the x axis to the graph of a plot, the domain cut in intervals of the same width.
 */
export interface IRiemannConfig {
    /** The plot whose sum is drawn. */
    plot: Plot,
    /** What is cut in rectangles. By default the domain of the plot, which then must have one (the plot is not drawn on a domain by default). */
    domain?: Domain,
    /** How many rectangles, an integer from 1 to 1000. 5 by default. */
    rectangles?: number,
    /**
     * Where the plot is read in each interval, from 0 (its left end) to 1 (its right end): 0.5 is the middle. 0 by default.
     */
    position?: number
}
