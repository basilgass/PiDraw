import type {Domain} from "../../pidraw.common"
import type {Plot} from "../Plot/Plot"

/**
 * The area between two plots, or between a plot and the x axis.
 */
export interface IFillBetweenConfig {
    /** The plot. Without `other`, the area goes from the plot to the x axis. */
    plot: Plot,
    /** The second plot: the area is between the two, on both sides of the places where they cross. */
    other?: Plot,
    /**
     * The abscissas of the area. By default the domain of the plots (where both are drawn), and if they have none what is seen. Only
     * what is seen is drawn, as for a plot.
     */
    domain?: Domain
}
