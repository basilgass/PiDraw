import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Line} from '../../../src/figures/Line/Line'
import {Plot} from '../../../src/figures/Plot/Plot'
import {Point} from '../../../src/figures/Point/Point'
import {ParseError} from '../../../src/errors'
import {buildRiemann} from '../../../src/figures/Riemann/Riemann.parser'
import {createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const A = new Point(context, 'A', {coordinates: {x: 1, y: 1}})
    const B = new Point(context, 'B', {coordinates: {x: 2, y: 3}})
    const f = new Plot(context, 'f', {expression: 'x^2'})
    const d = new Line(context, 'd', {through: {A, B}})

    const figures = {A, B, f, d}
    const item = (values: unknown[], key = 'riemann') => ({name: 'r', key, values, parameters: {}}) as unknown as PARSER

    return {...figures, figures, item}
}

// The parser gives an interval of numbers as an object, and an interval with pi as text.
const interval = (min: number, max: number) => ({min, max, axis: 'x'})

describe('buildRiemann', () => {
    test('a plot alone', () => {
        const {item, figures, f} = create()

        expect(buildRiemann(item(['f']), figures)).toEqual({create: 'riemann', config: {plot: f}})
    })

    test('a plot, a domain, a number of rectangles and a position', () => {
        const {item, figures, f} = create()

        expect(buildRiemann(item(['f', interval(0, 4), 10, 0.5]), figures).config)
            .toEqual({plot: f, domain: {min: 0, max: 4}, rectangles: 10, position: 0.5})
    })

    test('each value can be left out from the end', () => {
        const {item, figures, f} = create()

        expect(buildRiemann(item(['f', interval(0, 4), 10]), figures).config).toEqual({plot: f, domain: {min: 0, max: 4}, rectangles: 10})
        expect(buildRiemann(item(['f', interval(0, 4)]), figures).config).toEqual({plot: f, domain: {min: 0, max: 4}})
    })

    test('numbers after the plot are the rectangles and the position, when there is no domain', () => {
        const {item, figures, f} = create()

        expect(buildRiemann(item(['f', 10]), figures).config).toEqual({plot: f, rectangles: 10})
        expect(buildRiemann(item(['f', 10, 1]), figures).config).toEqual({plot: f, rectangles: 10, position: 1})
    })

    test('a domain can be written with pi', () => {
        const {item, figures} = create()

        const [first, second] = [buildRiemann(item(['f', '0:2pi', 8]), figures).config.domain, buildRiemann(item(['f', '-pi:.5pi']), figures).config.domain]

        expect(first?.min).toBe(0)
        expect(first?.max).toBeCloseTo(2 * Math.PI, 9)
        expect(second?.min).toBeCloseTo(-Math.PI, 9)
        expect(second?.max).toBeCloseTo(Math.PI / 2, 9)
    })

    test('does not check the values: the figure does', () => {
        const {item, figures, f} = create()

        expect(buildRiemann(item(['f', 0, 3]), figures).config).toEqual({plot: f, rectangles: 0, position: 3})
    })
})

describe('buildRiemann of a line of code that is not valid', () => {
    test.each([
        ['no value', []],
        ['a name that is not a figure', ['Z']],
        ['a figure that is not a plot', ['d']],
        ['a point', ['A']],
        ['text for the plot', ['x^2']],
        ['a domain that is not an interval', ['f', 'abc']],
        ['a domain with a bound that is not a number', ['f', '0:x']],
        ['a domain with its minimum over its maximum', ['f', '4:0']],
        ['samples, which a sum does not have', ['f', '@50']],
        ['a number of rectangles that is a figure', ['f', interval(0, 4), 'd']],
        ['a position that is text', ['f', interval(0, 4), 10, 'right']],
        ['a spare value', ['f', interval(0, 4), 10, 0, 1]],
        ['a second domain', ['f', interval(0, 4), interval(0, 2)]]
    ])('%s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildRiemann(item(values), figures)).toThrow(ParseError)
        expect(() => buildRiemann(item(values), figures)).toThrow(/"r"/)
    })

    test('a key that does not define a Riemann sum is a ParseError', () => {
        const {item, figures} = create()

        expect(() => buildRiemann(item(['f'], 'plot'), figures)).toThrow(ParseError)
    })
})
