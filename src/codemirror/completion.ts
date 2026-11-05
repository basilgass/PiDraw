import type {Completion, CompletionContext, CompletionResult, CompletionSource} from '@codemirror/autocomplete'
import type {PidrawMode} from './language'
import {
    COLOR_OPTIONS,
    KEY_DETAILS,
    LABEL_FIELD_DETAILS,
    labelFieldsOf,
    OPTION_DETAILS,
    OPTION_VALUES,
    PARAMETER_DETAILS,
    readVocabulary
} from './vocabulary'

const WORD = /[a-zA-Z][a-zA-Z0-9]*/
const VALID_FOR = /^[a-zA-Z0-9]*$/
const FIELD = /@[a-zA-Z]*/

function entries(names: readonly string[], type: string, details: Readonly<Record<string, string>>): Completion[] {
    return names.map(label => ({label, type, detail: details[label]}))
}

/** The completions for the part of the text before the cursor, from the vocabulary of the parser. */
function options(context: CompletionContext, mode: PidrawMode): Completion[] | null {
    const vocabulary = readVocabulary()
    const line = context.state.doc.lineAt(context.pos)
    const before = line.text.slice(0, context.pos - line.from)

    const arrow = before.indexOf('->')
    if (arrow < 0) {
        if (mode === 'parameters') {
            // A parameter is typed at the start of a segment: after `x=` comes a value.
            return before.split(',').at(-1)?.includes('=') ? null : entries(vocabulary.parameters, 'keyword', PARAMETER_DETAILS)
        }

        // The name of a figure is typed before the sign `=`: nothing to suggest there.
        if (!before.includes('=') || /^\s*[%$@]/.test(before)) {
            return null
        }

        // The kind of figure is the first word after the sign.
        if (/^[^=]*=\s*[a-z]*$/.test(before)) {
            return entries(vocabulary.keys, 'keyword', KEY_DETAILS)
        }

        return null
    }

    const segment = before.slice(arrow + 2).split(',').at(-1) ?? ''

    // The text of a label, after a `@`: the fields of the figure. Its kind is the word after the `=` of the definition, if there is one.
    if (/^\s*(?:label|tex)=[^/]*@[a-zA-Z]*$/.test(segment)) {
        const key = /^[^=]*=\s*([a-z]+)\s/.exec(before.slice(0, arrow))?.[1]

        return entries(labelFieldsOf(key), 'property', LABEL_FIELD_DETAILS)
    }

    const value = /^\s*([a-zA-Z]+)=[a-zA-Z0-9]*$/.exec(segment)

    if (value) {
        if (COLOR_OPTIONS.includes(value[1])) {
            return vocabulary.colors.map(label => ({label, type: 'constant'}))
        }

        const values = OPTION_VALUES[value[1]] as readonly string[] | undefined
        return values ? values.map(label => ({label, type: 'keyword'})) : null
    }

    if (/=|\//.test(segment)) {
        return null
    }

    return [
        ...entries(vocabulary.options, 'property', OPTION_DETAILS),
        ...vocabulary.colors.map((label): Completion => ({label, type: 'constant'}))
    ]
}

/**
 * The completions of PiDraw: the kinds of figures after `=`, the options after `->`, the colors after `color=`, the values of an option.
 * With the `parameters` mode, the parameters of the graph.
 */
export function pidrawCompletion(mode: PidrawMode = 'code'): CompletionSource {
    return (context: CompletionContext): CompletionResult | null => {
        const found = options(context, mode)
        if (found === null) {
            return null
        }

        // The fields start right after a `@`, which is not part of the word: they are suggested as soon as it is typed.
        const field = context.matchBefore(FIELD)
        const word = context.matchBefore(WORD)
        if (word === null && field === null && !context.explicit) {
            return null
        }

        return {from: field ? field.from + 1 : word?.from ?? context.pos, options: found, validFor: VALID_FOR}
    }
}
