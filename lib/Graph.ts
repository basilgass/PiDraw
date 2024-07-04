import { Box, Marker, SVG, Svg } from "@svgdotjs/svg.js"
import '@svgdotjs/svg.draggable.js'

import { COORDINATE_SYSTEM, DOMAIN, IGraphConfig, IGraphConstructorConfig, IGraphDisplay, ILayers, LAYER_NAME, XY, XYZ, isXY } from "./pidraw.common"
import { IPointConfig, Point } from "./figures/Point"
import { ILineConfig, Line } from "./figures/Line"
import { IPlotConfig, Plot } from "./figures/Plot"
import { createMarker, toPixels } from "./Calculus"
import { AbstractFigure } from "./figures/AbstractFigure"
import { Circle, ICircleConfig } from "./figures/Circle"
import { Polygon, IPolygonConfig } from "./figures/Polygon"
import { IParser, PARSER_TYPE, graphLayoutParser, graphParser } from "./Parser"
import { Grid } from "./figures/Grid"
import { Arc, IArcConfig } from "./figures/Arc"
import { CoordinateSystem } from "./figures/CoordinateSystem"
import { LABEL_POSITION } from "./labels/Label"
import { IParametricConfig, Parametric } from "./figures/Parametric"

interface IDraggableConfig {
    grid?: boolean
    bounds?: {
        x?: DOMAIN
        y?: DOMAIN
    }
    follow?: 'x' | 'y' | 'z' | AbstractFigure
    callback?: (figure: AbstractFigure) => void
}

export class Graph {
    #rootSVG: Svg
    #layers: ILayers
    #figures: Record<string, AbstractFigure>
    #config: IGraphConfig
    #display: IGraphDisplay
    #toTex: (value: string) => string

    constructor(id: string, config?: IGraphConstructorConfig) {
        const wrapper = document.createElement('DIV')
        wrapper.style.position = 'relative'
        wrapper.style.width = '100%'
        wrapper.style.height = 'auto'
        wrapper.style.border = 'thin solid black'
        document.getElementById(id)?.appendChild(wrapper)

        const defaultUnit = config?.ppu ?? 50

        this.#config = Object.assign({
            width: 800,
            height: 600,
            origin: { x: 400, y: 300 },
            system: COORDINATE_SYSTEM.CARTESIAN_2D,
            axis: {
                x: { x: defaultUnit, y: 0 },
                y: { x: 0, y: -defaultUnit },
                z: { x: -defaultUnit / Math.sqrt(2), y: defaultUnit / Math.sqrt(2) }
            }
        }, config)

        // TexConverter 
        this.#toTex = config?.tex ?? ((value: string) => value)

        this.#display = Object.assign({
            grid: true,
            subgrid: 0,
            axis: true
        }, config?.display)

        this.#rootSVG = SVG()
            .addTo(wrapper)
            .viewbox(0, 0, this.#config.width, this.#config.height)

        this.#rootSVG.data('config', {
            width: this.#config.width,
            height: this.#config.height,
            origin: this.#config.origin,
            // grids: this.#grids,
            axis: this.#config.axis
        })

        // Define the layers
        this.#layers = {} as ILayers

        Object.values(LAYER_NAME).forEach((key) => {
            this.#layers[key as LAYER_NAME] = this.#rootSVG
                .group()
                .attr('id', `LAYER_${key}`)
        })

        this.#figures = {}

        this.#makeLayout()
        return this
    }

    get rootSVG() { return this.#rootSVG }
    get figures() { return this.#figures }
    get config() { return this.#config }
    set config(value: IGraphConfig) { this.#config = value }

    #makeLayout(): void {
        // Remove the grid
        this.#layers.grids.clear()

        // Remove the axis
        this.#layers.axis.clear()

        if (this.#display.subgrid) {
            this.subgrid('SUBGRID', this.#display.subgrid)
                .stroke('purple/0.5', 0.1)
        }
        if (this.#display.grid) {
            this.grid('MAINGRID', this.#config.axis)
                .stroke('lightgray', 1)
        }

        if (this.#display.axis) {
            this.coordinate_system(this.#config.system)
        }

    }
    public grid(name: string, gridConfig: { x: XY, y: XY }): AbstractFigure {
        // const group = this.#rootSVG.group().attr('id', name)

        const aGrid = new Grid(this.#rootSVG, name, {
            axis: gridConfig,
            origin: this.#config.origin,
            width: this.#config.width,
            height: this.#config.height,
            subdivisions: 0
        })

        this.#layers.grids.add(aGrid.element)

        return aGrid
    }

    public subgrid(name: string, subdivision: number): AbstractFigure {
        const subAxis = {
            x: { x: this.#config.axis.x.x / subdivision, y: this.#config.axis.x.y / subdivision },
            y: { x: this.#config.axis.y.x / subdivision, y: this.#config.axis.y.y / subdivision }
        }
        return this.grid(name, subAxis)
    }

    public coordinate_system(system: COORDINATE_SYSTEM): AbstractFigure {
        const axis = new CoordinateSystem(
            this.#rootSVG,
            'COORDINATE_SYSTEM',
            system)

        this.#layers.axis.add(axis.element)

        return axis
    }

    public marker(scale: number): { start: Marker, end: Marker } {
        return createMarker(this.#rootSVG, scale)
    }

    // public toCoordinates(pixels: XY): XY {
    //     return {
    //         x: (pixels.x - this.#config.origin.x) / this.#grids.x,
    //         y: -(pixels.y - this.#config.origin.y) / this.#grids.y
    //     }
    // }

    public toPixels(pixels: number | XY | XYZ): XY {
        return toPixels(pixels, this.config)
    }

    get create() {
        return {
            point: (coordinates: XY | IPointConfig, name: string, label?: { html: boolean }): Point => {
                const value = isXY(coordinates) ?
                    {
                        coordinates: this.toPixels(coordinates),
                    } : coordinates

                const pt = new Point(
                    this.#rootSVG,
                    name,
                    value
                )

                this.#layers.points.add(pt.element)
                this.#figures[name] = pt

                if (label) {
                    // Define the label name.
                    pt.addLabel(
                        name,
                        label.html,
                        this.#toTex
                    )
                }
                return pt
            },
            line: (constraints: ILineConfig, name: string): Line => {
                const line = new Line(this.#rootSVG, name, constraints)

                this.#layers.main.add(line.element)
                this.#figures[name] = line

                return line
            },
            plot: (constraints: IPlotConfig, name: string): Plot => {
                const plot = new Plot(this.#rootSVG, name, constraints)

                this.#layers.plots.add(plot.element)
                this.#figures[name] = plot

                return plot
            },
            parametric: (constraints: IParametricConfig, name: string): Parametric => {
                const plot = new Parametric(this.#rootSVG, name, constraints)

                this.#layers.plots.add(plot.element)
                this.#figures[name] = plot

                return plot
            },
            circle: (constraints: ICircleConfig, name: string): Circle => {
                const circle = new Circle(this.#rootSVG, name, constraints)

                this.#layers.main.add(circle.element)
                this.#figures[name] = circle

                return circle
            },
            polygon: (values: IPolygonConfig, name: string): Polygon => {
                const polygon = new Polygon(this.#rootSVG, name, values)

                this.#layers.main.add(polygon.element)
                this.#figures[name] = polygon

                return polygon
            },
            arc: (values: IArcConfig, name: string): Arc => {
                const arc = new Arc(this.#rootSVG, name, values)

                this.#layers.main.add(arc.element)
                this.#figures[name] = arc

                return arc
            }
        }
    }

    static build(id: string,
        config: string,
        code: string,
        toTeX: (value: string) => string = (value: string) => value
    ): Graph {
        /**
         *  draw = new PiDraw.Graph('root',
            {
                ...parseLayout.config,
                tex: (value: string): string => katex.renderToString(value, { throwOnError: false }),
                display: {
                    ...parseLayout.display,
                }
            }
        )

        draw.load(this.code)
         */
        const parseLayout = graphLayoutParser(config)
        const graph = new Graph(id, {
            ...parseLayout.config,
            tex: toTeX,
            display: {
                ...parseLayout.display,
            }
        })

        graph.load(code)

        return graph
    }
    static parse(input: string): IParser[] {
        try {
            return graphParser(input)
        } catch (e) {
            console.warn('PiDraw Parse code cannot be analyzed', input)
            return []
        }
    }

    /**
     * The parsing function to load a graph from a parser code
     * It works in two parts:
     * - create the figure with their constraints
     * - apply the options to the figure
     * 
     * @param code string : The parser code (multi line)
     * @returns 
     */
    load(code: string): this {
        const parsedCode = Graph.parse(code)

        parsedCode.forEach((item) => {

            let obj: AbstractFigure | undefined
            try {
                obj = this.#loadSingleItem(item)
            } catch (e) {
                console.warn('The current PiDraw Parser item cannot be loaded', item)
            }
            // Manage the options (only if the figure is created)
            if (obj !== undefined) {
                Object.keys(item.parameters).forEach((key) => {
                    const { value, options } = item.parameters[key]
                    switch (key) {
                        case 'static':
                        case '#': {
                            obj.static = value as unknown as boolean
                            break
                        }

                        case 'label':
                        case 'tex': {
                            const text = typeof value === 'string' ? value : obj.name
                            const label = obj.addLabel(
                                text,
                                key === 'tex',
                                this.#toTex
                            )

                            if (options.length) {
                                const pos = options[0] as unknown as LABEL_POSITION

                                let offset: XY = { x: 0, y: 0 }
                                if (isXY(options[1])) {
                                    offset = options[1]
                                    offset.x = toPixels(offset.x, this.#config).x
                                    offset.y = -toPixels(offset.y, this.#config).y
                                }
                                label.position(pos, offset)
                            }
                            break
                        }
                        // Drag and dynamic figures
                        case 'drag': {
                            // Actually, the drag can only be used on a point with coordinates.
                            const pt = obj as Point
                            const options: IDraggableConfig = value === undefined ? {} :
                                (value as string) === 'grid' ? { grid: true } :
                                    { follow: this.#figures[value as string] as unknown as AbstractFigure }

                            pt.asCircle(30)
                            this.draggable(pt, options)
                            break
                        }

                        // Appearance: Color
                        case 'color': {
                            obj.stroke(value as string)
                            break
                        }
                        case 'fill': {
                            if (options.length && !isNaN(+options[0])) {
                                obj.fill(`${value as string}/${options[0] as string}`)
                            } else {
                                obj.fill(value as string)
                            }
                            break
                        }

                        // Appearance: Stroke
                        case 'ultrathin': {
                            obj.stroke(0.5)
                            break
                        }
                        case 'thin': {
                            obj.stroke(0.75)
                            break
                        }
                        case 'thick': {
                            obj.stroke(2.5)
                            break
                        }
                        case 'ultrathick': {
                            obj.stroke(4)
                            break
                        }
                        case 'w': {
                            obj.stroke(+value)
                            break
                        }

                        // Appearance: stroke-dasharray
                        case 'dash': {
                            obj.dash(value as string)
                            break
                        }
                    }
                })
            }
        })

        return this
    }

    #loadSingleItem(item: IParser): AbstractFigure | undefined {
        let obj: AbstractFigure | undefined

        // Preprocess the code
        const code = this.#codeFormater(item.code)

        if (item.key === PARSER_TYPE.POINT) {
            obj = this.create.point({
                x: code[0] as number,
                y: code[1] as number,
            }, item.id)
        } else if (item.key === PARSER_TYPE.MIDDLE) {
            obj = this.create.point({
                middle: {
                    A: code[0] as Point,
                    B: code[1] as Point
                }
            }, item.id)

        } else if (item.key === PARSER_TYPE.PROJECTION) {
            obj = this.create.point({
                projection: {
                    axis: ['x', 'y'].includes(code[1] as string) ?
                        code[1] as string as 'x' | 'y' :
                        code[1] as Line,
                    point: code[0] as Point
                }
            }, item.id)
        } else if (item.key === PARSER_TYPE.LINE) {
            let shape: 'line' | 'vector' | 'segment' | 'half_line' = 'line'

            if (item.parameters.shape !== undefined) {
                shape = item.parameters.shape.value as 'line' | 'vector' | 'segment' | 'half_line'
            }

            obj = this.create.line({
                through: {
                    A: code[0] as XY,
                    B: code[1] as XY
                },
                shape
            }, item.id)
        } else if (item.key === PARSER_TYPE.PERPENDICULAR) {
            obj = this.create.line({
                perpendicular: {
                    to: code[0] as Line,
                    through: code[1] as Point
                }
            }, item.id)
        } else if (item.key === PARSER_TYPE.PARALLEL) {
            obj = this.create.line({
                parallel: {
                    to: code[0] as Line,
                    through: code[1] as Point
                }
            }, item.id)
        } else if (item.key === PARSER_TYPE.MEDIATOR) {
            obj = this.create.line({
                mediator: {
                    A: code[0] as Point,
                    B: code[1] as Point
                }
            }, item.id)
        } else if (item.key === PARSER_TYPE.CIRCLE) {
            obj = this.create.circle({
                center: code[0] as XY,
                radius: code[1] as number
            }, item.id)
        } else if (item.key === PARSER_TYPE.PLOT) {
            const plotConfig: IPlotConfig = { expression: code[0] as string }

            // Custom samples
            if (item.parameters.samples !== undefined) {
                plotConfig.samples = item.parameters.samples.value as number
            }

            // Custom domain
            if (item.parameters.domain !== undefined) {
                plotConfig.domain = item.parameters.domain.value as DOMAIN
            }

            // Custom image
            if (item.parameters.image !== undefined) {
                plotConfig.image = item.parameters.image.value as DOMAIN
            }


            obj = this.create.plot(plotConfig, item.id)
        } else if (item.key === PARSER_TYPE.PARAMETRIC) {
            // f(t)=sin(x),cos(2x)
            const parametricConfig: IParametricConfig = {
                expressions: {
                    x: code[0] as string,
                    y: code[1] as string
                }
            }

            // Custom samples
            if (item.parameters.samples !== undefined) {
                parametricConfig.samples = item.parameters.samples.value as number
            }

            // Custom domain
            if (item.parameters.domain !== undefined) {
                parametricConfig.domain = item.parameters.domain.value as DOMAIN
            }

            obj = this.create.parametric(parametricConfig, item.id)
        } else if (item.key === PARSER_TYPE.POLYGON) {
            // The polygon parser can be defined by:
            // - a list of vertices
            obj = this.create.polygon({
                vertices: code as XY[]
            }, item.id)
        } else if (item.key === PARSER_TYPE.REGULAR) {
            // - a center, number of sides and a radius
            // The radius can be a number or a point.
            // In case of the point, the radius is the distance between the center and the point.
            obj = this.create.polygon({
                regular: {
                    center: code[0] as XY,
                    radius: isXY(code[1]) ?
                        code[1] :
                        code[1] as number,
                    sides: Math.trunc(code[2] as number),
                }
            }, item.id)
        } else if (item.key === PARSER_TYPE.INTERSECTION) {
            obj = this.create.point({
                intersection: {
                    A: code[0] as Line,
                    B: code[1] as Line
                }
            }, item.id)
        } else if (item.key === PARSER_TYPE.ARC) {
            obj = this.create.arc({
                start: code[0] as XY,
                center: code[1] as XY,
                end: code[2] as XY,
                radius: (code[3] as number) ?? 1
            }, item.id)
        } else {
            console.log('Parser: not yet implemented')
            console.log(item)
        }

        return obj
    }
    #codeFormater(code: string[]): (AbstractFigure | DOMAIN | XY | number | string)[] {
        const arr: (AbstractFigure | DOMAIN | XY | number | string)[] = code.map((item) => {
            // It's a figure
            if (Object.hasOwn(this.figures, item)) {
                return this.figures[item]
            } else if (item.includes(':')) {
                // It's a domain
                const [min, max] = item.split(':').map(parseFloat)
                return { min, max } as DOMAIN
            } else if (item.includes(';')) {
                // It's a point
                const [x, y] = item.split(';').map(parseFloat)
                return { x, y }
            } else if (item.startsWith('@')) {
                // It's a number, using slices to remove the @
                return +item.slice(1)
            } else if (!isNaN(+item)) {
                // It's a number
                return parseFloat(item)
            }

            // In any other case, return the item as string
            return item
        })

        return arr
    }
    draggable(figure: AbstractFigure, options?: IDraggableConfig) {

        const dragmove = (e: Event & { detail: { box: Box, handler: unknown } }): void => {
            // Figure as point
            const ptFigure = figure as Point

            // Get the event details
            const { box } = e.detail

            // Get the bounding box
            let { x, y } = box

            // Prevent default behavior
            e.preventDefault()

            // Do not allow to go outside the graph.
            if (x < 0 || x > this.#config.width - box.width / 2) {
                return
            }
            if (y < 0 || y > this.#config.height - box.height / 2) {
                return
            }

            // Do not allow to go outside the bounds.
            if (options?.bounds?.x) {
                const xMin = this.toPixels({ x: options.bounds.x.min, y: 0 }).x,
                    xMax = this.toPixels({ x: options.bounds.x.max, y: 0 }).x

                if (x < xMin || x > xMax) { return }
            }
            if (options?.bounds?.y) {
                const yMin = this.toPixels({ x: 0, y: options.bounds.y.min }).y,
                    yMax = this.toPixels({ x: 0, y: options.bounds.y.max }).y

                if (y > yMin || y < yMax) { return }
            }

            // Grid constraints
            if (options?.grid) {
                const xGrid = this.#config.axis.x.x,
                    yGrid = this.#config.axis.y.y

                x = Math.round(x / xGrid) * xGrid
                y = Math.round(y / yGrid) * yGrid
            }

            // Follow constraints
            if (options?.follow) {
                if (options.follow === 'x') {
                    y = ptFigure.y
                } else if (options.follow === 'y') {
                    x = ptFigure.x
                } else {
                    if (options.follow instanceof Circle) {
                        const circle = options.follow
                        const r = circle.radius
                        const dx = x - circle.center.x
                        const dy = y - circle.center.y
                        const d = Math.sqrt(dx ** 2 + dy ** 2)
                        x = dx / d * r + circle.center.x
                        y = dy / d * r + circle.center.y
                    }

                    if (options.follow instanceof Line) {
                        console.log('Not yet implemented')

                    }
                }
            }

            // if (options?.constrain) {
            //     } else {
            //         if (options.constrain instanceof Circle) {
            //             const v = new mathVector(options.constrain.center, { x, y })
            //             let r = options.constrain.getRadiusAsPixels()

            //             if (options.bounds?.d) {
            //                 const d = Math.sqrt(v.x ** 2 + v.y ** 2)
            //                 if (d < options.bounds.d[0] || d > options.bounds.d[1]) {
            //                     r = (d < options.bounds.d[0]) ? options.bounds.d[0] : options.bounds.d[1]
            //                     x = options.constrain.center.x + v.x / v.norm * r
            //                     y = options.constrain.center.y + v.y / v.norm * r
            //                 }
            //             } else {
            //                 x = options.constrain.center.x + v.x / v.norm * r
            //                 y = options.constrain.center.y + v.y / v.norm * r
            //             }
            //         } else if (options.constrain instanceof Line) {
            //             //TODO: must constrain to the segment
            //             y = options.constrain.math.getValueAtX(x)
            //         } else if (options.constrain instanceof Plot) {
            //             const pt = point.graph.pixelsToUnits({ x, y })
            //             y = point.graph.unitsToPixels(options.constrain.evaluate(pt.x)).y
            //         }

            //     }
            // }

            // Move the point to the current position
            // (handler as Shape).move(x, y)

            // Set the point coordinate according.
            ptFigure.coordinates = { x, y }

            // Callback at the end, with the point
            if (options?.callback) {
                options.callback(figure)
            }

            this.update([figure.name])
        }

        // Move the figure to the top layer.
        this.#layers.interactive.add(figure.element)

        // Make the figure draggable
        /* eslint-disable */
        figure.shape
            // @ts-expect-error: draggable does not exist on Shape
            .draggable()
            .on('dragmove', dragmove as EventListener)
        /* eslint-enable */
        return figure
    }

    // Update the layout of the graph
    public updateLayout() {
        // Update the viewbox
        this.#rootSVG.viewbox(0, 0, this.#config.width, this.#config.height)

        // Update the transfer data
        this.#rootSVG.data('config', {
            width: this.#config.width,
            height: this.#config.height,
            origin: this.#config.origin,
            axis: this.#config.axis
        })

        // Redo the layout
        this.#makeLayout()

        // Force a global update.
        this.update([], true)
    }

    // Update each figures in the graph
    public update(except?: string[], forceUpdate?: boolean) {

        if (except === undefined) { except = [] }

        // Go through each objects and update them if they are computed.
        Object.keys(this.figures)
            .forEach((name) => {
                if (except.includes(name)) {
                    this.figures[name].updateLabel()
                } else {
                    // Update figure and label
                    this.figures[name].update(forceUpdate)
                }
            })
    }

    /**
     * Refresh the graph with a new parser code
     * @param code string
     */
    public refresh(code: string) {
        Object.keys(this.figures).forEach((name) => {
            this.figures[name].element.remove()
        })
        this.load(code)
    }

    public refreshLayout(code: string) {
        // Update the configuration
        const layout = graphLayoutParser(code)

        this.#config = layout.config
        this.#display = layout.display

        // Update the layout
        this.updateLayout()
    }
}
