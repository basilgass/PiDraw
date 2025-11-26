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
    protected _Animate: Animate | null = null

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

        this._config = Object.assign({
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
        this._toTex = config?.tex ?? ((value: string) => value)

        this._display = Object.assign({
            grid: true,
            subgrid: 0,
            axis: true
        }, config?.display)

        this._rootSVG = SVG()
            .addTo(wrapper)
            .viewbox(0, 0, this._config.width, this._config.height)

        this._rootSVG.data('config', {
            width: this._config.width,
            height: this._config.height,
            origin: this._config.origin,
            // grids: this.#grids,
            axis: this._config.axis
        })

        // Define the layers
        this._layers = {} as ILayers

        Object.values(LAYER_NAME).forEach((key) => {
            this._layers[key as LAYER_NAME] = this._rootSVG
                .group()
                .attr('id', `LAYER_${key}`)
        })

        this._figures = {}

        this._makeLayout()
        return this
    }

    protected _config: IGraphConfig

    get config() {
        return this._config
    }

    set config(value: IGraphConfig) {
        this._config = value
    }

    protected _display: IGraphDisplay

    get display() {
        return this._display
    }

    set display(value: IGraphDisplay) {
        this._display = value
    }

    protected _figures: Record<string, AbstractFigure>

    get figures() {
        return this._figures
    }

    protected _layers: ILayers

    get layers() {
        return this._layers
    }

    protected _rootSVG: Svg

    get rootSVG() {
        return this._rootSVG
    }

    protected _toTex: (value: string) => string

    get toTex() {
        return this._toTex
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
                    this._rootSVG,
                    name,
                    config
                )

                this._layers.points.add(pt.element)
                this._figures[name] = pt

                if (label) {
                    // Define the label name.
                    pt.addLabel(
                        name,
                        label.html,
                        this._toTex
                    )
                }
                return pt
            },
            line: (constraints: ILineConfig, name: string): Line  => {
                const line = new Line(this._rootSVG, name, constraints)

                this._layers.main.add(line.element)
                this._figures[name] = line

                return line
            },
            path: (constraints: string, name: string): Path => {
                const path = new Path(this._rootSVG, name, constraints)
                this._layers.main.add(path.element)
                this._figures[name] = path

                return path
            },
            bezier: (constraints: IBezierConfig, name: string): Bezier => {
                const bezier = new Bezier(this._rootSVG, name, constraints)
                this._layers.main.add(bezier.element)
                this._figures[name] = bezier

                return bezier
            },
            plot: (constraints: IPlotConfig, name: string): Plot => {
                const plot = new Plot(this._rootSVG, name, constraints)

                this._layers.plots.add(plot.element)
                this._figures[name] = plot

                return plot
            },
            parametric: (constraints: IParametricConfig, name: string): Parametric => {
                const plot = new Parametric(this._rootSVG, name, constraints)

                this._layers.plots.add(plot.element)
                this._figures[name] = plot

                return plot
            },
            circle: (constraints: ICircleConfig, name: string): Circle => {
                const circle = new Circle(this._rootSVG, name, constraints)

                this._layers.main.add(circle.element)
                this._figures[name] = circle

                return circle
            },
            polygon: (values: IPolygonConfig, name: string): Polygon => {
                const polygon = new Polygon(this._rootSVG, name, values)

                this._layers.main.add(polygon.element)
                this._figures[name] = polygon

                return polygon
            },
            arc: (values: IArcConfig, name: string): Arc => {
                const arc = new Arc(this._rootSVG, name, values)

                this._layers.main.add(arc.element)
                this._figures[name] = arc

                return arc
            },
            follow: (values: IFollowConfig, name: string): AbstractFigure => {
                const follow = new Follow(this._rootSVG, name, values)

                this._layers.plots_FG.add(follow.element)
                this._figures[name] = follow

                return follow
            },
            fillbetween: (values: IFillBetweenConfig, name: string): AbstractFigure => {
                const fillbetween = new FillBetween(this._rootSVG, name, values)

                this._layers.plots_BG.add(fillbetween.element)
                this._figures[name] = fillbetween

                return fillbetween
            },
            riemann: (values: IRiemannConfig, name: string): AbstractFigure => {
                const riemann = new Riemann(this._rootSVG, name, values)

                this._layers.plots_BG.add(riemann.element)
                this._figures[name] = riemann

                return riemann
            }
        }
    }

    get animation(): Animate{
        if(!this._Animate){
            this._Animate = new Animate(this)
        }

        return this._Animate
    }

    public clear() {
        Object.keys(this.figures).forEach((name) => {
            this.figures[name].element.remove()
        })

        this._figures = {}
    }

    public coordinate_system(system: COORDINATE_SYSTEM): AbstractFigure {
        const axis = new CoordinateSystem(
            this._rootSVG,
            'COORDINATE_SYSTEM',
            system)

        this._layers.axis.add(axis.element)

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
            if (x < 0 || x > this._config.width - box.width / 2) {
                return
            }
            if (y < 0 || y > this._config.height - box.height / 2) {
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
        this._layers.interactive.add(figure.element)

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
                const xGrid = this._config.axis.x.x,
                    yGrid = this._config.axis.y.y

                x = Math.round(x / xGrid) * xGrid
                y = Math.round(y / yGrid) * yGrid

                return {x, y}
            }
        }

        return (x: number, y: number) => ({x, y})
    }

    public grid(name: string, gridConfig: { x: XY, y: XY }): AbstractFigure {
        // const group = this._rootSVG.group().attr('id', name)

        const aGrid = new Grid(this._rootSVG, name, {
            axis: gridConfig,
            origin: this._config.origin,
            width: this._config.width,
            height: this._config.height,
            subdivisions: 0
        })

        this._layers.grids.add(aGrid.element)

        return aGrid
    }

    public subgrid(name: string, subdivision: number): AbstractFigure {
        const subAxis = {
            x: {x: this._config.axis.x.x / subdivision, y: this._config.axis.x.y / subdivision},
            y: {x: this._config.axis.y.x / subdivision, y: this._config.axis.y.y / subdivision}
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
        this._rootSVG.viewbox(0, 0, this._config.width, this._config.height)

        // Update the transfer data
        this._rootSVG.data('config', {
            width: this._config.width,
            height: this._config.height,
            origin: this._config.origin,
            axis: this._config.axis
        })

        // Redo the layout
        this._makeLayout()

        // Force a global update.
        this.update([], true)
    }

   protected _makeLayout(): void {
        // Remove the grid
        this._layers.grids.clear()

        // Remove the axis
        this._layers.axis.clear()

        // Load the grid
        if (this._display.subgrid) {
            this.subgrid('SUBGRID', this._display.subgrid)
                .stroke('purple/0.5', 0.1)
        }
        if (this._display.grid) {
            if(this._display.grid===true){
                this.grid('MAINGRID', this._config.axis)
                    .stroke('lightgray', 1)
            } else {
                const {x, y} = this._display.grid as XY
                if (x !== undefined && y !== undefined) {
                    this.grid('MAINGRID', {
                        x: {
                            x: this._config.axis.x.x * x,
                            y: this._config.axis.x.y * y,
                        },
                        y: {
                            x: this._config.axis.y.x * x,
                            y: this._config.axis.y.y * y,
                        }
                    })
                        .stroke('lightgray', 1)
                }
            }
        }

        // Load the axis
        if (this._display.axis) {
            this.coordinate_system(this._config.system)
        }


    }
}
