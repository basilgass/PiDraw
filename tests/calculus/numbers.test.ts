import {describe, expect, test} from 'vitest'
import {numberCorrection, toNumber} from '../../src/calculus/numbers'
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
