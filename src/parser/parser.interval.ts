import {NumExp} from "../calculus"
import {InvalidArgumentError, ParseError} from "../errors"
import {isDomain} from "../pidraw.common"
import {describeValue} from "./parser.common"

// An interval written in a line of code or in the parameters of the graph: `min:max`, or `n` for `-n:n`, whose bounds can be numbers or
// expressions of numbers (`2pi`). Shared by what reads one (the window, a grid).

/** An interval of the coordinate system. */
export interface Interval {
    min: number,
    max: number
}

/** One bound of an interval: a number, or an expression without variable (`pi`, `2pi`). */
function bound(text: string, key: string): number {
    try {
        const value = new NumExp(text).evaluate()

        if (Number.isFinite(value)) {
            return value
        }
    } catch (error) {
        if (!(error instanceof ParseError || error instanceof InvalidArgumentError)) {
            throw error
        }
    }

    throw new ParseError(`Cannot read the parameter "${key}": ${JSON.stringify(text)} is not a number, or an expression of numbers like 2pi`)
}

/** Whether a value is written as an interval (`-3:3`, `0:2pi`). A single number is not. */
export function isIntervalValue(value: unknown): boolean {
    return (isDomain(value) && !('step' in value)) || (typeof value === 'string' && value.includes(':'))
}

/**
 * The interval that a value gives: what the parser reads as an interval (`-3:3`), a text (`0:2pi`), or `n` for `-n:n`.
 *
 * @param key the name of what is read, for the messages.
 * @throws ParseError if the value is none of those, a bound is not a number, or the minimum is not lower than the maximum.
 */
export function readInterval(value: unknown, key: string): Interval {
    let min: number
    let max: number

    if (isDomain(value) && !('step' in value)) {
        ({min, max} = value)
    } else if (typeof value === 'number' || (typeof value === 'string' && !value.includes(':'))) {
        max = typeof value === 'number' ? value : bound(value, key)
        min = -max
    } else if (typeof value === 'string') {
        const [first, second, ...rest] = value.split(':')

        if (rest.length > 0 || first.trim() === '' || second.trim() === '') {
            throw new ParseError(`Cannot read the parameter "${key}=${value}": expected min:max, or one number for -n:n`)
        }

        min = bound(first, key)
        max = bound(second, key)
    } else {
        throw new ParseError(`Cannot read the parameter "${key}=${describeValue(value)}": expected min:max, or one number for -n:n`)
    }

    if (!(Number.isFinite(min) && Number.isFinite(max) && min < max)) {
        throw new ParseError(`Invalid interval ${describeValue(value)} for the parameter "${key}": expected a minimum lower than the maximum`)
    }

    return {min, max}
}
