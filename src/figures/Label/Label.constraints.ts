import {DEFAULT_MEASURE, type IMeasure, numberCorrection, scaled, withDegree, withUnit} from "../../calculus"
import {InvalidArgumentError} from "../../errors"
import type {XY} from "../../pidraw.common"
import type {LABEL_POSITION, LabelContent, LabelFields, LabelFormat} from "./Label.types"

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

/** The number of decimals of a field when the label does not ask for any (`@` and not `@.3`). */
export const DEFAULT_LABEL_DIGITS = 2

/** A number as the text of a field: rounded to `digits` decimals, or to {@link DEFAULT_LABEL_DIGITS} when none is asked. */
export function fieldNumber(value: number, digits: number | undefined): string {
    return numberCorrection(value, digits ?? DEFAULT_LABEL_DIGITS).toString()
}

/**
 * A length (`power` 1) or an area (`power` 2) of the coordinate system as the text of a field: multiplied by the scale of the graph, rounded,
 * and followed by its unit if the graph has one.
 * @param measure the unit and the scale of the graph (`IGraphConfig.measure`): no unit and a scale of 1 without it.
 */
export function fieldLength(
    value: number, digits: number | undefined, measure: IMeasure | undefined, format: LabelFormat, power: 1 | 2 = 1
): string {
    const used = measure ?? DEFAULT_MEASURE

    return withUnit(fieldNumber(scaled(value, used, power), digits), used.unit, power, format.tex)
}

/** An angle in degrees as the text of a field: it always has the degree sign, which does not depend on the scale of the graph. */
export function fieldAngle(degrees: number, digits: number | undefined, format: LabelFormat): string {
    return withDegree(fieldNumber(degrees, digits), format.tex)
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

        if (part.digits !== undefined && (!Number.isInteger(part.digits) || part.digits < 0)) {
            throw new InvalidArgumentError(
                `Invalid number of digits ${part.digits} for the field "${part.field}" of the label of "${name}": expected an integer of 0 or more`
            )
        }
    }
}

/**
 * The text of a label.
 * @param fields how the figure computes the fields of the content.
 * @param format how the label is written; plain text by default.
 * @throws InvalidArgumentError if the content has a field that is not one of `fields` (see {@link checkLabelContent}).
 */
export function renderLabelContent(content: LabelContent, fields: LabelFields, format: LabelFormat = {tex: false}): string {
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

        return compute(part.digits, format)
    }).join('')
}

/**
 * The direction on the screen (the y axis points down) where a label lies from its anchor, from its alignement: `br` is down and to the
 * right, `ml` is to the left. The vector is not normalized.
 * @returns `null` for `mc`, which lies on no side.
 */
export function alignementDirection(alignement: LABEL_POSITION): XY | null {
    const [vertical, horizontal] = alignement
    const x = horizontal === 'l' ? -1 : horizontal === 'r' ? 1 : 0
    const y = vertical === 't' ? -1 : vertical === 'b' ? 1 : 0

    return x === 0 && y === 0 ? null : {x, y}
}

/** The vector of a direction, with a length of 1. @returns `null` for the null vector or a vector that is not finite. */
export function unitDirection(direction: XY): XY | null {
    const length = Math.hypot(direction.x, direction.y)

    return Number.isFinite(length) && length > 0 ? {x: direction.x / length, y: direction.y / length} : null
}

/**
 * How much further from the anchor a label that lies in a direction is put, in pixels, along that direction: its horizontal part (a
 * label on the left or the right of a figure would touch it otherwise, like the `ml` and `mr` of {@link labelCenter}).
 */
export function labelAwayGap(direction: XY): XY {
    const unit = unitDirection(direction)

    return unit === null ? {x: 0, y: 0} : {x: unit.x * SIDE_GAP * unit.x ** 2, y: unit.y * SIDE_GAP * unit.x ** 2}
}

/**
 * Where the center of a label is when it lies in a direction from its anchor: the side of its box that faces the anchor is touched by
 * it (the corner for the diagonal of the box), whatever the angle.
 *
 * @param anchor the position in pixels.
 * @param direction on the screen (the y axis points down); a null vector puts the label on the anchor.
 * @param width the size of the label in pixels.
 */
export function labelCenterToward(anchor: XY, direction: XY, width: number, height: number): XY {
    const unit = unitDirection(direction)

    if (unit === null) {
        return {x: anchor.x, y: anchor.y}
    }

    // How far the center of the box is from the point of its border that the anchor is on, along the direction.
    const reach = Math.min(
        unit.x === 0 ? Infinity : width / 2 / Math.abs(unit.x),
        unit.y === 0 ? Infinity : height / 2 / Math.abs(unit.y)
    )
    const gap = labelAwayGap(unit)

    return {x: anchor.x + unit.x * reach + gap.x, y: anchor.y + unit.y * reach + gap.y}
}

/**
 * The vector that a label is pushed by, in pixels on the screen: `distance` further in the direction where it lies.
 * @returns the null vector for a label that lies in no direction (`mc`).
 */
export function labelPush(direction: XY | null, distance: number): XY {
    const unit = direction === null ? null : unitDirection(direction)

    return unit === null ? {x: 0, y: 0} : {x: unit.x * distance, y: unit.y * distance}
}

/** Where a label can be put in relation to its anchor: top, middle or bottom, then left, center or right. */
export const LABEL_POSITIONS: readonly LABEL_POSITION[] = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br']

/** The margin of the background of a label around its text, in pixels: the same for a text and for an HTML label, and in TikZ (`inner sep`). */
export const LABEL_PADDING = 3

/** The sizes of the text of a label by name, as CSS font sizes relative to the font of the page (`md` is the one of the page). */
export const LABEL_SIZES: Readonly<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>> = {
    xs: '0.7em',
    sm: '0.85em',
    md: '1em',
    lg: '1.25em',
    xl: '1.5em'
}

/** The units of a size that is written with one: `14px`, `12pt`, `1.2em`, `1.2rem`, `120%`. */
const SIZE_LENGTH = /^(\d+(?:\.\d+)?|\.\d+)(px|pt|em|rem|%)$/

const SIZES_EXPECTED = `a size (${Object.keys(LABEL_SIZES).join(', ')}), a number of pixels (14), or a length (14px, 12pt, 1.2em, 1.2rem, 120%)`

/**
 * The CSS font size of a size of a label: `xs`, `sm`, `md`, `lg` or `xl` (relative to the font of the page), a number (pixels), or a length with
 * its unit (`px`, `pt`, `em`, `rem`, `%`). The text of the label is never in a unit that CSS and TikZ would read differently.
 * @throws InvalidArgumentError for anything else: a CSS keyword (`large`), a size of 0, or a negative one.
 */
export function parseLabelSize(value: unknown): string {
    if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
        return `${value}px`
    }

    if (typeof value === 'string') {
        const size = value.trim()

        if (Object.hasOwn(LABEL_SIZES, size)) {
            return LABEL_SIZES[size as keyof typeof LABEL_SIZES]
        }

        const found = SIZE_LENGTH.exec(size)

        if (found !== null && Number(found[1]) > 0) {
            return size
        }
    }

    throw new InvalidArgumentError(`Invalid size ${JSON.stringify(value)} for a label: expected ${SIZES_EXPECTED}`)
}

/** The size of the text of a label in points, in TikZ, from its CSS font size. `null` for the size of the page. */
export function labelSizeInPoints(css: string): number | null {
    if (css === 'inherit') {
        return null
    }

    const found = SIZE_LENGTH.exec(css)

    if (found === null) {
        throw new InvalidArgumentError(`Invalid size "${css}" for a label: expected ${SIZES_EXPECTED}`)
    }

    const value = Number(found[1])

    // A pixel is 0.75 pt; the text of a document is 10 pt, which `em`, `rem` and `%` are relative to.
    return {px: value * 0.75, pt: value, em: value * 10, rem: value * 10, '%': value / 10}[found[2] as 'px' | 'pt' | 'em' | 'rem' | '%']
}

/** The names of the sizes of a label in LaTeX, by the CSS size they stand for. */
export const LABEL_SIZE_COMMANDS: Readonly<Record<string, string>> = {
    [LABEL_SIZES.xs]: '\\scriptsize',
    [LABEL_SIZES.sm]: '\\small',
    [LABEL_SIZES.md]: '\\normalsize',
    [LABEL_SIZES.lg]: '\\large',
    [LABEL_SIZES.xl]: '\\Large'
}

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
