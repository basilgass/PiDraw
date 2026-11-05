import {CompletionContext} from '@codemirror/autocomplete'
import {EditorState} from '@codemirror/state'
import {describe, expect, test} from 'vitest'
import {pidrawCompletion, readVocabulary} from '../../src/codemirror'
import type {PidrawMode} from '../../src/codemirror'

/** The labels suggested at the end of `before`, or `null` when nothing is suggested. */
function suggested(before: string, mode: PidrawMode = 'code', explicit = false): string[] | null {
    const state = EditorState.create({doc: before})
    const result = pidrawCompletion(mode)(new CompletionContext(state, before.length, explicit)) as { options: { label: string }[] } | null

    return result === null ? null : result.options.map(option => option.label)
}

describe('completion of the code', () => {
    const vocabulary = readVocabulary()

    test('nothing is suggested for the name of a figure', () => {
        expect(suggested('AB')).toBeNull()
    })

    test('the kinds of figures follow the sign =', () => {
        expect(suggested('A=p')).toEqual(vocabulary.keys)
    })

    test('nothing is suggested once the kind of figure is written', () => {
        expect(suggested('A=pt 1')).toBeNull()
    })

    test('the options follow ->', () => {
        const options = suggested('A=pt 1,1->la')
        expect(options).toEqual(expect.arrayContaining(['label', 'color', 'red']))
        expect(options).not.toContain('pt')
    })

    test('the options follow a comma of the options', () => {
        expect(suggested('A=pt 1,1->red,wi')).toContain('w')
    })

    test('the colors follow color= and fill=', () => {
        expect(suggested('A=pt 1,1->color=')).toBeNull()
        expect(suggested('A=pt 1,1->color=r')).toEqual(vocabulary.colors)
        expect(suggested('c=circ O,1->fill=b')).toEqual(vocabulary.colors)
    })

    test('the values of an option follow it', () => {
        expect(suggested('A=pt 1,1->loop=r')).toEqual(['reset', 'reverse', 'none'])
        expect(suggested('A=pt 1,1->drag=g')).toContain('grid')
    })

    test('nothing is suggested after a slash: it is a parameter of the option', () => {
        expect(suggested('A=pt 1,1->label=A/t')).toBeNull()
    })

    test('nothing is suggested in a comment', () => {
        expect(suggested('% A=p')).toBeNull()
        expect(suggested('$ A=p')).toBeNull()
    })

    test('every kind of figure and every option has a description', () => {
        const state = EditorState.create({doc: 'A=p'})
        const keys = pidrawCompletion()(new CompletionContext(state, 3, false)) as unknown as { options: { detail?: string }[] }

        expect(keys.options.every(option => option.detail !== undefined)).toBe(true)
    })
})

describe('completion of the parameters', () => {
    test('the parameters of the graph are suggested at the start of a segment', () => {
        expect(suggested('x=-1:1,ax', 'parameters')).toEqual(readVocabulary().parameters)
        expect(suggested('ax', 'parameters')).toEqual(readVocabulary().parameters)
    })

    test('a value is not completed', () => {
        expect(suggested('x=1', 'parameters')).toBeNull()
    })
})

describe('completion of the fields of a label', () => {
    test('the fields of the kind of figure follow a @ in a label', () => {
        expect(suggested('a=arc B,A,C->label=@')).toEqual(['angle', 'length', 'radius', 'area'])
        expect(suggested('c=circ O,2->tex=r=@ra')).toEqual(['radius', 'perimeter', 'area'])
        expect(suggested('p=poly A,B,C->color=red,label=@')).toEqual(['perimeter', 'area'])
        expect(suggested('s=seg A,B->label=@')).toEqual(['length', 'slope'])
        expect(suggested('d=line A,B->tex=@')).toEqual(['slope'])
    })

    test('a kind of figure with no field has none to suggest', () => {
        expect(suggested('f=plot x^2->label=@')).toEqual([])
    })

    test('every field is suggested when the kind of figure is not written (a shorthand)', () => {
        expect(suggested('A(1,2)->label=@')).toEqual(expect.arrayContaining(['coordinates', 'slope', 'area']))
    })

    test('the fields are not suggested once the position of the label is being written', () => {
        expect(suggested('a=arc B,A,C->label=@/t')).toBeNull()
    })

    test('every field has a description for the editor', () => {
        const options = pidrawCompletion('code')(new CompletionContext(EditorState.create({doc: 'a=arc B,A,C->label=@'}), 20, false)) as unknown as {
            options: { label: string, detail?: string }[]
        }

        expect(options.options.every(option => option.detail !== undefined)).toBe(true)
    })
})

describe('completion of the range of an axis', () => {
    const detail = (before: string, mode: PidrawMode) => {
        const state = EditorState.create({doc: before})
        const result = pidrawCompletion(mode)(new CompletionContext(state, before.length, false)) as unknown as {
            options: { label: string, detail?: string }[]
        }

        return result.options.find(option => option.label === 'range')?.detail
    }

    test('range is suggested with its description after -> in the code and in the parameters', () => {
        expect(suggested('a=axis A,B->ran')).toContain('range')
        expect(suggested('axisY->ran', 'parameters')).toContain('range')
        expect(detail('a=axis A,B->ran', 'code')).toBe('part of an axis: range=-10:10')
        expect(detail('axisY->ran', 'parameters')).toBe('part of an axis: range=-10:10')
    })
})
