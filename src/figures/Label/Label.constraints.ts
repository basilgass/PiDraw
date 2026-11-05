import {InvalidArgumentError} from "../../errors"
import type {XY} from "../../pidraw.common"
import type {LABEL_POSITION, LabelContent, LabelFields} from "./Label.types"

/** From this part of a direction (its sine or its cosine), a label is put on that side. */
const SIDE = 0.38

/**
 * The alignment of a label that is put outside of a figure, in a direction: the label lies on the side that the direction points to
 * (a direction up and to the right gives `tr`, up gives `tc`).
 *
 * @param x the direction on screen, to the right.
 * @param y the direction on screen, downward (the y axis of the screen points down).
 * @returns `tc` (above) for a direction that is null.
 */
export function labelAlignementToward(x: number, y: number): LABEL_POSITION {
    const length = Math.hypot(x, y)

    if (length === 0) {
        return 'tc'
    }

    const vertical = y / length > SIDE ? 'b' : y / length < -SIDE ? 't' : 'm'
    const horizontal = x / length > SIDE ? 'r' : x / length < -SIDE ? 'l' : 'c'

    return `${vertical}${horizontal}` as LABEL_POSITION
}

/**
 * Where a label goes beside a curve at a point: `gap` pixels on the left of the way the curve goes there (above a curve that goes to
 * the right on the screen), aligned to lie outside of the curve.
 *
 * @param direction the way the curve goes, in pixels on the screen (the y axis points down); a null vector puts the label above.
 */
export function labelBesideWay(point: XY, direction: XY, gap: number): { point: XY, alignement: LABEL_POSITION } {
    const length = Math.hypot(direction.x, direction.y)
    // The left of the way (dx, dy) is (dy, -dx) on the screen.
    const left = length === 0 ? {x: 0, y: -1} : {x: direction.y / length, y: -direction.x / length}

    return {
        point: {x: point.x + left.x * gap, y: point.y + left.y * gap},
        alignement: labelAlignementToward(left.x, left.y)
    }
}

/**
 * Check that a figure can show the content of a label.
 * @param fields the fields the figure can show.
 * @param name name of the figure, for the message.
 * @throws InvalidArgumentError if a field is not one of `fields`, or its number of digits is not an integer of 0 or more.
 */
export function checkLabelContent(content: LabelContent, fields: LabelFields, name: string): void {
    if (typeof content === 'string') {
        return
    }

    const known = Object.keys(fields)

    for (const part of content) {
        if (typeof part === 'string') {
            continue
        }

        if (!known.includes(part.field)) {
            throw new InvalidArgumentError(
                `The figure "${name}" cannot show the field "${part.field}" in its label: ${known.length === 0 ? 'it has none' : `expected ${known.join(', ')}`}`
            )
        }

        if (!Number.isInteger(part.digits) || part.digits < 0) {
            throw new InvalidArgumentError(
                `Invalid number of digits ${part.digits} for the field "${part.field}" of the label of "${name}": expected an integer of 0 or more`
            )
        }
    }
}

/**
 * The text of a label.
 * @param fields how the figure computes the fields of the content.
 * @throws InvalidArgumentError if the content has a field that is not one of `fields` (see {@link checkLabelContent}).
 */
export function renderLabelContent(content: LabelContent, fields: LabelFields): string {
    if (typeof content === 'string') {
        return content
    }

    return content.map((part) => {
        if (typeof part === 'string') {
            return part
        }

        const compute = fields[part.field]
        if (compute === undefined) {
            throw new InvalidArgumentError(`The label cannot show the field "${part.field}"`)
        }

        return compute(part.digits)
    }).join('')
}

/** Where a label can be put in relation to its anchor: top, middle or bottom, then left, center or right. */
export const LABEL_POSITIONS: readonly LABEL_POSITION[] = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br']

/** The alignment of a label that was not given one: below the anchor and to its right. */
export const DEFAULT_LABEL_POSITION: LABEL_POSITION = 'br'

/** How far from the anchor a label that is at the middle of a side is put, in pixels, so that it does not touch the figure. */
const SIDE_GAP = 10

/**
 * Where the center of a label is, from its anchor and how it is aligned to it: `tl` puts the label above and to the left of the
 * anchor, `br` below and to the right, `mc` centers it on the anchor. The labels `ml` and `mr` are moved {@link SIDE_GAP} further to
 * the side.
 *
 * @param anchor the position in pixels.
 * @param width the size of the label in pixels.
 */
export function labelCenter(alignement: LABEL_POSITION, anchor: XY, width: number, height: number): XY {
    const [vertical, horizontal] = alignement
    const side = vertical === 'm' ? SIDE_GAP : 0

    return {
        x: horizontal === 'l' ? anchor.x - width / 2 - side : horizontal === 'r' ? anchor.x + width / 2 + side : anchor.x,
        y: vertical === 't' ? anchor.y - height / 2 : vertical === 'b' ? anchor.y + height / 2 : anchor.y
    }
}
