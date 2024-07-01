import { G, Marker, SVG, Svg, Line as svgLine } from "@svgdotjs/svg.js"
import '@svgdotjs/svg.draggable.js'

import { AXIS, COORDINATE_SYSTEM, DOMAIN, ILayers, LAYER_NAME, XY, XYZ, isXY } from "./pidraw.common"
import { IPointConfig, Point } from "./figures/Point"
import { ILineConfig, Line } from "./figures/Line"
import { IPlotConfig, Plot } from "./figures/Plot"
import { computeLine, createMarker, toPixels } from "./Calculus"
import { AbstractFigure } from "./figures/AbstractFigure"
import { Box } from "@svgdotjs/svg.js"
import { Circle, ICircleConfig } from "./figures/Circle"
import { Polygon, IPolygonConfig } from "./figures/Polygon"
import { IParser, PARSER_TYPE, graphParser } from "./Parser"
import { Grid } from "./figures/Grid"
import { Arc, IArcConfig } from "./figures/Arc"

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
    #width: number
    #height: number
    #origin: { x: number, y: number }
    // #grids: { x: number, y: number }
    #axis: { x: XY, y: XY, z?: XY }
    #layers: ILayers
    #figures: Record<string, AbstractFigure>

    constructor(id: string) {
        const wrapper = document.createElement('DIV')
        wrapper.style.position = 'relative'
        wrapper.style.width = '100%'
        wrapper.style.height = 'auto'
        wrapper.style.border = 'thin solid black'
        document.getElementById(id)?.appendChild(wrapper)

        this.#width = 800
        this.#height = 600
        this.#origin = { x: 400, y: 300 }
        this.#axis = {
            x: { x: 50, y: 0 },
            y: { x: 0, y: -50 },
            z: { x: -50 / Math.sqrt(2), y: 50 / Math.sqrt(2) }
        }

        this.#rootSVG = SVG()
            .addTo(wrapper)
            .viewbox(0, 0, this.#width, this.#height)

        this.#rootSVG.data('config', {
            width: this.#width,
            height: this.#height,
            origin: this.#origin,
            // grids: this.#grids,
            axis: this.#axis
        })

        // Define the layers
        this.#layers = {} as ILayers

        Object.values(LAYER_NAME).forEach((key) => {
            this.#layers[key as LAYER_NAME] = this.#rootSVG
                .group()
                .attr('id', `LAYER_${key}`)
        })

        this.#figures = {}

        this.subgrid('SUBGRID', 5)
            .stroke('purple/0.5', 0.1)
        this.grid('MAINGRID', this.#axis)
            .stroke('lightgray', 1)

        this.coordinate_system(COORDINATE_SYSTEM.CARTESIAN_2D)
        return this
    }

    get rootSVG() { return this.#rootSVG }
    get figures() { return this.#figures }

    public grid(name: string, gridConfig: { x: XY, y: XY }): AbstractFigure {
        // const group = this.#rootSVG.group().attr('id', name)

        const aGrid = new Grid(this.#rootSVG, name, {
            axis: gridConfig,
            origin: this.#origin,
            width: this.#width,
            height: this.#height,
            subdivisions: 0
        })

        this.#layers.grids.add(aGrid.element)

        return aGrid
    }

    public subgrid(name: string, subdivision: number): AbstractFigure {
        const subAxis = {
            x: { x: this.#axis.x.x / subdivision, y: this.#axis.x.y / subdivision },
            y: { x: this.#axis.y.x / subdivision, y: this.#axis.y.y / subdivision }
        }
        return this.grid(name, subAxis)
    }

    public coordinate_system(system: COORDINATE_SYSTEM) {

        if (system === COORDINATE_SYSTEM.CARTESIAN_2D) {
            this.axis('Ox', AXIS.X, { padding: 20 })
            this.axis('Oy', AXIS.Y, { padding: 20 })

        } else if (system === COORDINATE_SYSTEM.CARTESIAN_3D) {
            this.axis('Ox', AXIS.Z, { color: 'red', padding: 10, half: true, length: 2 })
            this.axis('Oy', AXIS.X, { color: 'blue', padding: 10, half: true, length: 2 })
            this.axis('Oz', AXIS.Y, { color: 'green', padding: 10, half: true, length: 2 })
        }
    }

    #axisLine(direction: XY, origin: XY, padding = 0, half_axis = false, length?: number): svgLine | null {
        // origin: XY, direction: XY, graph: { width: number, height: number }, padding = 0, half_axis = false, length?: number
        const data = computeLine(origin, direction, this.#width, this.#height, padding, half_axis, length)
        if (data === null) { return null }

        return this.#rootSVG.line(data[0].x, data[0].y, data[1].x, data[1].y)
    }
    public axis(name: string, type: AXIS, config?: {
        color?: string,
        padding?: number,
        half?: boolean,
        length?: number
    }): G {
        const direction =
            type === AXIS.X ? this.#axis.x :
                type === AXIS.Y ? this.#axis.y :
                    this.#axis.z

        if (direction === undefined) { throw new Error('Invalid axis type') }

        const color = config?.color ?? 'black'
        const padding = config?.padding ?? 0
        const half_axis = config?.half ?? false
        const length = config?.length ?? 0

        const group = this.#rootSVG.group().attr('id', name)
        const arrow = this.marker(10).end.fill(color)

        const axis = this.#axisLine(direction, this.#origin, padding, half_axis, length)


        if (axis !== null) {
            axis.stroke({ color: color, width: 1 })
                .marker('end', arrow)
            group.add(axis)
        }

        this.#layers.axis.add(group)

        return group
    }

    public marker(scale: number): { start: Marker, end: Marker } {
        return createMarker(this.#rootSVG, scale)
    }

    // public toCoordinates(pixels: XY): XY {
    //     return {
    //         x: (pixels.x - this.#origin.x) / this.#grids.x,
    //         y: -(pixels.y - this.#origin.y) / this.#grids.y
    //     }
    // }

    public toPixels(pixels: number | XY | XYZ): XY {
        return toPixels(pixels, {
            width: this.#width,
            height: this.#height,
            origin: this.#origin,
            // grids: this.#grids,
            axis: this.#axis
        })
    }

    get create() {
        return {
            point: (coordinates: XY | IPointConfig, name: string, label = { create: true, html: false }): Point => {
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

                if (label.create) {
                    pt.addLabel(name, label.html)
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

    static parse(input: string): IParser[] {
        return graphParser(input)

    }

    load(code: string): this {
        const parsedCode = Graph.parse(code)

        parsedCode.forEach((item) => {
            let obj: AbstractFigure | undefined

            if (item.key === PARSER_TYPE.POINT) {
                obj = this.create.point({
                    x: parseFloat(item.code[0]),
                    y: parseFloat(item.code[1])
                }, item.id)
            } else if (item.key === PARSER_TYPE.MIDDLE) {
                obj = this.create.point({
                    middle: {
                        A: this.#figures[item.code[0]] as unknown as Point,
                        B: this.#figures[item.code[1]] as unknown as Point
                    }
                }, item.id)

            } else if (item.key === PARSER_TYPE.PROJECTION) {
                obj = this.create.point({
                    projection: {
                        axis: (['x', 'y'].includes(item.code[1])) ? (item.code[1] as unknown as 'x' | 'y') : (this.#figures[item.code[1]] as Line),
                        point: this.#figures[item.code[0]] as unknown as Point
                    }
                }, item.id)
            } else if (item.key === PARSER_TYPE.LINE) {
                let shape: 'line' | 'vector' | 'segment' | 'half_line' = 'line'

                if (item.parameters.shape !== undefined) {
                    shape = item.parameters.shape.value as 'line' | 'vector' | 'segment' | 'half_line'
                }

                obj = this.create.line({
                    through: {
                        A: this.#figures[item.code[0]] as unknown as XY,
                        B: this.#figures[item.code[1]] as unknown as XY
                    },
                    shape
                }, item.id)
            } else if (item.key === PARSER_TYPE.PERPENDICULAR) {
                obj = this.create.line({
                    perpendicular: {
                        to: this.#figures[item.code[0]] as unknown as Line,
                        through: this.#figures[item.code[1]] as unknown as Point
                    }
                }, item.id)
            } else if (item.key === PARSER_TYPE.PARALLEL) {
                obj = this.create.line({
                    parallel: {
                        to: this.#figures[item.code[0]] as unknown as Line,
                        through: this.#figures[item.code[1]] as unknown as Point
                    }
                }, item.id)
            } else if (item.key === PARSER_TYPE.MEDIATOR) {
                obj = this.create.line({
                    mediator: {
                        A: this.#figures[item.code[0]] as unknown as Point,
                        B: this.#figures[item.code[1]] as unknown as Point
                    }
                }, item.id)
            } else if (item.key === PARSER_TYPE.CIRCLE) {
                obj = this.create.circle({
                    center: this.#figures[item.code[0]] as unknown as XY,
                    radius: parseFloat(item.code[1])
                }, item.id)
            } else if (item.key === PARSER_TYPE.PLOT) {
                obj = this.create.plot({
                    expression: item.code[0]
                }, item.id)
            } else if (item.key === PARSER_TYPE.POLYGON) {
                // The polygon parser can be defined by:
                // - a list of vertices
                obj = this.create.polygon({
                    vertices: item.code.map((name) => this.#figures[name] as unknown as XY)
                }, item.id)
            } else if (item.key === PARSER_TYPE.REGULAR) {
                // - a center, number of sides and a radius
                // The radius can be a number or a point.
                // In case of the point, the radius is the distance between the center and the point.
                obj = this.create.polygon({
                    regular: {
                        center: this.#figures[item.code[0]] as unknown as XY,
                        radius: isNaN(+item.code[1]) ?
                            this.#figures[item.code[1]] as unknown as XY :
                            parseFloat(item.code[1]),
                        sides: parseInt(item.code[2]),
                    }
                }, item.id)
            } else if (item.key === PARSER_TYPE.INTERSECTION) {
                obj = this.create.point({
                    intersection: {
                        A: this.#figures[item.code[0]] as unknown as Line,
                        B: this.#figures[item.code[1]] as unknown as Line
                    }
                }, item.id)
            } else {
                console.log('Parser: not yet implemented')
                console.log(item)
            }

            // Manage the options (only if the figure is created)
            if (obj !== undefined) {
                Object.keys(item.parameters).forEach((key) => {
                    const { value, options } = item.parameters[key]
                    switch (key) {
                        // Drag and dynamic figures
                        case 'drag': {
                            // Actually, the drag can only be used on a point with coordinates.
                            const pt = obj as Point
                            const options: IDraggableConfig = value === undefined ? {} : { grid: (value as string) === 'grid' }

                            this.draggable(pt, options)
                            pt.asCircle(30)
                            break
                        }
                        case '#': {
                            obj.static = true
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



    draggable(figure: AbstractFigure, options?: IDraggableConfig) {

        const dragmove = (e: Event & { detail: { box: Box, handler: unknown } }): void => {
            // Figure as point
            const ptFigure = figure as Point

            // Get the event details
            const { handler, box } = e.detail

            // Get the bounding box
            let { x, y } = box

            // Prevent default behavior
            e.preventDefault()

            // Do not allow to go outside the graph.
            if (x < 0 || x > this.#width - box.width / 2) {
                return
            }
            if (y < 0 || y > this.#height - box.height / 2) {
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
                const xGrid = this.#axis.x.x,
                    yGrid = this.#axis.y.y

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

    public update(except?: string[]) {

        if (except === undefined) { except = [] }

        // Go through each objects and update them if they are computed.
        Object.keys(this.figures)
            .forEach((name) => {
                if (except.includes(name)) {
                    this.figures[name].updateLabel()
                } else {
                    // Update figure and label
                    this.figures[name].update()
                }
            })
    }

    public refresh(code: string) {
        //TODO: Refresh must be better optimized
        Object.keys(this.figures).forEach((name) => {
            this.figures[name].element.remove()
        })
        this.load(code)
    }
}
