import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Bezier} from '../../../src/figures/Bezier/Bezier'
import {Line} from '../../../src/figures/Line/Line'
import {Point} from '../../../src/figures/Point/Point'
import {OptionError, ParseError} from '../../../src/errors'
import {applyBezierOption, buildBezier} from '../../../src/figures/Bezier/Bezier.parser'
import {ALTERNATIVE} from '../../../src/parser/parser.common'
import {createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    const A = point('A', 0, 0)
    const B = point('B', 2, 2)
    const C = point('C', 4, 0)
    const D = point('D', 6, 2)
    const d = new Line(context, 'd', {through: {A, B}})

    const figures = {A, B, C, D, d}
    const item = (values: unknown[], key = 'bezier') => ({name: 'b', key, values, parameters: {}}) as unknown as PARSER

    return {...figures, figures, item, context}
}

describe('buildBezier of the smooth curve through points', () => {
    test('bezier with names of points', () => {
        const {item, figures, A, B, C} = create()

        expect(buildBezier(item(['A', 'B', 'C']), figures)).toEqual({
            create: 'bezier',
            config: {through: [{point: A}, {point: B}, {point: C}]}
        })
    })

    test('H and V are horizontal and vertical directions, S is the smooth default', () => {
        const {item, figures, A, B, C} = create()

        expect(buildBezier(item(['A/S', 'B/H', 'C/V']), figures).config)
            .toEqual({through: [{point: A}, {point: B, direction: 'horizontal'}, {point: C, direction: 'vertical'}]})
    })

    test('an angle in degrees is a direction', () => {
        const {item, figures, A, B, C} = create()

        expect(buildBezier(item(['A/45', 'B/-30', 'C/12.5']), figures).config)
            .toEqual({through: [{point: A, direction: 45}, {point: B, direction: -30}, {point: C, direction: 12.5}]})
    })

    test('a ratio follows the direction', () => {
        const {item, figures, A, B, C} = create()

        expect(buildBezier(item(['A', 'B/H/0.4', 'C/45/0.1', 'C/S/0.3']), figures).config).toEqual({
            through: [{point: A}, {point: B, direction: 'horizontal', ratio: 0.4}, {point: C, direction: 45, ratio: 0.1}, {point: C, ratio: 0.3}]
        })
    })

    test('two points are enough', () => {
        const {item, figures, A, B} = create()

        expect(buildBezier(item(['A', 'B']), figures).config).toEqual({through: [{point: A}, {point: B}]})
    })
})

describe('buildBezier of the curve of control points', () => {
    test('a last mark makes 3 points a quadratic curve and 4 a cubic one', () => {
        const {item, figures, A, B, C, D} = create()

        expect(buildBezier(item(['A', 'B', 'C', ALTERNATIVE]), figures)).toEqual({create: 'bezier', config: {controls: [A, B, C]}})
        expect(buildBezier(item(['A', 'B', 'C', 'D', ALTERNATIVE]), figures).config).toEqual({controls: [A, B, C, D]})
    })
})

describe('buildBezier of a line of code that is not valid', () => {
    test.each([
        ['no value', []],
        ['one point', ['A']],
        ['a name that is not a figure', ['A', 'Z']],
        ['a figure that is not a point', ['A', 'd']],
        ['an inherited property name', ['A', 'toString']],
        ['a value that is a number', ['A', 3]],
        ['a direction that is not known', ['A', 'B/X']],
        ['a direction that is empty', ['A', 'B/']],
        ['a ratio that is not a number', ['A', 'B/H/big']],
        ['a ratio of 0', ['A', 'B/H/0']],
        ['a ratio that is negative', ['A', 'B/H/-0.2']],
        ['a ratio that is empty', ['A', 'B/H/']],
        ['a part too many', ['A', 'B/H/0.2/3']],
        ['a direction that is not finite', ['A', 'B/Infinity']],
        ['control points that are not 3 or 4', ['A', 'B', ALTERNATIVE]],
        ['5 control points', ['A', 'B', 'C', 'D', 'A', ALTERNATIVE]],
        ['control points with a direction', ['A', 'B/H', 'C', ALTERNATIVE]],
        ['control points that are not points', ['A', 'B', 'd', ALTERNATIVE]],
        ['a mark alone', [ALTERNATIVE]],
        ['a mark that is not the last value', [ALTERNATIVE, 'A', 'B', 'C']]
    ])('%s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildBezier(item(values), figures)).toThrow(ParseError)
        expect(() => buildBezier(item(values), figures)).toThrow(/"b"/)
    })

    test('a key that does not define a Bézier curve is a ParseError', () => {
        const {item, figures} = create()

        expect(() => buildBezier(item(['A', 'B'], 'line'), figures)).toThrow(ParseError)
    })
})

describe('applyBezierOption', () => {
    test('close closes a smooth curve', () => {
        const {context, A, B, C} = create()
        const curve = new Bezier(context, 'b', {through: [{point: A}, {point: B}, {point: C}]})

        applyBezierOption(curve, 'close', true)

        expect(curve.config.closed).toBe(true)
        expect(curve.shape.attr('d')).toContain(' Z')
    })

    test('an option on a figure that is not a Bézier curve is an OptionError', () => {
        const {d} = create()

        expect(() => {
            applyBezierOption(d, 'close', true)
        }).toThrow(OptionError)
    })

    test.each([['a value', 3], ['false', false]])('%s given to the option is an OptionError', (_, value) => {
        const {context, A, B, C} = create()
        const curve = new Bezier(context, 'b', {through: [{point: A}, {point: B}, {point: C}]})

        expect(() => {
            applyBezierOption(curve, 'close', value)
        }).toThrow(OptionError)
    })

    test('a curve that cannot be closed is an OptionError: control points, or two points', () => {
        const {context, A, B, C} = create()
        const pulled = new Bezier(context, 'b', {controls: [A, B, C]})
        const short = new Bezier(context, 'c', {through: [{point: A}, {point: B}]})

        expect(() => {
            applyBezierOption(pulled, 'close', true)
        }).toThrow(OptionError)
        expect(() => {
            applyBezierOption(short, 'close', true)
        }).toThrow(OptionError)
        expect(pulled.config.closed).toBeUndefined()
    })
})
