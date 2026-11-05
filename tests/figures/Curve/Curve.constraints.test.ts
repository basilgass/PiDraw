import {describe, expect, test} from 'vitest'
import {checkCurveOptions, compileExpression, curveDomain, IMAGE_CHECK} from '../../../src/figures/Curve/Curve.constraints'
import {InvalidArgumentError, ParseError} from '../../../src/errors'

describe('checkCurveOptions', () => {
    test('options that are not given are valid', () => {
        expect(() => {
            checkCurveOptions({}, 'c')
        }).not.toThrow()
    })

    test('valid options are accepted', () => {
        expect(() => {
            checkCurveOptions({domain: {min: -1, max: 1}, samples: 5.5, tolerance: 0.1, maxDepth: 0, asymptoteThreshold: 3}, 'c')
        }).not.toThrow()
        expect(() => {
            checkCurveOptions({domain: {min: 2, max: 2}}, 'c')
        }).not.toThrow()
    })

    test.each([
        ['a domain that is infinite', {domain: {min: 0, max: Infinity}}],
        ['a domain with min > max', {domain: {min: 1, max: 0}}],
        ['a domain with NaN', {domain: {min: NaN, max: 0}}],
        ['a domain that is a number', {domain: 3 as never}],
        ['a domain that is null', {domain: null as never}],
        ['a samples of 0', {samples: 0}],
        ['a samples that is negative', {samples: -1}],
        ['a samples that is not finite', {samples: Infinity}],
        ['a samples that is text', {samples: '3' as never}],
        ['a tolerance of 0', {tolerance: 0}],
        ['a maxDepth that is negative', {maxDepth: -1}],
        ['a maxDepth that is not an integer', {maxDepth: 2.5}],
        ['an asymptoteThreshold of 0', {asymptoteThreshold: 0}]
    ])('%s is an InvalidArgumentError that names the curve and the option', (_, options) => {
        const option = Object.keys(options)[0]

        expect(() => {
            checkCurveOptions(options, 'curve1')
        }).toThrow(InvalidArgumentError)
        expect(() => {
            checkCurveOptions(options, 'curve1')
        }).toThrow(new RegExp(`curve1.*${option}|${option}.*curve1`))
    })

    test('an option of the figure is checked too', () => {
        expect(() => {
            checkCurveOptions({}, 'c', {image: IMAGE_CHECK})
        }).not.toThrow()

        const withImage = (image: unknown) => () => {
            checkCurveOptions({image} as never, 'c', {image: IMAGE_CHECK})
        }

        expect(withImage({min: -Infinity, max: 3})).not.toThrow()
        expect(withImage({min: 3, max: 1})).toThrow(InvalidArgumentError)
        expect(withImage({min: NaN, max: 1})).toThrow(InvalidArgumentError)
    })
})

describe('curveDomain', () => {
    const plot = (min?: number, max?: number) => ({config: min === undefined || max === undefined ? {} : {domain: {min, max}}})

    test('the domain that is given comes first, as a copy', () => {
        const given = {min: 1, max: 2}
        const found = curveDomain(given, [plot(-5, 5)])

        expect(found).toEqual(given)
        expect(found).not.toBe(given)
    })

    test('else the domain of the plot', () => {
        expect(curveDomain(undefined, [plot(-1, 3)])).toEqual({min: -1, max: 3})
    })

    test('else what the domains of the plots have in common', () => {
        expect(curveDomain(undefined, [plot(-1, 3), plot(0, 5)])).toEqual({min: 0, max: 3})
    })

    test('plots that have no abscissa in common give an empty domain', () => {
        const found = curveDomain(undefined, [plot(0, 1), plot(2, 3)])

        expect(found?.min).toBeGreaterThanOrEqual(found?.max ?? 0)
    })

    test('a plot without a domain does not limit the others', () => {
        expect(curveDomain(undefined, [plot(), plot(1, 4)])).toEqual({min: 1, max: 4})
    })

    test('no limit at all is null', () => {
        expect(curveDomain(undefined, [plot()])).toBeNull()
        expect(curveDomain(undefined, [])).toBeNull()
    })
})

describe('compileExpression', () => {
    test('reads a function of the variable', () => {
        expect(compileExpression('2*x', 'x', 'of the plot "f"').evaluate({x: 3})).toBe(6)
    })

    test('a variable other than the one asked is an InvalidArgumentError that says where', () => {
        expect(() => compileExpression('x+t', 'x', 'of the plot "f"')).toThrow(InvalidArgumentError)
        expect(() => compileExpression('x+t', 'x', 'of the plot "f"')).toThrow(/"x\+t" of the plot "f" can only use the variable x/)
    })

    test('an expression that cannot be read is a ParseError', () => {
        expect(() => compileExpression('2*', 'x', 'of the plot "f"')).toThrow(ParseError)
    })
})
