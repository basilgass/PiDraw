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
