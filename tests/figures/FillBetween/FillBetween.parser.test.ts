import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Line} from '../../../src/figures/Line/Line'
import {Plot} from '../../../src/figures/Plot/Plot'
import {Point} from '../../../src/figures/Point/Point'
import {ParseError} from '../../../src/errors'
import {buildFillBetween} from '../../../src/figures/FillBetween/FillBetween.parser'
import {createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const A = new Point(context, 'A', {coordinates: {x: 1, y: 1}})
    const B = new Point(context, 'B', {coordinates: {x: 2, y: 3}})
    const f = new Plot(context, 'f', {expression: 'x^2'})
    const g = new Plot(context, 'g', {expression: 'x'})
    const d = new Line(context, 'd', {through: {A, B}})

    const figures = {A, B, f, g, d}
    const item = (values: unknown[], key = 'fill') => ({name: 'z', key, values, parameters: {}}) as unknown as PARSER

    return {...figures, figures, item}
}

// The parser gives an interval of numbers as an object, and an interval with pi as text.
const interval = (min: number, max: number) => ({min, max, axis: 'x'})

describe('buildFillBetween', () => {
    test('a plot alone, down to the x axis', () => {
        const {item, figures, f} = create()

        expect(buildFillBetween(item(['f']), figures)).toEqual({create: 'fillbetween', config: {plot: f}})
    })

    test('two plots', () => {
        const {item, figures, f, g} = create()

        expect(buildFillBetween(item(['f', 'g']), figures).config).toEqual({plot: f, other: g})
    })

    test('a plot and a domain', () => {
        const {item, figures, f} = create()

        expect(buildFillBetween(item(['f', interval(0, 5)]), figures).config).toEqual({plot: f, domain: {min: 0, max: 5}})
    })

    test('two plots and a domain', () => {
        const {item, figures, f, g} = create()

        expect(buildFillBetween(item(['f', 'g', interval(0, 3)]), figures).config).toEqual({plot: f, other: g, domain: {min: 0, max: 3}})
    })

    test('a domain can be written with pi', () => {
        const {item, figures} = create()
        const domain = buildFillBetween(item(['f', '-pi:2pi']), figures).config.domain

        expect(domain?.min).toBeCloseTo(-Math.PI, 9)
        expect(domain?.max).toBeCloseTo(2 * Math.PI, 9)
    })
})

describe('buildFillBetween of a line of code that is not valid', () => {
    test.each([
        ['no value', []],
        ['a name that is not a figure', ['Z']],
        ['a figure that is not a plot', ['d']],
        ['a point', ['A']],
        ['text for the plot', ['x^2']],
        ['a second figure that is not a plot', ['f', 'd']],
        ['a number instead of the second plot', ['f', 3]],
        ['a domain that is not an interval', ['f', 'abc']],
        ['a domain with a bound that is not a number', ['f', '0:x']],
        ['a domain with its minimum over its maximum', ['f', '4:0']],
        ['samples, which an area does not have', ['f', '@50']],
        ['a second domain, the image that an area no longer has', ['f', interval(0, 3), interval(-1, 1)]],
        ['a spare value', ['f', 'g', interval(0, 3), 5]]
    ])('%s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildFillBetween(item(values), figures)).toThrow(ParseError)
        expect(() => buildFillBetween(item(values), figures)).toThrow(/"z"/)
    })

    test('a key that does not define an area is a ParseError', () => {
        const {item, figures} = create()

        expect(() => buildFillBetween(item(['f'], 'plot'), figures)).toThrow(ParseError)
    })
})
