import {describe, expect, test} from 'vitest'
import {fractionToTex, numberCorrection, toFraction, toNumber} from '../../src/calculus/numbers'
import {ParseError} from '../../src/errors'

describe('numberCorrection', () => {
    test('hides the floating point noise', () => {
        expect(numberCorrection(0.1 + 0.2)).toBe(0.3)
        expect(numberCorrection(Math.sin(Math.PI))).toBe(0)
    })

    test('rounds to the requested number of digits', () => {
        expect(numberCorrection(1 / 3, 2)).toBe(0.33)
        expect(numberCorrection(2 / 3, 2)).toBe(0.67)
        expect(numberCorrection(1.005, 2)).toBe(1)
        expect(numberCorrection(-1 / 3, 3)).toBe(-0.333)
        expect(numberCorrection(12.3456, 0)).toBe(12)
    })

    test('a negative zero gives zero', () => {
        expect(Object.is(numberCorrection(-1e-12), 0)).toBe(true)
    })

    test('a value too big to have decimals, or not finite, is returned as is', () => {
        expect(numberCorrection(1e15 + 0.5)).toBe(1e15 + 0.5)
        expect(numberCorrection(Infinity)).toBe(Infinity)
        expect(numberCorrection(-Infinity)).toBe(-Infinity)
        expect(numberCorrection(NaN)).toBeNaN()
    })
})

describe('toNumber', () => {
    test.each([
        [3, 3],
        ['3', 3],
        ['-2.5', -2.5],
        ['+2', 2],
        ['2/4', 0.5],
        ['-3/2', -1.5],
        ['1.5/3', 0.5],
        ['1/0', Infinity],
    ])('%s gives %d', (value, expected) => {
        expect(toNumber(value)).toBe(expected)
    })

    test.each([
        [''],
        ['  '],
        ['abc'],
        ['2/3/4'],
        ['2/'],
        ['/2'],
        ['2/x'],
    ])('"%s" is a ParseError', (value) => {
        expect(() => toNumber(value)).toThrow(ParseError)
    })
})

describe('toFraction', () => {
    test('is the fraction in lowest terms', () => {
        expect(toFraction(1.5)).toEqual({numerator: 3, denominator: 2})
        expect(toFraction(-0.25)).toEqual({numerator: -1, denominator: 4})
        expect(toFraction(4 / 6)).toEqual({numerator: 2, denominator: 3})
        expect(toFraction(2)).toEqual({numerator: 2, denominator: 1})
    })

    test('forgives the floating point noise', () => {
        expect(toFraction(0.1 + 0.2)).toEqual({numerator: 3, denominator: 10})
        expect(toFraction(1 / 3 + 1e-13)).toEqual({numerator: 1, denominator: 3})
    })

    test('zero is 0 over 1, and a negative zero too', () => {
        expect(toFraction(0)).toEqual({numerator: 0, denominator: 1})
        expect(toFraction(-0)).toEqual({numerator: 0, denominator: 1})
    })

    test('is null for a number that is no fraction with a denominator of 100 at most', () => {
        expect(toFraction(0.123456)).toBeNull()
        expect(toFraction(Math.PI)).toBeNull()
        expect(toFraction(1 / 101)).toBeNull()
        expect(toFraction(1 / 101, 101)).toEqual({numerator: 1, denominator: 101})
    })

    test('is null for a number that is not finite', () => {
        expect(toFraction(NaN)).toBeNull()
        expect(toFraction(Infinity)).toBeNull()
    })
})

describe('fractionToTex', () => {
    test('writes a whole number as it is, and the others as a TeX fraction', () => {
        expect(fractionToTex({numerator: 4, denominator: 1})).toBe('4')
        expect(fractionToTex({numerator: 3, denominator: 2})).toBe('\\frac{3}{2}')
    })

    test('puts the sign of a negative fraction in front', () => {
        expect(fractionToTex({numerator: -1, denominator: 4})).toBe('-\\frac{1}{4}')
        expect(fractionToTex({numerator: -3, denominator: 1})).toBe('-3')
    })
})
