import {type Extension, RangeSetBuilder} from '@codemirror/state'
import {Decoration, type DecorationSet, EditorView, ViewPlugin, type ViewUpdate} from '@codemirror/view'

/** `def` is the name of a figure where it is made, `dup` a name made twice, `ref` a use of the name of a figure. */
export type NameKind = 'def' | 'dup' | 'ref'

export interface INameRange {
    from: number
    to: number
    kind: NameKind
}

const DEFINITION = /^([A-Za-z][A-Za-z0-9]*)(?=[=(])/
/** `f(x)=` and `f(t)=`: the line is an expression, where a name counts only as `A.x` or `A.y`. */
const EXPRESSION = /^[A-Za-z][A-Za-z0-9]*\([xt]\)\s*=/
const COORDINATE = /([A-Za-z][A-Za-z0-9]*)\.[xy]/g

/** Whether the line is read by the parser at all: not empty, not a comment, not for something else, not reserved. */
function isCode(text: string): boolean {
    return text !== '' && !/^[%$@]/.test(text)
}

/**
 * Where the names of the figures are in the code: the line that makes a figure gives its name (`def`, or `dup` when another line
 * makes the same name), and the figures it uses are `ref`. Pure: it reads a text, not an editor.
 */
export function nameRanges(code: string): INameRange[] {
    const lines: { text: string, offset: number, indent: number }[] = []
    let offset = 0

    for (const raw of code.split('\n')) {
        const text = raw.trimStart()
        lines.push({text, offset, indent: raw.length - text.length})
        offset += raw.length + 1
    }

    // The names, and where each is made.
    const definitions = new Map<string, number[]>()
    for (const {text, offset, indent} of lines) {
        const name = isCode(text.trimEnd()) ? DEFINITION.exec(text)?.[1] : undefined
        if (name !== undefined) {
            definitions.set(name, [...definitions.get(name) ?? [], offset + indent])
        }
    }

    const ranges: INameRange[] = []
    for (const [name, starts] of definitions) {
        for (const from of starts) {
            ranges.push({from, to: from + name.length, kind: starts.length > 1 ? 'dup' : 'def'})
        }
    }

    const names = [...definitions.keys()]
    const capitals = new Set(names.filter(name => /^[A-Z]/.test(name)))
    const lowers = new Set(names.filter(name => /^[a-z]/.test(name)))

    const reference = (from: number, name: string, definedAt: number) => {
        if (from !== definedAt) {
            ranges.push({from, to: from + name.length, kind: 'ref'})
        }
    }

    for (const {text, offset, indent} of lines) {
        const line = text.trimEnd()
        const definition = isCode(line) ? DEFINITION.exec(line) : null
        if (definition === null) {
            continue
        }

        const definedAt = offset + indent
        const arrow = line.indexOf('->')
        const body = arrow < 0 ? line : line.slice(0, arrow)
        const equal = body.indexOf('=')
        // `A(1,2)` has its values between the parentheses, `d=AB` after the sign.
        const start = equal < 0 ? definition[1].length + 1 : equal + 1
        const values = body.slice(start)
        const valuesAt = offset + indent + start

        if (EXPRESSION.test(line)) {
            for (const match of values.matchAll(COORDINATE)) {
                if (definitions.has(match[1])) {
                    reference(valuesAt + match.index, match[1], definedAt)
                }
            }
            continue
        }

        // The kind of figure (`perp `, `circ `) is not a name.
        const key = /^\s*[a-z]+\s+/.exec(values)
        const skip = key === null || equal < 0 ? 0 : key[0].length
        const parameters = values.slice(skip)
        const parametersAt = valuesAt + skip

        for (const match of parameters.matchAll(/[A-Z][0-9]*/g)) {
            if (capitals.has(match[0])) {
                reference(parametersAt + match.index, match[0], definedAt)
            }
        }

        let position = 0
        for (const part of parameters.split(',')) {
            const word = part.trim()
            if (lowers.has(word)) {
                reference(parametersAt + position + part.indexOf(word), word, definedAt)
            }

            for (const match of part.matchAll(/([a-z][a-zA-Z0-9]*)\.[xy]/g)) {
                if (lowers.has(match[1])) {
                    reference(parametersAt + position + match.index, match[1], definedAt)
                }
            }

            position += part.length + 1
        }
    }

    // A reference inside another range is dropped: one decoration per character. A duplicate wins over a reference, a reference over a definition.
    const priority: Record<NameKind, number> = {dup: 0, ref: 1, def: 2}
    ranges.sort((a, b) => a.from - b.from || priority[a.kind] - priority[b.kind])

    const kept: INameRange[] = []
    for (const range of ranges) {
        if (range.from >= (kept.at(-1)?.to ?? 0) && range.from < range.to) {
            kept.push(range)
        }
    }

    return kept
}

const MARKS: Record<NameKind, Decoration> = {
    def: Decoration.mark({class: 'cm-pidraw-def'}),
    dup: Decoration.mark({class: 'cm-pidraw-dup'}),
    ref: Decoration.mark({class: 'cm-pidraw-ref'})
}

function decorate(view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>()

    for (const {from, to, kind} of nameRanges(view.state.doc.toString())) {
        builder.add(from, to, MARKS[kind])
    }

    return builder.finish()
}

/**
 * Marks the names of the figures: bold where a figure is made, a mark where it is used, and `cm-pidraw-dup` for a name made twice.
 * The colors come from `--pidraw-dup` and `--pidraw-ref`, which the page can set.
 */
export function pidrawNames(): Extension {
    return [
        ViewPlugin.fromClass(class {
            decorations: DecorationSet

            constructor(view: EditorView) {
                this.decorations = decorate(view)
            }

            update(update: ViewUpdate) {
                if (update.docChanged) {
                    this.decorations = decorate(update.view)
                }
            }
        }, {decorations: plugin => plugin.decorations}),
        EditorView.baseTheme({
            '.cm-pidraw-def': {fontWeight: 'bold'},
            '.cm-pidraw-dup': {fontWeight: 'bold', color: 'var(--pidraw-dup, #dc2626)'},
            '.cm-pidraw-ref': {backgroundColor: 'var(--pidraw-ref, #dbeafe)', borderRadius: '2px', padding: '0 1px'}
        })
    ]
}
