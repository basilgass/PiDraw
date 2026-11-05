import {HighlightStyle, syntaxHighlighting} from '@codemirror/language'
import type {Extension} from '@codemirror/state'
import {tags} from '@lezer/highlight'

/**
 * The colors of the code, as classes (`tok-keyword`, `tok-string`...), the ones that PiMath uses: the page gives them their color,
 * so that they follow its theme (light or dark) and two editors on one page look the same.
 */
export function pidrawHighlight(): Extension {
    return syntaxHighlighting(HighlightStyle.define([
        {tag: tags.keyword, class: 'tok-keyword'},
        {tag: [tags.string, tags.special(tags.string)], class: 'tok-string'},
        {tag: [tags.number, tags.bool, tags.null], class: 'tok-number'},
        {tag: [tags.lineComment, tags.blockComment, tags.comment], class: 'tok-comment'},
        {tag: [tags.meta, tags.processingInstruction], class: 'tok-meta'},
        {tag: [tags.function(tags.variableName), tags.propertyName], class: 'tok-function'},
        {tag: tags.className, class: 'tok-class'},
        {tag: tags.invalid, class: 'tok-invalid'}
    ]))
}
