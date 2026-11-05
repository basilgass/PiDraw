import type {PARSER, PARSER_VALUES} from "piparser"
import {InvalidArgumentError, ParseError} from "../errors"
import {NumExp} from "../calculus"
import {type Domain, isDomain} from "../pidraw.common"
import {buildError, describeValue} from "./parser.common"

// What follows the functions of a curve in a line of code (`plot`, `parametric`): a number of samples, a domain and, for a
// function of x, an image. They are shared by the builders of the curves.

export interface CurveValues {
    /** The samples per unit (`@50`). */
    samples?: number,
    /** The first interval (`-3:3`, `0:2pi`). */
    domain?: Domain,
    /** The second interval: the values of `y` that a plot draws. */
    image?: Domain
}

/** One bound of an interval: a number, or an expression without variable (`pi`, `.5pi`, `2pi`, `pi/2`). */
function bound(text: string, item: PARSER, expected: string): number {
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

    return buildError(item, expected, `${JSON.stringify(text)} as a bound (a number, or an expression of numbers like 2pi)`)
}

/** An interval written `min:max`, each bound a number or an expression like `2pi`. */
function interval(text: string, item: PARSER, expected: string): Domain {
    const bounds = text.split(':')

    if (bounds.length !== 2 || bounds.some(part => part.trim() === '')) {
        return buildError(item, expected, `${JSON.stringify(text)} (expected min:max)`)
    }

    const min = bound(bounds[0], item, expected)
    const max = bound(bounds[1], item, expected)

    if (min > max) {
        return buildError(item, expected, `${JSON.stringify(text)}, whose minimum is greater than its maximum`)
    }

    return {min, max}
}

/**
 * A function of a curve, as the parser gives it: text, or a number (a constant). The samples written at its end (`sin(x)@50`)
 * are not part of it.
 *
 * @returns the function, and the samples as a value for {@link curveValues} (`['@50']`, or nothing).
 */
export function splitFunction(value: PARSER_VALUES | undefined): { text: string, samples: string[] } | null {
    if (typeof value === 'number') {
        return {text: String(value), samples: []}
    }

    if (typeof value !== 'string') {
        return null
    }

    const at = value.lastIndexOf('@')

    return at < 0 ? {text: value, samples: []} : {text: value.slice(0, at), samples: [value.slice(at)]}
}

/**
 * Read what follows the functions of a curve: in any order, a number of samples per unit, written `@50` (alone, or at the end
 * of another value: `sin(x)@50`, `-pi:pi@12`) and the intervals `min:max`. The first interval is the domain, the second one
 * the image.
 *
 * @param values the values after the functions.
 * @param intervals how many intervals the curve has: 1 (the domain) or 2 (the domain and the image).
 * @param expected what the line of code expects, for the message.
 * @throws ParseError if a value is none of those, the number of samples is not greater than 0, there are two numbers of
 * samples or more intervals than the curve has, or a bound is not a number (or an expression of numbers).
 */
export function curveValues(values: PARSER_VALUES[], item: PARSER, intervals: 1 | 2, expected: string): CurveValues {
    const result: CurveValues = {}
    const found: Domain[] = []

    for (const value of values) {
        let rest: PARSER_VALUES = value

        if (typeof value === 'string' && value.includes('@')) {
            const at = value.lastIndexOf('@')
            const samples = +value.slice(at + 1)

            if (result.samples !== undefined || value.slice(at + 1).trim() === '' || !Number.isFinite(samples) || samples <= 0) {
                buildError(item, expected, `${describeValue(value)} as the samples (a single @ and a number greater than 0)`)
            }

            result.samples = samples
            rest = value.slice(0, at)
        }

        if (rest === '') {
            continue
        }

        if (found.length >= intervals) {
            buildError(item, expected, `${describeValue(value)} after the ${intervals === 1 ? 'domain' : 'domain and the image'}`)
        }

        if (typeof rest === 'string') {
            found.push(interval(rest, item, expected))
        } else if (isDomain(rest)) {
            found.push({min: rest.min, max: rest.max})
        } else {
            buildError(item, expected, describeValue(value))
        }
    }

    if (found.length > 0) {
        result.domain = found[0]
    }

    if (found.length > 1) {
        result.image = found[1]
    }

    return result
}
