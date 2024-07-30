import { Box, Marker, SVG, Svg } from "@svgdotjs/svg.js"
import '@svgdotjs/svg.draggable.js'

import { COORDINATE_SYSTEM, DOMAIN, IGraphConfig, IGraphConstructorConfig, IGraphDisplay, ILayers, LAYER_NAME, XY, isXY } from "./pidraw.common"
import { IPointConfig, Point } from "./figures/Point"
import { ILineConfig, Line } from "./figures/Line"
import { IPlotConfig, Plot } from "./figures/Plot"
import { createMarker, toPixels } from "./Calculus"
import { AbstractFigure } from "./figures/AbstractFigure"
import { Circle, ICircleConfig } from "./figures/Circle"
import { Polygon, IPolygonConfig } from "./figures/Polygon"
import { Grid } from "./figures/Grid"
import { Arc, IArcConfig } from "./figures/Arc"
import { CoordinateSystem } from "./figures/CoordinateSystem"
import { IParametricConfig, Parametric } from "./figures/Parametric"
import { Follow, IFollowConfig } from "./figures/Follow"
import { FillBetween, IFillBetweenConfig } from "./figures/FillBetween"
import { IRiemannConfig, Riemann } from "./figures/Riemann"

export type IDraggableFollow = ((x: number, y: number) => XY) | AbstractFigure | string
export interface IDraggableConfig {
    grid?: boolean
    bounds?: {
        x?: DOMAIN
        y?: DOMAIN
    }
    follow?: (IDraggableFollow)[],
    callback?: (figure: AbstractFigure) => void
}

export class Graph {
    #rootSVG: Svg
    #layers: ILayers
    #figures: Record<string, AbstractFigure>
    #config: IGraphConfig
    #display: IGraphDisplay
    #toTex: (value: string) => string

    constructor(id: string | HTMLElement, config?: IGraphConstructorConfig) {
        const wrapper = document.createElement('DIV')
        wrapper.style.position = 'relative'
        wrapper.style.width = '100%'
        wrapper.style.height = 'auto'
        wrapper.style.border = 'thin solid black'

        if (typeof id === 'string') {
            document.getElementById(id)?.appendChild(wrapper)
        } else {
            id.appendChild(wrapper)
        }

        const defaultUnit = config?.ppu ?? 50

        this.#config = Object.assign({
            width: 800,
            height: 600,
            origin: { x: 400, y: 300 },
            system: COORDINATE_SYSTEM.CARTESIAN_2D,
            axis: {
                x: { x: defaultUnit, y: 0 },
                y: { x: 0, y: -defaultUnit }
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
    get display() { return this.#display }
    set display(value: IGraphDisplay) { this.#display = value }
    get toTex() { return this.#toTex }
    get layers() { return this.#layers }

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


    public toPixels<T>(pixels: T, axis?: 'x' | 'y' | undefined): T {
        return toPixels(pixels, this.config, axis)
    }

    get create() {
        return {
            point: (coordinates: XY | IPointConfig, name: string, label?: { html: boolean }): Point => {
                let value: IPointConfig = {}

                if (isXY(coordinates)) {
                    value = {
                        coordinates,
                    }
                } else {
                    value = coordinates
                }

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
            },
            follow: (values: IFollowConfig, name: string): AbstractFigure => {
                const follow = new Follow(this.#rootSVG, name, values)

                this.#layers.plots_FG.add(follow.element)
                this.#figures[name] = follow

                return follow
            },
            fillbetween: (values: IFillBetweenConfig, name: string): AbstractFigure => {
                const fillbetween = new FillBetween(this.#rootSVG, name, values)

                this.#layers.plots_BG.add(fillbetween.element)
                this.#figures[name] = fillbetween

                return fillbetween
            },
            riemann: (values: IRiemannConfig, name: string): AbstractFigure => {
                const riemann = new Riemann(this.#rootSVG, name, values)

                this.#layers.plots_BG.add(riemann.element)
                this.#figures[name] = riemann

                return riemann
            }
        }
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

            if (options?.follow?.length) {
                options.follow.forEach((follow) => {
                    let xy = { x, y }
                    if (follow instanceof AbstractFigure) {
                        xy = follow.follow(x, y)
                    } else if (typeof follow === 'string') {
                        xy = this.follow(follow, ptFigure)(x, y)
                    } else {
                        xy = follow(x, y)
                    }
                    x = xy.x
                    y = xy.y
                })
            }

            // If the current pixels is the same as the dragged pixels, do nothing.
            if (ptFigure.pixels.x === x && ptFigure.pixels.y === y) {
                return
            }

            // Set the point coordinate according.
            ptFigure.pixels = { x, y }

            // Callback at the end, with the point
            if (options?.callback) {
                options.callback(figure)
            }

            this.update([figure.name])
        }

        // Move the figure to the top layer.
        this.#layers.interactive.add(figure.element)

        // Make the figure draggable
        figure.isDraggable = true
        /* eslint-disable */
        figure.shape
            // @ts-expect-error: draggable does not exist on Shape
            .draggable()
            .on('dragmove', dragmove as EventListener)
        /* eslint-enable */
        return figure
    }

    public clear() {
        Object.keys(this.figures).forEach((name) => {
            this.figures[name].element.remove()
        })

        this.#figures = {}
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

    // Default follow function
    follow(value: string, obj: AbstractFigure): (x: number, y: number) => XY {
        if (value === 'Ox') {
            return (x: number, y: number) => ({ x, y: (obj as unknown as XY).y })
        } else if (value === 'Oy') {
            return (x: number, y: number) => ({ x: (obj as unknown as XY).x, y })
        } else if (value === 'grid') {
            return (x: number, y: number) => {
                const xGrid = this.#config.axis.x.x,
                    yGrid = this.#config.axis.y.y

                x = Math.round(x / xGrid) * xGrid
                y = Math.round(y / yGrid) * yGrid

                return { x, y }
            }
        }

        return (x: number, y: number) => ({ x, y })
    }
}
