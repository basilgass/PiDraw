import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {Edge} from '../../../src/figures/Edge/Edge'
import {Line} from '../../../src/figures/Line/Line'
import {Point} from '../../../src/figures/Point/Point'
import {OptionError, ParseError} from '../../../src/errors'
import {buildEdge, EDGE_ITEMS, EDGE_OPTION_HANDLERS} from '../../../src/figures/Edge/Edge.parser'
import type {IParserParameters} from '../../../src/parser/parser.types'
import {createContext} from '../../helpers/figure'

// The figures of a drawing, and the item that the parser gives for a line of code.
function create() {
    const context = createContext()
    const point = (name: string, x: number, y: number) => new Point(context, name, {coordinates: {x, y}})
    const [A, B] = [point('A', 0, 0), point('B', 3, 0)]
    const d = new Line(context, 'd', {through: {A, B}})
    const edge = new Edge(context, 'e', {from: A, to: B})
    const loop = new Edge(context, 'f', {from: A, to: A})

    const figures = {A, B, d, e: edge, f: loop}
    const item = (values: unknown[], key = 'edge') => ({name: 'e', key, values, parameters: {}}) as unknown as PARSER
    const option = (value: IParserParameters['value'], ...options: IParserParameters['options']): IParserParameters => ({value, options})

    return {A, B, d, edge, loop, figures, item, option}
}

describe('buildEdge', () => {
    test('is an edge from a point to another', () => {
        const {A, B, item, figures} = create()

        expect(buildEdge(item(['A', 'B']), figures)).toEqual({create: 'edge', config: {from: A, to: B}})
    })

    test('is a loop when the point is the same twice', () => {
        const {A, item, figures} = create()

        expect(buildEdge(item(['A', 'A']), figures)).toEqual({create: 'edge', config: {from: A, to: A}})
    })

    test.each([
        ['one value', ['A']],
        ['three values', ['A', 'B', 'A']],
        ['no value', []],
        ['a line', ['A', 'd']],
        ['a name that is not a figure', ['A', 'Z']],
        ['a number', ['A', 3]]
    ])('%s is a ParseError', (_, values) => {
        const {item, figures} = create()

        expect(() => buildEdge(item(values), figures)).toThrow(ParseError)
    })

    test('a key that is not edge is a ParseError', () => {
        const {item, figures} = create()

        expect(() => buildEdge(item(['A', 'B'], 'seg'), figures)).toThrow(ParseError)
    })
})

describe('the options curve and loopSide', () => {
    test('curve bends the edge', () => {
        const {edge, option} = create()

        EDGE_OPTION_HANDLERS.curve(edge, option(0.3))

        expect(edge.config.curve).toBe(0.3)
    })

    test('curve can be negative', () => {
        const {edge, option} = create()

        EDGE_OPTION_HANDLERS.curve(edge, option(-0.4))

        expect(edge.config.curve).toBe(-0.4)
    })

    test.each([[true], ['left'], [{x: 1, y: 2}]])('curve=%j is an OptionError: it is a number', (value) => {
        const {edge, option} = create()

        expect(() => {
            EDGE_OPTION_HANDLERS.curve(edge, option(value))
        }).toThrow(OptionError)
    })

    test('loopSide gives the side of a loop, and the top when it has no value', () => {
        const {loop, option} = create()

        EDGE_OPTION_HANDLERS.loopSide(loop, option('r'))
        expect(loop.config.loopSide).toBe('r')

        EDGE_OPTION_HANDLERS.loopSide(loop, option(true))
        expect(loop.config.loopSide).toBe('t')
    })

    test.each([['x'], [3], [false]])('loopSide=%j is an OptionError: it is t, r, b or l', (value) => {
        const {loop, option} = create()

        expect(() => {
            EDGE_OPTION_HANDLERS.loopSide(loop, option(value))
        }).toThrow(OptionError)
    })

    test('curve is not for a loop, and loopSide is only for a loop: the InvalidArgumentError of the edge is the one of the config', () => {
        const {edge, loop, option} = create()

        expect(() => {
            EDGE_OPTION_HANDLERS.curve(loop, option(0.3))
        }).toThrow()
        expect(() => {
            EDGE_OPTION_HANDLERS.loopSide(edge, option('t'))
        }).toThrow()
        expect(loop.config.curve).toBeUndefined()
        expect(edge.config.loopSide).toBeUndefined()
    })

    test.each(['curve', 'loopSide'] as const)('%s on a figure that is not an edge is an OptionError', (key) => {
        const {A, option} = create()

        expect(() => {
            EDGE_OPTION_HANDLERS[key](A, option(0.3))
        }).toThrow(OptionError)
    })
})

describe('EDGE_ITEMS', () => {
    test('is the key edge, with its form', () => {
        expect(Object.keys(EDGE_ITEMS)).toEqual(['edge'])
        expect(EDGE_ITEMS.edge?.forms).toEqual(['e=edge <point>,<point>'])
    })
})
