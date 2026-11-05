import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {DEFAULT_LABEL_POSITION, LABEL_POSITIONS} from "./Label.constraints"
import type {LABEL_POSITION, LabelContent, LabelField, LabelFieldName} from "./Label.types"

const VERTICAL = 'tmb'
const HORIZONTAL = 'lcr'

/** `@` or `@.n` in the text of a label: `n` decimals, 2 by default. */
const FIELD = /@(?:\.(\d+))?/g

/**
 * The position of a label from its text in the syntax of the parser: two letters (`tl`), or one letter that replaces the
 * matching letter of the default position (`t` is `tr`, `l` is `bl`). `null` when the text is neither.
 */
export function parseLabelPosition(text: string): LABEL_POSITION | null {
    const [defaultVertical, defaultHorizontal] = DEFAULT_LABEL_POSITION
    const completed = VERTICAL.includes(text) && text.length === 1 ? text + defaultHorizontal
        : HORIZONTAL.includes(text) && text.length === 1 ? defaultVertical + text
            : text

    return LABEL_POSITIONS.find(position => position === completed) ?? null
}

/**
 * The content of a label from its text in the syntax of the parser: every `@` (or `@.n`) is the first field the figure
 * can show (the coordinates of a point, the length of a segment). A figure that shows no field leaves the text as it is,
 * `@` included.
 */
export function parseLabelText(text: string, figure: AbstractFigure): LabelContent {
    const field = (Object.keys(figure.labelFields()) as LabelFieldName[]).at(0)

    if (field === undefined || !text.includes('@')) {
        return text
    }

    const parts: (string | LabelField)[] = []
    let end = 0

    for (const match of text.matchAll(FIELD)) {
        if (match.index > end) {
            parts.push(text.slice(end, match.index))
        }

        const decimals = match[1] as string | undefined

        parts.push({field, digits: decimals === undefined ? 2 : +decimals})
        end = match.index + match[0].length
    }

    if (end < text.length) {
        parts.push(text.slice(end))
    }

    return parts
}
