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
