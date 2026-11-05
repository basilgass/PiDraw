import {describe, expect, test} from 'vitest'
import {pidrawLanguage, type PidrawMode} from '../../src/codemirror'
import {readVocabulary} from '../../src/codemirror'

/** The tokens of a code, as `text:kind`. The spaces have no token. */
function tokens(code: string, mode: PidrawMode = 'code'): string[] {
    const found: string[] = []

    pidrawLanguage(mode).parser.parse(code).iterate({
        enter(node) {
            if (!node.type.isTop) {
                found.push(`${code.slice(node.from, node.to)}:${node.name}`)
            }
        }
    })

    return found
}

describe('pidraw language: code', () => {
    test('a line is colored by what each part is', () => {
        expect(tokens('s=seg A,B->red,w=3')).toEqual([
            's:variableName', '=:operator', 'seg:keyword', 'A:variableName', ',:operator', 'B:variableName',
            '->:operator', 'red:string', ',:operator', 'w:propertyName', '=:operator', '3:number'
        ])
    })

    test('a comment is a whole line', () => {
        expect(tokens('% the vertices, seg A,B')).toEqual(['% the vertices, seg A,B:comment'])
    })

    test('a line for something else than PiDraw is a whole line, told from a comment', () => {
        expect(tokens('$a=1,2,3/0.1=1')).toEqual(['$a=1,2,3/0.1=1:meta'])
    })

    test('a line that starts with @ is invalid unless it is a command', () => {
        expect(tokens('@run')).toEqual(['@run:invalid'])
        expect(tokens('@pause 2')).toEqual(['@pause 2:invalid'])
        expect(tokens('@slides=3')).toEqual(['@slides=3:invalid'])
        expect(tokens('@pause=')).toEqual(['@pause=:invalid'])
        expect(tokens('@title')).toEqual(['@title:invalid'])
        expect(tokens('@title,3')).toEqual(['@title,3:invalid'])
        expect(tokens('@title,3=')).toEqual(['@title,3=:invalid'])
        expect(tokens('@title,x=Zero')).toEqual(['@title,x=Zero:invalid'])
    })

    test.each(['@pause', '@slides', '@slides=<2->', '@slides = <2-4,6>', '@slides=<-3>', '@pause=Introduction', '@pause = Hello, world', '@title,3=Conclusion', '@title , 3 = Last one'])('the command %s is a whole keyword', (command) => {
        expect(tokens(command)).toEqual([`${command}:keyword`])
    })

    test('the commands are for the code of the figures, not for the parameters of the graph', () => {
        expect(tokens('@pause', 'parameters')).toEqual(['@pause:invalid'])
    })

    test('the shorthand of a point has no key', () => {
        expect(tokens('A(3,4)')).toEqual(['A:variableName', '(:operator', '3:number', ',:operator', '4:number', '):operator'])
    })

    test('a function named like a key is not a key', () => {
        expect(tokens('f(x)=tan(x)')).toContain('tan:variableName')
        expect(tokens('t=tan f,A')).toContain('tan:keyword')
    })

    test('the value of an option is not an option', () => {
        // `w` is an option name, but after `A/` it is only text.
        expect(tokens('A=pt 1,1->label=w/tl')).toEqual(expect.arrayContaining(['label:propertyName', 'w:variableName']))
    })

    test('the marks of a point and of its visibility are atoms', () => {
        expect(tokens('A=pt 1,1->!,o')).toEqual(expect.arrayContaining(['!:atom']))
    })

    test('the second line does not depend on the first', () => {
        // After `->red` the reader is in the options; the next line starts again with a name and a key.
        expect(tokens('A=pt 1,1->red\nB=pt 2,2').slice(-6)).toEqual(['B:variableName', '=:operator', 'pt:keyword', '2:number', ',:operator', '2:number'])
    })

    test.each(readVocabulary().keys.map(key => [key]))('the key %s is a keyword', (key) => {
        expect(tokens(`X=${key} A,B`)).toContain(`${key}:keyword`)
    })

    test.each(readVocabulary().options.filter(option => /^[a-z]+$/i.test(option)).map(option => [option]))('the option %s is an option', (option) => {
        // The colors are options too, but they are colored as colors.
        const kind = readVocabulary().colors.includes(option) ? 'string' : 'propertyName'
        expect(tokens(`X=pt 1,1->${option}`)).toContain(`${option}:${kind}`)
    })

    test('a color is a string, in any option', () => {
        expect(tokens('c=circ O,1->fill=blue/0.5')).toEqual(expect.arrayContaining(['blue:string', '0.5:number']))
    })
})

describe('pidraw language: parameters', () => {
    test('the parameters are keywords, their values numbers', () => {
        expect(tokens('x=-10:10,axis,grid', 'parameters')).toEqual([
            'x:keyword', '=:operator', '-10:number', '::operator', '10:number', ',:operator', 'axis:keyword', ',:operator', 'grid:keyword'
        ])
    })

    test('a parameter with a dot is one word', () => {
        expect(tokens('default.label', 'parameters')).toEqual(['default.label:keyword'])
    })

    test('the options of a decoration stop at a double comma', () => {
        expect(tokens('axis->red,,grid', 'parameters')).toEqual([
            'axis:keyword', '->:operator', 'red:string', ',,:operator', 'grid:keyword'
        ])
    })

    test.each(readVocabulary().parameters.map(parameter => [parameter]))('the parameter %s is a keyword', (parameter) => {
        expect(tokens(parameter, 'parameters')).toEqual([`${parameter}:keyword`])
    })
})
