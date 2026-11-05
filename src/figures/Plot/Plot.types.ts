import type {Domain, Exclusive, XY} from "../../pidraw.common"
import type {CurveOptions} from "../Curve/Curve.types"

/** The constructions of a plot, by the key of the config that holds them. */
export interface PlotConstraints {
    /** A function of `x`, written as text (`x^2+1`, `sin(x)`): see `NumExp` for what it can contain. */
    expression: string,
    /**
     * The parabola through three points (a line if they are aligned). The points are positions in pixels (a `Point` fits).
     * If two of them have the same abscissa there is no parabola: the plot does not exist and is not drawn.
     */
    quadratic: { A: XY, B: XY, C: XY }
}

/**
 * How a plot is drawn, whatever its construction. The `domain` is by default what is seen, and no more; `samples` by default
 * one every 8 pixels.
 */
export interface PlotOptions extends CurveOptions {
    /** The values of `y` that are drawn: where the function is out of them, it is not drawn. All by default. */
    image?: Domain
}

/** A plot is given by exactly one construction, then how it is drawn. */
export type IPlotConfig = Exclusive<PlotConstraints> & PlotOptions
