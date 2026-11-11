import type {PARSER, PARSER_VALUES} from "piparser"
import type {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import type {CircleRadius} from "../figures/Circle/Circle.types"
import {Line} from "../figures/Line/Line"
import {Point} from "../figures/Point/Point"
import {OptionError, ParseError} from "../errors"
import type {IParserValues} from "./parser.types"

/** The key of a line of code (`A=mid B,C`: `mid`), with the form of its values. */
export enum PARSER_TYPE {
    // POINTS
    POINT = 'pt',               // (x,y)
    MIDDLE = 'mid',             // mid <point>,<point>
    PROJECTION = 'proj',        // proj <point>,<line>
    INTERSECTION = 'inter',     // inter <line|circle>,<line|circle>
    SYMMETRY = 'sym',           // sym <point>,<point|line>
    DIRECTION_POINT = 'dpt',    // dpt <point>,<line>,<distance>,<perpendicular?>
    VECTOR_POINT = 'vpt',       // vpt <point>,<point>,<scale?>,<starting point?>
    EVAL_FX = 'eval',           // eval <function>,<x>
    // LINES
    LINE = 'line',              // <point><point> or line <point>,<point>
    VECTOR = 'vec',
    SEGMENT = 'seg',
    RAY = 'ray',
    PERPENDICULAR = 'perp',     // perp <line>,<point>
    PARALLEL = 'para',          // para <line>,<point>
    MEDIATOR = 'med',           // med <point>,<point>
    TANGENT = 'tan',
    BISECTOR = 'bis',
    // CIRCLES
    CIRCLE = 'circ',            // <center>,<radius>
    ARC = 'arc',                // arc <point>,<point>,<point>[,<radius>] | arc <point>,<number>,<number>,<number> | arc <point>,<point>,<number>[,<radius>] (+ *)
    // PLOTS
    PLOT = 'plot',              // plot <function>[,@<number>,<domain>,<domain>]
    PARAMETRIC = 'parametric',  // parametric <function>,<function>[,@<number>,<domain>]
    // CURVES
    BEZIER = 'bezier',          // bezier <point>/<direction>/<ratio>,... | bezier <point>,<point>,<point>[,<point>],*
    EDGE = 'edge',              // edge <point>,<point>
    // POLYGONS
    POLYGON = 'poly',           // poly <point>,<point>,<point>,... | poly <point>,<radius>,<sides>[,<step>] | poly <point>,<point>,<sides>[,<step>]

    // THE LAYOUT, drawn from the code (the ones of the parameters have no effect from here)
    GRID = 'grid',              // grid [<x interval>,<y interval>][,<step>]
    AXIS = 'axis',              // axis <point>,<point>[,<step>]

    // SPECIAL FIGURES
    FOLLOW = 'follow',          // follow <function>,<tangent?>
    FILL_BETWEEN = 'fill',      // fill <plot>[,<plot>][,<domain>]
    RIEMANN = 'riemann',        // riemann <plot>[,<domain>][,<rectangles>][,<position>]
    PATH = "path",              // path <SVG path data, in units>
}

/** The names of the colors that an option can be (`red`). */
export const PARSER_COLOR_VALUES: readonly string[] = [
    'black', 'white', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow',
    'gray', 'grey', 'darkgray', 'darkgrey', 'lightgray', 'lightgrey',
    'brown', 'lime', 'olive', 'orange', 'pink', 'purple', 'teal', 'gold'
]

// What the builders (`build*`) share: guards on the values of a line of code, and the error for a line that does not fit its key.

/** Whether the value is a point of the drawing. */
export const isPoint = (value: IParserValues | undefined): value is Point => value instanceof Point

/** Whether the value is a line of the drawing (an axis is one). */
export const isLine = (value: IParserValues | undefined): value is Line => value instanceof Line

/**
 * The last value of a line of code that picks the alternative form of a construction (the inscribed circle instead of the
 * circumscribed one, the line perpendicular instead of along): a `*`. Any other value is not that mark.
 */
export const ALTERNATIVE = '*'

export const isAlternative = (value: IParserValues | undefined): value is typeof ALTERNATIVE => value === ALTERNATIVE

/**
 * The values of a line of code where each text that is the name of a figure of the drawing is replaced by that figure. The other
 * values stay as they are, and a name that only the prototype of `figures` has (`toString`) is not a figure.
 */
export function convertIdToFigure(options: PARSER_VALUES[], figures: Record<string, AbstractFigure>): IParserValues[] {
    return options.map((option): IParserValues => {
        if (typeof option === 'string' && Object.hasOwn(figures, option)) {
            return figures[option]
        }

        return option
    })
}

/**
 * `A:B`, two points joined by a `:` (the distance between them, the segment between them).
 * @returns the two points, or `null` if the value is not two names of points of the drawing.
 */
export function parsePointPair(value: IParserValues | undefined, figures: Record<string, AbstractFigure>): [Point, Point] | null {
    if (typeof value !== 'string') {
        return null
    }

    const names = value.split(':')

    if (names.length !== 2) {
        return null
    }

    const [first, second] = names.map(name => Object.hasOwn(figures, name) ? figures[name] : undefined)

    return first instanceof Point && second instanceof Point ? [first, second] : null
}

/**
 * A radius: a number (in units of the x axis), a point (the radius is its distance to the center), or `A:B` (the distance
 * between two points).
 * @returns `null` if the value is none of those.
 */
export function parseRadius(value: IParserValues | undefined, figures: Record<string, AbstractFigure>): CircleRadius | null {
    if (typeof value === 'number' || isPoint(value)) {
        return value
    }

    const pair = parsePointPair(value, figures)

    return pair === null ? null : {point1: pair[0], point2: pair[1]}
}

/** What a value is, for a message. */
export function describeValue(value: unknown): string {
    if (value instanceof Object && 'name' in value && typeof value.name === 'string') {
        return `the figure "${value.name}"`
    }

    return value === undefined ? 'nothing' : JSON.stringify(value)
}

/** The error of an option (after the `->`) that has a value which is not valid. `expected` says what would be. */
export function invalidOption(key: string, figure: AbstractFigure, value: unknown, expected: string): OptionError {
    return new OptionError(key, `Invalid value ${describeValue(value)} for the option "${key}" of "${figure.name}": expected ${expected}`)
}

/** @throws ParseError always: the line of code `item` does not match what its key expects. */
export function buildError(item: PARSER, expected: string, got: string): never {
    throw new ParseError(`Cannot build "${item.name}" (${item.key}): expected ${expected}, got ${got}`)
}

/** @throws ParseError if the line has less than `min` or more than `max` values. */
export function expectCount(item: PARSER, values: IParserValues[], min: number, max: number, expected: string): void {
    if (values.length < min || values.length > max) {
        buildError(item, expected, `${values.length} value${values.length === 1 ? '' : 's'}`)
    }
}
