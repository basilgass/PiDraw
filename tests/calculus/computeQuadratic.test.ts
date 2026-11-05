import {describe, expect, test} from 'vitest'
import {quadraticThroughABC, quadraticThroughPoints} from '../../src/calculus/computeQuadratic'
import {NumExp} from '../../src/calculus/NumExp'
import {MathError} from '../../src/errors'

const P = (x: number, y: number) => ({x, y})

describe('quadraticThroughPoints', () => {
    test('gives the coefficients of the parabola', () => {
        const {a, b, c} = quadraticThroughPoints(P(0, 1), P(1, 3), P(2, 7))

        expect(a).toBeCloseTo(1, 12)
        expect(b).toBeCloseTo(1, 12)
        expect(c).toBeCloseTo(1, 12)
    })

    test('does not depend on the order of the points', () => {
        const [A, B, C] = [P(-3, 5), P(1, -2), P(4, 7)]
        const reference = quadraticThroughPoints(A, B, C)

        for (const [first, second, third] of [[B, C, A], [C, A, B], [C, B, A]]) {
            const {a, b, c} = quadraticThroughPoints(first, second, third)

            expect(a).toBeCloseTo(reference.a, 12)
            expect(b).toBeCloseTo(reference.b, 12)
            expect(c).toBeCloseTo(reference.c, 12)
        }
    })

    test('two points with the same abscissa are a MathError', () => {
        expect(() => quadraticThroughPoints(P(1, 0), P(1, 1), P(2, 4))).toThrow(MathError)
        expect(() => quadraticThroughPoints(P(0, 0), P(0, 0), P(0, 0))).toThrow(MathError)
    })
})

describe('quadraticThroughABC', () => {
    test.each([
        [P(0, 0), P(1, 1), P(2, 4), '1x^2'],
        [P(0, 1), P(1, 3), P(2, 7), '1x^2+1x+1'],
        [P(-2, 0), P(0, 2), P(2, 0), '-0.5x^2+2'],
        [P(0, 0), P(3, 3), P(-3, 3), '0.3333333333x^2'],
        [P(0, 0), P(1, 1), P(2, 2), '1x'],
        [P(0, 5), P(1, 5), P(2, 5), '5'],
    ])('the expression through %o, %o and %o is %s', (A, B, C, expected) => {
        expect(quadraticThroughABC(A, B, C)).toBe(expected)
    })

    test('the points on the x axis give the zero expression', () => {
        expect(quadraticThroughABC(P(0, 0), P(1, 0), P(2, 0))).toBe('0')
    })

    test('the expression is read by NumExp and goes through the three points', () => {
        const points = [P(-3, 5), P(1, -2), P(4, 7)]
        const expression = new NumExp(quadraticThroughABC(points[0], points[1], points[2]))

        for (const {x, y} of points) {
            expect(expression.evaluate({x})).toBeCloseTo(y, 8)
        }
    })

    test('the coefficients are not truncated to a few decimals', () => {
        const points = [P(0, 0), P(300, 100), P(-300, 100)]
        const expression = new NumExp(quadraticThroughABC(points[0], points[1], points[2]))

        expect(expression.evaluate({x: 150})).toBeCloseTo(25, 6)
    })

    test('a small coefficient is written in fixed notation, which NumExp can read', () => {
        const text = quadraticThroughABC(P(0, 0), P(1000, 1), P(2000, 4))

        expect(text).not.toMatch(/e/)
        expect(new NumExp(text).evaluate({x: 1000})).toBeCloseTo(1, 6)
    })

    test('two points with the same abscissa are a MathError', () => {
        expect(() => quadraticThroughABC(P(1, 0), P(1, 1), P(2, 4))).toThrow(MathError)
    })
})
