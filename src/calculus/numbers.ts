import {ParseError} from "../errors"

/**
 * Round to `number_of_digits` decimals, to hide the floating point noise (`0.1+0.2` gives `0.3`).
 * A value too big to have decimals is returned as is. A negative zero gives `0`.
 */
export function numberCorrection(value: number, number_of_digits = 10): number {
    const factor = 10 ** number_of_digits
    const scaled = value * factor

    if (!Number.isFinite(scaled) || Math.abs(scaled) >= Number.MAX_SAFE_INTEGER) {
        return value
    }

    return Math.round(scaled) / factor + 0
}

/** A fraction in lowest terms: the sign is the one of the numerator. */
export interface Fraction {
    numerator: number,
    denominator: number
}

/** The tolerance of {@link toFraction}: floating point noise, not a rounding. */
const FRACTION_EPSILON = 1e-9

/**
 * The fraction in lowest terms that is `value`, with a denominator of `maxDenominator` at most.
 * @returns `null` if no such fraction is equal to `value` (`0.333` is not `1/3`), or if `value` is not finite.
 */
export function toFraction(value: number, maxDenominator = 100): Fraction | null {
    if (!Number.isFinite(value)) {
        return null
    }

    // The first denominator that fits is the smallest one: the fraction is in lowest terms.
    for (let denominator = 1; denominator <= maxDenominator; denominator++) {
        const numerator = Math.round(value * denominator)

        if (Math.abs(value - numerator / denominator) <= FRACTION_EPSILON) {
            return {numerator: numerator + 0, denominator}
        }
    }

    return null
}

/** A fraction in TeX: `3`, `\frac{3}{2}`, `-\frac{1}{4}`. */
export function fractionToTex({numerator, denominator}: Fraction): string {
    if (denominator === 1) {
        return String(numerator)
    }

    return `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`
}

/** A fraction as a plain text: `3`, `3/2`, `-1/4`. */
export function fractionToText({numerator, denominator}: Fraction): string {
    return denominator === 1 ? String(numerator) : `${numerator}/${denominator}`
}

/**
 * A number, or a fraction written as a string (`'2/3'`).
 *
 * @throws ParseError if the string is neither a number nor a fraction of two numbers.
 */
export function toNumber(value: number | string): number {
    if (typeof value === 'number') {
        return value
    }

    const parts = value.split('/')
    const numbers = parts.map(part => part.trim() === '' ? NaN : +part)

    if (parts.length > 2 || numbers.some(isNaN)) {
        throw new ParseError(`Cannot parse "${value}" as a number or a fraction`)
    }

    return parts.length === 2 ? numbers[0] / numbers[1] : numbers[0]
}
