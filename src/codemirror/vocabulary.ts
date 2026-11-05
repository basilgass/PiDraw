import {themeOptionDetails, themeOptionValues} from '../controls/controls'
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
    ultrathin: 'width 0.5',
    thin: 'width 0.75',
    thick: 'width 2.5',
    ultrathick: 'width 4',
    ...themeOptionDetails()
}

/** Short descriptions of the parameters of the graph. */
export const PARAMETER_DETAILS: Readonly<Record<string, string>> = {
    x: 'x=-10:10 — window, horizontal',
    y: 'y=-10:10 — window, vertical',
    box: 'box=-10:10,-5:5 — window',
    unitX: 'unitX=1 — cm for one unit',
    unitY: 'unitY=1 — cm for one unit',
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
