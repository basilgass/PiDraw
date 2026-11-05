import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {ParseError} from '../../src/errors'
import {curveValues, splitFunction} from '../../src/parser/parser.curve'

const item = ({name: 'f', key: 'plot', values: [], parameters: {}}) as unknown as PARSER
const interval = (min: number, max: number) => ({min, max, axis: 'x' as const})
const read = (values: Parameters<typeof curveValues>[0], intervals: 1 | 2 = 2) => curveValues(values, item, intervals, 'a domain')
const near = (value: number): number => expect.closeTo(value, 8) as number

describe('splitFunction', () => {
    test.each([
        ['sin(x)', 'sin(x)', []],
        ['sin(x)@50', 'sin(x)', ['@50']],
        ['x^2@', 'x^2', ['@']],
        ['a@b@3', 'a@b', ['@3']]
    ])('%s is the function %s and the samples %j', (value, text, samples) => {
        expect(splitFunction(value)).toEqual({text, samples})
    })

    test('a number is the constant function', () => {
        expect(splitFunction(3)).toEqual({text: '3', samples: []})
        expect(splitFunction(-1.5)).toEqual({text: '-1.5', samples: []})
    })

    test.each([[true], [undefined], [{min: 0, max: 1}]])('%j is not a function: null', (value) => {
        expect(splitFunction(value as never)).toBeNull()
    })
})

describe('curveValues', () => {
    test('nothing after the functions is nothing', () => {
        expect(read([])).toEqual({})
    })

    test('an interval given by the parser keeps its bounds and loses its axis', () => {
        expect(read([interval(-2, 2)])).toEqual({domain: {min: -2, max: 2}})
    })

    test('the first interval is the domain, the second the image', () => {
        expect(read([interval(-2, 2), interval(0, 1)])).toEqual({domain: {min: -2, max: 2}, image: {min: 0, max: 1}})
        expect(read([interval(-2, 2), '0:1'])).toEqual({domain: {min: -2, max: 2}, image: {min: 0, max: 1}})
    })

    test.each([
        ['pi', '-pi:pi', -Math.PI, Math.PI],
        ['2pi', '0:2pi', 0, 2 * Math.PI],
        ['.5pi', '.5pi:pi', Math.PI / 2, Math.PI],
        ['1.5pi', '0:1.5pi', 0, 1.5 * Math.PI],
        ['pi/2', '-pi/2:pi/2', -Math.PI / 2, Math.PI / 2],
        ['decimals', '-1.25:3.5', -1.25, 3.5],
        ['a sum', '0:2+pi', 0, 2 + Math.PI],
        ['spaces', ' -pi : pi ', -Math.PI, Math.PI]
    ])('the bounds can be %s', (_, text, min, max) => {
        expect(read([text])).toEqual({domain: {min: near(min), max: near(max)}})
    })

    test('the samples are written @ and a number, alone or at the end of an interval', () => {
        expect(read(['@50'])).toEqual({samples: 50})
        expect(read(['@2.5'])).toEqual({samples: 2.5})
        expect(read(['0:2pi@12'])).toEqual({samples: 12, domain: {min: 0, max: near(2 * Math.PI)}})
        expect(read([interval(0, 1), '@7'])).toEqual({samples: 7, domain: {min: 0, max: 1}})
    })

    test('a curve with a domain only refuses a second interval', () => {
        expect(read([interval(0, 1)], 1)).toEqual({domain: {min: 0, max: 1}})
        expect(() => read([interval(0, 1), interval(2, 3)], 1)).toThrow(ParseError)
    })

    test.each([
        ['a third interval', [interval(0, 1), interval(0, 1), interval(0, 1)]],
        ['an interval with a variable', ['0:x']],
        ['an interval with a bound that is not a number', ['a:b']],
        ['an interval with nothing after the colon', ['2:']],
        ['an interval with nothing before the colon', [':2']],
        ['an interval with two colons', ['1:2:3']],
        ['an interval whose bound is infinite', ['0:1/0']],
        ['an interval with its bounds reversed', ['3:1']],
        ['a text that is not an interval', ['abc']],
        ['a number', [3]],
        ['a boolean', [true]],
        ['an @ without a number', ['@']],
        ['an @ with text', ['@many']],
        ['samples of 0', ['@0']],
        ['negative samples', ['@-3']],
        ['two samples', ['@1', '@2']]
    ])('%s is a ParseError that names the line', (_, values) => {
        expect(() => read(values as never)).toThrow(ParseError)
        expect(() => read(values as never)).toThrow(/"f"/)
    })
})
