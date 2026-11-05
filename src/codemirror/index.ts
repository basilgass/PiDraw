/**
 * PiDraw for a CodeMirror 6 editor: colors, names of the figures and suggestions.
 *
 * ```ts
 * import {pidraw, pidrawParameters} from 'pidraw/codemirror'
 *
 * extensions: [pidraw()]            // the code of a drawing
 * extensions: [pidrawParameters()]  // the parameters of the graph: x=-10:10,axis,grid
 * ```
 *
 * The colors are classes (`tok-keyword`, `tok-string`, `tok-number`, `tok-comment`, `tok-function`, `tok-class`, `tok-invalid`),
 * the same ones as PiMath: the page gives them their color. The names of the figures use `cm-pidraw-def`, `cm-pidraw-dup` and
 * `cm-pidraw-ref`.
 *
 * `@codemirror/*` and `@lezer/highlight` are peer dependencies, needed only by whoever imports this module.
 */
import {autocompletion} from '@codemirror/autocomplete'
import type {Extension} from '@codemirror/state'
import {pidrawCompletion} from './completion'
import {pidrawNames} from './decorations'
import {pidrawHighlight} from './highlight'
import {type PidrawMode, pidrawLanguage} from './language'

export {pidrawCompletion} from './completion'
export {nameRanges, pidrawNames} from './decorations'
export type {INameRange, NameKind} from './decorations'
export {pidrawHighlight} from './highlight'
export {pidrawLanguage} from './language'
export type {PidrawMode} from './language'
export {readVocabulary} from './vocabulary'
export type {IVocabulary} from './vocabulary'

export interface IPidrawEditorOptions {
    /** Suggestions while typing. Default: true. */
    completion?: boolean
    /** Colors of the code (the classes `tok-*`). Default: true. */
    highlight?: boolean
    /** Marks on the names of the figures (code only). Default: true. */
    names?: boolean
}

function extensions(mode: PidrawMode, {completion = true, highlight = true, names = true}: IPidrawEditorOptions): Extension[] {
    const language = pidrawLanguage(mode)

    return [
        language,
        ...(highlight ? [pidrawHighlight()] : []),
        ...(names && mode === 'code' ? [pidrawNames()] : []),
        ...(completion ? [language.data.of({autocomplete: pidrawCompletion(mode)}), autocompletion()] : [])
    ]
}

/** The extensions for the code of a drawing. */
export function pidraw(options: IPidrawEditorOptions = {}): Extension[] {
    return extensions('code', options)
}

/** The extensions for the parameters of the graph (a single line, `x=-10:10,axis,grid`). */
export function pidrawParameters(options: IPidrawEditorOptions = {}): Extension[] {
    return extensions('parameters', options)
}
