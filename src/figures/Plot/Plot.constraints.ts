import {MathError} from "../../errors"
import {NumExp, quadraticThroughABC, toCoordinates} from "../../calculus"
import type {IGraphConfig} from "../../pidraw.common"
import {constraintIn, positions, resolveIn} from "../constraints"
import {checkCurveOptions, compileExpression, IMAGE_CHECK} from "../Curve/Curve.constraints"
import type {IPlotConfig, PlotConstraints} from "./Plot.types"

// What a plot is made of, according to its construction: pure functions from the config to the expression of the function.

/**
 * How to find the expression of each construction, or `null` when the plot does not exist (a parabola through points that have
 * the same abscissa).
 */
const RESOLVERS: { [K in keyof PlotConstraints]: (value: PlotConstraints[K], graph: IGraphConfig) => string | null } = {
    expression: expression => expression,

    quadratic: (points, graph) => {
        const {A, B, C} = positions(points, 'points of the parabola')

        try {
            return quadraticThroughABC(toCoordinates(A, graph), toCoordinates(B, graph), toCoordinates(C, graph))
        } catch (error) {
            if (error instanceof MathError) {
                return null
            }

            throw error
        }
    }
}

/** The only construction of a plot. @throws InvalidArgumentError if the config has none, or several. */
export function constructionOf(config: IPlotConfig, name: string): keyof PlotConstraints {
    return constraintIn(RESOLVERS, config, name, 'plot')
}

/** The expression of the function of the construction `key` of a config that holds it, or `null` if the plot does not exist. */
export function resolveExpression(key: keyof PlotConstraints, config: IPlotConfig, graph: IGraphConfig): string | null {
    return resolveIn(RESOLVERS, key, config, graph)
}

/**
 * Check a config, and compile its function.
 *
 * @returns the expression and its compiled form, or `null` if the plot does not exist.
 * @throws InvalidArgumentError if the config has no construction, or several, an option that is not valid, a position that is
 * not `{x, y}`, or a function that uses a variable other than `x`.
 * @throws ParseError if the expression cannot be read.
 */
export function compile(config: IPlotConfig, name: string, graph: IGraphConfig): { expression: string, numExp: NumExp } | null {
    const key = constructionOf(config, name)

    checkCurveOptions(config, name, {image: IMAGE_CHECK})

    const expression = resolveExpression(key, config, graph)

    if (expression === null) {
        return null
    }

    return {expression, numExp: compileExpression(expression, 'x', `of the plot "${name}"`)}
}
