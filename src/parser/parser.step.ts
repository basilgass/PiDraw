import {ParseError} from "../errors"
import type {IParserParameters} from "./parser.types"
import {describeValue} from "./parser.common"

// How the parameters and the lines of code write a step (of a grid, of the ticks of an axis): a number, or a multiple of pi over an integer.

/** A number of pi, written `pi`, `2pi` or `.5pi`. */
const PI_MULTIPLE = /^(\d*\.?\d*)pi$/

/** A number of pi in a line of code, over an integer: `pi`, `2pi`, `pi/3`, `2pi/3`. */
const PI_FRACTION = /^(\d*\.?\d*)pi(?:\/(\d+))?$/

/** The default denominator of a step in pi: `grid=pi` is a step of pi/2. */
const DEFAULT_DENOMINATOR = 2

/** A step read from a parameter: its length in units, and whether it was written as a multiple of pi. */
export interface IStep {
    step: number,
    pi: boolean
}

function stepError(text: string, expected: string): never {
    throw new ParseError(`Cannot read the parameter ${text}: expected ${expected}`)
}

/**
 * The step that a parameter gives:
 * - the word alone: no step (`null`);
 * - `0.5`: a step of 0.5;
 * - `pi`, `2pi`, `pi/3`, `2pi/3`: a step of pi/2, 2pi/2, pi/3, 2pi/3 (the denominator is the option, 2 by default).
 *
 * @param key the name of the parameter, for the messages.
 * @throws ParseError if the value is none of those, a number is not greater than 0, or the denominator is not an integer greater than 0.
 */
export function parseStep({value, options}: IParserParameters, key: string): IStep | null {
    const text = `"${key}=${[value, ...options].map(item => describeValue(item)).join('/')}"`

    if (value === true) {
        return options.length === 0 ? null : stepError(text, `no option after ${key}`)
    }

    if (typeof value === 'number') {
        if (options.length > 0 || !(Number.isFinite(value) && value > 0)) {
            stepError(text, `a step greater than 0 (${key}=0.5)`)
        }

        return {step: value, pi: false}
    }

    const multiple = typeof value === 'string' ? PI_MULTIPLE.exec(value) : null

    if (multiple === null) {
        return stepError(text, `a step (${key}=0.5, ${key}=pi, ${key}=2pi/3), got ${describeValue(value)}`)
    }

    const numerator = multiple[1] === '' ? 1 : +multiple[1]
    const denominator = options.length === 0 ? DEFAULT_DENOMINATOR : options[0]

    if (options.length > 1 || typeof denominator !== 'number' || !Number.isInteger(denominator) || denominator <= 0 || !(numerator > 0)) {
        stepError(text, `a multiple of pi over an integer greater than 0 (${key}=pi/3)`)
    }

    return {step: numerator * Math.PI / denominator, pi: true}
}

/**
 * The step that a value of a line of code gives: a number (`0.5`), or a multiple of pi over an integer (`pi/3`; `pi` is pi/2).
 * @returns `null` if the value is none of those.
 */
export function parseStepValue(value: unknown): IStep | null {
    if (typeof value === 'number') {
        return Number.isFinite(value) && value > 0 ? {step: value, pi: false} : null
    }

    const fraction = typeof value === 'string' ? PI_FRACTION.exec(value) : null

    if (fraction === null) {
        return null
    }

    const numerator = fraction[1] === '' ? 1 : +fraction[1]
    const denominator = fraction.at(2) === undefined ? DEFAULT_DENOMINATOR : +fraction[2]

    return numerator > 0 && denominator > 0 ? {step: numerator * Math.PI / denominator, pi: true} : null
}

/** A parameter that is not there, or is `false`, is no parameter. */
export const given = (parameter: IParserParameters | undefined): parameter is IParserParameters => parameter !== undefined && parameter.value !== false
