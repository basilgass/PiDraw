import {Graph, type IDraggableConfig, type IDraggableFollow} from "./Graph"
import {
    type IParserConfig,
    type IParserParameters,
    type IParserSettings,
    PARSER_COLOR_VALUES
} from "./parser/parser.common"
import {COORDINATE_SYSTEM, type IFigureAnimation, isDOMAIN, type XY} from "./pidraw.common"
import {layoutGeometry} from "./calculus"
import {parser_config} from "./parser/parser.config"
import {applyAxisOption} from "./figures/Axis/Axis.parser"
import {applyGridOption} from "./figures/Grid/Grid.parser"
import {buildLayout, type ILayout, LAYOUT_KEYS} from "./parser/buildLayout"
import {parseLabelText} from "./figures/Label/Label.parser"
import {applyArcOption} from "./figures/Arc/Arc.parser"
import {applyBezierOption} from "./figures/Bezier/Bezier.parser"
import {parseParametricShorthand} from "./figures/Parametric/Parametric.parser"
import {parsePlotShorthand} from "./figures/Plot/Plot.parser"
import {applyPointShapeOption, parsePointShorthand} from "./figures/Point/Point.parser"
import {parseLineShorthand} from "./figures/Line/Line.parser"
import {AbstractFigure} from "./figures/AbstractFigure/AbstractFigure"
import type {LABEL_POSITION} from "./figures/Label/Label.types"
import {Point} from "./figures/Point/Point"
import {type PARSER, PiParse} from "piparser"
import {getLoopStyle, LOOP_STYLE} from "./Animate"
import {InvalidArgumentError, ParseError} from "./errors"

/** The names of the axes of the graph, which no figure can have. */
const AXIS_NAMES = ['Ox', 'Oy']

/** The names of the parameters of the graph (see `buildLayout`). */
export const PARSER_PARAMETERS_KEYS = [...LAYOUT_KEYS]

// TODO: intersection of a line and a circle
/**
 * Reads the code of a drawing and builds it in a {@link Graph}, which is the one that draws, updates and exports it.
 */
export class Draw {
    /** The graph that the code is drawn in. */
    readonly graph: Graph

    protected _parser: PiParse
    protected _settings: IParserSettings

    constructor(id: string | HTMLElement, config?: IParserConfig) {
        // Without a converter the text of an HTML label is written as text, never read as HTML.
        this.graph = new Graph(id, config?.tex === undefined ? {} : {tex: config.tex})

        // Set the parser
        this._parser = new PiParse({
            formatter: (line: string) => this._parseKeyCode(line),
            keys: PARSER_PARAMETERS_KEYS,
            splitter: {
                main: '->',
                entry: ',',
                parameter: '/'
            }
        })

        this._settings = {}

        // Build the layout using the default values or the parameters
        this.refreshLayout(config?.parameters)

        // Define the code to display
        this._code = []
        if (config?.code) {
            this._build(config.code)
        }

        return this
    }

    protected _code: PARSER[]

    get code() {
        return this._code
    }

    static documentation() {
        return parser_config
    }

    /**
     * Refresh the code to display
     * @param code Code to parse and display
     */
    refresh(code: string) {
        // Remove every figures
        this.graph.clear()

        // Reload the figures
        this._build(code)
    }

    /**
     * Refresh the layout: the part of the coordinate system that is drawn, the size of a unit, the axes, the grid and the defaults of the
     * figures.
     * @param code Parameters to read (`x=-10:10,axis,grid=2->red`, see `buildLayout`). The default layout without them.
     * @throws ParseError if a parameter does not exist or is not valid. The layout is then left as it was.
     */
    refreshLayout(code?: string) {
        const layout = buildLayout(code ?? '', this._parser)

        // Update the layout (from the extended Graph class)
        this.graph.updateLayout({
            ...layoutGeometry({...layout.window, unit: layout.unit}),
            system: COORDINATE_SYSTEM.CARTESIAN_2D
        }, layout.display)
        this._settings = layout.defaults
        this._applyLayoutOptions(layout.options)
    }

    /** Give the options of the parameters (`axis->red`, `grid->subgrid=4`) to the axes and to the grid. */
    protected _applyLayoutOptions(options: ILayout['options']): void {
        const targets: [AbstractFigure | null, ILayout['options']['grid']][] = [
            [this.graph.drawnAxes.x, options.x],
            [this.graph.drawnAxes.y, options.y],
            [this.graph.mainGrid, options.grid]
        ]

        for (const [figure, own] of targets) {
            if (figure !== null && Object.keys(own).length > 0) {
                this._applyOptions(own, figure)
            }
        }
    }

    protected _applyDrag(obj: AbstractFigure, key: string, options: Record<string, IParserParameters>) {
        // Actually, only points are draggable
        if (obj instanceof Point) {
            const interactive = this.graph.create.point({x: 0, y: 0}, obj.name + '_drag')

            interactive.pixels = obj.pixels
            interactive.asCircle(30).fill('white/0.8')
            this.graph.layers.interactive.add(interactive.element)

            this.graph.draggable(interactive, {target: obj, ...this._dragConfig([options[key].value, ...options[key].options])})
        }
    }

    /**
     * The limits of a drag from the values of its option (`drag=grid`, `drag=Ox`, `drag=Oy`, `drag=-2:3`, `drag=f` for a figure `f`), which
     * can be given together. Two domains of the same axis limit the point to the part they share. A value that means none of these is ignored.
     */
    protected _dragConfig(values: unknown[]): IDraggableConfig {
        const config: IDraggableConfig = {}
        const follow: IDraggableFollow[] = []

        for (const value of values) {
            if (value === 'grid') {
                config.grid = true
            } else if (value === 'Ox') {
                config.along = 'x'
            } else if (value === 'Oy') {
                config.along = 'y'
            } else if (isDOMAIN(value)) {
                const axis = value.axis ?? 'x'
                const own = config.bounds?.[axis]

                config.bounds = {
                    ...config.bounds,
                    [axis]: {min: Math.max(own?.min ?? -Infinity, value.min), max: Math.min(own?.max ?? Infinity, value.max)}
                }
            } else if (typeof value === 'string' && Object.hasOwn(this.graph.figures, value)) {
                follow.push(this.graph.figures[value])
            }
        }

        if (follow.length > 0) {
            config.follow = follow
        }

        return config
    }

    /**
     * The point named by the option `from` or `to` of an animation.
     * @throws InvalidArgumentError if the name is not the one of a point of the drawing.
     */
    protected _animationPoint(name: unknown, option: 'from' | 'to'): Point {
        const figure = typeof name === 'string' && Object.hasOwn(this.graph.figures, name) ? this.graph.figures[name] : undefined

        if (!(figure instanceof Point)) {
            throw new InvalidArgumentError(`The option ${option}=${String(name)} of an animation must be the name of a point of the drawing`)
        }

        return figure
    }

    protected _applyOptions(options: Record<string, IParserParameters>, obj: AbstractFigure) {

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
                case 'color': {
                    const value = options[key].value as string + (options[key].options.length > 0 ? `/${options[key].options[0] as string}` : '')
                    obj.stroke(value)
                    break
                }
                case 'fill': {
                    const value = options[key].value as string + (options[key].options.length > 0 ? `/${options[key].options[0] as string}` : '')
                    obj.fill(value)
                    break
                }
                case 'dash': {
                    if (options[key].value === true) {
                        obj.dash()
                    } else {
                        obj.dash(options[key].value as string)
                    }
                    break
                }
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
                    obj.hide()
                    break
                case '!':
                    // Hide all elements, except the label
                    obj.element.children().forEach((child) => {
                        if (child.attr('id') !== `${obj.name}-label`) {
                            child.hide()
                        }
                    })
                    // obj.label?.show()
                    break
                case '_':
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
                case 'scale':
                    obj.scale(options[key].value as XY)
                    break

                // Label and text
                case 'label':
                case 'tex': {

                    let value = obj.name // default value

                    if (typeof options[key].value === "string") {
                        value = options[key].value // custom value
                    }

                    // Convert to indice for TeX label
                    // [a-zA-Z][0-9] is converted to [a-zA-Z]_[0-9]
                    if (key === 'tex' && value.length === 2 && !isNaN(+value[1])) {
                        value = value[0] + "_" + value[1]
                    }

                    // Create the label
                    obj.addLabel(
                        parseLabelText(value, obj),
                        key === 'tex',
                        this.graph.toTex
                    )

                    if (obj.label) {
                        // Without a position, the figure keeps its own (`br`, or the one it chooses from where the label lies).
                        const given = options[key].options[0]
                        const alignement = typeof given === 'boolean' ? undefined : given as LABEL_POSITION | undefined

                        const offsetAsUnits = options[key].options[1] as XY | undefined ?? {x: 0, y: 0}
                        const offset = {
                            x: offsetAsUnits.x * this.graph.config.axis.x.x,
                            y: -offsetAsUnits.y * this.graph.config.axis.y.y
                        }

                        const rotate = options[key].options[2] as number | boolean | undefined

                        obj.label.autoRotate = rotate === true

                        obj.label.position(
                            alignement,
                            offset,
                            typeof rotate === "number" ? rotate : 0
                        )
                    }

                    break
                }

                // Draggable
                case 'drag':
                    // TODO: enable multiple options drag=x/0;3|y/-1:4
                    this._applyDrag(obj, key, options)
                    break

                // Animation
                case 'animate': {
                    const animate: IFigureAnimation = {
                        from: null,
                        to: null,
                        duration: 2,
                        delay: 0,
                        easing: 'linear',
                        loop: LOOP_STYLE.NONE,
                    }

                    // Whether the figure needs a start and an end point is for the figure to say (obj.animate below).
                    if (Object.hasOwn(options, 'from')) {
                        animate.from = this._animationPoint(options.from.value, 'from')
                    }

                    if (Object.hasOwn(options, 'to')) {
                        animate.to = this._animationPoint(options.to.value, 'to')
                    }

                    if (Object.hasOwn(options, 'duration')) {
                        animate.duration = options.duration.value as number
                    }

                    if (Object.hasOwn(options, 'delay')) {
                        animate.delay = options.delay.value as number
                    }

                    if (Object.hasOwn(options, 'easing')) {
                        animate.easing = options.easing.value as 'linear' | 'inOut'
                    }

                    if (Object.hasOwn(options, 'loop')) {
                        animate.loop = getLoopStyle(options.loop.value as string | number | boolean)
                    }

                    obj.animate = animate

                    break
                }

                // Shape of a Bézier curve
                case 'close':
                    applyBezierOption(obj, key, options[key].value)
                    break

                // Graduation and name of an axis
                case 'ticks':
                case 'numbers':
                case 'name':
                case 'side':
                case 'padding':
                    applyAxisOption(obj, key, options[key])
                    break

                // Subdivisions of a grid
                case 'subgrid':
                    applyGridOption(obj, key, options[key].value)
                    break

                // Shape of an arc
                case 'sector':
                case 'square':
                    applyArcOption(obj, key, options[key].value)
                    break

                // Shape of a point
                case 'o':
                case 's':
                case '*':
                    applyPointShapeOption(obj, key, options[key].value)
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

    /**
     * Build the figures from the code
     */
    protected _build(input: string) {
        this._code = this._prepare(input)

        const pConfig = parser_config

        // Loop through each code
        this._code.forEach((item) => {
            // A line that cannot be built, or whose options are not valid, does not stop the drawing: the others are drawn.
            try {
                this._buildItem(item, pConfig)
            } catch (e) {
                console.error(e)
            }
        })

        // Draw the figures a second time (for the alignment of the labels)
        // TODO: remove the "dual" update ? buildItem should place everything correctly or the new update systme will be smooth enough to handle this correctly ?
        this.graph.update()
    }

    /**
     * Build the figures of one line of code and apply its options.
     * @throws ParseError if the line cannot be built, OptionError if one of its options is not valid.
     */
    protected _buildItem(item: PARSER, pConfig: typeof parser_config) {
        // The names of the axes are theirs.
        if (AXIS_NAMES.includes(item.name)) {
            throw new ParseError(`Cannot build "${item.name}" (${item.key}): ${item.name} is the name of an axis of the graph, choose another name`)
        }

        // Determine the id of the figure.
        item.name = this._uniqueName(item.name)

        let obj: AbstractFigure | undefined

        if (Object.hasOwn(pConfig, item.key)) {
            // On récupère le constructeur (build), la clé du parser (create) et les paramètres (parameters)
            const {build, parameters} = pConfig[item.key]

            // if <parameters> is not empty, it means the figure has specific parameters
            // Check if they are defined in the item.parameters
            if (parameters && parameters.length > 0 && Object.keys(item.parameters).length === 0) {
                const keys = Object.keys(item.parameters).filter(key => parameters.includes(key))
                keys.forEach((parameter) => {
                    item.parameters[parameter] = {value: true, options: []}
                })
            }

            // Create the object
            let buildResult = build(item, this._namedFigures(), this.graph.config)

            if (buildResult) {
                if (!Array.isArray(buildResult)) {
                    buildResult = [buildResult]
                }

                buildResult.forEach((build, index) => {
                    try {
                        const {config, create} = build

                        if (config && create) {

                            // @ts-expect-error: create is string and is not
                            obj = this.graph.create[create](config, item.name + (buildResult.length > 1 ? `${index + 1}` : ''))

                        }
                    } catch (e) {
                        console.error(e)
                    }

                    // Load the options.
                    if (obj) {
                        this._buildOptions(obj, item)
                    }
                })

            }

        }
    }

    protected _buildOptions(obj: AbstractFigure, item: PARSER) {
        // TODO: make a global reset function for everything
        // Reset the animation flag
        // Apply defaults settings to the object
        if (this._settings.label &&
            obj instanceof Point &&
            item.parameters.label === undefined && item.parameters.tex === undefined
        ) {
            item.parameters.label = {value: true, options: []}
        }

        if (this._settings.tex &&
            obj instanceof Point &&
            item.parameters.label === undefined && item.parameters.tex === undefined
        ) {
            item.parameters.tex = {value: true, options: []}
        }

        if (obj instanceof Point && this._settings.points === false) {
            item.parameters['!'] = {value: true, options: []}
        }

        // The shape that the points take when they do not ask for one (`points=s/12`).
        const shape = this._settings.points
        if (obj instanceof Point && shape && !['o', 's', '*'].some(key => Object.hasOwn(item.parameters, key))) {
            if (shape.shape !== 'o' || shape.size !== undefined) {
                applyPointShapeOption(obj, shape.shape, shape.size ?? true)
            }
        }

        this._applyOptions(item.parameters, obj)
    }

    protected _defineCommand(command: string): { key: string, value: boolean } {
        // A command is: @<begin|end>:<key>

        // Remove the '@' and split the command into key and value
        const [value, key] = command.slice(1).split(':')

        // Return the key and value
        return {key, value: value === 'begin'}

    }

    /**
     * Write a line of code in its standard form (`<id>=<key> <values>`): the shorthand of a point (`A(3,4)`), of a function
     * (`f(x)=x^2`) or of a line (`d=AB`). Any other text is already in that form and is not changed.
     * @throws ParseError if the text is the shorthand of a line, but not a valid one.
     */
    protected _parseKeyCode(key_code: string): string {
        // The shorthands of a point and of a line belong to their build (buildPoint.ts, buildLine.ts).
        const point = parsePointShorthand(key_code)
        if (point !== null) {
            return point
        }

        const plot = parsePlotShorthand(key_code)
        if (plot !== null) {
            return plot
        }

        const parametric = parseParametricShorthand(key_code)
        if (parametric !== null) {
            return parametric
        }

        return parseLineShorthand(key_code) ?? key_code
    }

    /**
     * Prepare the code to load
     * @param input Input code to parse and prepare
     * @returns
     */
    protected _prepare(input: string): PARSER[] {
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
                const {key, value} = this._defineCommand(line)
                block[key] = {value, options: []}
                continue
            }

            // Parse the line. The formatter of the parser writes its shorthands in their standard form (see _parseKeyCode):
            // A(3,4) => A=pt 3,4, d=AB => d=line A,B, p(x)=x^2 => p=plot x^2...
            // A line that cannot be parsed does not stop the others: it is reported and skipped.
            let parsedLine: PARSER
            try {
                parsedLine = this._parser.parse(line)
            } catch (e) {
                console.error(e)
                continue
            }

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
     * The figures that a line of code can name: the ones of the drawing, and the axes of the graph, `Ox` and `Oy`, which are lines like
     * the others (an intersection, a perpendicular, a tangent circle...). They exist whether they are drawn or not.
     */
    protected _namedFigures(): Record<string, AbstractFigure> {
        return {Ox: this.graph.axes.x, Oy: this.graph.axes.y, ...this.graph.figures}
    }

    protected _uniqueName(name: string): string {
        let newName = name
        let i = 1
        while (this.graph.figures[newName]) {
            newName = `${name}_${i}`
            i++
        }
        return newName
    }
}
