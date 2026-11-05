import type {XY} from "../pidraw.common"
import {MathError} from "../errors"

/**
 * The expression `ax^2+bx+c` of the parabola through three points, to be given to `NumExp`. The coefficients have
 * up to 10 decimals, and the null ones are omitted.
 *
 * @throws MathError if two points have the same abscissa.
 */
export function quadraticThroughABC(A: XY, B: XY, C: XY): string {
    const {a, b, c} = quadraticThroughPoints(A, B, C)

    // Fixed notation: NumExp does not read an exponent ("1e-7").
    const format = (value: number) => value.toFixed(10).replace(/\.?0+$/, '')
    const terms: string[] = []

    for (const [value, variable] of [[a, 'x^2'], [b, 'x'], [c, '']] as const) {
        const text = format(value)

        if (text !== '0' && text !== '-0') {
            terms.push((terms.length > 0 && value > 0 ? '+' : '') + text + variable)
        }
    }

    return terms.length > 0 ? terms.join('') : '0'
}

/**
 * The coefficients of `y = ax^2+bx+c` through three points.
 *
 * @throws MathError if two points have the same abscissa.
 */
export function quadraticThroughPoints(A: XY, B: XY, C: XY): { a: number, b: number, c: number } {
    const {x: x1, y: y1} = A
    const {x: x2, y: y2} = B
    const {x: x3, y: y3} = C

    const denom = (x1 - x2) * (x1 - x3) * (x2 - x3)

    if (denom === 0) {
        throw new MathError('A parabola through three points needs three different abscissas')
    }

    const a =
        (y1 * (x2 - x3) + y2 * (x3 - x1) + y3 * (x1 - x2)) / denom

    const b =
        (y1 * (x3 ** 2 - x2 ** 2) +
            y2 * (x1 ** 2 - x3 ** 2) +
            y3 * (x2 ** 2 - x1 ** 2)) / denom

    const c =
        (y1 * (x2 * x3 * (x2 - x3)) +
            y2 * (x3 * x1 * (x3 - x1)) +
            y3 * (x1 * x2 * (x1 - x2))) / denom

    return {a, b, c}
}
