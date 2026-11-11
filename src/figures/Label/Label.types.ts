import type {XY} from "../../pidraw.common"

/** Where a label is put in relation to its anchor: top, middle or bottom, then left, center or right. */
export type LABEL_POSITION = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br'

/** What a label can show besides text: a value that the figure it belongs to computes. */
export type LabelFieldName = 'coordinates' | 'length' | 'sum' | 'rectangles' | 'area' | 'angle' | 'radius' | 'perimeter' | 'slope'

/** A value computed by the figure, written with `digits` decimals (the figure's own way when there are none, 2 for most). */
export interface LabelField {
    field: LabelFieldName,
    digits?: number
}

/** The content of a label: a text, or texts and fields written one after the other. */
export type LabelContent = string | (string | LabelField)[]

/** How a label is written: in TeX (a formula: `60^\circ`, `\frac{3}{2}`) or as a plain text (`60°`, `3/2`). */
export interface LabelFormat {
    tex: boolean
}

/**
 * How a figure computes each field it can show: the text of the field, with the given number of decimals (`undefined` when not asked), written
 * for the format of the label.
 */
export type LabelFields = Partial<Record<LabelFieldName, (digits: number | undefined, format: LabelFormat) => string>>

/** How a label is drawn, whatever the figure it belongs to. */
export interface ILabelConfig {
    /** The label is HTML (a `foreignObject`), for the text of a `texConverter`. */
    asHtml: boolean,
    /** On which side of its anchor the label lies: `tl` above and to the left, `br` below and to the right, `mc` centered on it. */
    alignement: LABEL_POSITION,
    /**
     * A direction on the screen (the y axis points down) that replaces the alignement: the label lies on that side of its anchor, whatever
     * the angle (the side of the box that faces the anchor is touched by it). `null` when the alignement decides.
     */
    away: XY | null,
    /**
     * How far the label is pushed from its anchor, in pixels, further in the direction where it lies (`away`, or the one of its alignement).
     * `null` when none was asked: it is then the `clearance`.
     */
    push: number | null,
    /** The push of a label that was asked none, in pixels: a figure that holds something over its label (a drag handle) keeps it clear. */
    clearance: number,
    /** Added to the place of the label, in pixels, with the y axis pointing up. */
    offset: XY,
    /** The rotation of the label around its anchor, in degrees clockwise on the screen. */
    rotate: number,
    /** The font size, as in CSS. */
    size: string,
    /** The color of the text, a CSS color; `null` keeps the one the page gives it. */
    color: string | null,
    /** The background of the label, a box a little bigger than the text; `null` has none. The opacity is from 0 to 1. */
    fill: { color: string, opacity: number } | null,
    /**
     * Turns the text of an HTML label into HTML (the LaTeX of a label, rendered). Without it the text of an HTML label is written as
     * it is, never read as HTML.
     */
    texConverter?: (value: string) => string
}

/** What a label is made of: the text, and the parts of {@link ILabelConfig} that differ from the default ones. */
export type LabelOptions = Partial<ILabelConfig> & { text?: string }
