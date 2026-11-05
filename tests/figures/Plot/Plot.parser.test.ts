import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Point} from '../../../src/figures/Point/Point'
import {ParseError} from '../../../src/errors'
import {buildPlot, parsePlotShorthand} from '../../../src/figures/Plot/Plot.parser'
import {createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
// A number the reader of the bounds computed, to the digits it keeps.
const near = (value: number): number => expect.closeTo(value, 8) as number

function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    const A = point('A', 0, 1)
    const B = point('B', 1, 3)
    const C = point('C', 2, 9)

    const figures = {A, B, C}
    const item = (values: unknown[], key = 'plot') => ({name: 'f', key, values, parameters: {}}) as unknown as PARSER

    return {...figures, figures, item}
}

describe('buildPlot of a function', () => {
    test('plot with an expression', () => {
        const {item, figures} = create()

        expect(buildPlot(item(['x^2+1']), figures)).toEqual({create: 'plot', config: {expression: 'x^2+1'}})
    })

    test('a number is the constant function', () => {
        const {item, figures} = create()

        expect(buildPlot(item([3]), figures).config).toEqual({expression: '3'})
    })

    test('the function is read as it is written, whatever the figures called like it', () => {
        const {item, figures} = create()

        expect(buildPlot(item(['A']), figures).config).toEqual({expression: 'A'})
    })

    // What the parser gives: an interval of numbers is an object, with its axis; the samples (`@50`) stay in the text.
    const interval = (min: number, max: number) => ({min, max, axis: 'x'})

    test('the samples are at the end of the function, or alone', () => {
        const {item, figures} = create()

        expect(buildPlot(item(['sin(x)@50']), figures).config).toEqual({expression: 'sin(x)', samples: 50})
        expect(buildPlot(item(['sin(x)', '@50']), figures).config).toEqual({expression: 'sin(x)', samples: 50})
        expect(buildPlot(item(['sin(x)', interval(-3, 3), '@12.5']), figures).config)
            .toEqual({expression: 'sin(x)', samples: 12.5, domain: {min: -3, max: 3}})
    })

    test('a domain and an image, the domain first, with the axis of the parser left out', () => {
        const {item, figures} = create()

        expect(buildPlot(item(['sin(x)@50', interval(-3, 3), interval(-2, 2)]), figures).config)
            .toEqual({expression: 'sin(x)', samples: 50, domain: {min: -3, max: 3}, image: {min: -2, max: 2}})
        expect(buildPlot(item(['sin(x)', interval(-3, 3)]), figures).config).toEqual({expression: 'sin(x)', domain: {min: -3, max: 3}})
    })

    test('a bound can be an expression of numbers: pi, 2pi, .5pi, pi/2', () => {
        const {item, figures} = create()

        expect(buildPlot(item(['sin(x)', '-2pi:2pi']), figures).config)
            .toEqual({expression: 'sin(x)', domain: {min: near(-2 * Math.PI), max: near(2 * Math.PI)}})
        expect(buildPlot(item(['sin(x)', '.5pi:pi/2+3', interval(-1, 1)]), figures).config)
            .toEqual({expression: 'sin(x)', domain: {min: near(Math.PI / 2), max: near(Math.PI / 2 + 3)}, image: {min: -1, max: 1}})
        expect(buildPlot(item(['sin(x)', '-pi:pi@40']), figures).config)
            .toEqual({expression: 'sin(x)', samples: 40, domain: {min: near(-Math.PI), max: near(Math.PI)}})
    })
})

describe('buildPlot of the parabola through three points', () => {
    test('plot with three points', () => {
        const {item, figures, A, B, C} = create()

        expect(buildPlot(item(['A', 'B', 'C']), figures)).toEqual({create: 'plot', config: {quadratic: {A, B, C}}})
    })

    test('has the samples, the domain and the image too', () => {
        const {item, figures, A, B, C} = create()
        expect(buildPlot(item(['A', 'B', 'C', '@20', {min: 0, max: 2, axis: 'x'}]), figures).config)
            .toEqual({quadratic: {A, B, C}, samples: 20, domain: {min: 0, max: 2}})
    })
})

describe('buildPlot of a line of code that is not valid', () => {
    const domain = {min: -3, max: 3}

    test.each([
        ['no value', []],
        ['a domain instead of the function', [{min: 0, max: 1}]],
        ['a boolean instead of the function', [true]],
        ['two numbers of samples', ['x@10', '@20']],
        ['a number of samples that is 0', ['x@0']],
        ['a number of samples that is negative', ['x', '@-5']],
        ['a number of samples that is text', ['x', '@many']],
        ['a number of samples that is missing', ['x', '@']],
        ['a number that is not text', ['x', 10]],
        ['three domains', ['x', domain, domain, domain]],
        ['a domain with a bound that is not a number', ['x', 'a:3']],
        ['a domain with a bound that has a variable', ['x', '-x:3']],
        ['a domain without a bound', ['x', '3:']],
        ['a domain with three bounds', ['x', '1:2:3']],
        ['a domain whose minimum is greater than its maximum', ['x', '3:-3']],
        ['a value that is text after the function', ['x', 'y']],
        ['a point after the function', ['x', 'A']],
        ['two points', ['A', 'B']],
        ['three points and a point', ['A', 'B', 'C', 'A']],
        ['three points and a samples of 0', ['A', 'B', 'C', '@0']]
    ])('%s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildPlot(item(values), figures)).toThrow(ParseError)
        expect(() => buildPlot(item(values), figures)).toThrow(/"f"/)
    })

    test('a key that does not define a plot is a ParseError', () => {
        const {item, figures} = create()

        expect(() => buildPlot(item(['x'], 'quad'), figures)).toThrow(ParseError)
    })
})

describe('parsePlotShorthand', () => {
    test.each([
        ['f(x)=x^2', 'f=plot x^2'],
        ['g1(x)=sin(x)@50,-3:3,-2:2', 'g1=plot sin(x)@50,-3:3,-2:2'],
        ['h(x)=2x+1', 'h=plot 2x+1'],
        ['f(x)= x^2', 'f=plot  x^2']
    ])('%s is %s', (shorthand, expected) => {
        expect(parsePlotShorthand(shorthand)).toBe(expected)
    })

    test.each([
        ['a plot with its key', 'f=plot x^2'],
        ['a parametric curve', 'f(t)=cos(t),sin(t)'],
        ['a point', 'A(3,4)'],
        ['a name that is not a letter and digits', 'F(x)=x'],
        ['text', 'hello']
    ])('%s is not a shorthand of a plot: null', (_, text) => {
        expect(parsePlotShorthand(text)).toBeNull()
    })

    test.each([
        ['no =', 'f(x)'],
        ['nothing after =', 'f(x)='],
        ['only spaces after =', 'f(x)=  '],
        ['text between (x) and =', 'f(x)y=x']
    ])('%s is a ParseError that names the text', (_, text) => {
        expect(() => parsePlotShorthand(text)).toThrow(ParseError)
        expect(() => parsePlotShorthand(text)).toThrow(new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    })
})
