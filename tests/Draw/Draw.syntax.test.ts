import {beforeAll, describe, expect, test} from 'vitest'
import {Draw} from '../../src/Draw/Draw'
import {lineParseOptions, optionNames} from '../../src/Draw/Draw.options'
import {PARSER_COLOR_VALUES} from '../../src/parser/parser.common'
import {createContainer, useDocument} from '../helpers/graph'

beforeAll(useDocument)

const draw = (code: string) => new Draw(createContainer(), {code})
const textOf = (d: Draw, name = 'A') => d.graph.figures[name].label?.shape.node.textContent
const problems = (d: Draw) => d.errors.map(error => error.message)

describe('what the parser is given to read a line of a figure', () => {
    test('every option and every color is a known key', () => {
        const keys = lineParseOptions().keys ?? []

        for (const name of [...optionNames(), ...PARSER_COLOR_VALUES]) {
            expect(keys).toContain(name)
        }
    })

    test('the text of a label and of a formula is kept as it is written, and the steps of a figure are a set', () => {
        expect(lineParseOptions().types).toEqual({label: 'text', tex: 'text', slide: 'set', toggle: 'text'})
    })

    test('is the same object each time', () => {
        expect(lineParseOptions()).toBe(lineParseOptions())
    })
})

describe('the text of a label', () => {
    test('may hold a comma', () => {
        const d = draw('A(1,1)->label=Hello, world')

        expect(problems(d)).toEqual([])
        expect(textOf(d)).toBe('Hello, world')
    })

    test('ends at the next option', () => {
        const d = draw('A(1,1)->label=Hello, world,red,thick')

        expect(problems(d)).toEqual([])
        expect(textOf(d)).toBe('Hello, world')
    })

    test('is followed by its position', () => {
        const d = draw('A(1,1)->label=Hello, world/tl')

        expect(problems(d)).toEqual([])
        expect(textOf(d)).toBe('Hello, world')
        expect(d.graph.figures.A.label?.config.alignement).toBe('tl')
    })

    test.each([
        ['t', 'tr'], ['m', 'mr'], ['b', 'br'],
        ['l', 'bl'], ['c', 'bc'], ['r', 'br']
    ])('has the position %s for one letter, which replaces the same part of br', (letter, expected) => {
        for (const key of ['label', 'tex']) {
            const d = draw(`A(1,1)->${key}=A/${letter}`)

            expect(problems(d)).toEqual([])
            expect(d.graph.figures.A.label?.config.alignement).toBe(expected)
        }
    })

    test.each(['x', 'tt', 'tlr', 'll'])('refuses the position %s', (position) => {
        expect(problems(draw(`A(1,1)->label=A/${position}`))).toHaveLength(1)
    })

    test.each([['rm', 'mr'], ['lt', 'tl'], ['cb', 'bc']])('accepts the letters of the position in either order: %s is %s', (written, expected) => {
        const d = draw(`A(1,1)->label=A/${written}`)

        expect(problems(d)).toHaveLength(0)
        expect(d.graph.figures.A.label?.config.alignement).toBe(expected)
    })

    test('may have a comma that is escaped, as before', () => {
        const d = draw('A(1,1)->label=a\\,b')

        expect(problems(d)).toEqual([])
        expect(textOf(d)).toBe('a,b')
    })

    test('is a text even when it looks like a number', () => {
        const d = draw('A(1,1)->label=2')

        expect(problems(d)).toEqual([])
        expect(textOf(d)).toBe('2')
    })

    test('is a text even when it is the name of an option', () => {
        const d = draw('A(1,1)->label=red')

        expect(problems(d)).toEqual([])
        expect(textOf(d)).toBe('red')
    })

    test('a label alone is the name of the figure, and the options go on', () => {
        const d = draw('A(1,1)->label,red')

        expect(problems(d)).toEqual([])
        expect(textOf(d)).toBe('A')
    })

    test('a word after the text that is not an option is part of the text, which the drawing shows', () => {
        const d = draw('A(1,1)->label=Hello,rde')

        expect(problems(d)).toEqual([])
        expect(textOf(d)).toBe('Hello,rde')
    })

    test('the text of a formula may hold a comma too', () => {
        const d = draw('A(1,1)->tex=x_1, y_1,red')

        expect(problems(d)).toEqual([])
        expect(textOf(d)).toBe('x_1, y_1')
    })
})

describe('the options that follow a value that is not a text', () => {
    test('a word that is not an option after an option with a value is an error about that option', () => {
        const d = draw('A(1,1)->w=2,thck')

        expect(problems(d)).toHaveLength(1)
        expect(problems(d)[0]).toContain('"w"')
    })

    test('an option that does not exist after an option without a value is unknown', () => {
        const d = draw('A(1,1)->red,foo')

        expect(problems(d)).toHaveLength(1)
        expect(problems(d)[0]).toContain('foo')
    })

    test('the parameters of the graph are read as before', () => {
        const d = new Draw(createContainer(), {parameters: 'x=-1:6,y=-1:5,axis,grid', code: 'A(1,1)->label=P, Q'})

        expect(d.layoutError).toBeNull()
        expect(problems(d)).toEqual([])
    })
})
