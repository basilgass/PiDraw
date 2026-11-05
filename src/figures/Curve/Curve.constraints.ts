import {NumExp} from "../../calculus"
import {InvalidArgumentError} from "../../errors"
import type {Domain} from "../../pidraw.common"
import type {CurveOptions} from "./Curve.types"

// What the options of a curve must be: shared by the figures that draw a curve.

/** How to tell that an option is valid, and what it expects, for the message. */
export interface OptionCheck {
    valid: (value: unknown) => boolean,
    expected: string
}

/** Whether `domain` is `{min, max}` with `min <= max` and, unless `infinite`, finite. */
function isRange(domain: unknown, infinite: boolean): boolean {
    const range = domain as Partial<Domain> | null

    return typeof range === 'object' && range !== null && typeof range.min === 'number' && typeof range.max === 'number'
        && !Number.isNaN(range.min) && !Number.isNaN(range.max) && range.min <= range.max
        && (infinite || (Number.isFinite(range.min) && Number.isFinite(range.max)))
}

const positive = (value: unknown) => typeof value === 'number' && Number.isFinite(value) && value > 0

export const CURVE_CHECKS: Record<keyof CurveOptions, OptionCheck> = {
    domain: {valid: value => isRange(value, false), expected: '{min, max} with finite numbers and min <= max'},
    samples: {valid: positive, expected: 'a finite number greater than 0'},
    tolerance: {valid: positive, expected: 'a finite number greater than 0'},
    maxDepth: {valid: value => Number.isInteger(value) && (value as number) >= 0, expected: 'an integer of 0 or more'},
    asymptoteThreshold: {valid: positive, expected: 'a finite number greater than 0'}
}

/** The values of `y` that a plot draws: `{min, max}` with `min <= max`, that may be infinite. */
export const IMAGE_CHECK: OptionCheck = {valid: value => isRange(value, true), expected: '{min, max} with min <= max'}

/**
 * Check the options of a curve.
 * @param extra the options that the figure has besides the ones of every curve.
 * @throws InvalidArgumentError if an option that is given is not valid.
 */
export function checkCurveOptions(config: CurveOptions, name: string, extra: Record<string, OptionCheck> = {}): void {
    const checks: Record<string, OptionCheck> = {...CURVE_CHECKS, ...extra}
    const values = config as Record<string, unknown>

    for (const [option, check] of Object.entries(checks)) {
        const value = values[option]

        if (value !== undefined && !check.valid(value)) {
            throw new InvalidArgumentError(`Invalid ${option} ${JSON.stringify(value)} for the curve "${name}": expected ${check.expected}`)
        }
    }
}

/**
 * The abscissas that a curve figure asks for: its own domain, or else where all of its plots are drawn (the domain of each plot, and
 * everywhere for a plot that has none).
 *
 * @param given the domain of the config of the figure.
 * @param plots the plots of the figure.
 * @returns the domain, which is empty (`min >= max`) if the plots have no abscissa in common; `null` for no limit.
 */
export function curveDomain(given: Domain | undefined, plots: readonly { config: { domain?: Domain } }[]): Domain | null {
    if (given !== undefined) {
        return {min: given.min, max: given.max}
    }

    const domains = plots.flatMap(plot => plot.config.domain === undefined ? [] : [plot.config.domain])

    return domains.length === 0
        ? null
        : {min: Math.max(...domains.map(domain => domain.min)), max: Math.min(...domains.map(domain => domain.max))}
}

/**
 * Read a function of one variable, and check that it uses no other.
 *
 * @param variable the only variable the function can use (`x` for a plot, `t` for a parametric curve).
 * @param where what the function is, for the message (`of the plot "f"`).
 * @throws ParseError if the expression cannot be read.
 * @throws InvalidArgumentError if it uses a variable other than `variable`.
 */
export function compileExpression(expression: string, variable: string, where: string): NumExp {
    const numExp = new NumExp(expression)

    try {
        numExp.evaluate({[variable]: 0})
    } catch (error) {
        if (error instanceof InvalidArgumentError) {
            throw new InvalidArgumentError(`The function "${expression}" ${where} can only use the variable ${variable}: ${error.message}`, {cause: error})
        }

        throw error
    }

    return numExp
}
