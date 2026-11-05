import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {InvalidArgumentError} from "../../errors"
import {DEFAULT_LABEL_POSITION, LABEL_POSITIONS} from "./Label.constraints"
import type {LABEL_POSITION, LabelContent, LabelField, LabelFieldName} from "./Label.types"

const VERTICAL = 'tmb'
const HORIZONTAL = 'lcr'

/**
 * `@`, `@.n`, `@name` or `@name.n` in the text of a label (`@@` is a `@` that stays in the text): the field of the figure that is
 * named, or its default one, and `n` decimals.
 */
const FIELD = /@@|@([a-z]+)?(?:\.(\d+))?/g

/**
 * The position of a label from its text in the syntax of the parser: two letters (`tl`), in either order (`mr` and `rm` are the same
 * position: a vertical letter and a horizontal one cannot be mistaken), or one letter that replaces the matching letter of the default
 * position (`t` is `tr`, `l` is `bl`). `null` when the text is none of them.
 */
export function parseLabelPosition(text: string): LABEL_POSITION | null {
    const [defaultVertical, defaultHorizontal] = DEFAULT_LABEL_POSITION
    const completed = VERTICAL.includes(text) && text.length === 1 ? text + defaultHorizontal
        : HORIZONTAL.includes(text) && text.length === 1 ? defaultVertical + text
            : text

    const swapped = completed.length === 2 ? completed[1] + completed[0] : completed

    return LABEL_POSITIONS.find(position => position === completed || position === swapped) ?? null
}

/**
 * The content of a label from its text in the syntax of the parser: `@name` is the field of the figure with this name (`@area`),
 * `@` alone is its default field (the coordinates of a point, the length of a segment), and `.n` after either asks for `n`
 * decimals. A figure that shows no field leaves the text as it is, `@` included.
 *
 * @throws InvalidArgumentError if the figure has fields and a `@` names one it does not have, or is alone while the figure has no
 * default field.
 */
export function parseLabelText(text: string, figure: AbstractFigure): LabelContent {
    const names = Object.keys(figure.labelFields()) as LabelFieldName[]

    if (names.length === 0 || !text.includes('@')) {
        return text
    }

    const parts: (string | LabelField)[] = []
    let literal = ''
    let end = 0

    for (const match of text.matchAll(FIELD)) {
        literal += text.slice(end, match.index)
        end = match.index + match[0].length

        if (match[0] === '@@') {
            literal += '@'
            continue
        }

        if (literal !== '') {
            parts.push(literal)
            literal = ''
        }

        const written = match[1] as string | undefined
        const decimals = match[2] as string | undefined
        const field = fieldNamed(written, names, figure)

        parts.push(decimals === undefined ? {field} : {field, digits: +decimals})
    }

    literal += text.slice(end)

    if (literal !== '') {
        parts.push(literal)
    }

    return parts
}

/** The field a `@` names, or the default field of the figure when it names none. */
function fieldNamed(written: string | undefined, names: LabelFieldName[], figure: AbstractFigure): LabelFieldName {
    const field = written ?? figure.defaultLabelField()

    if (field === null) {
        throw new InvalidArgumentError(
            `The figure "${figure.name}" has no default field for "@": write the field you want (${names.map(name => `@${name}`).join(', ')})`
        )
    }

    if (!(names as string[]).includes(field)) {
        throw new InvalidArgumentError(
            `The figure "${figure.name}" cannot show "@${field}" in its label: expected ${names.map(name => `@${name}`).join(', ')}, or @@ for a @`
        )
    }

    return field as LabelFieldName
}
