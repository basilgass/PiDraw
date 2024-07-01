import { DOMAIN, XY } from "./pidraw.common"

/**
 * The parser type is used to identify the type of the parser.
 * The value is the key of the parser.
 */
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
    BISECTOR = 'biss',
    // CIRCLES
    CIRCLE = 'circ',            // OK : <center>,<radius>
    // PLOTS
    PLOT = 'plot',              // OK : plot <function>
    // POLYGONS
    POLYGON = 'poly',           // OK : poly <point>,<point>,<point>,...
    REGULAR = 'reg',            // OK: reg <center>,<radius>,<sides>
}

type IParserOptions = (string | number | XY | DOMAIN)
interface IParserParameters {
    value: string | boolean,
    options: IParserOptions[]
}
export interface IParser {
    id: string;
    key: PARSER_TYPE;
    code: string[];
    parameters: Record<string, IParserParameters>;
}

const PARSER_BOOLEAN_VALUES = [
    '#',    // Figure is static (no update)
    '!',    // Hide the figure, not the label
    '?',    // Hide the label, not the figure
    'hide', // Hide the figure and the label
    'ultrathin', 'thin', 'thick', 'ultrathick',
    'dash', 'dot'
]

/**
 * Parse the input string and return an array of IParser.
 * @param input The input string to parse.
 * @returns An array of IParser.
 */
export function graphParser(input: string): IParser[] {
    const output: IParser[] = []

    const lines = input.split('\n').filter((line) => line.trim() !== '')

    for (const line of lines) {

        // Split the line into key_code and parameters at '->'
        const [key_code, parameters_code] = line.split('->')

        // Split the code into key and code at '='
        const result = _parseKeyCode(key_code)

        // Split the parameters into key and value at ','
        if (parameters_code !== undefined) {
            result.parameters = Object.assign(result.parameters, _parserParametersCode(parameters_code))
        }

        output.push(result)
    }

    return output
}

/**
 * Parse the first part of the input string:
 * it contains the key and the figure code
 * @param key_code 
 * @returns 
 */
function _parseKeyCode(key_code: string): IParser {
    // Key code can be:
    // 1. A(3,4) => id='A', key=POINT, code= ['3','4']
    // 2. AB => id='AB', key=LINE, code=['A', 'B']
    // 3. d=<key> <code> => id='d', key='<key>' code='<code>'
    let id = '',
        key: PARSER_TYPE = PARSER_TYPE.UNKNOWN,
        code: string[] = []
    const parameters: Record<string, IParserParameters> = {}

    // Extract the point (no = sign). The id is before the '(' and the code is between '(' and ')'
    if (!key_code.includes('=') && key_code.includes('(')) {
        id = key_code.split('(')[0]
        key = PARSER_TYPE.POINT
        code = key_code.split('(')[1].split(')')[0].split(',')
    } else if (key_code.includes('=') && !key_code.includes(' ')) {
        // Extract the line (with = sign). The id is before the '=' and the code is after '='
        let list_of_points: string
        [id, list_of_points] = key_code.split('=')

        // the line can be a:
        // line         d=AB
        // half line    d=[AB[ or d=]AB]
        // segment      d=AB.
        // vector       d=vAB
        key = PARSER_TYPE.LINE

        if (list_of_points.includes('[') || key_code.includes(']')) {
            parameters.shape = { value: 'half_line', options: [] }
            // Remove the brackets from listofpoints
            list_of_points = list_of_points.replace('[', '').replace(']', '')
        } else if (list_of_points.endsWith('.')) {
            parameters.shape = { value: 'segment', options: [] }
            // Remove the dot from listofpoints
            list_of_points = list_of_points.slice(0, -1)
        } else if (list_of_points.startsWith('v')) {
            parameters.shape = { value: 'vector', options: [] }
            // Remove the v from listofpoints
            list_of_points = list_of_points.slice(1)
        }


        // The code is a list of points, without spaces:
        // d=AB => points = ['A', 'B']
        // d=A1B2 => points = ['A1', 'B2']
        // d=PxPy => points = ['Px', 'Py']
        // Use a Regexp to split the code into points.
        code = list_of_points.split(/(?=[A-Z])/)
    } else {
        id = key_code.split('=')[0]
        const [keyString, ...codeString] = key_code.split('=')[1].split(' ')

        if (Object.values(PARSER_TYPE).includes(keyString as PARSER_TYPE) && codeString.length > 0) {
            key = keyString as PARSER_TYPE
            code = codeString.join(' ').split(',').map((item) => item.trim())
        }
    }

    return {
        id,
        key: key,
        code: code,
        parameters
    }
}

/**
 * Parse the second part of the input string:
 * it contains the parameters of the figure (color, width, etc.)
 * @param parameters_code 
 * @returns 
 */
function _parserParametersCode(parameters_code: string): Record<string, IParserParameters> {
    return parameters_code.split(',').reduce<Record<string, IParserParameters>>(
        (acc, cur) => {
            // Parameters code can be:
            // 1. red   => key = 'color', value='red', options=[]
            // 2. red/0.5 => key = 'color', value='red', options=[0.5]
            // 3. w=0.5 => key = 'w', value='0.5', options=[]
            // 4. ! or ... => key = '!', value=true, options=[]

            const [key, ...values] = cur.split('=')

            // if the values are empty, it may be a color or a boolean value.
            if (values.length === 0) {
                if (PARSER_BOOLEAN_VALUES.includes(key)) {
                    acc[key] = {
                        value: true,
                        options: []
                    }
                    return acc
                } else if (key.startsWith('drag')) {
                    const [, param] = key.split(':')
                    acc.drag = {
                        value: param,
                        options: []
                    }
                    return acc

                } else {
                    acc.color = {
                        value: key,
                        options: []
                    }
                    return acc
                }

            }

            const [value, ...options] = values.join('=').split('/')
            acc[key] = { value, options: _parserParametersOptions(options) }
            return acc
        }, {})
}

/**
 * Parse each parameters and split it in <key>:<value> and <options>
 * @param options string[]
 * @returns 
 */
function _parserParametersOptions(options: string[]): IParserOptions[] {
    if (options.length > 0) {
        return options.map((option) => {
            if (option.includes(':')) {
                // DOMAIN
                const [x, y] = option.split(':')
                return { min: parseFloat(x), max: parseFloat(y) }
            } else if (!isNaN(+option)) {
                return +option
            } else if (option.includes('/')) {
                const [numerator, denominator] = option.split('/')
                if (!isNaN(+numerator) && !isNaN(+denominator) && +denominator !== 0) {
                    return parseFloat(numerator) / parseFloat(denominator)
                }
            }

            return option
        })
    }
    return []
}