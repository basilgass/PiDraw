import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Arc} from '../../../src/figures/Arc/Arc'
import {Line} from '../../../src/figures/Line/Line'
import {Point} from '../../../src/figures/Point/Point'
import {OptionError, ParseError} from '../../../src/errors'
import {applyArcOption, buildArc} from '../../../src/figures/Arc/Arc.parser'
import {ALTERNATIVE} from '../../../src/parser/parser.common'
import {createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    const A = point('A', 2, 0)
    const O = point('O', 0, 0)
    const B = point('B', 0, 3)
    const d = new Line(context, 'd', {through: {A, B}})

    const figures = {A, O, B, d}
    const item = (values: unknown[], key = 'arc') => ({name: 'P', key, values, parameters: {}}) as unknown as PARSER

    return {...figures, figures, item, context}
}

describe('buildArc of the angle given by three points', () => {
    test('arc with three points is the arc from the first to the last, around the second', () => {
        const {item, figures, A, O, B} = create()

        expect(buildArc(item(['B', 'O', 'A']), figures)).toEqual({
            create: 'arc',
            config: {points: {start: B, center: O, end: A}}
        })
    })

    test('a radius that is a number, a point or A:B', () => {
        const {item, figures, A, B, O} = create()

        expect(buildArc(item(['B', 'O', 'A', 3]), figures).config).toEqual({points: {start: B, center: O, end: A, radius: 3}})
        expect(buildArc(item(['B', 'O', 'A', 'A']), figures).config).toEqual({points: {start: B, center: O, end: A, radius: A}})
        expect(buildArc(item(['B', 'O', 'A', 'A:B']), figures).config)
            .toEqual({points: {start: B, center: O, end: A, radius: {point1: A, point2: B}}})
    })

    test('a last mark is the other arc', () => {
        const {item, figures, A, B, O} = create()

        expect(buildArc(item(['B', 'O', 'A', ALTERNATIVE]), figures).config)
            .toEqual({points: {start: B, center: O, end: A}, alternative: true})
        expect(buildArc(item(['B', 'O', 'A', 3, ALTERNATIVE]), figures).config)
            .toEqual({points: {start: B, center: O, end: A, radius: 3}, alternative: true})
    })
})

describe('buildArc of the other constructions', () => {
    test('arc with a center, a radius and two angles', () => {
        const {item, figures, O} = create()

        expect(buildArc(item(['O', 2, 30, 120]), figures).config).toEqual({angles: {center: O, radius: 2, from: 30, to: 120}})
        expect(buildArc(item(['O', 2, 30, 120, ALTERNATIVE]), figures).config)
            .toEqual({angles: {center: O, radius: 2, from: 30, to: 120}, alternative: true})
    })

    test('arc with a center, a point and an angle', () => {
        const {item, figures, O, A} = create()

        expect(buildArc(item(['O', 'A', 60]), figures).config).toEqual({rotation: {center: O, start: A, angle: 60}})
        expect(buildArc(item(['O', 'A', -60, 3]), figures).config).toEqual({rotation: {center: O, start: A, angle: -60, radius: 3}})
        expect(buildArc(item(['O', 'A', 60, ALTERNATIVE]), figures).config)
            .toEqual({rotation: {center: O, start: A, angle: 60}, alternative: true})
    })
})

describe('buildArc of a line of code that is not valid', () => {
    test.each([
        ['no value', []],
        ['two values', ['B', 'O']],
        ['a mark alone', [ALTERNATIVE]],
        ['five values', ['B', 'O', 'A', 3, 4]],
        ['a value that is not a point', ['B', 'O', 'd']],
        ['an unknown name', ['B', 'O', 'Z']],
        ['a radius that is text', ['B', 'O', 'A', 'big']],
        ['a radius that is a line', ['B', 'O', 'A', 'd']],
        ['a center that is a number', [1, 'O', 'A']],
        ['a rotation with text as the angle', ['O', 'A', 'x']],
        ['angles with text', ['O', 2, 'x', 120]],
        ['angles of three values', ['O', 2, 30]],
        ['a rotation with a spare value', ['O', 'A', 60, 3, 4]],
        ['a mark that is not the last value', [ALTERNATIVE, 'B', 'O', 'A']],
        ['a last value that is not the mark', ['B', 'O', 'A', 'x']]
    ])('%s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildArc(item(values), figures)).toThrow(ParseError)
        expect(() => buildArc(item(values), figures)).toThrow(/"P"/)
    })

    test('a key that does not define an arc is a ParseError', () => {
        const {item, figures} = create()

        expect(() => buildArc(item(['B', 'O', 'A'], 'line'), figures)).toThrow(ParseError)
    })
})

describe('applyArcOption', () => {
    test('sector closes the arc with its radii', () => {
        const {context, O, A, B} = create()
        const arc = new Arc(context, 'a', {points: {start: A, center: O, end: B}})

        applyArcOption(arc, 'sector', true)

        expect(arc.config.sector).toBe(true)
        expect(arc.shape.attr('d')).toContain('L')
    })

    test('square draws a right angle as a corner', () => {
        const {context, O} = create()
        const right = {x: O.x + 100, y: O.y}
        const up = {x: O.x, y: O.y - 100}
        const arc = new Arc(context, 'a', {points: {start: right, center: O, end: up}})

        applyArcOption(arc, 'square', true)

        expect(arc.config.square).toBe(true)
        expect(arc.shape.attr('d')).not.toContain('A')
    })

    test('an option on a figure that is not an arc is an OptionError', () => {
        const {d} = create()

        expect(() => {
            applyArcOption(d, 'sector', true)
        }).toThrow(OptionError)
    })

    test.each([['a value', 3], ['false', false]])('%s given to an option is an OptionError', (_, value) => {
        const {context, O, A, B} = create()
        const arc = new Arc(context, 'a', {points: {start: A, center: O, end: B}})

        expect(() => {
            applyArcOption(arc, 'square', value)
        }).toThrow(OptionError)
    })
})
