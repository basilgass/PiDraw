import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Point} from '../../../src/figures/Point/Point'
import {ParseError} from '../../../src/errors'
import {buildPolygon} from '../../../src/figures/Polygon/Polygon.parser'
import {ALTERNATIVE} from '../../../src/parser/parser.common'
import {createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    const A = point('A', 0, 0)
    const B = point('B', 2, 0)
    const C = point('C', 0, 2)
    const D = point('D', 3, 3)

    const figures = {A, B, C, D}
    const item = (values: unknown[], key = 'poly') => ({name: 'p', key, values, parameters: {}}) as unknown as PARSER

    return {...figures, figures, item}
}

describe('buildPolygon through points', () => {
    test('poly with three points', () => {
        const {item, figures, A, B, C} = create()

        expect(buildPolygon(item(['A', 'B', 'C']), figures)).toEqual({create: 'polygon', config: {vertices: [A, B, C]}})
    })

    test('poly with more points', () => {
        const {item, figures, A, B, C, D} = create()

        expect(buildPolygon(item(['A', 'B', 'C', 'D']), figures).config).toEqual({vertices: [A, B, C, D]})
    })
})

describe('buildPolygon regular', () => {
    test('a center, a radius that is a number and a number of sides', () => {
        const {item, figures, A} = create()

        expect(buildPolygon(item(['A', 4, 5]), figures)).toEqual({
            create: 'polygon',
            config: {regular: {center: A, radius: 4, sides: 5}}
        })
    })

    test('the radius can be the distance between two points', () => {
        const {item, figures, A, B, C} = create()

        expect(buildPolygon(item(['A', 'B:C', 5]), figures).config)
            .toEqual({regular: {center: A, radius: {point1: B, point2: C}, sides: 5}})
    })

    test('a step makes a star', () => {
        const {item, figures, A} = create()

        expect(buildPolygon(item(['A', 4, 5, 2]), figures).config).toEqual({regular: {center: A, radius: 4, sides: 5, star: 2}})
    })

    test('two points and a number of sides are a side', () => {
        const {item, figures, A, B} = create()

        expect(buildPolygon(item(['A', 'B', 5]), figures)).toEqual({
            create: 'polygon',
            config: {onSide: {A, B, sides: 5}}
        })
    })

    test('a step on a side makes a star', () => {
        const {item, figures, A, B} = create()

        expect(buildPolygon(item(['A', 'B', 5, 2]), figures).config).toEqual({onSide: {A, B, sides: 5, star: 2}})
    })
})

describe('buildPolygon of a line of code that is not valid', () => {
    test.each([
        ['no value', []],
        ['one point', ['A']],
        ['two points', ['A', 'B']],
        ['a number alone', [5]],
        ['a center and a radius without sides', ['A', 4]],
        ['a center and a radius that is text', ['A', 'big', 5]],
        ['a radius that is a point of nothing', ['A', 'Z:B', 5]],
        ['a radius that is a point and not a pair', ['A', 'B:B:B', 5]],
        ['a number of sides that is not an integer', ['A', 4, 5.5]],
        ['a number of sides that is text', ['A', 4, 'five']],
        ['a number of sides on a side that is not an integer', ['A', 'B', 4.5]],
        ['a step that is not an integer', ['A', 4, 7, 2.5]],
        ['a step that is text', ['A', 4, 7, 'x']],
        ['a step on a side that is not an integer', ['A', 'B', 7, 1.5]],
        ['a spare value', ['A', 4, 5, 2, 1]],
        ['a spare value on a side', ['A', 'B', 5, 2, 1]],
        ['the mark of the alternative form, not used', ['A', 4, 5, ALTERNATIVE]],
        ['points and a number', ['A', 'B', 'C', 5]],
        ['a first value that is not a point', [4, 'A', 5]],
        ['an unknown name', ['A', 'Z', 5]]
    ])('%s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildPolygon(item(values), figures)).toThrow(ParseError)
        expect(() => buildPolygon(item(values), figures)).toThrow(/"p"/)
    })

    test('a key that does not define a polygon is a ParseError, and reg does not exist any more', () => {
        const {item, figures} = create()

        expect(() => buildPolygon(item(['A', 4, 5], 'reg'), figures)).toThrow(ParseError)
        expect(() => buildPolygon(item(['A', 'B', 'C'], 'line'), figures)).toThrow(ParseError)
    })
})
