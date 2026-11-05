import type {PiParse} from "piparser"
import {OptionError, ParseError} from "../errors"
import type {IGraphDisplay} from "../Graph.types"
import {isDomain} from "../pidraw.common"
import {buildAxes, type IAxisExtra, splitAxisOptions} from "../figures/Axis/Axis.parser"
import {buildGridParameters} from "../figures/Grid/Grid.parser"
import {given} from "./parser.step"
import type {IParserParameters, IParserSettings, IPointsSetting} from "./parser.types"
import {describeValue} from "./parser.common"
import {type Interval, readInterval} from "./parser.interval"

// Everything the parser needs to know about the parameters of the graph: the string `parameters` of `Draw` (`x=-10:10,axis,grid=2`)
// becomes the window, the length of a unit, what the graph shows, the defaults of the figures and the options of the axes and the grid.

/** The names of the parameters. */
export const LAYOUT_KEYS = [
    'x', 'y', 'box', 'unitX', 'unitY',
    'axis', 'axisX', 'axisY', 'axisXname', 'axisYname',
    'grid', 'gridX', 'gridY',
    'default.label', 'default.tex', 'default.points'
]

/** The names that the parameters used to have, and what replaces them. */
const RENAMED: Record<string, string> = {
    ppu: 'unitX and unitY, the length of a unit in cm (unitX=1.5)',
    subgrid: 'the option subgrid of grid (grid->subgrid=4)',
    label: 'default.label',
    tex: 'default.tex',
    points: 'default.points',
    'no-points': 'default.points=no'
}

/** The parameters whose options (after the `->`) are given to the axes and to the grid. */
const DECOR_KEYS = ['axis', 'axisX', 'axisY', 'axisXname', 'axisYname', 'grid', 'gridX', 'gridY']

/** The part of the coordinate system that is drawn when the parameters do not say: from -8 to 8. */
const DEFAULT_HALF = 8

/** The options (after the `->`) of what a parameter draws, by name of the option. */
type Options = Record<string, IParserParameters>

/** What the parameters of a graph say. */
export interface ILayout {
    /** The part of the coordinate system that is drawn, in units. */
    window: { x: Interval, y: Interval },
    /** The length of a unit of each axis, in cm. */
    unit: { x: number, y: number },
    /** What the graph shows. */
    display: IGraphDisplay,
    /** What the figures are given when they do not ask for something else. */
    defaults: IParserSettings,
    /** The options of the axes and of the grid: the ones of `axis` and of `axisX`, those of `grid` and of `gridX`... together. */
    options: { x: Options, y: Options, grid: Options }
}

/**
 * The entries of a string of parameters. They are separated by a comma, but an entry that has options (`grid=2->red,width=5`) goes on
 * up to a double comma (`,,`) or the end: the commas between are the commas of the options.
 */
export function splitParameters(text: string): string[] {
    const entries: string[] = []
    let current: string | null = null

    for (const part of text.split(',').map(item => item.trim())) {
        if (current !== null) {
            // In a list of options: an empty part is the double comma that ends it.
            if (part === '') {
                entries.push(current)
                current = null
            } else {
                current += `,${part}`
            }
        } else if (part !== '') {
            if (part.includes('->')) {
                current = part
            } else {
                entries.push(part)
            }
        }
    }

    if (current !== null) {
        entries.push(current)
    }

    return entries
}

/** The interval that a window parameter gives, which has no options. */
function windowOf({value, options}: IParserParameters, key: string): Interval {
    if (options.length > 0) {
        throw new ParseError(`Cannot read the parameter "${key}=${describeValue(value)}/${options.map(describeValue).join('/')}": expected min:max, or one number for -n:n`)
    }

    return readInterval(value, key)
}

/** The two intervals that `box` gives: `box=5` is `x=-5:5,y=-5:5`, `box=8;6` is `x=-8:8,y=-6:6`, an interval is the same for both. */
function boxOf(parameter: IParserParameters): { x: Interval, y: Interval } {
    const {value} = parameter

    if (typeof value === 'object' && !isDomain(value) && 'x' in value && 'y' in value) {
        return {x: readInterval(value.x, 'box'), y: readInterval(value.y, 'box')}
    }

    const same = windowOf(parameter, 'box')

    return {x: same, y: {...same}}
}

/** A length in cm: a number greater than 0. */
function length(parameter: IParserParameters | undefined, key: string): number | null {
    if (!given(parameter)) {
        return null
    }

    const {value, options} = parameter

    if (typeof value !== 'number' || options.length > 0 || !(Number.isFinite(value) && value > 0)) {
        throw new ParseError(`Cannot read the parameter "${key}=${describeValue(value)}": expected a length in cm greater than 0 (${key}=1.5)`)
    }

    return value
}

/** A word alone: `true`, or `false` when it is not there. */
function flag(parameter: IParserParameters | undefined, key: string): boolean {
    if (!given(parameter)) {
        return false
    }

    if (parameter.value !== true || parameter.options.length > 0) {
        throw new ParseError(`Cannot read the parameter "${key}=${describeValue(parameter.value)}": expected the word ${key} alone`)
    }

    return true
}

/** The points setting: `no` hides them, or a shape (`o`, `s`, `*`) and a size. */
function pointsOf(parameter: IParserParameters | undefined): IParserSettings['points'] {
    if (!given(parameter)) {
        return {shape: 'o'}
    }

    if (parameter.value === 'no' && parameter.options.length === 0) {
        return false
    }

    try {
        return parsePointsSetting(parameter)
    } catch (error) {
        if (error instanceof OptionError) {
            throw new ParseError(`Cannot read the parameter "default.points": ${error.message} (or "no" to hide the points)`, {cause: error})
        }

        throw error
    }
}

/**
 * Read one entry: its name, its value, and its options (after the `->`).
 * @throws ParseError if the name is not one of the parameters.
 */
function readEntry(entry: string, parser: PiParse): { key: string, parameter: IParserParameters, options: Options } {
    const arrow = entry.indexOf('->')
    const definition = (arrow < 0 ? entry : entry.slice(0, arrow)).trim()
    const key = definition.split('=')[0].trim()

    if (Object.hasOwn(RENAMED, key)) {
        throw new ParseError(`The parameter "${key}" does not exist any more: use ${RENAMED[key]}`)
    }

    if (!LAYOUT_KEYS.includes(key)) {
        throw new ParseError(`Unknown parameter "${key}": expected ${LAYOUT_KEYS.join(', ')}`)
    }

    const parameter = parser.parameters(definition, LAYOUT_KEYS)[key] as IParserParameters | undefined

    if (parameter === undefined) {
        throw new ParseError(`Cannot read the parameter "${definition}"`)
    }

    // The options are read like the ones of a figure: as the line of a figure that has them.
    const text = arrow < 0 ? '' : entry.slice(arrow + 2).trim()
    const options = text === '' ? {} : parser.parse(`layout=grid ->${text}`).parameters as unknown as Options

    return {key, parameter, options}
}

/**
 * Read the parameters of a graph:
 * - the window: `x=-10:10`, `y=-8:8` (a bound can be `2pi`), `x=6` for `x=-6:6`, `box=5` for both (`box=8;6`, or an interval); -8:8 by default;
 * - the length of a unit in cm: `unitX=2`, `unitY=3` (`unitY` is `unitX` when it is alone); 1 by default;
 * - the axes: `axis`, `axisX`, `axisY`, `axisXname=x` (see {@link buildAxes});
 * - the grid: `grid`, `gridX`, `gridY` (see {@link buildGrid}), whose option `subgrid` cuts the steps;
 * - the defaults of the figures: `default.label`, `default.tex`, `default.points=no` or a shape (`o`, `s`, `*`) and a size (`o/12`).
 *
 * An entry with options (`axis=pi/2->red,thick`) takes the commas that follow as the commas of its options, up to `,,` (see
 * {@link splitParameters}). The options of an axis or of the grid are returned, to be applied to them.
 *
 * @throws ParseError if a parameter has a name that does not exist or does not exist any more (the message says what replaces it),
 * a value that is not valid, or options that the parameter cannot have.
 */
export function buildLayout(text: string, parser: PiParse): ILayout {
    const entries: Record<string, IParserParameters> = {}
    const options: { x: Options, y: Options, grid: Options } = {x: {}, y: {}, grid: {}}
    // What the options of the entries `axis` say about the graduation of each axis. The ones of `axisX` come after, and win.
    const extras: { x: IAxisExtra, y: IAxisExtra } = {x: {}, y: {}}

    for (const entry of splitParameters(text)) {
        const {key, parameter, options: entryOptions} = readEntry(entry, parser)

        if (Object.hasOwn(entries, key)) {
            throw new ParseError(`The parameter "${key}" is written twice`)
        }

        entries[key] = parameter

        if (Object.keys(entryOptions).length > 0 && !DECOR_KEYS.includes(key)) {
            throw new ParseError(`The parameter "${key}" has no options, got ${Object.keys(entryOptions).join(', ')} after "->"`)
        }

        // The options of `axis`, `grid`... go to the axes and the grid. For an axis, `ticks`, `numbers` and `padding` say what the graph
        // draws; the others are its style.
        const forX = key === 'axis' || key === 'axisX' || key === 'axisXname'
        const forY = key === 'axis' || key === 'axisY' || key === 'axisYname'

        if (forX || forY) {
            const {extra, style} = splitAxisOptions(entryOptions)

            if (forX) {
                Object.assign(options.x, style)
                Object.assign(extras.x, extra)
            }

            if (forY) {
                Object.assign(options.y, style)
                Object.assign(extras.y, extra)
            }
        }

        if (key === 'grid' || key === 'gridX' || key === 'gridY') {
            Object.assign(options.grid, entryOptions)
        }
    }

    // The window: `box` for both, and `x` and `y` more exactly.
    const box = given(entries.box) ? boxOf(entries.box) : null
    const view = {
        x: given(entries.x) ? windowOf(entries.x, 'x') : box?.x ?? {min: -DEFAULT_HALF, max: DEFAULT_HALF},
        y: given(entries.y) ? windowOf(entries.y, 'y') : box?.y ?? {min: -DEFAULT_HALF, max: DEFAULT_HALF}
    }

    const unitX = length(entries.unitX, 'unitX')
    const unitY = length(entries.unitY, 'unitY')
    const grid = buildGridParameters(entries.grid, entries.gridX, entries.gridY)

    return {
        window: view,
        unit: {x: unitX ?? 1, y: unitY ?? unitX ?? 1},
        display: {
            axis: buildAxes(entries, extras),
            grid: grid ?? false
        },
        defaults: {
            label: flag(entries['default.label'], 'default.label'),
            tex: flag(entries['default.tex'], 'default.tex'),
            points: pointsOf(entries['default.points'])
        },
        options
    }
}

/**
 * The shape that the points of a drawing take by default (`points=o`, `points=s/12`, `points=*`): the shape, then an optional size.
 *
 * @throws OptionError if the shape is not `o`, `s` or `*`, or the size is not a number greater than 0.
 */
export function parsePointsSetting({value, options}: IParserParameters): IPointsSetting {
    const shape = value === true ? 'o' : value

    if (shape !== 'o' && shape !== 's' && shape !== '*') {
        throw new OptionError('points', `Invalid shape ${describeValue(value)} for the option "points": expected 'o', 's' or '*'`)
    }

    const size = options.at(0)

    if (size === undefined) {
        return {shape}
    }

    if (typeof size !== 'number' || !Number.isFinite(size) || size <= 0) {
        throw new OptionError('points', `Invalid size ${describeValue(size)} for the option "points": expected a number greater than 0`)
    }

    return {shape, size}
}
