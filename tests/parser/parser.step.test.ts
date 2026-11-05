import {describe, expect, test} from 'vitest'
import {ParseError} from '../../src/errors'
import type {IParserParameters} from '../../src/parser/parser.types'
import {parseStep, parseStepValue} from '../../src/parser/parser.step'

/** The parameter that the parser gives for `grid=value/option/option`. */
const parameter = (value: unknown, ...options: unknown[]) => ({value, options}) as unknown as IParserParameters

describe('parseStep', () => {
    test('the word alone has no step', () => {
        expect(parseStep(parameter(true), 'grid')).toBeNull()
    })

    test('a number is the step', () => {
        expect(parseStep(parameter(2), 'grid')).toEqual({step: 2, pi: false})
        expect(parseStep(parameter(0.5), 'axis')).toEqual({step: 0.5, pi: false})
    })

    test.each([
        ['pi', [], Math.PI / 2],
        ['pi', [3], Math.PI / 3],
        ['2pi', [3], 2 * Math.PI / 3],
        ['2pi', [], Math.PI],
        ['.5pi', [4], Math.PI / 8]
    ])('%s over %j is a step in pi', (value, options, step) => {
        const read = parseStep(parameter(value, ...options), 'grid')

        expect(read?.step).toBeCloseTo(step, 9)
        expect(read?.pi).toBe(true)
    })

    test.each([
        ['a step of 0', parameter(0)],
        ['a negative step', parameter(-1)],
        ['a step that is not a number', parameter(NaN)],
        ['an option after a number', parameter(2, 3)],
        ['an option after the word', parameter(true, 3)],
        ['text', parameter('abc')],
        ['a multiple of pi that is 0', parameter('0pi')],
        ['a denominator of 0', parameter('pi', 0)],
        ['a denominator that is not an integer', parameter('pi', 2.5)],
        ['a denominator that is text', parameter('pi', 'x')],
        ['two denominators', parameter('pi', 2, 3)],
        ['a vector', parameter({x: 1, y: 2})]
    ])('%s is a ParseError that names the parameter', (_, value) => {
        expect(() => parseStep(value, 'gridX')).toThrow(ParseError)
        expect(() => parseStep(value, 'gridX')).toThrow(/gridX/)
    })
})

describe('parseStepValue', () => {
    test.each([
        [0.5, 0.5, false],
        [2, 2, false],
        ['pi', Math.PI / 2, true],
        ['pi/3', Math.PI / 3, true],
        ['2pi/3', 2 * Math.PI / 3, true],
        ['.5pi/4', Math.PI / 8, true]
    ])('%s is a step of %d', (value, step, pi) => {
        const read = parseStepValue(value)

        expect(read?.step).toBeCloseTo(step, 9)
        expect(read?.pi).toBe(pi)
    })

    test.each([0, -1, NaN, Infinity, 'abc', 'pi/0', '0pi', 'pi/x', true, null, undefined, {x: 1, y: 2}])('%j is not a step', (value) => {
        expect(parseStepValue(value)).toBeNull()
    })
})
