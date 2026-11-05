import {describe, expect, test} from 'vitest'
import {parseLinearEquation} from '../../src/calculus/linearEquation'
import {ParseError} from '../../src/errors'

function expectCoefficients(equation: string, a: number, b: number, c: number) {
    const coefficients = parseLinearEquation(equation)

    expect(coefficients.a).toBeCloseTo(a, 10)
    expect(coefficients.b).toBeCloseTo(b, 10)
    expect(coefficients.c).toBeCloseTo(c, 10)
}

describe('parseLinearEquation', () => {
    test.each([
        ['y=2x+1', -2, 1, -1],
        ['y=1/2', 0, 1, -0.5],
        ['3x=6', 3, 0, -6],
        ['x+y=2', 1, 1, -2],
        ['y=x/2', -0.5, 1, 0],
        ['y=-x/2+1', 0.5, 1, -1],
        ['x=-1', 1, 0, 1],
        ['y=3', 0, 1, -3],
        ['2x-3y+6=0', 2, -3, 6],
        ['2(x+1)=y', 2, -1, 2],
        ['0.5x-y=3', 0.5, -1, -3]
    ])('%s gives the coefficients of ax+by+c=0', (equation, a, b, c) => {
        expectCoefficients(equation, a, b, c)
    })

    test('the two sides can be swapped: the line is the same', () => {
        const left = parseLinearEquation('y=2x+1')
        const right = parseLinearEquation('2x+1=y')

        // The coefficients are those of the same line, up to a factor (here -1).
        expect(left.a * right.b - left.b * right.a).toBeCloseTo(0, 10)
        expect(left.a * right.c - left.c * right.a).toBeCloseTo(0, 10)
    })

    test.each([
        ['an equation without ='],
        ['y=x=1'],
        ['y=x^2'],
        ['xy=1'],
        ['y=sin(x)'],
        ['1=1'],
        ['1=2'],
        ['y=(x'],
        ['='],
        [''],
    ])('%s is a ParseError', (equation) => {
        expect(() => parseLinearEquation(equation)).toThrow(ParseError)
    })

    test('the message names the equation', () => {
        expect(() => parseLinearEquation('y=x^2')).toThrow(/y=x\^2/)
    })
})
