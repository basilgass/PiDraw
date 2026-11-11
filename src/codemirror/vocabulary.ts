import {themeOptionDetails, themeOptionValues} from '../controls/controls'
import type {LabelFieldName} from '../figures/Label/Label.types'
import {optionNames} from '../Draw/Draw.options'
import {LAYOUT_KEYS} from '../parser/buildLayout'
import {PARSER_COLOR_VALUES, PARSER_TYPE} from '../parser/parser.common'
import {PARSER_CONFIG} from '../parser/parser.config'

/** What the editor knows of the language: read from the parser, so that a new key or option shows up without a copy to update. */
export interface IVocabulary {
    /** The kinds of figures (`pt`, `seg`...). */
    keys: readonly string[]
    /** The options of a line, after `->`. */
    options: readonly string[]
    /** The parameters of the graph (`x`, `axis`, `default.label`...). */
    parameters: readonly string[]
    /** The names of the colors. */
    colors: readonly string[]
}

/** The values that follow an option with `=`: the ones of the options of the themes come with the theme. */
export const OPTION_VALUES: Readonly<Record<string, readonly string[]>> = {
    drag: ['grid', 'Ox', 'Oy'],
    ...themeOptionValues()
}

/** The options that take a color. */
export const COLOR_OPTIONS: readonly string[] = ['color', 'fill']

/** The syntax of each kind of figure, from the `summary` that its parser gives: a new key shows up with its own. */
export const KEY_DETAILS: Readonly<Record<string, string>> = Object.fromEntries(
    Object.entries(PARSER_CONFIG).map(([key, item]) => [key, item.summary])
)

/** Short descriptions of the options (the ones of the themes come with the theme). An option without one is still suggested. */
export const OPTION_DETAILS: Readonly<Record<string, string>> = {
    w: 'width: w=3',
    color: 'stroke color: color=red/0.5',
    fill: 'fill color: fill=blue/0.3',
    dash: 'dashed',
    dot: 'dotted',
    mark: 'markers at the ends',
    class: 'CSS classes: class=primary or class=a/b',
    node: 'a box around the label: node=rect, round, diamond or circle',
    curve: 'bends an edge: curve=0.3 (to the left), curve=-0.3 (to the right)',
    loopSide: 'side of a loop on an edge: loopSide=t, r, b or l',
    labelColor: 'color of the text of the label: labelColor=red',
    labelFill: 'background of the label: labelFill=white/0.8',
    labelSize: 'size of the text of the label: labelSize=lg, 14 (pixels), 1.2em',
    hide: 'hides the figure and its label',
    '!': 'hides the figure, keeps the label',
    '?': 'hides the label, keeps the figure',
    static: 'cannot be moved',
    _: 'cannot be moved',
    move: 'move=1;2',
    scale: 'scale=2;1',
    label: 'label=A/tl',
    tex: 'tex=A/br',
    drag: 'drag=grid|Ox|Oy|figure',
    snap: 'a dragged point sticks to points, centers, ends, middles, vertices: snap=A/B/C',
    snapRadius: 'distance of the snap in pixels: snapRadius=30',
    range: 'part of an axis: range=-10:10',
    ultrathin: 'width 0.5',
    thin: 'width 0.75',
    thick: 'width 2.5',
    ultrathick: 'width 4',
    ...themeOptionDetails()
}

/** What each field of a label is, after `@`. Typed by the fields: a new one without a description does not compile. */
export const LABEL_FIELD_DETAILS: Readonly<Record<LabelFieldName, string>> = {
    coordinates: 'coordinates (x;y)',
    length: 'length of a segment, of an arc',
    angle: 'angle of an arc, in degrees',
    radius: 'radius',
    perimeter: 'perimeter',
    area: 'area',
    slope: 'slope of a line',
    sum: 'sum of the rectangles',
    rectangles: 'number of rectangles'
}

/**
 * The fields that a label can show for a kind of figure (`@area`), from the `labelFields` of its parser. Every field of the language for a key that is
 * unknown (a shorthand such as `A(1,2)` or `d=AB` has none).
 */
export function labelFieldsOf(key: string | undefined): readonly LabelFieldName[] {
    const item = key === undefined ? undefined : PARSER_CONFIG[key]
    const items = item === undefined ? Object.values(PARSER_CONFIG) : [item]

    return [...new Set(items.flatMap(found => found.labelFields ?? []))]
}

/** Short descriptions of the parameters of the graph. */
export const PARAMETER_DETAILS: Readonly<Record<string, string>> = {
    x: 'x=-10:10 — window, horizontal',
    y: 'y=-10:10 — window, vertical',
    box: 'box=-10:10,-5:5 — window',
    unitX: 'unitX=1 — cm for one unit',
    unitY: 'unitY=1 — cm for one unit',
    unit: 'unit=mm — unit written after the lengths of the labels',
    scale: 'scale=10 or 1/10 — scale of the lengths of the labels',
    axis: 'axes',
    grid: 'grid',
    'default.label': 'label of the figures',
    'default.tex': 'LaTeX label of the figures',
    'default.points': 'default shape of the points'
}

/** The vocabulary of the parser, as it is now. */
export function readVocabulary(): IVocabulary {
    return {
        keys: Object.values(PARSER_TYPE),
        options: optionNames(),
        parameters: LAYOUT_KEYS,
        colors: PARSER_COLOR_VALUES
    }
}
