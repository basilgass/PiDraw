import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Line} from '../../../src/figures/Line/Line'
import {Point} from '../../../src/figures/Point/Point'
import {ParseError} from '../../../src/errors'
import {buildCircle} from '../../../src/figures/Circle/Circle.parser'
import {ALTERNATIVE} from '../../../src/parser/parser.common'
import {createAxes, createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    const O = point('O', 0, 0)
    const A = point('A', 2, 0)
    const B = point('B', 0, 3)
    const C = point('C', 1, 1)
    const d = new Line(context, 'd', {through: {A, B}})

    const figures = {O, A, B, C, d, ...createAxes(context)}
    const item = (key: string, values: unknown[]) =>
        ({name: 'P', key, values, parameters: {}}) as unknown as PARSER

    return {...figures, figures, item}
}

describe('buildCircle of a circle given by its center and its radius', () => {
    test('circ with a number is a radius in units', () => {
        const {item, figures, O} = create()

        expect(buildCircle(item('circ', ['O', 3]), figures)).toEqual({create: 'circle', config: {center: O, radius: 3}})
    })

    test('circ with a point is a radius that is the distance to that point', () => {
        const {item, figures, O, A} = create()

        expect(buildCircle(item('circ', ['O', 'A']), figures).config).toEqual({center: O, radius: A})
    })

    test('circ with A:B is a radius that is the distance between the two points', () => {
        const {item, figures, O, A, B} = create()

        expect(buildCircle(item('circ', ['O', 'A:B']), figures).config).toEqual({center: O, radius: {point1: A, point2: B}})
    })
})

describe('buildCircle of the other constructions', () => {
    test('circ with three points is the circle through them', () => {
        const {item, figures, A, B, C} = create()

        expect(buildCircle(item('circ', ['A', 'B', 'C']), figures).config).toEqual({through: {A, B, C}})
    })

    test('circ with three points and a * is the circle inscribed in the triangle', () => {
        const {item, figures, A, B, C} = create()

        expect(buildCircle(item('circ', ['A', 'B', 'C', ALTERNATIVE]), figures).config).toEqual({inscribed: {A, B, C}})
    })

    test('circ with a point and a line is the circle of that center that is tangent to the line', () => {
        const {item, figures, O, d} = create()

        expect(buildCircle(item('circ', ['O', 'd']), figures).config).toEqual({tangent: {center: O, to: d}})
    })

    test.each(['Ox', 'Oy'] as const)('circ with a point and the axis %s is the circle of that center that is tangent to the axis', (axis) => {
        const {item, figures, O} = create()

        expect(buildCircle(item('circ', ['O', axis]), figures).config).toEqual({tangent: {center: O, to: figures[axis]}})
    })

    test('circ with A:B alone is the circle that has [AB] for diameter', () => {
        const {item, figures, A, B} = create()

        expect(buildCircle(item('circ', ['A:B']), figures).config).toEqual({diameter: {A, B}})
    })
})

describe('buildCircle of a line of code that is not valid', () => {
    test.each([
        ['no value', []],
        ['a point alone', ['O']],
        ['a number alone', [3]],
        ['a single value that is not A:B', ['A:B:C']],
        ['a point that does not exist in A:B', ['A:Z']],
        ['a figure that is not a point in A:B', ['A:d']],
        ['a center that is not a point', [3, 4]],
        ['a center that is a line', ['d', 'O']],
        ['a radius that is text', ['O', 'big']],
        ['a radius that is the name of an axis that does not exist', ['O', 'Oz']],
        ['A:B and a number', ['A:B', 3]],
        ['a radius and a spare value', ['O', 3, 5]],
        ['three values of which one is not a point', ['A', 'B', 3]],
        ['three values of which one is a line', ['A', 'B', 'd']],
        ['four values that do not end with a *', ['A', 'B', 'C', 'O']],
        ['four values that end with a number', ['A', 'B', 'C', 1]],
        ['four values that end with text', ['A', 'B', 'C', 'in']],
        ['a mark after two values', ['O', ALTERNATIVE]],
        ['a mark after a radius', ['O', 3, ALTERNATIVE]],
        ['five values', ['A', 'B', 'C', ALTERNATIVE, ALTERNATIVE]]
    ])('%s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildCircle(item('circ', values), figures)).toThrow(ParseError)
        expect(() => buildCircle(item('circ', values), figures)).toThrow(/"P"/)
    })

    test('a key that does not define a circle is a ParseError', () => {
        const {item, figures} = create()

        expect(() => buildCircle(item('pt', ['O', 3]), figures)).toThrow(ParseError)
    })
})
