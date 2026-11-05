import {InvalidArgumentError, ParseError} from "../errors"
import {NumExp} from "./NumExp"

/** The coefficients of the line `ax + by + c = 0`. */
export interface LinearEquation {
    a: number,
    b: number,
    c: number
}

/** Points where the equation is checked to be linear, besides the three that give its coefficients. */
const CHECKS = [[1, 1], [2, -3], [-4, 5]]

/**
 * The coefficients of an equation of a line in `x` and `y`, written with any terms on both sides: `y=2x+1`, `3x=6`,
 * `y=x/2`, `2x-3y+6=0`. The syntax of the sides is the one of {@link NumExp}.
 *
 * The coefficients are those of `left - right = 0`, so the two sides swapped give the opposite coefficients.
 *
 * @throws ParseError if the text is not an equation with one `=`, a side is malformed, the equation is not linear
 * (`y=x^2`, `xy=1`), or it is not the equation of a line (`1=1`, `1=2`).
 */
export function parseLinearEquation(equation: string): LinearEquation {
    const fail = (reason: string, cause?: unknown) =>
        new ParseError(`Cannot parse "${equation}" as the equation of a line: ${reason}`, {cause})

    const sides = equation.split('=')
    if (sides.length !== 2) {
        throw fail('expected one "="')
    }

    let difference: NumExp
    try {
        difference = new NumExp(`(${sides[0]})-(${sides[1]})`)
    } catch (error) {
        throw fail(error instanceof Error ? error.message : 'malformed', error)
    }

    const value = (x: number, y: number) => {
        try {
            return difference.evaluate({x, y})
        } catch (error) {
            // A variable that is neither x nor y.
            if (error instanceof InvalidArgumentError) {
                throw fail('only x and y are allowed', error)
            }

            throw error
        }
    }

    const c = value(0, 0)
    const a = value(1, 0) - c
    const b = value(0, 1) - c

    const isLinear = CHECKS.every(([x, y]) => {
        const expected = a * x + b * y + c

        return Math.abs(value(x, y) - expected) <= 1e-8 * (1 + Math.abs(expected))
    })

    if (![a, b, c].every(Number.isFinite) || !isLinear) {
        throw fail('it is not linear in x and y')
    }

    if (Math.abs(a) < 1e-9 && Math.abs(b) < 1e-9) {
        throw fail('x and y are both missing')
    }

    return {a, b, c}
}
