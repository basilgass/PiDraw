import {StreamLanguage, type StringStream} from '@codemirror/language'
import {THEMES} from '../controls/controls'
import {readVocabulary} from './vocabulary'

/** What the editor is reading: the code of the figures, or the parameters of the graph (`x=-10:10,axis,grid`). */
export type PidrawMode = 'code' | 'parameters'

/** Where the reader is in a line. */
interface IPidrawState {
    /** `name` before the first `=`, `key` right after it (where the kind of figure is), `values` then. */
    stage: 'name' | 'key' | 'values'
    /** After `->`: the options. */
    inOptions: boolean
    /** At the start of an option, a parameter or a value (after `,`, or `->`): where a name is a keyword. */
    segmentStart: boolean
}

const NUMBER = /^-?(\d+(\.\d+)?|\.\d+)/
const WORD = /^[a-zA-Z][a-zA-Z0-9]*/
/** A parameter of the graph can have a dot (`default.label`). */
const PARAMETER = /^[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z][a-zA-Z0-9]*)?/

/** The first character of a line that is a comment, and the one of a command. */
const COMMENT = '$'
const RESERVED = '@'

/** The commands of the code that the themes give (`@pause`, `@slides=<2-4,6>`...): a line that is none of them is not valid. */
const COMMANDS: readonly RegExp[] = Object.values(THEMES).flatMap(theme => theme.commands === undefined ? [] : [theme.commands.pattern])

/** The reader of the language: one token per call, named like the tags of CodeMirror (`keyword`, `number`...). */
function reader(mode: PidrawMode): (stream: StringStream, state: IPidrawState) => string | null {
    const vocabulary = readVocabulary()
    const keys = new Set(vocabulary.keys)
    const options = new Set(vocabulary.options)
    const parameters = new Set(vocabulary.parameters)
    const colors = new Set(vocabulary.colors)

    return (stream, state) => {
        if (stream.sol()) {
            state.stage = mode === 'code' ? 'name' : 'values'
            state.inOptions = false
            state.segmentStart = true

            const first = stream.peek()
            if (first === COMMENT) {
                stream.skipToEnd()
                return 'comment'
            }
            if (first === RESERVED) {
                // A command is one word, in the code of the figures: the parameters of the graph have none.
                const command = mode === 'code' && COMMANDS.some(pattern => stream.match(pattern) !== null)

                stream.skipToEnd()

                return command ? 'keyword' : 'invalid'
            }
        }

        if (stream.eatSpace()) {
            return null
        }

        if (stream.match('->')) {
            state.inOptions = true
            state.segmentStart = true
            return 'operator'
        }

        // In the parameters, the options of a decoration (`axis->red`) stop at a double comma.
        if (mode === 'parameters' && state.inOptions && stream.match(',,')) {
            state.inOptions = false
            state.segmentStart = true
            return 'operator'
        }

        const segmentStart = state.segmentStart

        if (stream.match(',')) {
            state.segmentStart = true
            return 'operator'
        }
        state.segmentStart = false

        if (stream.match(NUMBER)) {
            return 'number'
        }

        if (state.inOptions) {
            if (segmentStart && stream.match(/^[!?_*]/)) {
                return 'atom'
            }

            const word = stream.match(WORD) as RegExpMatchArray | null
            if (word) {
                if (!segmentStart) {
                    return colors.has(word[0]) ? 'string' : 'variableName'
                }

                return colors.has(word[0]) ? 'string' : options.has(word[0]) ? 'propertyName' : 'variableName'
            }

            stream.next()
            return 'operator'
        }

        if (mode === 'parameters') {
            if (segmentStart) {
                const word = stream.match(PARAMETER) as RegExpMatchArray | null
                if (word) {
                    return parameters.has(word[0]) ? 'keyword' : 'variableName'
                }
            }
        } else if (state.stage === 'key') {
            state.stage = 'values'

            // `tan(x)` is a function, `t=tan f,A` is a tangent: a kind of figure is followed by a space.
            const key = stream.match(/^[a-z]+(?=\s|$)/) as RegExpMatchArray | null
            if (key) {
                return keys.has(key[0]) ? 'keyword' : 'variableName'
            }
        }

        const word = stream.match(WORD) as RegExpMatchArray | null
        if (word) {
            return 'variableName'
        }

        const character = stream.next()
        if (character === '=' && state.stage === 'name') {
            state.stage = 'key'
        }

        return 'operator'
    }
}

/**
 * The CodeMirror language of PiDraw. In `code` mode, a line is `name=key values -> options`; in `parameters` mode, it is the
 * parameters of the graph. The words it knows (kinds of figures, options, parameters, colors) are read from the parser.
 */
export function pidrawLanguage(mode: PidrawMode = 'code'): StreamLanguage<unknown> {
    return StreamLanguage.define<IPidrawState>({
        name: mode === 'code' ? 'pidraw' : 'pidraw-parameters',
        startState: () => ({stage: mode === 'code' ? 'name' : 'values', inOptions: false, segmentStart: true}),
        token: reader(mode),
        languageData: {commentTokens: {line: COMMENT}}
    })
}
