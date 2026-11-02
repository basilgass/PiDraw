import {AbstractFigure} from "../figures/AbstractFigure/AbstractFigure"
import type {TeXConverterType} from "../pidraw.common"
import type {PARSER, PARSER_VALUES} from "piparser"
import type {CircleRadius} from "../figures/Circle/Circle.types"
import {Line} from "../figures/Line/Line"
import {Point} from "../figures/Point/Point"
import {ParseError} from "../errors"

export enum PARSER_TYPE {
    UNKNOWN = 'unknown',        // OK
    // POINTS
    POINT = 'pt',               // OK: (x,y)
    MIDDLE = 'mid',             // OK: mid <point>,<point>
    PROJECTION = 'proj',        // OK: proj <point>,<line>
    INTERSECTION = 'inter',     // OK: inter <line>,<line> // TODO: inter <line>,<circle>
    SYMMETRY = 'sym',           // OK: sym <point>,<point|line>
    DIRECTION_POINT = 'dpt',    // OK: dpt <point>,<line>,<distance>,<perpendicular?>
    VECTOR_POINT = 'vpt',       // OK: vpt <point>,<point>,<scale?>,<starting point?>
    EVAL_FX = 'eval',            // OK:eval <function>,<x>
    // LINES
    LINE = 'line',              // OK : <point><point> or line <point>,<point>
    VECTOR = 'vec',
    SEGMENT = 'seg',
    RAY = 'ray',
    PERPENDICULAR = 'perp',     // OK : perp <line>,<point>
    PARALLEL = 'para',          // OK : para <line>,<point>
    MEDIATOR = 'med',           // OK : med <point>,<point>
    TANGENT = 'tan',
    BISECTOR = 'bis',
    // CIRCLES
    CIRCLE = 'circ',            // OK : <center>,<radius>
    ARC = 'arc',                // OK : arc <point>,<point>,<point>[,<radius>] | arc <point>,<number>,<number>,<number> | arc <point>,<point>,<number>[,<radius>] (+ *)
    // PLOTS
    PLOT = 'plot',              // OK : plot <function>[,@<number>,<domain>,<domain>]
    PARAMETRIC = 'parametric',  // OK : parametric <function>,<function>[,@<number>,<domain>]
    // CURVES
    BEZIER = 'bezier',          // OK : bezier <point>/<direction>/<ratio>,... | bezier <point>,<point>,<point>[,<point>],*
    // POLYGONS
    POLYGON = 'poly',           // OK : poly <point>,<point>,<point>,... | poly <point>,<radius>,<sides>[,<step>] | poly <point>,<point>,<sides>[,<step>]

    // THE LAYOUT, drawn from the code (the ones of the parameters have no effect from here)
    GRID = 'grid',              // grid [<x interval>,<y interval>][,<step>]
    AXIS = 'axis',              // axis <point>,<point>[,<step>]

    // SPECIAL FIGURES
    FOLLOW = 'follow',          // OK : follow <function>,<tangent?>
    FILL_BETWEEN = 'fill',      // fill <plot>[,<plot>][,<domain>]
    RIEMANN = 'riemann',        // riemann <plot>[,<domain>][,<rectangles>][,<position>]
    PATH = "path",              // path <SVG path data, in units>
}

export type IParserValues = PARSER_VALUES | AbstractFigure

export interface IParserConfig {
    parameters?: string,
    code?: string
    tex?: TeXConverterType,
}

/** The options of the shape of a point: a circle (`o`), a square (`s`) or a crosshair (`*`). */
export type PointShapeOption = 'o' | 's' | '*'

/** The shape that the points of a drawing take when they do not ask for one (`points=s/12`). */
export interface IPointsSetting {
    shape: PointShapeOption,
    /** Size of the shape, by default the one of the shape. */
    size?: number
}

export interface IParserSettings {
    label?: boolean,
    tex?: boolean,
    /** `false` hides the points (`no-points`). */
    points?: false | IPointsSetting,
}

export interface IParserParameters {
    value: IParserValues,
    options: IParserValues[]
}

export interface IParser {
    id: string;
    key: PARSER_TYPE;
    code: string[];
    parameters: Record<string, IParserParameters>;
}

export const PARSER_BOOLEAN_VALUES = [
    '#',    // Figure is static (no update)
    '!',    // Hide the figure, not the label
    '?',    // Hide the label, not the figure
    'hide', // Hide the figure and the label
    'ultrathin', 'thin', 'thick', 'ultrathick',
    'dash', 'dot',
    'tex', 'label', // TeX or Text label
    'axis', 'grid' // Parameter for the layout
]


export function convertIdToFigure(options: PARSER_VALUES[], figures: Record<string, AbstractFigure>): IParserValues[] {
    return options.map((option): IParserValues => {
        if (typeof option === 'string' && option in figures) {
            return figures[option]
        }

        return option
    })
}


// List of color values
export const PARSER_COLOR_VALUES = [
    'black', 'white', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow',
    'gray', 'grey', 'darkgray', 'darkgrey', 'lightgray', 'lightgrey',
    'brown', 'lime', 'olive', 'orange', 'pink', 'purple', 'teal', 'gold'
]

// What the builders (`build*`) share: guards on the values of a line of code, and the error for a line that does not fit its key.

export const isPoint = (value: IParserValues | undefined): value is Point => value instanceof Point
export const isLine = (value: IParserValues | undefined): value is Line => value instanceof Line


/**
 * The last value of a line of code that picks the alternative form of a construction (the inscribed circle instead of the
 * circumscribed one, the line perpendicular instead of along): a `*`. Any other value is not that mark.
 */
export const ALTERNATIVE = '*'

export const isAlternative = (value: IParserValues | undefined): value is typeof ALTERNATIVE => value === ALTERNATIVE

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
