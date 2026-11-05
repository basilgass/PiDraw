import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Arc} from '../../../src/figures/Arc/Arc'
import {Bezier} from '../../../src/figures/Bezier/Bezier'
import {Circle} from '../../../src/figures/Circle/Circle'
import {Polygon} from '../../../src/figures/Polygon/Polygon'
import {Line} from '../../../src/figures/Line/Line'
import {Parametric} from '../../../src/figures/Parametric/Parametric'
import {Plot} from '../../../src/figures/Plot/Plot'
import {Point} from '../../../src/figures/Point/Point'
import {ParseError} from '../../../src/errors'
import {buildFollow} from '../../../src/figures/Follow/Follow.parser'
import {ALTERNATIVE} from '../../../src/parser/parser.common'
import {createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const A = new Point(context, 'A', {coordinates: {x: 1, y: 1}})
    const B = new Point(context, 'B', {coordinates: {x: 2, y: 3}})
    const f = new Plot(context, 'f', {expression: 'x^2'})
    const g = new Parametric(context, 'g', {expressions: {x: 'cos(t)', y: 'sin(t)'}})
    const d = new Line(context, 'd', {through: {A, B}})
    const c = new Circle(context, 'c', {center: A, radius: 2})

    const a = new Arc(context, 'a', {points: {start: {x: 450, y: 300}, center: {x: 400, y: 300}, end: {x: 400, y: 250}}})
    const p = new Polygon(context, 'p', {vertices: [{x: 0, y: 0}, {x: 100, y: 0}, {x: 0, y: 100}]})
    const b = new Bezier(context, 'b', {through: [{point: {x: 0, y: 0}}, {point: {x: 100, y: 100}}]})

    const figures = {A, B, f, g, d, c, a, p, b}
    const item = (values: unknown[], key = 'follow') => ({name: 't', key, values, parameters: {}}) as unknown as PARSER

    return {...figures, figures, item}
}

describe('buildFollow', () => {
    test('follow with a figure', () => {
        const {item, figures, f} = create()

        expect(buildFollow(item(['f']), figures)).toEqual({create: 'follow', config: {follow: f}})
    })

    test.each(['f', 'g', 'd', 'c', 'a', 'p', 'b'])('follows %s: a plot, a parametric curve, a line, a circle, an arc, a polygon, a Bézier curve', (name) => {
        const {item, figures} = create()

        expect(buildFollow(item([name]), figures).config.follow).toBe(figures[name as keyof typeof figures])
    })

    test('a point is where it starts', () => {
        const {item, figures, f, A} = create()

        expect(buildFollow(item(['f', 'A']), figures).config).toEqual({follow: f, at: A})
    })

    test('a last mark draws the tangent', () => {
        const {item, figures, f, A} = create()

        expect(buildFollow(item(['f', ALTERNATIVE]), figures).config).toEqual({follow: f, tangent: true})
        expect(buildFollow(item(['f', 'A', ALTERNATIVE]), figures).config).toEqual({follow: f, at: A, tangent: true})
    })
})

describe('buildFollow of a line of code that is not valid', () => {
    test.each([
        ['no value', []],
        ['a mark alone', [ALTERNATIVE]],
        ['a name that is not a figure', ['Z']],
        ['text', ['x^2']],
        ['a number', [3]],
        ['a point, which cannot be followed', ['A']],
        ['a starting position that is not a point', ['f', 'd']],
        ['a starting position that is a number', ['f', 3]],
        ['a spare value', ['f', 'A', 'B']],
        ['a spare value after the mark', ['f', ALTERNATIVE, 'A']],
        ['the word show of the former syntax', ['f', 'show']]
    ])('%s is a ParseError that names the line', (_, values) => {
        const {item, figures} = create()

        expect(() => buildFollow(item(values), figures)).toThrow(ParseError)
        expect(() => buildFollow(item(values), figures)).toThrow(/"t"/)
    })

    test('a key that does not define a point that follows is a ParseError', () => {
        const {item, figures} = create()

        expect(() => buildFollow(item(['f'], 'line'), figures)).toThrow(ParseError)
    })
})
