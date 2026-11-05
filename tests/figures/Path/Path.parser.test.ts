import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {ParseError} from '../../../src/errors'
import {buildPath} from '../../../src/figures/Path/Path.parser'

const item = (values: unknown[], key = 'path') => ({name: 'p', key, values, parameters: {}}) as unknown as PARSER

describe('buildPath', () => {
    test('the data are in units of the coordinate system', () => {
        expect(buildPath(item(['M 0', '0 L 2', 1]))).toEqual({create: 'path', config: {d: 'M 0,0 L 2,1', units: true}})
    })

    test('the values that the commas cut are put back together', () => {
        expect(buildPath(item(['M 0', '0 L 2', 1])).config.d).toBe('M 0,0 L 2,1')
    })

    test('a single value is the data as they are', () => {
        expect(buildPath(item(['M 0 0 L 2 1 Z'])).config.d).toBe('M 0 0 L 2 1 Z')
    })

    test('curves and arcs are accepted', () => {
        expect(buildPath(item(['M 0 0 C 1 1 2 1 3 0 A 1 1 0 0 1 4 1 Q 5 5 6 0'])).create).toBe('path')
    })

    test('a key that is not path is a ParseError', () => {
        expect(() => buildPath(item(['M 0 0'], 'line'))).toThrow(ParseError)
    })

    test('no value is a ParseError that names the figure', () => {
        expect(() => buildPath(item([]))).toThrow(ParseError)
        expect(() => buildPath(item([]))).toThrow(/"p"/)
    })

    test('a value that is not a number or a text is a ParseError', () => {
        expect(() => buildPath(item([{min: 0, max: 1}]))).toThrow(ParseError)
        expect(() => buildPath(item([true]))).toThrow(ParseError)
    })

    test.each([
        ['data that do not begin with M', 'L 0 0'],
        ['a command that does not exist', 'M 0 0 X 1 1'],
        ['a number that is missing', 'M 0']
    ])('%s is a ParseError that names the figure', (_, d) => {
        expect(() => buildPath(item([d]))).toThrow(ParseError)
        expect(() => buildPath(item([d]))).toThrow(/"p"/)
    })
})
