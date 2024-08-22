import { Graph, IDraggableFollow } from "./Graph"
import { IParserParameters, PARSER_TYPE, IParserConfig, IParserSettings, PARSER_COLOR_VALUES } from "./parser/parser.common"
import { COORDINATE_SYSTEM, DOMAIN, IGraphConfig, IGraphDisplay, isDOMAIN, XY } from "./pidraw.common"
import { parser_config } from "./parser/parser.config"
import { AbstractFigure } from "./figures/AbstractFigure"
import { LABEL_POSITION } from "./labels/Label"
import { Point } from "./figures/Point"
import { PiParse } from "piparser/lib/PiParse"
import type { PARSER } from "piparser/lib/PiParserTypes"

export const PARSER_PARAMETERS_KEYS = [
    'ppu', 'x', 'y', 'grid', 'axis', 'label', 'tex', 'points', 'no-points', 'subgrid'
]

// TODO: intersection of a line and a circle
// TODO: prevent creation of too many markers...
export class Draw extends Graph {
    #code: PARSER[]
    #settings: IParserSettings
    #parser: PiParse

    constructor(id: string | HTMLElement, config?: IParserConfig) {
        super(id, {
            tex: config?.tex ?? ((value) => value)
        })

        // Set the parser
        this.#parser = new PiParse({
            formatter: (line: string) => this.#parseKeyCode(line),
            keys: PARSER_PARAMETERS_KEYS,
            splitter: {
                main: '->',
                entry: ',',
                parameter: '/'
            }
        })

        this.#settings = {}

        // Build the layout using the default values or the parameters
        if (config?.parameters) {
            this.refreshLayout(config.parameters)
        }

        // Define the code to display
        this.#code = []
        if (config?.code) {
            this.#build(config.code)
        }

        return this
    }

    static documentation() {
        return parser_config
    }

    get code() {
        return this.#code
    }

    /**
     * Refresh the code to display
     * @param code Code to parse and display
     */
    public refresh(code: string) {
        // Remove every figures
        this.clear()

        // Reload the figures
        this.#build(code)
    }

    /**
     * Refresh the layout
     * @param code Layout code to parse
     */
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
    #prepare(input: string): PARSER[] {
        // Reset the code.
        // TODO: check if resetting the code with events are correctly removed.
        const data: PARSER[] = []

        // Split at \n => lines: string[]
        // Filter the inputs
        // - remove empty lines
        // - trim each lines.
        // - skip line starting with '$'
        const lines: string[] = input
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.trim() !== '' && !line.startsWith('$'))

        // Define the block variables
        // A block variable is a command that will be applied to the next lines, until the command is cleared.
        const block: Record<string, IParserParameters> = {}

        // Loop through each lines
        for (const line of lines) {

            // If lines starts with '@', it's a command
            // Assign the command to the block
            // Until the command is cleared, the block will be applied to the next lines.
            if (line.startsWith('@')) {
                const { key, value } = this.#defineCommand(line)
                block[key] = { value, options: [] }
                continue
            }

            // Parse the line
            // Refactor a line for special cases:
            // - A(3,4) => A=pt 3,4
            // - d=AB => d=line A,B
            // - d=AB. or d=[AB] => d=segment A,B
            // - d=AB[ or d=[AB[ => d=halfline A,B
            // - d=vAB => d=vec A,B
            // - p(x)=x^2 => p=plot x^2
            const parsedLine = this.#parser.parse(line)

            // Add the block data to the parameters.
            parsedLine.parameters = Object.assign(
                parsedLine.parameters,
                block
            )

            data.push(parsedLine)
        }

        return data
    }

    #uniqueName(name: string): string {
        let newName = name
        let i = 1
        while (this.figures[newName]) {
            newName = `${name}_${i}`
            i++
        }
        return newName
    }
    /**
     * Build the figures from the code
     */
    #build(input: string) {
        this.#code = this.#prepare(input)
        const pConfig = parser_config
        const graphCreate = this.create

        // Loop through each code
        this.#code.forEach((item) => {
            // Determine the id of the figure.
            item.name = this.#uniqueName(item.name)

            let obj: AbstractFigure | undefined
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
                            obj = this.create[create](config, item.name)
                            /* eslint-enable */
                        }
                    } catch (e) {
                        // TODO: the build*** function should return an error message
                        console.log(e)

                    }
                }
            }

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
                case 'mark':
                    obj.mark(
                        options[key].value as string,
                        options[key].options as (number | string)[]
                    )
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

                // Placement
                case 'move':
                    obj.move(options[key].value as XY)
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
                    this.#applyDrag(obj, key, options)
                    break

                default: {
                    // Maybe it's a color
                    if (PARSER_COLOR_VALUES.includes(key)) {
                        obj.stroke(key)
                    }
                }
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

        // const parameters = PiParseParameters(code)
        const parameters = this.#parser.parameters(code ?? '', PARSER_PARAMETERS_KEYS)

        // Define the configuration
        const ppu = parameters.ppu ? parseFloat(parameters.ppu.value as string) : 50
        const xDomain = parameters.x && isDOMAIN(parameters.x.value) ? parameters.x.value : { min: -8, max: 8 }
        const yDomain = parameters.y && isDOMAIN(parameters.y.value) ? parameters.y.value : { min: -8, max: 8 }
        const dx = Math.abs(xDomain.max - xDomain.min)
        const dy = Math.abs(yDomain.max - yDomain.min)


        const width = dx * ppu
        const height = dy * ppu
        const origin = {
            x: -xDomain.min * ppu,
            y: yDomain.max * ppu
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

    #parseKeyCode(key_code: string): string {

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

        return key_code
    }

    // TO BE MOVED TO BUILD_POINT
    #parseKeyCodePoint(key_code: string): string {
        // Extract the point (no = sign). The id is before the '(' and the code is between '(' and ')'
        const id = key_code.split('(')[0]
        const code = key_code.split('(')[1].split(')')[0].split(',')
        // const parameters = this.#parseParameters(key_code.split(')')[1])

        return `${id}=pt ${code[0]},${code[1]}`
    }

    // TO BE MOVED TO BUILD_LINE
    #parseKeyCodeLine(key_code: string): string {
        // Extract the line (with = sign). The id is before the '=' and the code is after '='
        const [id, ...datas] = key_code.split('=')
        let data = datas.join('=')

        // Determine the shape of the line
        // vAB => vector AB
        // AB. => segment AB
        // [AB] => segment AB
        // [AB[ => half line AB
        // AB[ => half line AB
        // [AB => half line AB
        // AB => line AB

        // prefix can be v or [ or null
        let prefix: string | null = data[0]
        if (prefix !== 'v' && prefix !== '[') { prefix = null }

        // suffix can be ., ], [ or null
        let suffix: string | null = data[data.length - 1]
        if (suffix !== '.' && suffix !== ']' && suffix !== '[') { suffix = null }

        let shape = 'line'
        if (prefix === 'v' && suffix === null) {
            data = data.slice(1)
            shape = 'vec'
        } else if (
            (prefix === null && suffix === '.') ||
            (prefix === '[' && suffix === ']')
        ) {
            if (prefix === '[') { data = data.slice(1) }
            data = data.slice(0, -1)
            shape = 'seg'
        } else if (
            (prefix === '[' && suffix === '[') ||
            (prefix === null && suffix === '[') ||
            (prefix === '[' && suffix === null)
        ) {
            if (prefix === '[') { data = data.slice(1) }
            if (suffix === '[') { data = data.slice(0, -1) }

            shape = 'ray'
        }

        const code = data.split(/(?=[A-Z])/)

        return `${id}=${shape} ${code[0]},${code[1]}`
    }

    // TO BE MOVED TO BUILD_PLOT
    #parseKeyCodePlot(key_code: string): string {
        // Extract the plot or parametric function
        const [id_xt, data] = key_code.split('=')

        // Remove the (x) or (t) from the id
        const id = id_xt.split('(')[0]

        // Determine the type of the parser (plot or parametric)
        const key = key_code.includes('(x)=') ? PARSER_TYPE.PLOT : PARSER_TYPE.PARAMETRIC


        return `${id}=${key} ${data}`
    }

    #applyDrag(obj: AbstractFigure, key: string, options: Record<string, IParserParameters>) {

        // TODO: making a drag element: create the interactive object

        // Actually, only points are draggable
        if (obj instanceof Point) {
            const dragConfigInit: IDraggableFollow[] = []
            const dragConfig: IDraggableFollow[] = []

            const interactive = new Point(this.rootSVG, obj.name + '_drag', {
                coordinates: { x: 0, y: 0 }
            })
            interactive.pixels = obj.pixels
            interactive.asCircle(30).fill('white/0.8')
            this.layers.interactive.add(interactive.element)

            // Check the options
            // - grid
            // - Ox
            // - Oy
            // - DOMAIN / IMAGE
            const dragOptions = [options[key].value as string, ...options[key].options]
            dragOptions.forEach((dragFollow) => {
                if (['grid', 'Ox', 'Oy'].includes(dragFollow as string)) {
                    dragConfigInit.push(this.follow(dragFollow as string, obj))
                }

                if (isDOMAIN(dragFollow)) {
                    const axis = dragFollow.axis ?? 'x'
                    const delta: DOMAIN = this.toPixels(dragFollow, axis)

                    dragConfigInit.push(
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
                    dragConfig.push((x: number, y: number) => figToFollow.follow(x, y))
                }
            })

            // Move the point to the interactive layer
            // this.layers.interactive.add(obj.element)
            // Resize the draggable point
            // obj.asCircle(20)
            //     .fill('white/0.8')

            this.draggable(interactive,
                obj,
                {
                    follow: [
                        ...dragConfigInit,
                        ...dragConfig
                    ]
                }
            )
        }
    }
}
