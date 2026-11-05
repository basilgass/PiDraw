import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Line} from '../../../src/figures/Line/Line'
import {Plot} from '../../../src/figures/Plot/Plot'
import {Point} from '../../../src/figures/Point/Point'
import {ParseError} from '../../../src/errors'
import {buildLine, parseLineShorthand} from '../../../src/figures/Line/Line.parser'
import {ALTERNATIVE} from '../../../src/parser/parser.common'
import {createAxes, createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})

    const A = point('A', 0, 0)
    const B = point('B', 2, 1)
    const C = point('C', 1, 3)
    const d = new Line(context, 'd', {through: {A, B}})
    const e = new Line(context, 'e', {through: {A, B: C}})
    const f = new Plot(context, 'f', {expression: 'x^2'})

    const figures = {A, B, C, d, e, f, ...createAxes(context)}
    const item = (key: string, values: unknown[]) =>
        ({name: 'P', key, values, parameters: {}}) as unknown as PARSER

    return {...figures, figures, item}
}

describe('buildLine of a line given by two points', () => {
    test.each([
        ['line', 'line'],
        ['seg', 'segment'],
        ['vec', 'vector'],
        ['ray', 'ray']
    ])('%s is a %s through the two points', (key, shape) => {
        const {item, figures, A, B} = create()

        expect(buildLine(item(key, ['A', 'B']), figures)).toEqual({create: 'line', config: {through: {A, B}, shape}})
    })
})

describe('buildLine of a line given by a point and a slope', () => {
    test.each([
        ['a number', 2, 2],
        ['zero', 0, 0],
        ['a fraction', '1/2', 0.5],
        ['a negative fraction', '-3/4', -0.75]
    ])('line with %s as the slope', (_, value, slope) => {
        const {item, figures, A} = create()

        expect(buildLine(item('line', ['A', value]), figures).config).toEqual({slope: {A, slope}, shape: 'line'})
    })

    test.each(['seg', 'vec', 'ray'])('%s with a slope is a ParseError: only a line can be given by a slope', (key) => {
        const {item, figures} = create()

        expect(() => buildLine(item(key, ['A', 2]), figures)).toThrow(ParseError)
    })
})

describe('buildLine of a line given by an equation', () => {
    test('line with an equation', () => {
        const {item, figures} = create()

        expect(buildLine(item('line', ['y=2x+1']), figures).config).toEqual({equation: 'y=2x+1'})
    })
})

describe('buildLine of a perpendicular, a parallel, a mediator, a tangent and a bisector', () => {
    test.each(['perp', 'para'])('%s to a line goes through a point', (key) => {
        const {item, figures, d, C} = create()
        const config = buildLine(item(key, ['d', 'C']), figures).config

        expect(config).toEqual(key === 'perp' ? {perpendicular: {to: d, through: C}} : {parallel: {to: d, through: C}})
    })

    test.each([
        ['perp', 'Ox'],
        ['perp', 'Oy'],
        ['para', 'Ox'],
        ['para', 'Oy']
    ] as const)('%s to the axis %s goes through a point', (key, axis) => {
        const {item, figures, C} = create()
        const config = buildLine(item(key, [axis, 'C']), figures).config

        expect(config).toEqual(key === 'perp' ? {perpendicular: {to: figures[axis], through: C}} : {parallel: {to: figures[axis], through: C}})
    })

    test('med is the mediator of two points', () => {
        const {item, figures, A, B} = create()

        expect(buildLine(item('med', ['A', 'B']), figures).config).toEqual({mediator: {A, B}})
    })

    test('tan is the tangent to a curve at a point', () => {
        const {item, figures, f, A} = create()

        expect(buildLine(item('tan', ['f', 'A']), figures).config).toEqual({tangent: {f, A}})
    })

    test('bis of two lines is their bisector', () => {
        const {item, figures, d, e} = create()

        expect(buildLine(item('bis', ['d', 'e']), figures).config).toEqual({bisector: {d1: d, d2: e}})
    })

    test.each([
        ['Ox', 'd'],
        ['d', 'Oy'],
        ['Ox', 'Oy']
    ])('bis of %s and %s accepts the axes as lines', (first, second) => {
        const {item, figures} = create()
        const line = (name: string) => name in figures ? figures[name as keyof typeof figures] : name

        expect(buildLine(item('bis', [first, second]), figures).config).toEqual({bisector: {d1: line(first), d2: line(second)}})
    })

    test('bis of two lines and a last mark is the other bisector', () => {
        const {item, figures, d, e} = create()

        expect(buildLine(item('bis', ['d', 'e', ALTERNATIVE]), figures).config)
            .toEqual({bisector: {d1: d, d2: e, alternative: true}})
        expect(buildLine(item('bis', ['Ox', 'd', ALTERNATIVE]), figures).config)
            .toEqual({bisector: {d1: figures.Ox, d2: d, alternative: true}})
    })

    test('bis of three points is the bisector of the angle at the second one', () => {
        const {item, figures, A, B, C} = create()

        expect(buildLine(item('bis', ['B', 'A', 'C']), figures).config).toEqual({bisector: {A, B, C}})
    })
})

describe('buildLine of a line of code that is not valid', () => {
    test.each([
        ['line with three values', 'line', ['A', 'B', 'A']],
        ['line with no value', 'line', []],
        ['line with a slope that is text', 'line', ['A', 'abc']],
        ['line with a number alone', 'line', [5]],
        ['line with a point alone', 'line', ['A']],
        ['line with a line and a number', 'line', ['d', 2]],
        ['seg with one point', 'seg', ['A']],
        ['seg with three points', 'seg', ['A', 'B', 'C']],
        ['ray with a line', 'ray', ['d', 'A']],
        ['vec with a number', 'vec', ['A', 'B', 3]],
        ['perp without a point', 'perp', ['d']],
        ['perp to a point', 'perp', ['A', 'B']],
        ['para through a line', 'para', ['d', 'e']],
        ['para with three values', 'para', ['d', 'A', 'B']],
        ['med with a line', 'med', ['A', 'd']],
        ['tan of a line', 'tan', ['d', 'A']],
        ['tan without a point', 'tan', ['f']],
        ['bis with one line', 'bis', ['d']],
        ['bis with a line and a point', 'bis', ['d', 'A']],
        ['bis with three values, one of which is a line', 'bis', ['B', 'A', 'd']],
        ['bis with four values', 'bis', ['d', 'e', 'd', 'e']],
        ['bis with two lines and a last value that is not the mark', 'bis', ['d', 'e', 'x']],
        ['bis with two lines and a last value that is a number', 'bis', ['d', 'e', 1]],
        ['bis with a line, a point and the mark', 'bis', ['d', 'A', ALTERNATIVE]],
        ['bis with two points and the mark', 'bis', ['A', 'B', ALTERNATIVE]],
        ['bis with the mark first', 'bis', [ALTERNATIVE, 'd', 'e']],
        ['a key that does not define a line', 'pt', ['A', 'B']]
    ])('%s is a ParseError that names the line', (_, key, values) => {
        const {item, figures} = create()

        expect(() => buildLine(item(key, values), figures)).toThrow(ParseError)
        expect(() => buildLine(item(key, values), figures)).toThrow(/"P"/)
    })
})

describe('parseLineShorthand', () => {
    test.each([
        ['d=AB', 'd=line A,B'],
        ['d=AB.', 'd=seg A,B'],
        ['d=[AB]', 'd=seg A,B'],
        ['d=AB[', 'd=ray A,B'],
        ['d=[AB[', 'd=ray A,B'],
        ['d=[AB', 'd=ray A,B'],
        ['d=vAB', 'd=vec A,B'],
        ['d=A1B2', 'd=line A1,B2'],
        ['l1=[A1B12]', 'l1=seg A1,B12'],
        ['v=vA1B', 'v=vec A1,B']
    ])('%s is %s', (shorthand, expected) => {
        expect(parseLineShorthand(shorthand)).toBe(expected)
    })

    test.each([
        ['a line with its key and a space', 'd=line A,B'],
        ['a key that needs no value', 'g=grid'],
        ['a key whose values are missing: its own error', 'f=plot'],
        ['another key whose values are missing', 'c=circ'],
        ['a point', 'A(3,4)'],
        ['a line without an id', 'AB'],
        ['text without =', 'hello']
    ])('%s is not a shorthand: null', (_, text) => {
        expect(parseLineShorthand(text)).toBeNull()
    })

    test.each([
        ['one point', 'd=A'],
        ['three points', 'd=ABC'],
        ['a vector with a dot', 'd=vAB.'],
        ['text after the points', 'd=AB-x'],
        ['names that are not points', 'd=ab'],
        ['nothing after =', 'd='],
        ['an equation', 'd=y=2x+1']
    ])('%s is a ParseError that names the text', (_, text) => {
        expect(() => parseLineShorthand(text)).toThrow(ParseError)
        expect(() => parseLineShorthand(text)).toThrow(new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    })
})
