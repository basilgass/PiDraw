import { Graph, IDraggableConfig } from "./Graph"
import { IParser, IParserParameters, PARSER_TYPE, PARSER_COLOR_VALUES, convertValues, IParserConfig, IParserSettings } from "./parser/parser.common"
import { COORDINATE_SYSTEM, DOMAIN, IGraphConfig, IGraphDisplay, isDOMAIN, XY } from "./pidraw.common"
import { parser_config } from "./parser/parser.config"
import { AbstractFigure } from "./figures/AbstractFigure"
import { LABEL_POSITION } from "./labels/Label"
import { Point } from "./figures/Point"

export class Parser extends Graph {
    #code: IParser[]
    #settings: IParserSettings

    constructor(id: string | HTMLElement, config?: IParserConfig) {
        super(id, {
            tex: config?.tex ?? ((value) => value)
        })

        this.#settings = {}

        // Build the layout using the default values or the parameters
        if (config?.parameters) {
            this.refreshLayout(config.parameters)
        }

        // Define the code to display
        this.#code = []
        if (config?.input) {
            this.#build(config.input)
        }

        return this
    }

    static documentation() {
        return parser_config
    }

    get code() {
        return this.#code
    }

    public refresh(code: string) {
        // Remove every figures
        Object.keys(this.figures).forEach((name) => {
            this.figures[name].element.remove()
        })

        // Reload the figures
        this.#build(code)
    }

    public refreshLayout(code?: string) {
        // Update the configuration
        const layout = this.#parseLayout(code)

        this.config = layout.config
        this.display = layout.display
        this.#settings = layout.settings

        // Update the layout (from the extended Graph class)
        this.updateLayout()
    }

    /**
     * Prepare the code to load
     * @param input Input code to parse and prepare
     * @returns 
     */
    #prepare(input: string): IParser[] {
        // Reset the code.
        // TODO: check if resetting the code with events are correctly removed.
        const data: IParser[] = []

        // Split and filter the inputs
        // - remove empty lines
        // - skip line starting with '$'
        const lines = input
            .split('\n')
            .filter((line) => line.trim() !== '' && !line.startsWith('$'))

        // Define the block variables
        const block: Record<string, IParserParameters> = {}

        // Loop through each lines
        for (const line of lines) {
            // If lines starts with '@', it's a command
            if (line.startsWith('@')) {
                const { key, value } = this.#defineCommand(line)
                block[key] = { value, options: [] }
                continue
            }

            // Parse the line
            const parsedLine = this.#parseLine(line)


            // Add the block data to the parameters.
            parsedLine.parameters = Object.assign(
                parsedLine.parameters,
                block
            )
            data.push(parsedLine)
        }


        return data
    }

    /**
     * Build the figures from the code
     */
    #build(input: string) {
        this.#code = this.#prepare(input)

        const pConfig = parser_config

        // Loop through each code
        this.#code.forEach((item) => {
            let obj: AbstractFigure | undefined
            const graphCreate = this.create

            if (pConfig[item.key]) {
                const { build, create, parameters } = pConfig[item.key]

                // if <parameters> is not empty, it means the figure has specific parameters
                // Check if they are defined in the item.parameters
                if (parameters && parameters.length > 0 && Object.keys(item.parameters).length === 0) {
                    const keys = Object.keys(item.parameters).filter(key => parameters.includes(key))
                    keys.forEach((parameter) => {
                        item.parameters[parameter] = { value: true, options: [] }
                    })
                }

                // Create the object
                // TODO: make it eslint friendly and ts friendly
                if (Object.hasOwn(graphCreate, create)) {
                    try {
                        const config = build(item, this.figures, this.config)
                        if (config) {
                            /* eslint-disable */
                            // @ts-expect-error: create is string and is not 
                            obj = this.create[create](config, item.id)
                            /* eslint-enable */
                        }
                    } catch (e) {
                        // TODO: the build*** function should return an error message
                        console.log(e)

                    }
                }
            }


            // switch (item.key) {
            //     case PARSER_TYPE.POINT:
            //     case PARSER_TYPE.MIDDLE:
            //     case PARSER_TYPE.PROJECTION:
            //     case PARSER_TYPE.INTERSECTION:
            //     case PARSER_TYPE.SYMMETRY:
            //         {
            //             // Prepare the point using the config settings
            //             if (typeof this.#settings.points === 'string' &&
            //                 item.parameters['*'] === undefined &&
            //                 item.parameters.o === undefined &&
            //                 item.parameters.s === undefined
            //             ) {
            //                 item.parameters[this.#settings.points] = { value: true, options: [] }
            //             }
            //             const config = buildPoint(item, this.figures, this.config)

            //             if (config) {
            //                 obj = this.create.point(config, item.id)
            //             }

            //             break
            //         }
            //     case PARSER_TYPE.LINE:
            //     case PARSER_TYPE.MEDIATOR:
            //     case PARSER_TYPE.PERPENDICULAR:
            //     case PARSER_TYPE.PARALLEL:
            //         {
            //             const config = buildLine(item, this.figures, this.config)
            //             if (config) {
            //                 obj = this.create.line(config, item.id)
            //             }
            //             break
            //         }
            //     case PARSER_TYPE.PLOT:
            //         {
            //             const config = buildPlot(item, this.figures, this.config)

            //             if (config && Object.hasOwn(config, 'expression')) {
            //                 obj = this.create.plot(config as IPlotConfig, item.id)
            //             }
            //             break
            //         }
            //     case PARSER_TYPE.PARAMETRIC:
            //         {
            //             const config = buildPlot(item, this.figures, this.config)

            //             if (config && Object.hasOwn(config, 'expressions')) {
            //                 obj = this.create.parametric(config as IParametricConfig, item.id)
            //             }
            //             break
            //         }
            //     case PARSER_TYPE.CIRCLE:
            //         {
            //             const config = buildCircle(item, this.figures, this.config)
            //             if (config) {
            //                 obj = this.create.circle(config as ICircleConfig, item.id)
            //             }
            //             break
            //         }
            //     case PARSER_TYPE.ARC:
            //         {
            //             const config = buildCircle(item, this.figures, this.config)
            //             if (config) {
            //                 obj = this.create.arc(config as IArcConfig, item.id)
            //             }
            //             break
            //         }
            //     case PARSER_TYPE.POLYGON:
            //     case PARSER_TYPE.REGULAR:
            //         {
            //             const config = buildPolygon(item, this.figures, this.config)
            //             if (config) {
            //                 obj = this.create.polygon(config, item.id)
            //             }
            //             break
            //         }
            //     case PARSER_TYPE.FOLLOW:
            //         {
            //             const config = buildFollow(item, this.figures, this.config)

            //             if (config) {
            //                 obj = this.create.follow(config, item.id)
            //             }
            //             break
            //         }
            //     case PARSER_TYPE.FILL_BETWEEN:
            //         {
            //             const config = buildFillBetween(item, this.figures, this.config)

            //             if (config) {
            //                 obj = this.create.fillbetween(config, item.id)
            //             }
            //             break
            //         }
            //     case PARSER_TYPE.RIEMANN:
            //         {
            //             const config = buildRiemann(item, this.figures, this.config)

            //             if (config) {
            //                 obj = this.create.riemann(config, item.id)
            //             }
            //             break
            //         }
            //     case PARSER_TYPE.UNKNOWN:
            //         console.log('Unknown:', item)
            //         break
            // }


            if (obj) {
                // Apply defaults settings to the object
                if (this.#settings.label &&
                    obj instanceof Point &&
                    item.parameters.label === undefined && item.parameters.tex === undefined
                ) {
                    item.parameters.label = { value: true, options: [] }
                }
                if (this.#settings.tex &&
                    obj instanceof Point &&
                    item.parameters.label === undefined && item.parameters.tex === undefined
                ) {
                    item.parameters.tex = { value: true, options: [] }
                }

                if (obj instanceof Point && this.#settings.points === false) {
                    item.parameters['!'] = { value: true, options: [] }
                }

                this.#applyOptions(item.parameters, obj)
            }
        })


    }

    #applyOptions(options: Record<string, IParserParameters>, obj: AbstractFigure) {
        Object.keys(options).forEach((key) => {
            switch (key) {
                // Appearance
                case 'w':
                    obj.stroke(options[key].value as number)
                    break
                case 'ultrathin':
                    obj.stroke(0.5)
                    break
                case 'thin':
                    obj.stroke(0.75)
                    break
                case 'thick':
                    obj.stroke(2.5)
                    break
                case 'ultrathick':
                    obj.stroke(4)
                    break
                case 'color':
                    obj.stroke(options[key].value as string)
                    break
                case 'fill':
                    obj.fill(options[key].value as string)
                    break
                case 'dash':
                    options[key].value === true ?
                        obj.dash() :
                        obj.dash(options[key].value as string)
                    break
                case 'dot':
                    obj.dot()
                    break

                // Visibility
                case 'hide':
                case '!':
                    obj.hide()
                    break
                case '#':
                case 'static':
                    obj.static = options[key].value as boolean
                    break
                case '?':
                    obj.label?.hide()
                    break

                // Label and text
                case 'label':
                case 'tex':
                    obj.addLabel(
                        options[key].value === true ? obj.name : options[key].value as string,
                        key === 'tex',
                        this.toTex
                    )

                    if (obj.label) {
                        const alignement = options[key].options[0] === false ? 'br' : options[key].options[0] as LABEL_POSITION
                        const offsetAsUnits = options[key].options[1] as XY | undefined ?? { x: 0, y: 0 }
                        const offset = {
                            x: offsetAsUnits.x * this.config.axis.x.x,
                            y: -offsetAsUnits.y * this.config.axis.y.y
                        }

                        obj.label.position(
                            alignement,
                            offset
                        )
                    }

                    break

                // Draggable
                case 'drag':
                    // Actually, only points are draggable
                    if (obj instanceof Point) {
                        const dragConfig: IDraggableConfig = { follow: [] };

                        // Check the options
                        [options[key].value as string, ...options[key].options].forEach((dragFollow) => {
                            if (['grid', 'Ox', 'Oy'].includes(dragFollow as string)) {
                                dragConfig.follow?.push(this.follow(dragFollow as string, obj))
                            }

                            if (isDOMAIN(dragFollow)) {
                                const axis = dragFollow.axis ?? 'x'
                                const delta: DOMAIN = this.toPixels(dragFollow, axis)

                                dragConfig.follow?.push(
                                    (x: number, y: number) => {
                                        return {
                                            x: axis === 'x' ? Math.max(delta.min, Math.min(x, delta.max)) : x,
                                            y: axis === 'y' ? Math.max(delta.min, Math.min(y, delta.max)) : y
                                        }
                                    }
                                )
                            }

                            if (Object.hasOwn(this.figures, dragFollow as string)) {
                                const figToFollow = this.figures[dragFollow as string]

                                dragConfig.follow?.push((x: number, y: number) => figToFollow.follow(x, y))
                            }
                        })

                        // Move the point to the interactive layer
                        this.layers.interactive.add(obj.element)
                        // Resize the draggable point

                        obj.asCircle(20)
                            .fill('white/0.8')

                        this.draggable(obj, dragConfig)
                    }
                    break
            }
        })
    }

    #defineCommand(command: string): { key: string, value: boolean } {
        // A command is: @<begin|end>:<key>

        // Remove the '@' and split the command into key and value
        const [value, key] = command.slice(1).split(':')

        // Return the key and value
        return { key, value: value === 'begin' }

    }

    #parseLayout(code?: string): { config: IGraphConfig, display: IGraphDisplay, settings: IParserSettings } {
        // Split the code into key and parameters
        const parameters = this.#parseParameters(code)

        // Define the configuration
        const ppu = parameters.ppu ? parseFloat(parameters.ppu.value as string) : 50
        const dx = isDOMAIN(parameters.x.value) ? Math.abs(parameters.x.value.max - parameters.x.value.min) : 16
        const dy = isDOMAIN(parameters.y.value) ? Math.abs(parameters.y.value.max - parameters.y.value.min) : 16

        const width = dx * ppu
        const height = dy * ppu
        const origin = {
            x: (isDOMAIN(parameters.x.value) ? -parameters.x.value.min : 8) * ppu,
            y: (isDOMAIN(parameters.y.value) ? parameters.y.value.max : 8) * ppu
        }

        const system = COORDINATE_SYSTEM.CARTESIAN_2D
        const axisConfig = {
            x: { x: ppu, y: 0 },
            y: { x: 0, y: -ppu }
        }

        // Display options
        const grid = parameters.grid ? true : false
        const axis = parameters.axis ? true : false
        const subgrid = parameters.subgrid ? parseFloat(parameters.subgrid.value as string) : 0

        // Parser specific settings
        const settings: IParserSettings = {
            label: parameters.label ? true : false,
            tex: parameters.tex ? true : false,
            points: parameters['no-points'] ? false : parameters.points ? parameters.points.value as 'o' | '*' | 's' : 'o'
        }

        return {
            config: {
                width,
                height,
                origin,
                system,
                axis: axisConfig,
            },
            display: {
                grid,
                subgrid,
                axis
            },
            settings
        }
    }

    #parseLine(line: string): IParser {
        // Split the line into key_code and parameters at '->'
        const [key_code, parameters_code] = line.split('->')

        const config = this.#parseKeyCode(key_code)

        // Parse the parameters
        config.parameters = Object.assign(
            config.parameters,
            this.#parseParameters(parameters_code)
        )

        return config

    }

    #parseKeyCode(key_code: string): IParser {

        // There are 3 possibilities for the key_code:
        // 1. A(3,4) => id='A', key=POINT, code= ['3','4']
        // 2. d=AB => id='AB', key=LINE, code=['A', 'B']
        // 3. d=<key> <code> => id='d', key='<key>' code

        // Extract the point (no = sign). The id is before the '(' and the code is between '(' and ')'
        if (key_code.match(/^[A-Z][0-9]*\(.*\)$/)) {
            return this.#parseKeyCodePoint(key_code)
        }

        // Extract the plot or parametric function
        if (key_code.match(/^[a-z][0-9]*\([x|t]\)/)) {
            return this.#parseKeyCodePlot(key_code)
        }

        // Extract the line (with = sign). The id is before the '=' and the code is after '='
        // This is a special version (no spaces) and should be checked first
        if (key_code.includes('=') && !key_code.includes(' ')) {
            return this.#parseKeyCodeLine(key_code)
        }

        // Extract the usual key code: <id>=<key> <code>
        const [id, ...data] = key_code.split('=')
        const [key, ...code] = data.join('=').split(' ')


        if (Object.values(PARSER_TYPE).includes(key as PARSER_TYPE) && code.length > 0) {
            return {
                id,
                key: key as PARSER_TYPE,
                code: code.join(' ').split(','), // Split the code into an array of strings
                parameters: {}
            }
        }

        // Default to unknown
        return {
            id: '',
            key: PARSER_TYPE.UNKNOWN,
            code: [code.join(' ')],
            parameters: {}
        }
    }

    #parseKeyCodePoint(key_code: string): IParser {
        // Extract the point (no = sign). The id is before the '(' and the code is between '(' and ')'
        const id = key_code.split('(')[0]
        const code = key_code.split('(')[1].split(')')[0].split(',')
        const parameters = this.#parseParameters(key_code.split(')')[1])

        return {
            id,
            key: PARSER_TYPE.POINT,
            code,
            parameters
        }
    }

    #parseKeyCodeLine(key_code: string): IParser {
        // Extract the line (with = sign). The id is before the '=' and the code is after '='
        const [id, ...datas] = key_code.split('=')
        let data = datas.join('=')

        const parameters: Record<string, IParserParameters> = {}

        if (data.startsWith('v')) {
            data = data.slice(1)
            parameters.shape = { value: 'vector', options: [] }
        } else if (data.endsWith('.')) {
            data = data.slice(0, -1)
            parameters.shape = { value: 'segment', options: [] }
        } else if (data.endsWith('[')) {
            data = data.slice(0, -1)
            parameters.shape = { value: 'half_line', options: [] }
        } else {
            parameters.shape = { value: 'line', options: [] }
        }

        const code = data.split(/(?=[A-Z])/)

        return {
            id,
            key: PARSER_TYPE.LINE,
            code,
            parameters
        }
    }

    #parseKeyCodePlot(key_code: string): IParser {
        // Extract the plot or parametric function
        const [id_xt, data] = key_code.split('=')

        // Remove the (x) or (t) from the id
        const id = id_xt.split('(')[0]

        // Determine the type of the parser (plot or parametric)
        const key = key_code.includes('(x)=') ? PARSER_TYPE.PLOT : PARSER_TYPE.PARAMETRIC

        // Extract the expression and options
        const [expression, ...options] = data.split(',')

        // Define the code
        const code = key === PARSER_TYPE.PLOT ?
            [expression] :
            [expression, options.shift() ?? '']

        // Define the parameters
        const parameters = {
            samples: { value: options.filter(x => x.startsWith('@'))[0] ?? 100, options: [] },
            domain: { value: options.filter(x => x.includes(':'))[0] ?? {}, options: [] },
            image: { value: options.filter(x => x.includes(':'))[1] ?? {}, options: [] },
        }

        return {
            id,
            key,
            code,
            parameters
        }
    }

    #parseParameters(parameters_code?: string): Record<string, IParserParameters> {
        if (parameters_code === undefined) { return {} }

        // Parameters value
        const parameters: Record<string, IParserParameters> = {}

        // Split the parameters into an array of strings
        const data = parameters_code.split(',')


        // Each parameter is <key>=<value>/<options>/...
        // Some parameters are boolean (no = sign)
        data.forEach((parameter) => {
            if (!parameter.includes('=')) {
                // Might be a boolean value or a color
                const [color,] = parameter.split('/')
                if (PARSER_COLOR_VALUES.includes(color)) {
                    parameters.color = { value: parameter, options: [] }
                } else {
                    parameters[parameter] = { value: true, options: [] }
                }

            } else {
                const [key, ...values] = parameter.split('=')
                const options = convertValues(values.join('=').split('/'), {})

                const value = options.shift() ?? true

                // Special case if value is a color and options is of lenth 1
                if (PARSER_COLOR_VALUES.includes(value as string) && options.length === 1) {
                    parameters[key] = { value: `${value as string}/${options[0] as number}`, options: [] }
                } else {
                    parameters[key] = { value, options }
                }
            }
        })

        // Parse the parameters
        return parameters
    }
}
