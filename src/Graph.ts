import {Box, SVG, Svg} from "@svgdotjs/svg.js"
import '@svgdotjs/svg.draggable.js'

import {
    COORDINATE_SYSTEM,
    type DOMAIN,
    type IGraphConfig,
    type IGraphConstructorConfig,
    type IGraphDisplay,
    type ILayers,
    isXY,
    LAYER_NAME,
    type XY
} from "./pidraw.common"
import {type IPointConfig, Point} from "./figures/Point"
import {type ILineConfig, Line} from "./figures/Line"
import {type IPlotConfig, Plot} from "./figures/Plot"
import {toCoordinates as pixelsToCoordinates, toPixels as coordToPixels} from "./Calculus"
import {AbstractFigure} from "./figures/AbstractFigure"
import {Circle, type ICircleConfig} from "./figures/Circle"
import {type IPolygonConfig, Polygon} from "./figures/Polygon"
import {Grid} from "./figures/Grid"
import {Arc, type IArcConfig} from "./figures/Arc"
import {CoordinateSystem} from "./figures/CoordinateSystem"
import {type IParametricConfig, Parametric} from "./figures/Parametric"
import {Follow, type IFollowConfig} from "./figures/Follow"
import {FillBetween, type IFillBetweenConfig} from "./figures/FillBetween"
import {type IRiemannConfig, Riemann} from "./figures/Riemann"
import {Path} from "./figures/Path"
import {Bezier, type IBezierConfig} from "./figures/Bezier"
import {Animate} from "./Animate"

export type IDraggableFollow = ((x: number, y: number) => XY) | AbstractFigure | string

export interface IDraggableConfig {
    bounds?: {
        x?: DOMAIN
        y?: DOMAIN
    }
    callback?: (figure: AbstractFigure) => void
    follow?: (IDraggableFollow)[],
    grid?: boolean
    target?: AbstractFigure,
}

export class Graph {
    #config: IGraphConfig
    #display: IGraphDisplay
    #figures: Record<string, AbstractFigure>
    #layers: ILayers
    #rootSVG: Svg
    #toTex: (value: string) => string

    #Animate: Animate | null = null

    constructor(id: string | HTMLElement, config?: IGraphConstructorConfig) {
        const wrapper = document.createElement('DIV')
        wrapper.style.position = 'relative'
        wrapper.style.width = '100%'
        wrapper.style.height = 'auto'
        wrapper.style.border = 'thin solid black'
        wrapper.style.userSelect = 'none'

        if (typeof id === 'string') {
            document.getElementById(id)?.appendChild(wrapper)
        } else {
            id.appendChild(wrapper)
        }

        const defaultUnit = config?.ppu ?? 50

        this.#config = Object.assign({
            width: 800,
            height: 600,
            origin: {x: 400, y: 300},
            system: COORDINATE_SYSTEM.CARTESIAN_2D,
            axis: {
                x: {x: defaultUnit, y: 0},
                y: {x: 0, y: -defaultUnit}
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

    get config() {
        return this.#config
    }

    set config(value: IGraphConfig) {
        this.#config = value
    }

    get create() {
        return {
            point: (coordinates: XY | IPointConfig, name: string, label?: { html: boolean }): Point=> {
                let config: IPointConfig = {}

                if (isXY(coordinates)) {
                    config = {
                        coordinates,
                    }
                } else {
                    config = coordinates
                }

                const pt = new Point(
                    this.#rootSVG,
                    name,
                    config
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
            line: (constraints: ILineConfig, name: string): Line  => {
                const line = new Line(this.#rootSVG, name, constraints)

                this.#layers.main.add(line.element)
                this.#figures[name] = line

                return line
            },
            path: (constraints: string, name: string): Path => {
                const path = new Path(this.#rootSVG, name, constraints)
                this.#layers.main.add(path.element)
                this.#figures[name] = path

                return path
            },
            bezier: (constraints: IBezierConfig, name: string): Bezier => {
                const bezier = new Bezier(this.#rootSVG, name, constraints)
                this.#layers.main.add(bezier.element)
                this.#figures[name] = bezier

                return bezier
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

    get display() {
        return this.#display
    }

    set display(value: IGraphDisplay) {
        this.#display = value
    }

    get figures() {
        return this.#figures
    }

    get layers() {
        return this.#layers
    }

    get rootSVG() {
        return this.#rootSVG
    }

    get toTex() {
        return this.#toTex
    }

    get animation(): Animate{
        if(!this.#Animate){
            this.#Animate = new Animate(this)
        }

        return this.#Animate
    }

    public clear() {
        Object.keys(this.figures).forEach((name) => {
            this.figures[name].element.remove()
        })

        this.#figures = {}
    }

    public coordinate_system(system: COORDINATE_SYSTEM): AbstractFigure {
        const axis = new CoordinateSystem(
            this.#rootSVG,
            'COORDINATE_SYSTEM',
            system)

        this.#layers.axis.add(axis.element)

        return axis
    }

    draggable(figure: AbstractFigure, options?: IDraggableConfig) {
        const dragmove = (e: Event & { detail: { box: Box, handler: unknown } }): void => {
            // Figure as point
            const ptFigure = figure as Point

            // Get the event details
            const {box} = e.detail

            // Get the bounding box
            let {x, y} = box

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
                let xy = {x, y}
                options.follow.forEach((follow) => {
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
            ptFigure.pixels = {x, y}

            // For instance, if the target is a point, update the pixels.
            const target = options?.target??null
            if (target instanceof Point) {
                target.pixels = {x, y}
            }

            // Callback at the end, with the point
            if (options?.callback) {
                options.callback(figure)
            }

            const updateException = [figure.name]
            if (target) {
                updateException.push(target.name)
            }

            this.update(updateException)
        }

        // Move the figure to the top layer.
        this.#layers.interactive.add(figure.element)

        // Make the figure draggable
        figure.isDraggable = true
        figure.shape
            .draggable()
            .on('dragmove', dragmove as EventListener)
        return figure
    }

    // Default follow function
    follow(value: string, obj: AbstractFigure): (x: number, y: number) => XY {
        if (value === 'Ox') {
            return (x: number) => ({x, y: (obj as unknown as XY).y})
        } else if (value === 'Oy') {
            return (_: number, y: number) => ({x: (obj as unknown as XY).x, y})
        } else if (value === 'grid') {
            return (x: number, y: number) => {
                const xGrid = this.#config.axis.x.x,
                    yGrid = this.#config.axis.y.y

                x = Math.round(x / xGrid) * xGrid
                y = Math.round(y / yGrid) * yGrid

                return {x, y}
            }
        }

        return (x: number, y: number) => ({x, y})
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
            x: {x: this.#config.axis.x.x / subdivision, y: this.#config.axis.x.y / subdivision},
            y: {x: this.#config.axis.y.x / subdivision, y: this.#config.axis.y.y / subdivision}
        }
        return this.grid(name, subAxis)
    }

    public toPixels<T>(pixels: T, axis?: 'x' | 'y'): T {
        return coordToPixels(pixels, this.config, axis)
    }

    public toCoordinates<T>(pixels: T, axis?: 'x' | 'y'): T {
        return pixelsToCoordinates(pixels, this.config, axis)
    }

    // Update each figures in the graph
    public update(except?: string[], forceUpdate?: boolean) {
        except ??= []

        // Add all figures with a "_drag" in the exception.
        Object.keys(this.figures)
            .forEach((name) => {
                const dragName = `${name}_drag`

                if(dragName in this.figures){
                    except.push(name, dragName)
                }

            })

        // Go through each object and update them if they are computed.
        this.updateLabels(except, forceUpdate)
    }

    public updateLabels(except: string[], forceUpdate?: boolean){
        Object.keys(this.figures)
            .forEach((name) => {
                if (except.includes(name)) {
                    this.figures[name].updateLabel()
                } else {
                    this.figures[name].update(forceUpdate)
                }
            })
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

    #makeLayout(): void {
        // Remove the grid
        this.#layers.grids.clear()

        // Remove the axis
        this.#layers.axis.clear()

        // Load the grid
        if (this.#display.subgrid) {
            this.subgrid('SUBGRID', this.#display.subgrid)
                .stroke('purple/0.5', 0.1)
        }
        if (this.#display.grid) {
            this.grid('MAINGRID', this.#config.axis)
                .stroke('lightgray', 1)
        }

        // Load the axis
        if (this.#display.axis) {
            this.coordinate_system(this.#config.system)
        }


    }
}
