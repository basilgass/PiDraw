import { AbstractFigure } from "../figures/AbstractFigure"
import { DOMAIN, TeXConverterType, XY } from "../pidraw.common"

export enum PARSER_TYPE {
    UNKNOWN = 'unknown',        // OK
    // POINTS
    POINT = 'point',            // OK: (x,y)
    MIDDLE = 'mid',             // OK: mid <point>,<point>
    PROJECTION = 'proj',        // OK: proj <point>,<line>
    INTERSECTION = 'inter',     // OK: inter <line>,<line> // TODO: inter <line>,<circle>
    SYMMETRY = 'sym',
    // LINES
    LINE = 'line',              // OK : <point><point> or line <point>,<point>
    PERPENDICULAR = 'perp',     // OK : perp <line>,<point>
    PARALLEL = 'para',          // OK : para <line>,<point>
    MEDIATOR = 'med',           // OK : med <point>,<point>
    TANGENT = 'tan',
    BISECTOR = 'bis',
    // CIRCLES
    CIRCLE = 'circ',            // OK : <center>,<radius>
    ARC = 'arc',                // OK : arc <point>,<point>,<point>
    // PLOTS
    PLOT = 'plot',              // OK : plot <function>[,@<number>,<domain>,<domain>]
    PARAMETRIC = 'parametric',  // OK : parametric <function>,<function>[,@<number>,<domain>]
    // POLYGONS
    POLYGON = 'poly',           // OK : poly <point>,<point>,<point>,...
    REGULAR = 'reg',            // OK: reg <center>,<radius>,<sides>
    // SPECIAL FIGURES
    FOLLOW = 'follow',          // OK : follow <function>,<tangent?>
    FILL_BETWEEN = 'fill',      // OK : fillbetween <function>,<function?>,<domain?>
    RIEMANN = 'riemann',        // riemann <function>,<domain>,<number>,<position>
}

export type IParserValues = (string | number | boolean | XY | DOMAIN | AbstractFigure)

export interface IParserConfig {
    parameters?: string,
    code?: string
    tex?: TeXConverterType,
}
export interface IParserSettings {
    label?: boolean,
    tex?: boolean,
    points?: boolean | 'o' | '*' | 's',
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

export const PARSER_COLOR_VALUES = [
    'black', 'white', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow',
    'gray', 'grey', 'darkgray', 'darkgrey', 'lightgray', 'lightgrey',
    'brown', 'lime', 'olive', 'orange', 'pink', 'purple', 'teal', 'gold'
]

export function convertValues(options: string[], figures: Record<string, AbstractFigure>): IParserValues[] {
    return options.map((option): IParserValues => {
        if (option === '') { return false }

        if (figures[option]) {
            // FIGURE
            return figures[option]
        }
        else if (option.includes(':')) {
            // DOMAIN: x:2:3
            const [a, b, c] = option.split(':')

            if (c !== undefined && ['x', 'y'].includes(a)) {
                return {
                    axis: a as 'x' | 'y',
                    min: parseFloat(b),
                    max: parseFloat(c),
                }
            }

            // DOMAIN without axis 2:3
            return {
                min: parseFloat(a),
                max: parseFloat(b)
            }

        } else if (option.includes(';')) {
            // COORDINATE: x;y
            const [x, y] = option.split(';')

            if (!isNaN(+x) && !isNaN(+y)) {
                return {
                    x: parseFloat(x),
                    y: parseFloat(y)
                }
            }
        } else if (!isNaN(+option)) {
            // A NUMBER
            return parseFloat(option)
        } else if (option.startsWith('@')) {
            // A NUMBER
            return parseFloat(option.slice(1))
        } else if (option.includes('/')) {
            // A RATIO / FRACTION
            const [numerator, denominator] = option.split('/')
            if (!isNaN(+numerator) && !isNaN(+denominator) && +denominator !== 0) {
                return parseFloat(numerator) / parseFloat(denominator)
            }
        }

        return option
    })
}