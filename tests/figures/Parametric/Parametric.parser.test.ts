import {describe, expect, test} from 'vitest'
import type {PARSER} from 'piparser'
import {ParseError} from '../../../src/errors'
import {buildParametric, parseParametricShorthand} from '../../../src/figures/Parametric/Parametric.parser'

// What the parser gives: an interval of numbers is an object, with its axis; the samples (`@50`) stay in the text.
const interval = (min: number, max: number) => ({min, max, axis: 'x'})
const item = (values: unknown[], key = 'parametric') => ({name: 'f', key, values, parameters: {}}) as unknown as PARSER
const near = (value: number): number => expect.closeTo(value, 8) as number

describe('buildParametric', () => {
    test('two functions', () => {
        expect(buildParametric(item(['cos(t)', 'sin(t)']), {})).toEqual({
            create: 'parametric',
            config: {expressions: {x: 'cos(t)', y: 'sin(t)'}}
        })
    })

    test('a number is a constant function', () => {
        expect(buildParametric(item(['t', 3]), {}).config).toEqual({expressions: {x: 't', y: '3'}})
    })

    test('the functions are read as they are written, whatever the figures called like them', () => {
        expect(buildParametric(item(['t', 'A']), {}).config).toEqual({expressions: {x: 't', y: 'A'}})
    })

    test('a domain of numbers', () => {
        expect(buildParametric(item(['t', 't^2', interval(-1.5, 2.5)]), {}).config)
            .toEqual({expressions: {x: 't', y: 't^2'}, domain: {min: -1.5, max: 2.5}})
    })

    test.each([
        ['0:2pi', 0, 2 * Math.PI],
        ['-pi:pi', -Math.PI, Math.PI],
        ['.5pi:2pi', Math.PI / 2, 2 * Math.PI],
        ['1.5:3pi', 1.5, 3 * Math.PI],
        ['-pi/2:pi/2', -Math.PI / 2, Math.PI / 2],
        ['0:4.5', 0, 4.5],
        ['-2e:e', -2 * Math.E, Math.E]
    ])('the domain %s can have pi and decimal numbers', (text, min, max) => {
        expect(buildParametric(item(['cos(t)', 'sin(t)', text]), {}).config)
            .toEqual({expressions: {x: 'cos(t)', y: 'sin(t)'}, domain: {min: near(min), max: near(max)}})
    })

    test('the samples are at the end of a value, or alone', () => {
        expect(buildParametric(item(['cos(t)', 'sin(t)@50']), {}).config).toEqual({expressions: {x: 'cos(t)', y: 'sin(t)'}, samples: 50})
        expect(buildParametric(item(['cos(t)', 'sin(t)', '@40']), {}).config).toEqual({expressions: {x: 'cos(t)', y: 'sin(t)'}, samples: 40})
        expect(buildParametric(item(['cos(t)', 'sin(t)', '0:2pi@12']), {}).config)
            .toEqual({expressions: {x: 'cos(t)', y: 'sin(t)'}, samples: 12, domain: {min: 0, max: near(2 * Math.PI)}})
    })

    test.each([
        ['no value', []],
        ['one function', ['cos(t)']],
        ['a function that is a domain', [interval(0, 1), 't']],
        ['a function that is a boolean', ['t', true]],
        ['a function that is empty', ['t', '']],
        ['a domain with a bound that is not a number', ['t', 't', 'a:b']],
        ['a domain with a variable', ['t', 't', '0:t']],
        ['a domain with a bound missing', ['t', 't', '0:']],
        ['a domain with a minimum greater than the maximum', ['t', 't', '3:-3']],
        ['two domains', ['t', 't', interval(0, 1), interval(2, 3)]],
        ['a number that is not text', ['t', 't', 5]],
        ['text that is not a domain', ['t', 't', 'x']],
        ['two numbers of samples', ['t', 't@10', '@20']],
        ['a number of samples that is 0', ['t', 't', '@0']],
        ['a number of samples that is negative', ['t', 't', '@-3']],
        ['a number of samples that is text', ['t', 't', '@many']]
    ])('%s is a ParseError that names the line', (_, values) => {
        expect(() => buildParametric(item(values), {})).toThrow(ParseError)
        expect(() => buildParametric(item(values), {})).toThrow(/"f"/)
    })

    test('a key that does not define a parametric curve is a ParseError', () => {
        expect(() => buildParametric(item(['t', 't'], 'plot'), {})).toThrow(ParseError)
    })
})

describe('parseParametricShorthand', () => {
    test.each([
        ['f(t)=cos(t),sin(t)', 'f=parametric cos(t),sin(t)'],
        ['g1(t)=t^2/4,sin(t),0:2pi', 'g1=parametric t^2/4,sin(t),0:2pi'],
        ['h(t)=t,t^2,-pi:pi@40', 'h=parametric t,t^2,-pi:pi@40'],
        ['f(t)=sin(t),cos(t),.5pi:2pi', 'f=parametric sin(t),cos(t),.5pi:2pi']
    ])('%s is %s', (shorthand, expected) => {
        expect(parseParametricShorthand(shorthand)).toBe(expected)
    })

    test.each([
        ['a curve with its key', 'f=parametric cos(t),sin(t)'],
        ['a plot', 'f(x)=x^2'],
        ['a point', 'A(3,4)'],
        ['a name that is not a letter and digits', 'F(t)=t,t'],
        ['text', 'hello']
    ])('%s is not a shorthand of a parametric curve: null', (_, text) => {
        expect(parseParametricShorthand(text)).toBeNull()
    })

    test.each([
        ['no =', 'f(t)'],
        ['nothing after =', 'f(t)='],
        ['only spaces after =', 'f(t)=  '],
        ['text between (t) and =', 'f(t)y=t,t']
    ])('%s is a ParseError that names the text', (_, text) => {
        expect(() => parseParametricShorthand(text)).toThrow(ParseError)
        expect(() => parseParametricShorthand(text)).toThrow(new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    })
})
