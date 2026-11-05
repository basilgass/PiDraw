import type {XY} from "../../pidraw.common"

/** Where a label is put in relation to its anchor: top, middle or bottom, then left, center or right. */
export type LABEL_POSITION = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br'

/** What a label can show besides text: a value that the figure it belongs to computes. */
export type LabelFieldName = 'coordinates' | 'length' | 'sum' | 'rectangles' | 'area'

/** A value computed by the figure, written with `digits` decimals. */
export interface LabelField {
    field: LabelFieldName,
    digits: number
}

/** The content of a label: a text, or texts and fields written one after the other. */
export type LabelContent = string | (string | LabelField)[]

/** How a figure computes each field it can show: the text of the field, with the given number of decimals. */
export type LabelFields = Partial<Record<LabelFieldName, (digits: number) => string>>

/** How a label is drawn, whatever the figure it belongs to. */
export interface ILabelConfig {
    /** The label is HTML (a `foreignObject`), for the text of a `texConverter`. */
    asHtml: boolean,
    /** Which part of the label is at the anchor. */
    alignement: LABEL_POSITION,
    /** Added to the place of the label, in pixels, with the y axis pointing up. */
    offset: XY,
    /** The rotation of the label around its anchor, in degrees clockwise on the screen. */
    rotate: number,
    /** The font size, as in CSS. */
    size: string,
    /**
     * Turns the text of an HTML label into HTML (the LaTeX of a label, rendered). Without it the text of an HTML label is written as
     * it is, never read as HTML.
     */
    texConverter?: (value: string) => string
}

/** What a label is made of: the text, and the parts of {@link ILabelConfig} that differ from the default ones. */
export type LabelOptions = Partial<ILabelConfig> & { text?: string }
