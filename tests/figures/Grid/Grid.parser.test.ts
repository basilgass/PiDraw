import {describe, expect, test} from 'vitest'
import {Grid} from '../../../src/figures/Grid/Grid'
import {Line} from '../../../src/figures/Line/Line'
import {OptionError, ParseError} from '../../../src/errors'
import type {PARSER} from 'piparser'
import {applyGridOption, buildGrid, buildGridParameters} from '../../../src/figures/Grid/Grid.parser'
import type {IParserParameters} from '../../../src/parser/parser.types'
import {createContext} from '../../helpers/figure'

/** The parameter that the parser gives for `grid=value/option/option`. */
const parameter = (value: unknown, ...options: unknown[]) => ({value, options}) as unknown as IParserParameters


describe('buildGridParameters', () => {
    test('no parameter, or false, is no grid', () => {
        expect(buildGridParameters()).toBeNull()
        expect(buildGridParameters(parameter(false), parameter(false), parameter(false))).toBeNull()
    })

    test('the word grid alone is the default grid', () => {
        expect(buildGridParameters(parameter(true))).toEqual({})
    })

    test('a number is the step of both axes', () => {
        expect(buildGridParameters(parameter(2))).toEqual({step: {x: 2, y: 2}})
        expect(buildGridParameters(parameter(0.5))).toEqual({step: {x: 0.5, y: 0.5}})
    })

    test('a step in pi is for the x axis, the y axis keeps 1', () => {
        const config = buildGridParameters(parameter('pi', 3))

        expect(config?.step?.x).toBeCloseTo(Math.PI / 3, 9)
        expect(config?.step?.y).toBe(1)
    })

    test('gridX and gridY give the step of one axis, the other one is 1', () => {
        expect(buildGridParameters(undefined, parameter(3))).toEqual({step: {x: 3, y: 1}})
        expect(buildGridParameters(undefined, undefined, parameter(3))).toEqual({step: {x: 1, y: 3}})
    })

    test('gridX and gridY change the step that grid gives', () => {
        expect(buildGridParameters(parameter(2), parameter(5))).toEqual({step: {x: 5, y: 2}})
        expect(buildGridParameters(parameter(2), undefined, parameter(0.5))).toEqual({step: {x: 2, y: 0.5}})
        expect(buildGridParameters(parameter(true), parameter(4), parameter(true))).toEqual({step: {x: 4, y: 1}})
    })

    test('gridX can be a step in pi', () => {
        expect(buildGridParameters(undefined, parameter('pi', 2))?.step?.x).toBeCloseTo(Math.PI / 2, 9)
    })

    test('steps of 1 are the default grid', () => {
        expect(buildGridParameters(parameter(1))).toEqual({})
        expect(buildGridParameters(undefined, parameter(1), parameter(1))).toEqual({})
    })

    test('an invalid step is a ParseError that names the parameter', () => {
        expect(() => buildGridParameters(parameter(0))).toThrow(/grid/)
        expect(() => buildGridParameters(parameter(2), parameter('abc'))).toThrow(/gridX/)
        expect(() => buildGridParameters(undefined, undefined, parameter(-1))).toThrow(ParseError)
    })
})

describe('applyGridOption', () => {
    const grid = () => new Grid(createContext(), 'g')

    test('subgrid alone cuts each step in 2', () => {
        const g = grid()

        applyGridOption(g, 'subgrid', true)

        expect(g.config.subdivisions).toBe(2)
        expect(g.subLines.length).toBeGreaterThan(0)
    })

    test('subgrid=n cuts each step in n', () => {
        const g = grid()

        applyGridOption(g, 'subgrid', 4)

        expect(g.config.subdivisions).toBe(4)
    })

    test('keeps the step of the grid', () => {
        const g = new Grid(createContext(), 'g', {step: {x: 2, y: 3}})

        applyGridOption(g, 'subgrid', 3)

        expect(g.config).toEqual({step: {x: 2, y: 3}, subdivisions: 3})
    })

    test.each([
        ['1', 1],
        ['more than 20', 21],
        ['a number that is not an integer', 2.5],
        ['text', 'abc'],
        ['false', false]
    ])('%s is an OptionError that names the option, and the grid is left as it was', (_, value) => {
        const g = grid()

        expect(() => {
            applyGridOption(g, 'subgrid', value)
        }).toThrow(OptionError)
        expect(() => {
            applyGridOption(g, 'subgrid', value)
        }).toThrow(/"subgrid"/)
        expect(g.config.subdivisions).toBeUndefined()
    })

    test('a figure that is not a grid is an OptionError', () => {
        const line = new Line(createContext(), 'd', {through: {A: {x: 0, y: 0}, B: {x: 1, y: 1}}})

        expect(() => {
            applyGridOption(line, 'subgrid', 3)
        }).toThrow(OptionError)
        expect(() => {
            applyGridOption(line, 'subgrid', 3)
        }).toThrow(/"d"/)
    })
})

// The item that the parser gives for a line of code.
const item = (values: unknown[], key = 'grid') => ({name: 'g', key, values, parameters: {}}) as unknown as PARSER
const interval = (min: number, max: number) => ({min, max, axis: 'x'})

describe('buildGrid', () => {
    test('nothing is the whole drawing', () => {
        expect(buildGrid(item([]))).toEqual({create: 'grid', config: {}})
    })

    test('a key alone, which the parser reads as a word, is the whole drawing', () => {
        expect(buildGrid(item([true])).config).toEqual({})
    })

    test('a number is the step of both axes', () => {
        expect(buildGrid(item([0.5])).config).toEqual({step: {x: 0.5, y: 0.5}})
    })

    test('a step in pi is for the x axis, the y axis keeps 1', () => {
        const config = buildGrid(item(['pi/3'])).config

        expect(config.step?.x).toBeCloseTo(Math.PI / 3, 9)
        expect(config.step?.y).toBe(1)
    })

    test('a vector is the step of each axis', () => {
        expect(buildGrid(item([{x: 0.5, y: 2}])).config).toEqual({step: {x: 0.5, y: 2}})
    })

    test('two intervals are the part of the drawing that has the grid', () => {
        expect(buildGrid(item([interval(0, 5), interval(0, 3)])).config).toEqual({x: {min: 0, max: 5}, y: {min: 0, max: 3}})
    })

    test('the intervals can be written with pi, and a step goes last', () => {
        const config = buildGrid(item(['-2pi:2pi', interval(-1, 1), 'pi/2'])).config

        expect(config.x?.min).toBeCloseTo(-2 * Math.PI, 9)
        expect(config.x?.max).toBeCloseTo(2 * Math.PI, 9)
        expect(config.y).toEqual({min: -1, max: 1})
        expect(config.step?.x).toBeCloseTo(Math.PI / 2, 9)
    })

    test('the intervals and a step for each axis', () => {
        expect(buildGrid(item([interval(0, 4), interval(0, 2), {x: 1, y: 0.5}])).config).toEqual({
            x: {min: 0, max: 4},
            y: {min: 0, max: 2},
            step: {x: 1, y: 0.5}
        })
    })

    test.each([
        ['one interval', [interval(0, 5)]],
        ['an interval and a number', [interval(0, 5), 3]],
        ['a step of 0', [0]],
        ['a negative step', [-1]],
        ['a step that is text', ['abc']],
        ['a vector with a step of 0', [{x: 0, y: 1}]],
        ['two steps', [1, 2]],
        ['intervals and two steps', [interval(0, 5), interval(0, 3), 1, 2]],
        ['an interval with a bound that is text', ['0:x', interval(0, 3)]],
        ['an interval that is empty', [interval(2, 2), interval(0, 3)]]
    ])('%s is a ParseError that names the line', (_, values) => {
        expect(() => buildGrid(item(values))).toThrow(ParseError)
        expect(() => buildGrid(item(values))).toThrow(/"g"|grid/)
    })

    test('a key that does not define a grid is a ParseError', () => {
        expect(() => buildGrid(item([], 'line'))).toThrow(ParseError)
    })
})

