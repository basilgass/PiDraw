import {describe, expect, test} from 'vitest'
import {Line} from '../../src/figures/Line/Line'
import {Point} from '../../src/figures/Point/Point'
import type {PARSER} from 'piparser'
import {ParseError} from '../../src/errors'
import {
    ALTERNATIVE,
    buildError,
    convertIdToFigure,
    describeValue,
    expectCount,
    isAlternative,
    isLine,
    isPoint,
    PARSER_COLOR_VALUES,
    parsePointPair,
    parseRadius
} from '../../src/parser/parser.common'
import {createContext} from '../helpers/figure'

function create() {
    const context = createContext()
    const A = new Point(context, 'A', {coordinates: {x: 0, y: 0}})
    const B = new Point(context, 'B', {coordinates: {x: 1, y: 1}})
    const d = new Line(context, 'd', {through: {A, B}})

    return {A, B, figures: {A, B, d}}
}

describe('parsePointPair', () => {
    test('A:B is the two points', () => {
        const {A, B, figures} = create()

        expect(parsePointPair('A:B', figures)).toEqual([A, B])
        expect(parsePointPair('B:A', figures)).toEqual([B, A])
    })

    test.each([
        ['a point that does not exist', 'A:Z'],
        ['a figure that is not a point', 'A:d'],
        ['a single name', 'A'],
        ['a missing name', 'A:'],
        ['three names', 'A:B:A'],
        ['an inherited property name', 'toString:A'],
        ['text', 'hello']
    ])('%s is not a pair of points: null', (_, text) => {
        const {figures} = create()

        expect(parsePointPair(text, figures)).toBeNull()
    })

    test.each([
        ['a number', 3],
        ['nothing', undefined],
        ['a boolean', true]
    ])('%s is not a pair of points: null', (_, value) => {
        const {figures} = create()

        expect(parsePointPair(value as never, figures)).toBeNull()
    })
})

describe('isAlternative', () => {
    test('the alternative form is marked by ALTERNATIVE, and by nothing else', () => {
        expect(isAlternative(ALTERNATIVE)).toBe(true)
    })

    test.each([['x'], [1], [true], [undefined], [ALTERNATIVE + ALTERNATIVE], ['']])('%j is not the mark of the alternative form', (value) => {
        expect(isAlternative(value as never)).toBe(false)
    })
})

describe('convertIdToFigure', () => {
    test('a text that is the name of a figure becomes that figure', () => {
        const {A, B, figures} = create()

        expect(convertIdToFigure(['A', 'B'], figures)).toEqual([A, B])
        expect(convertIdToFigure(['A', 'B'], figures)[0]).toBe(A)
    })

    test('the other values stay as they are', () => {
        const {figures} = create()
        const values = [3, 'Z', 'red', true, ['A']] as never[]

        expect(convertIdToFigure(values, figures)).toEqual(values)
    })

    test.each(['toString', 'constructor', 'hasOwnProperty', '__proto__'])('%s, a name of the prototype, is not a figure', (name) => {
        const {figures} = create()

        expect(convertIdToFigure([name], figures)).toEqual([name])
    })
})

describe('parseRadius', () => {
    test('a number is a radius', () => {
        expect(parseRadius(2.5, create().figures)).toBe(2.5)
    })

    test('a point is a radius', () => {
        const {A, figures} = create()

        expect(parseRadius(A, figures)).toBe(A)
    })

    test('A:B is the distance between the two points', () => {
        const {A, B, figures} = create()

        expect(parseRadius('A:B', figures)).toEqual({point1: A, point2: B})
    })

    test.each([
        ['a name that is no point', 'Z'],
        ['a pair with a missing point', 'A:Z'],
        ['nothing', undefined],
        ['a boolean', true]
    ])('%s is not a radius: null', (_, value) => {
        expect(parseRadius(value as never, create().figures)).toBeNull()
    })

    test('a line is not a radius', () => {
        const {figures} = create()

        expect(parseRadius(figures.d, figures)).toBeNull()
    })
})

describe('describeValue', () => {
    test('a figure is named', () => {
        expect(describeValue(create().A)).toBe('the figure "A"')
    })

    test('nothing, a number, a text and a list', () => {
        expect(describeValue(undefined)).toBe('nothing')
        expect(describeValue(3)).toBe('3')
        expect(describeValue('hello')).toBe('"hello"')
        expect(describeValue([1, 'a'])).toBe('[1,"a"]')
    })
})

describe('buildError and expectCount', () => {
    const item = {name: 'c', key: 'circ', values: [] as never[], options: [] as never[]} as unknown as PARSER

    test('buildError throws a ParseError that names the figure, the key, what was expected and what was got', () => {
        expect(() => buildError(item, 'a point', 'a number')).toThrow(ParseError)
        expect(() => buildError(item, 'a point', 'a number')).toThrow('Cannot build "c" (circ): expected a point, got a number')
    })

    test('a number of values between the bounds is accepted, bounds included', () => {
        expect(() => { expectCount(item, [1, 2], 2, 3, 'two or three') }).not.toThrow()
        expect(() => { expectCount(item, [1, 2, 3], 2, 3, 'two or three') }).not.toThrow()
    })

    test('too few or too many values throw a ParseError that counts them', () => {
        expect(() => { expectCount(item, [1], 2, 3, 'two or three') }).toThrow(ParseError)
        expect(() => { expectCount(item, [1], 2, 3, 'two or three') }).toThrow('got 1 value')
        expect(() => { expectCount(item, [1, 2, 3, 4], 2, 3, 'two or three') }).toThrow('got 4 values')
        expect(() => { expectCount(item, [], 1, 1, 'one') }).toThrow('got 0 values')
    })
})

describe('isPoint and isLine', () => {
    test('a point is a point and not a line', () => {
        const {A} = create()

        expect(isPoint(A)).toBe(true)
        expect(isLine(A)).toBe(false)
    })

    test('a line is a line and not a point', () => {
        const {figures} = create()

        expect(isLine(figures.d)).toBe(true)
        expect(isPoint(figures.d)).toBe(false)
    })

    test.each([[3], ['A'], [undefined], [true]])('%j is neither', (value) => {
        expect(isPoint(value as never)).toBe(false)
        expect(isLine(value as never)).toBe(false)
    })
})

describe('PARSER_COLOR_VALUES', () => {
    test('has each name once', () => {
        expect(new Set(PARSER_COLOR_VALUES).size).toBe(PARSER_COLOR_VALUES.length)
    })
})
