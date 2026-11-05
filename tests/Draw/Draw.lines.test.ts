import {describe, expect, test} from 'vitest'
import {PiParse} from 'piparser'
import {readCode, standardForm} from '../../src/Draw/Draw.lines'
import {LAYOUT_KEYS} from '../../src/parser/buildLayout'
import {ParseError} from '../../src/errors'

const parser = new PiParse({
    formatter: standardForm,
    keys: LAYOUT_KEYS,
    splitter: {main: '->', entry: ',', parameter: '/'}
})

// The commands read their values with the parser, as in `Draw`.
const readAll = (code: string) => readCode(code, text => parser.parse(text), parser)
const read = (code: string) => readAll(code).lines

describe('standardForm', () => {
    test.each([
        ['a point', 'A(3,4)', 'A=pt 3,4'],
        ['a line', 'd=AB', 'd=line A,B'],
        ['a segment', 'd=AB.', 'd=seg A,B'],
        ['a ray', 'd=[AB[', 'd=ray A,B'],
        ['a vector', 'd=vAB', 'd=vec A,B'],
        ['a function', 'f(x)=x^2', 'f=plot x^2'],
        ['a function with its samples', 'f(x)=sin(x)@50,-2pi:2pi', 'f=plot sin(x)@50,-2pi:2pi'],
        ['a parametric curve', 'f(t)=cos(t),sin(t),0:2pi', 'f=parametric cos(t),sin(t),0:2pi'],
        ['a line of code that is already written in full', 'P=mid A,B', 'P=mid A,B']
    ])('%s is written in its standard form', (_, shorthand, expected) => {
        expect(standardForm(shorthand)).toBe(expected)
    })

    test('a shorthand that is not valid is a ParseError', () => {
        expect(() => standardForm('d=ABC')).toThrow(ParseError)
        expect(() => standardForm('f(x)')).toThrow(ParseError)
        expect(() => standardForm('f(t)=')).toThrow(ParseError)
    })
})

describe('readCode lines', () => {
    test('are read in order, with their shorthands', () => {
        const lines = read('A(1,2)\nd=AB\nM=mid A,B')

        expect(lines.map(line => [line.item?.name, line.item?.key])).toEqual([['A', 'pt'], ['d', 'line'], ['M', 'mid']])
    })

    test('keep their number in the code and their text without the spaces around it', () => {
        const lines = read('A(1,2)\n\n   B(3,4)  \r\n')

        expect(lines.map(line => [line.number, line.text])).toEqual([[1, 'A(1,2)'], [3, 'B(3,4)']])
    })

    test('that are empty or comments are skipped, and still counted', () => {
        const lines = read('$ the points\nA(1,2)\n   \n$B(3,4)\nC(5,6)')

        expect(lines.map(line => [line.number, line.item?.name])).toEqual([[2, 'A'], [5, 'C']])
    })

    test('that are comments (%) are skipped, and still counted, even when indented or holding code', () => {
        const lines = read('% the points\nA(1,2)\n   % indented\n%B(3,4)\nC(5,6)')

        expect(lines.map(line => [line.number, line.item?.name])).toEqual([[2, 'A'], [5, 'C']])
    })

    test('a % inside a line is not a comment', () => {
        expect(read('A(1,2)->label=50%')[0].item?.name).toBe('A')
        expect(read('A(1,2) % here')[0].error).toBeDefined()
    })

    test('that start with $ are skipped like comments, and still counted', () => {
        const lines = read('$a=1,2,3/0.1=1\nA(1,2)\n  $tex=f(x)\nC(5,6)')

        expect(lines.map(line => [line.number, line.item?.name])).toEqual([[2, 'A'], [4, 'C']])
    })

    test('without code give nothing', () => {
        expect(read('')).toEqual([])
        expect(read('\n  \n% nothing\n$ nothing')).toEqual([])
    })
})

describe('readCode errors', () => {
    test('a line that cannot be read is in the result with its error: the other lines are still read', () => {
        const lines = read('A(1,2)\nd=ABC\nB(3,4)')

        expect(lines.map(line => [line.number, line.item?.name])).toEqual([[1, 'A'], [2, undefined], [3, 'B']])
        expect(lines[1].error).toBeInstanceOf(ParseError)
        expect(lines[1].text).toBe('d=ABC')
    })

    test('whatever the parser throws, the error of the line is a ParseError that names the line', () => {
        const lines = readCode('A(1,2)', () => {
            throw new TypeError('boom')
        }, parser).lines

        expect(lines).toHaveLength(1)
        expect(lines[0].error).toBeInstanceOf(ParseError)
        expect(lines[0].error?.message).toContain('A(1,2)')
        expect(lines[0].error?.message).toContain('boom')
        expect(lines[0].error?.cause).toBeInstanceOf(TypeError)
    })


    test.each(['@begin:static', '@end:static', '@group:3-5', '@', '@play', '@pause now', '@pause=', '@pause=  ', '@title', '@title,3', '@title,3=', '@title,0=x', '@title,2.5=x', '@title=x', '@slides=3', '@slides=<2->,red', '@slides='])('the line %s is a ParseError: it is no command', (command) => {
        const lines = read(`${command}
A(1,2)`)

        expect(lines[0].number).toBe(1)
        expect(lines[0].error).toBeInstanceOf(ParseError)
        // The following line is not affected.
        expect(lines[1].item?.name).toBe('A')
        expect(lines[1].item?.parameters).toEqual({})
    })
})

describe('readCode commands', () => {
    const slides = (code: string) => read(code).flatMap(line => line.item === undefined ? [] : [[line.item.name, line.controls.slide ?? null]])

    test('a command is a line with no figure and no error, and it counts', () => {
        const lines = read('A(1,2)\n@pause\nB(3,4)')

        expect(lines.map(line => line.number)).toEqual([1, 2, 3])
        expect(lines[1].command).toEqual({name: 'pause', value: '', text: '@pause'})
        expect(lines[1].item).toBeUndefined()
        expect(lines[1].error).toBeUndefined()
    })

    test('the figures before any command are at every step', () => {
        expect(slides('A(1,2)\nB(3,4)')).toEqual([['A', null], ['B', null]])
    })

    test('each @pause shows what follows one step later', () => {
        expect(slides('A(1,2)\n@pause\nB(3,4)\nC(5,6)\n@pause\nD(7,8)')).toEqual([
            ['A', null], ['B', [{from: 2}]], ['C', [{from: 2}]], ['D', [{from: 3}]]
        ])
    })

    test('@slides=<steps> gives the steps to what follows', () => {
        expect(slides('@slides=<3-4>\nA(1,2)')).toEqual([['A', [{from: 3, to: 4}]]])
    })

    test('the steps of the command may have spaces around the =', () => {
        expect(slides('@slides = <2->\nA(1,2)')).toEqual([['A', [{from: 2}]]])
    })

    test('the last command wins', () => {
        expect(slides('@slides=<5>\nA(1,2)\n@pause\nB(3,4)\n@slides=<7->\nC(5,6)')).toEqual([
            ['A', [{from: 5, to: 5}]], ['B', [{from: 2}]], ['C', [{from: 7}]]
        ])
    })

    test('@slides alone gives back every step, and counts the pauses from zero again', () => {
        expect(slides('@pause\n@pause\nA(1,2)\n@slides\nB(3,4)\n@pause\nC(5,6)')).toEqual([
            ['A', [{from: 3}]], ['B', null], ['C', [{from: 2}]]
        ])
    })

    test('@slides=<steps> keeps the count of the pauses', () => {
        expect(slides('@pause\n@slides=<9>\nA(1,2)\n@pause\nB(3,4)')).toEqual([
            ['A', [{from: 9, to: 9}]], ['B', [{from: 3}]]
        ])
    })

    test('two parts of a drawing that go step by step together', () => {
        const code = ['$ first part', '@slides', 'A(1,1)', '@pause', 'B(2,2)', '@pause', 'C(3,3)',
            '$ second part', '@slides', 'D(-1,-1)', '@pause', 'E(-2,-2)'].join('\n')

        expect(slides(code)).toEqual([
            ['A', null], ['B', [{from: 2}]], ['C', [{from: 3}]],
            ['D', null], ['E', [{from: 2}]]
        ])
    })

    test('a line that is not valid changes nothing in the steps of the lines after it', () => {
        const lines = read('@pause\nd=ABC\nA(1,2)')

        expect(lines[1].error).toBeInstanceOf(ParseError)
        expect(lines[2].controls).toEqual({slide: [{from: 2}]})
    })

    test('a command that is not valid does not change the steps either', () => {
        expect(slides('@pause\n@slides=3\nA(1,2)')).toEqual([['A', [{from: 2}]]])
    })

    test('the line of a figure keeps the steps of the commands even when the steps are the same object', () => {
        const lines = read('@pause\nA(1,2)\nB(3,4)')

        expect(lines[1].controls).toBe(lines[2].controls)
    })
})

describe('readCode messages of the commands', () => {
    const message = (code: string) => read(code)[0].error?.message ?? ''

    test('a @pause with a text but no = says where the title goes', () => {
        expect(message('@pause now')).toContain('only after a =')
    })

    test('an empty title says it is empty', () => {
        expect(message('@pause=')).toContain('title is empty')
        expect(message('@title,3=  ')).toContain('title is empty')
    })

    test('a @title without its step or its title says how it is written', () => {
        expect(message('@title,3')).toContain('@title,3=')
        expect(message('@title=x')).toContain('@title,3=')
    })

    test('the step of a @title is an integer from 1', () => {
        expect(message('@title,0=x')).toContain('integer from 1')
        expect(message('@title,2.5=x')).toContain('@title,3=')
    })

    test('a @slides with steps but no = says where the steps go', () => {
        expect(message('@slides <2->')).toContain('after a =')
    })

    test('another command says which ones exist', () => {
        expect(message('@play')).toContain('@pause')
        expect(message('@play')).toContain('@slides')
    })
})

describe('readCode titles', () => {
    const titles = (code: string) => readAll(code).graphControls.titles

    test('there are none by default, and the graph is told to take them away', () => {
        expect(readAll('A(1,2)').graphControls).toEqual({titles: null})
    })

    test('@pause=Title titles the step that the pause opens', () => {
        expect(titles('A(1,1)\n@pause=Second\nB(2,2)\n@pause=Third')).toEqual({2: 'Second', 3: 'Third'})
    })

    test('a @pause without a title still opens its step, and the next one counts it', () => {
        expect(titles('@pause\n@pause=Third')).toEqual({3: 'Third'})
    })

    test('@title,N=Title titles the step N, anywhere in the code, with spaces and commas in the text', () => {
        expect(titles('@title,1=Hello, world\nA(1,1)\nB(2,2)\n@title , 4 = Last one ')).toEqual({1: 'Hello, world', 4: 'Last one'})
    })

    test('a title written after the figures is in the result', () => {
        expect(titles('A(1,1)\n@pause\nB(2,2)\n@title,2=After')).toEqual({2: 'After'})
    })

    test('the title of a step that does not exist is kept', () => {
        expect(titles('@title,9=Far')).toEqual({9: 'Far'})
    })

    test('a second title for the same step is an error on the second line, and the first stays', () => {
        const code = readAll('@pause=A\n@title,2=B\n@title,3=C')

        expect(code.lines[1].error).toBeInstanceOf(ParseError)
        expect(code.lines[1].error?.message).toContain('has the title "A" already')
        expect(code.graphControls.titles).toEqual({2: 'A', 3: 'C'})
    })

    test('a title does not change the steps of the figures', () => {
        const lines = read('@pause=Second\nA(1,2)')

        expect(lines[1].controls).toEqual({slide: [{from: 2}]})
    })

    test('@slides does not forget the titles', () => {
        expect(titles('@title,2=Kept\n@slides')).toEqual({2: 'Kept'})
    })
})
