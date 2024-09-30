import type { PARSER_VALUES } from "piparser/lib/PiParserTypes"
import { AbstractFigure } from "../figures/AbstractFigure"
import type { TeXConverterType } from "../pidraw.common"

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
    PATH = "path",              // TODO: allow path given by a string ? Path given by a string
}

export type IParserValues = PARSER_VALUES | AbstractFigure

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