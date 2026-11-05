import {InvalidArgumentError} from "../../errors"
import {NumExp} from "../../calculus"
import {checkCurveOptions, compileExpression} from "../Curve/Curve.constraints"
import type {IParametricConfig} from "./Parametric.types"

/** The two functions of a parametric curve, compiled. */
export interface ParametricFunctions {
    x: NumExp,
    y: NumExp
}

/** Compile a function of `t`; `t` is the only variable it can use. */
function compileFunction(expression: unknown, which: 'x' | 'y', name: string): NumExp {
    if (typeof expression !== 'string') {
        throw new InvalidArgumentError(`Invalid function ${JSON.stringify(expression)} of ${which} for the curve "${name}": expected text`)
    }

    return compileExpression(expression, 't', `of ${which} of the curve "${name}"`)
}

/**
 * Check a config, and compile its functions.
 *
 * @throws InvalidArgumentError if the functions are not text, use a variable other than `t`, or an option is not valid.
 * @throws ParseError if a function cannot be read.
 */
export function compile(config: IParametricConfig, name: string): ParametricFunctions {
    checkCurveOptions(config, name)

    const expressions = config.expressions as IParametricConfig['expressions'] | undefined

    if (typeof expressions !== 'object') {
        throw new InvalidArgumentError(`The curve "${name}" needs its functions: {expressions: {x, y}}`)
    }

    return {x: compileFunction(expressions.x, 'x', name), y: compileFunction(expressions.y, 'y', name)}
}
