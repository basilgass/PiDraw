import { NumExp } from "./Calculus"
import { AbstractFigure } from "./figures/AbstractFigure"
import { COORDINATE_SYSTEM, DOMAIN, IGraphConfig, IGraphConstructorConfig, IGraphDisplay, isDOMAIN, XY } from "./pidraw.common"

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
}

export const parser_documentation = {
    point: {
        description: 'Create a point',
        code: 'A(3,4)',
        parameters: ['drag', 'drag:grid', 'drag:axis', 'drag:x', 'drag:y', 'drag:<figure>']
    },
    mid: {
        description: 'Create the middle of two points',
        code: 'A=mid <point>,<point>',
        parameters: []
    },
    projection: {
        description: 'Create the projection of a point on a line',
        code: 'A=proj <point>,<line>',
        parameters: []
    },
    intersection: {
        description: 'Create the intersection of two lines',
        code: 'A=inter <line>,<line>',
        parameters: []
    },
    symmetry: {
        description: 'Create the symmetry of a point',
        code: 'A=sym <point>,<point|line>',
        parameters: []
    },
    line: {
        description: 'Create a line, a half line or a segment',
        code: 'd=<line> | <line>[ | <line>.',
        parameters: ['dash', 'dot']
    },
    vector: {
        description: 'Create a vector',
        code: 'd=v<line>',
        parameters: []
    },
    perpendicular: {
        description: 'Create the perpendicular of a line from a point',
        code: 'd=perp <line>,<point>',
        parameters: []
    },
    parallel: {
        description: 'Create a parallel line from a point',
        code: 'd=para <line>,<point>',
        parameters: []
    },
    mediator: {
        description: 'Create the mediator of two points',
        code: 'd=med <point>,<point>',
        parameters: []
    },
    tangent: {
        description: 'Create a tangent line from a point to a circle',
        code: 'd=tan <point>,<point>',
        parameters: []
    },
    bisector: {
        description: 'Create the bisector of an angle',
        code: 'd=bis <point>,<point>,<point>',
        parameters: []
    },
    circle: {
        description: 'Create a circle',
        code: 'c=circ <point>,<radius>',
        parameters: []
    },
    arc: {
        description: 'Create an arc',
        code: 'c=arc <point>,<point>,<point>[,<number>]',
        parameters: []
    },
    plot: {
        description: 'Plot a function',
        code: 'f(x)=[f=plot ]<function>[@<number>,<domain>,<image>]',
        parameters: []
    },
    parametric: {
        description: 'Plot a parametric function',
        code: 'f(t)=[f=parametric ]<function_x>,<function_y>[,<domain>]',
        parameters: []
    },
    polygon: {
        description: 'Create a polygon',
        code: 'p=poly <point>,<point>,<point>,...',
        parameters: []
    },
    regular: {
        description: 'Create a regular polygon',
        code: 'p=reg <center>,<radius>,<sides>',
        parameters: []
    }
}

export type IParserOptions = (string | number | boolean | XY | DOMAIN | AbstractFigure)
export interface IParserParameters {
    value: IParserOptions,
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
    'dash', 'dot',
    'tex', 'label', // TeX or Text label
    'axis', 'grid' // Parameter for the layout
]

/**
 * Parse the input string and return an array of IParser.
 * @param input The input string to parse.
 * @returns An array of IParser.
 */
export function graphParser(input: string): IParser[] {
    const output: IParser[] = []

    const lines = input
        .split('\n')
        .filter((line) => line.trim() !== '')

    let objIsStatic = false
    for (const line of lines) {
        // If lines starts with '@', it's a command
        if (line.startsWith('@')) {
            if (line.startsWith('@begin:static')) { objIsStatic = true }
            if (line.startsWith('@end:static')) { objIsStatic = false }
            continue
        }

        // Split the line into key_code and parameters at '->'
        const [key_code, parameters_code] = line.split('->')

        // Split the code into key and code at '='
        const result = _parseKeyCode(key_code)

        // Split the parameters into key and value at ','
        if (parameters_code !== undefined) {
            result.parameters.static = { value: !!objIsStatic, options: [] }
            result.parameters = Object.assign(result.parameters, _parserParametersCode(parameters_code))
        }

        output.push(result)
    }

    return output
}

export function graphLayoutParser(input: string, customConfig?: IGraphConstructorConfig): { config: IGraphConfig, display: IGraphDisplay } {

    const config: IGraphConstructorConfig = Object.assign({
        width: 800,
        height: 600,
        origin: { x: 400, y: 300 },
        system: COORDINATE_SYSTEM.CARTESIAN_2D,
        ppu: 50,
        display: {
            grid: false,
            subgrid: 0,
            axis: false
        },
        tex: (value: string): string => value
    }, customConfig)

    const parameters = _parserParametersCode(input)

    if (parameters.ppu) {
        config.ppu = parseFloat(parameters.ppu.value as string)
    }

    const ppu = config.ppu as unknown as number

    // Determine the axis limits
    if (parameters.x && config.origin) {
        const xDimension = _getUnitDimension(parameters.x.value as string)
        config.width = xDimension.width * ppu
        config.origin.x = xDimension.origin * ppu
    }
    if (parameters.y && config.origin) {
        const yDimension = _getUnitDimension(parameters.y.value as string)
        config.height = yDimension.width * (config.ppu as unknown as number)
        config.origin.y = yDimension.origin * (config.ppu as unknown as number)
    }

    // Display the grid
    if (parameters.grid && config.display) { config.display.grid = true }

    // Display the axis
    if (parameters.axis && config.display) { config.display.axis = true }

    return {
        config: {
            width: config.width as unknown as number,
            height: config.height as unknown as number,
            origin: config.origin as unknown as XY,
            system: config.system as unknown as COORDINATE_SYSTEM,
            axis: {
                x: { x: ppu, y: 0 },
                y: { x: 0, y: -ppu },
                z: { x: -ppu / Math.sqrt(2), y: ppu / Math.sqrt(2) }
            }
        },
        display: config.display as unknown as IGraphDisplay
    }
}

function _getUnitDimension(value: string): { width: number, origin: number } {
    if (value) {
        const { min, max } = _parserParametersOptions([value] as string[])[0] as DOMAIN

        if (!isNaN(+min) && !isNaN(+max)) {
            // Determiner the width of the graph
            return {
                width: Math.abs(max - min),
                origin: Math.abs(min)
            }
        }
    }

    // Default to 20 unites
    return { width: 20, origin: 10 }
}

/**
 * Parse the first part of the input string:
 * <key>=<code>-><parameters>
 * [key] is the id of the figure
 * [code] is the type of the figure
 * [parameters] is the parameters of the figure
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

        // Code should be a list of numbers (x,y)
        // TODO: it can also be a list of expressions (like 2/3 or 2pi)
        // TODO: it can also be a list of points (like A.x,B.y)

    } else if (key_code.includes('(x)=')) {
        let expression_and_options: string
        [id, expression_and_options] = key_code.split('=')

        key = PARSER_TYPE.PLOT
        const [expression, ...options] = expression_and_options.split(',')

        // Define the expression.
        code = [expression]

        // Define the options.
        const opts = _parserParametersOptions(options)

        if (opts.length > 0) {
            // The sample is the first number value.
            const samples = opts.filter((value) => typeof value === 'number')[0]
            if (samples) { parameters.samples = { value: samples as number, options: [] } }

            // The domain is the first DOMAIN value.
            const domain_image = opts.filter((value) => isDOMAIN(value))
            if (domain_image.length > 0) {
                parameters.domain = { value: domain_image[0] as DOMAIN, options: [] }
            }

            // The image is the second DOMAIN value.
            if (domain_image.length > 1) {
                parameters.image = { value: domain_image[1] as DOMAIN, options: [] }

            }
        }

    } else if (key_code.includes('(t)=')) {
        let expression_and_options: string
        [id, expression_and_options] = key_code.split('=')

        key = PARSER_TYPE.PARAMETRIC
        const [expr1, expr2, ...options] = expression_and_options.split(',')

        // Define the expression.
        code = [expr1, expr2]

        // Define the options.
        const opts = _parserParametersOptions(options)

        if (opts.length > 0) {
            // The sample is the first number value.
            const samples = opts.filter((value) => typeof value === 'number')[0]
            if (samples) { parameters.samples = { value: samples as number, options: [] } }

            // The domain
            const domain = opts.filter((value) => isDOMAIN(value))[0]
            if (domain) {
                parameters.domain = { value: domain as DOMAIN, options: [] }
            }

        }
    } else if (key_code.includes('=') && !key_code.includes(' ')) {
        // Possibilities:
        // 1. d=AB => id='d', key=LINE, code=['A', 'B']
        // 2. d=AB. => id='d', key=LINE, code=['A', 'B']
        // 3. d=[AB[ => id='d', key=LINE, code=['A', 'B']
        // 4. d=vAB => id='d', key=LINE, code=['A', 'B']
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
 * <key>=<code>-><parameters>
 * <parameters> is a list of <options> separated by ','
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
                    // Default to a color.
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
 * Parse each parameters and split it in <key>=<value> and <options>
 * @param options string[]
 * @returns 
 */
function _parserParametersOptions(options: string[]): IParserOptions[] {
    if (options.length > 0) {
        return options.map((option) => {
            if (option.includes(':')) {
                // DOMAIN
                const [a, b] = option.split(':')
                return {
                    min: _parseNumber(a),
                    max: _parseNumber(b)
                }

            } else if (option.includes(';')) {
                // COORDINATE
                const [x, y] = option.split(';')
                return {
                    x: _parseNumber(x),
                    y: _parseNumber(y)
                }

            } else if (!isNaN(+option)) {
                return +option
            } else if (option.startsWith('@')) {
                return +option.slice(1)
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

function _parseNumber(value: string): number {
    return isNaN(+value) ? new NumExp(value).evaluate() : parseFloat(value)
}