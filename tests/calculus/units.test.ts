import {describe, expect, test} from 'vitest'
import {InvalidArgumentError} from '../../src/errors'
import {
    checkMeasure,
    DEFAULT_MEASURE,
    LENGTH_UNITS,
    lengthUnitOf,
    scaled,
    withDegree,
    withUnit
} from '../../src/calculus/units'

describe('lengthUnitOf', () => {
    test.each(LENGTH_UNITS)('%s is a unit', (unit) => {
        expect(lengthUnitOf(unit)).toBe(unit)
    })

    test('the micro sign, the Greek mu and the ascii u are the same unit', () => {
        expect(lengthUnitOf('µm')).toBe('µm')
        expect(lengthUnitOf('μm')).toBe('µm')
        expect(lengthUnitOf('um')).toBe('µm')
    })

    test.each(['', 'meter', 'mm2', 'MM', 'inch', 'ft'])('%s is not a unit', (text) => {
        expect(lengthUnitOf(text)).toBeNull()
    })
})

describe('checkMeasure', () => {
    test('accepts a unit or none, and a scale greater than 0', () => {
        expect(() => {
            checkMeasure(DEFAULT_MEASURE)
            checkMeasure({unit: 'mm', scale: 0.1})
        }).not.toThrow()
    })

    test.each([0, -1, NaN, Infinity])('a scale of %s is an InvalidArgumentError', (scale) => {
        expect(() => {
            checkMeasure({unit: null, scale})
        }).toThrow(InvalidArgumentError)
    })

    test('a unit that does not exist is an InvalidArgumentError that lists the ones that do', () => {
        expect(() => {
            checkMeasure({unit: 'inch' as never, scale: 1})
        }).toThrow(/mm/)
    })
})

describe('scaled', () => {
    test('multiplies a length by the scale and an area by its square', () => {
        expect(scaled(3, {unit: 'mm', scale: 10}, 1)).toBe(30)
        expect(scaled(3, {unit: 'mm', scale: 10}, 2)).toBe(300)
        expect(scaled(3, DEFAULT_MEASURE, 2)).toBe(3)
    })
})

describe('withUnit', () => {
    test('writes nothing without a unit', () => {
        expect(withUnit('5', null, 1, false)).toBe('5')
        expect(withUnit('5', null, 2, true)).toBe('5')
    })

    test('writes the unit after a space, and its square for an area', () => {
        expect(withUnit('5', 'mm', 1, false)).toBe('5 mm')
        expect(withUnit('5', 'mm', 2, false)).toBe('5 mm²')
        expect(withUnit('5', 'u', 2, false)).toBe('5 u²')
    })

    test('writes the unit as a formula in TeX, after a thin space', () => {
        expect(withUnit('5', 'mm', 1, true)).toBe('5\\,\\mathrm{mm}')
        expect(withUnit('5', 'km', 2, true)).toBe('5\\,\\mathrm{km}^2')
        expect(withUnit('5', 'µm', 1, true)).toBe('5\\,\\mu\\mathrm{m}')
    })
})

describe('withDegree', () => {
    test('writes the degree sign, as a formula in TeX', () => {
        expect(withDegree('60', false)).toBe('60°')
        expect(withDegree('60', true)).toBe('60^\\circ')
    })
})
