/**
 * @introduction Main part, holding everything together
 *
 * @description The Graph class is the main part of the library. It holds all the figures and points, and is responsible for drawing them on the SVG canvas. It also provides methods to create new figures and points, and to update the graph.
 */
// Interfaces and types
import { AXIS, GRIDTYPE, LAYER, LINECONSTRUCTION } from "./enums"
import { BezierPoint, GraphConfig, ILayers, IPoint, LineConfig, PlotConfig, isDrawConfigUnitMinMax, isDrawConfigUnitWidthHeight, isDrawConfigWidthHeight, plotFunction, texConverterFunction } from "./pidraw.interface"
import { numberCorrection } from "./Calculus"

// Figures and children
import { Figure, IFigureConfig } from "./Figure"
import { Grid } from "./figures/Grid"
import { Axis } from "./figures/Axis"
import { Point } from "./figures/Point"
import { Circle } from "./figures/Circle"
import { Line } from "./figures/Line"
import { Plot } from "./figures/Plot"
import { Arc } from "./figures/Arc"
import { Parametric } from "./figures/Parametric"
import { Bezier } from "./figures/Bezier"
import { Path } from "./figures/Path"
import { Polygon } from "./figures/Polygon"

// SVG.js imports
import { Marker, SVG, Svg } from "@svgdotjs/svg.js"
import '@svgdotjs/svg.draggable.js'
import { Label } from "./Label"
import { createMarker } from "./helpers/marker"
import { Parser } from "./Parser"
import { parserKeys } from "./parserConfig"

export class Graph {
    get config(): GraphConfig {
        return this._config
    }

    set config(value: GraphConfig) {
        this._config = value
    }
    private _config: GraphConfig
    /**
     * Create the main graph canvas element
     * config: {origin: {x: number, y: number}, grid: {x: number, y: number, type: GRIDTYPE}}
     * config (dim pixels): {... width: number, height: number}
     * config (dim units): {... dx: number, dy: number, pixelsPerUnit: number}
     * config (plot wise): {... xMin: number, xMax: number, yMin: number, yMax: number, pixelsPerUnit: number}
     * @param {string | HTMLElement} containerID
     * @param {GraphConfig} config
     */
    constructor(containerID: string | HTMLElement, config?: GraphConfig) {
        // By default, the graph is frozen on initialisation
        this._freeze = true

        // TODO: better init config handling
        this._origin = { x: 50, y: 550 }
        this._pixelsPerUnit = { x: 50, y: 50 }
        this._width = 800
        this._height = 600

        if (config) {
            this._config = config
            if (config.origin !== undefined) {
                this._origin = config.origin
            }

            if (config.grid !== undefined) {
                this._pixelsPerUnit = config.grid
            }

        } else {
            this._config = {
                width: 800,
                height: 600
            }
        }

        // Determine the width and height of the graph.
        this._initSetWidthAndHeight(this._config)

        // Create the container
        this._container = this._initGetContainerId(containerID)

        // Create the SVG
        this._svg = this._initCreateSVG()

        // Init variables
        this._figures = {}
        this._points = {}

        // Default tex converter
        this._texConverter = {
            toTex: (value: string) => value,
            options: {}
        }

        // Init layers.
        this._layers = {
            background: this.svg.group(),
            grids: this.svg.group(),
            axis: this.svg.group(),
            main: this.svg.group(),
            plotsBG: this.svg.group(),
            plots: this.svg.group(),
            plotsFG: this.svg.group(),
            foreground: this.svg.group(),
            points: this.svg.group()
        }

        // Create grid
        const g = new Grid(
            this._makeFigureConfig('MAINGRID'),
            {
                axisX: this._pixelsPerUnit.x,
                axisY: this._pixelsPerUnit.y,
                type: GRIDTYPE.ORTHOGONAL
            })

        this.addFigure(g, LAYER.GRIDS)

        // Create the markers
        this._markers = createMarker(this.svg, 10)

        // Initialize the ToTex converter.
        // TODO: :handle better the converter
        this.texConverter = {
            toTex: (value: string) => value,
            options: {}
        }
    }

    /**
     * HTML container
     * @type {HTMLElement}
     * @private
     */
    private _container: HTMLElement

    get container(): HTMLElement {
        return this._container
    }

    /**
     * List of all figures drawn in the graph. 
     * Figures are the main objects that are drawn on the graph.
     * A figure is composed of a extended class of Figure and a Label.
     * A key is given to each figure to be able to retrieve it later.
     * @type {Figure[]}
     * @private
     */
    private _figures: Record<string, { figure: Figure, label?: Label }>

    get figures(): Record<string, { figure: Figure, label?: Label }> {
        return this._figures
    }

    public addFigure(figure: Figure, layer?: LAYER, label?: Label): void {

        // TODO: must check if the figure already exists and generate a unique id if needed.

        this._figures[figure.name] = { figure, label }

        this._layers[layer ? layer : LAYER.MAIN].add(figure.svg)
    }

    /**
     * Determine if all the graph must be drawn or not.
     * @type {boolean}
     * @private
     */
    private _freeze: boolean

    get freeze(): boolean {
        return this._freeze
    }

    set freeze(value: boolean) {
        this._freeze = value
    }

    /**
     * Number of pixels in the graph
     * @type {number}
     * @private
     */
    private _height: number

    get height(): number {
        return this._height
    }

    /**
     * Layers of the graph
     * @type {ILayers}
     * @private
     */
    private _layers: ILayers

    get layers(): ILayers {
        return this._layers
    }

    /**
     * Default markers for start and end
     * @type {{start: Marker, end: Marker}}
     * @private
     */
    private _markers: { start: Marker, end: Marker }

    get markers(): { start: Marker; end: Marker } {
        return this._markers
    }

    /**
     * Origin position in unit coordinate
     * @type {IPoint}
     * @private
     */
    private _origin: IPoint

    get origin(): IPoint {
        return this._origin
    }

    set origin(value: IPoint) {
        this._origin = value
    }

    /**
     * Number of pixels per unit.
     * @type {IPoint}
     * @private
     */
    private _pixelsPerUnit: IPoint

    get pixelsPerUnit(): IPoint {
        return this._pixelsPerUnit
    }

    set pixelsPerUnit(value: IPoint) {
        this._pixelsPerUnit = value
    }



    /**
     * List of all points by name. Used to quickly get a point.
     * @type {{[p: string]: Point}}
     * @private
     */
    private _points: Record<string, Point>

    get points(): Record<string, Point> {
        return this._points
    }

    /**
     * SVG.js main element
     * @type {Svg}
     * @private
     */
    private _svg: Svg

    get svg(): Svg {
        return this._svg
    }

    /**
     * Number of pixels on the graph
     * @type {number}
     * @private
     */
    private _width: number

    get width(): number {
        return this._width
    }

    get clientDimensions(): { width: number, height: number } {
        return {
            width: this.clientWidth,
            height: this.clientHeight
        }
    }
    get clientWidth(): number {
        return this._container.clientWidth
    }
    get clientHeight(): number {
        return this._container.clientHeight
    }

    private _texConverter: { toTex: texConverterFunction, options: object }

    set texConverter(value: { toTex: texConverterFunction; options: object }) {
        this._texConverter = value
    }

    get unitXDomain(): { min: number, max: number } {
        return {
            min: Math.round(-this._origin.x / this._pixelsPerUnit.x),
            max: Math.round((this._width - this._origin.x) / this._pixelsPerUnit.x)
        }
    }

    get unitYDomain(): { min: number, max: number } {
        return {
            min: Math.round(-(this._height - this._origin.y) / this._pixelsPerUnit.y),
            max: Math.round(this._origin.y / this._pixelsPerUnit.y)
        }
    }

    async toTex(value: string): Promise<string> {
        return Promise.resolve(this._texConverter.toTex(value, this._texConverter.options))
    }

    distanceToPixels(distance: number, direction?: AXIS): number {
        if (direction === undefined || direction === AXIS.HORIZONTAL) {
            return distance * this._pixelsPerUnit.x
        } else {
            return distance * this._pixelsPerUnit.y
        }
    }

    distanceToUnit(pixelDistance: number, direction?: AXIS): number {
        if (direction === undefined || direction === AXIS.HORIZONTAL) {
            return numberCorrection(pixelDistance / this._pixelsPerUnit.x)
        } else {
            return numberCorrection(pixelDistance / this._pixelsPerUnit.y)
        }
    }

    unitsToPixels(point: IPoint): IPoint {
        return {
            x: this.origin.x + (point.x * this._pixelsPerUnit.x),
            y: this.origin.y - (point.y * this._pixelsPerUnit.y)
        }
    }

    pixelsToUnits(point: IPoint): IPoint {
        // TODO: handle other grid types.

        // Handle "rounding" issue.
        const x = (point.x - this.origin.x) / this._pixelsPerUnit.x,
            y = -(point.y - this.origin.y) / this._pixelsPerUnit.y

        return { x: numberCorrection(x), y: numberCorrection(y) }
    }

    getFigure(name?: string): Figure | null {
        // No name, return null
        if (name === undefined) { return null }

        // Check if the figure is in the list
        if (Object.hasOwn(this._figures, name)) {
            return this._figures[name].figure
        }

        // Maybe the name used is the label name instead of the figure name

        Object.values(this._figures).forEach(({ figure, label }) => {
            if (label !== undefined && label.name === name) {
                return figure
            }
        })

        return null
    }

    getGrid(name?: string): Grid {
        const grid = this.getFigure(name ?? 'MAINGRID')

        if (grid instanceof Grid) {
            return grid
        } else {
            return this.getGrid('MAINGRID')
        }
    }

    getPoint(name: Point | string): Point | null {
        if (name instanceof Point) { return name }

        if (Object.hasOwn(this._points, name)) { return this._points[name] }

        return null
    }

    axis(): { x: Axis, y: Axis } {
        // Create the axis
        const axisX = new Axis(this._makeFigureConfig('Ox'), AXIS.HORIZONTAL)
        const axisY = new Axis(this._makeFigureConfig('Oy'), AXIS.VERTICAL)

        // Add the figure to the graph
        this.addFigure(axisX, LAYER.AXIS)
        this.addFigure(axisY, LAYER.AXIS)

        // Return the axis
        return {
            x: axisX,
            y: axisY
        }
    }

    point(x: number, y: number, name?: string, asPixel?: boolean): Point {
        // Determiner if the coordinates are in pixels or units.
        const pixels = asPixel ? { x, y } : this.unitsToPixels({ x, y })

        // Create the figure
        const figure = new Point(
            this._makeFigureConfig(name),
            pixels
        )

        this.addFigure(figure, LAYER.POINTS)
        return figure
    }

    segment(A: Point | string, B: Point | string, name?: string): Line {
        const figure = new Line(
            this._makeFigureConfig(name),
            (A instanceof Point) ? A : this.getPoint(A) as unknown as Point,
            (B instanceof Point) ? B : this.getPoint(B) as unknown as Point
        )
        figure.asSegment()

        this.addFigure(figure)

        return figure
    }

    vector(A: Point | string, B: Point | string, name?: string): Line {
        const figure = new Line(
            this._makeFigureConfig(name),
            (A instanceof Point) ? A : this.getPoint(A) as unknown as Point,
            (B instanceof Point) ? B : this.getPoint(B) as unknown as Point
        )
        figure.asVector()

        this.addFigure(figure)
        return figure
    }

    line(A: Point | string, B: Point | string | null, construction?: LineConfig, name?: string): Line {
        const figure = new Line(
            this._makeFigureConfig(name),
            (A instanceof Point) ? A : this.getPoint(A) as unknown as Point,
            (B instanceof Point || B === null) ? B : this.getPoint(B) as unknown as Point,
            construction
        )

        this.addFigure(figure)
        return figure
    }

    parallel(line: Line, P: Point | string, name?: string): Line {
        const figure = new Line(
            this._makeFigureConfig(name),
            this.getPoint(P) as unknown as Point, null, {
            rule: LINECONSTRUCTION.PARALLEL,
            value: line
        })

        this.addFigure(figure)
        return figure
    }

    perpendicular(line: Line, P: Point | string, name?: string): Line {
        const figure = new Line(
            this._makeFigureConfig(name),
            this.getPoint(P) as unknown as Point,
            null,
            {
                rule: LINECONSTRUCTION.PERPENDICULAR,
                value: line
            })

        this.addFigure(figure)
        return figure
    }

    circle(center: Point | IPoint | string, radius: number | Point, name?: string): Circle {
        // Case the point is given as xy coordinate instead of an existing point.
        if (typeof center === 'string') {
            return this.circle(this.getPoint(center) as unknown as Point, radius, name)
        } else if (!(center instanceof Point)) {
            return this.circle(this.point(center.x, center.y, `${name ?? ''}_center`), radius, name)
        }

        const figure = new Circle(
            this._makeFigureConfig(name),
            center,
            radius)

        this.addFigure(figure)
        return figure
    }

    polygon(points: Point[] | IPoint[] | string[], name?: string): Polygon {
        // Case the point is given as xy coordinate instead of an existing point.
        const polyPoints = points.map((pt, index) => {
            if (typeof pt === 'string') {
                return this.getPoint(pt)
            } else if (!(pt instanceof Point)) {
                return this.point(pt.x, pt.y, `${name ?? ''}_point_${index}`)
            } else if (pt instanceof Point) {
                return pt
            } else {
                return null
            }
        })

        const figure = new Polygon(
            this._makeFigureConfig(name),
            polyPoints.filter(pt => pt !== null) as Point[])

        this.addFigure(figure)
        return figure
    }

    plot(fn: plotFunction | string, config?: PlotConfig, name?: string): Plot {
        //TODO: plot auto config ?
        const figure = new Plot(
            this._makeFigureConfig(name),
            fn,
            config
        )

        this.addFigure(figure, LAYER.PLOTS)
        return figure
    }

    path(d: string, name?: string): Path {
        const figure = new Path(
            this._makeFigureConfig(name),
            d
        )

        this.addFigure(figure, LAYER.PLOTS)

        return figure
    }

    parametric(fx: plotFunction | string, fy: plotFunction | string, config: PlotConfig, name?: string): Parametric {
        const figure = new Parametric(
            this._makeFigureConfig(name),
            {
                x: fx,
                y: fy
            },
            config
        )

        this.addFigure(figure, LAYER.PLOTS)
        return figure
    }

    arc(A: Point | string, O: Point | string, B: Point | string, radius: number | Point, name?: string): Arc {
        const figure = new Arc(
            this._makeFigureConfig(name),
            this.getPoint(O) as unknown as Point,
            this.getPoint(A) as unknown as Point,
            this.getPoint(B) as unknown as Point,
            radius
        )

        this.addFigure(figure)
        return figure
    }

    bezier(values: (Point | string | BezierPoint)[], name?: string): Bezier {
        const figure = new Bezier(
            this._makeFigureConfig(name),
            values)

        this.addFigure(figure)
        return figure
    }

    update(): this {
        Object.values(this._figures).forEach(({ figure }) => {

            if (figure instanceof Point && figure.isTracing.enabled) {
                figure.trace()
            }

            figure.update()
        })

        return this
    }

    updateLayout(config: GraphConfig, updateConstructions?: boolean): this {
        this._config = config

        const grid = this.getFigure('MAINGRID')

        // This sets the origin and width
        this._initSetWidthAndHeight(config)
        this._svg.viewbox(0, 0, this._width, this._height)

        if (grid instanceof Grid) {
            grid.config = {
                axisX: this._pixelsPerUnit.x,
                axisY: this._pixelsPerUnit.y,
                type: GRIDTYPE.ORTHOGONAL
            }
        }

        if (updateConstructions === true) {
            this.update()
        }

        return this
    }

    parse(construction: string, parameters?: string): Parser {
        const parser = new Parser(this, construction, parameters)
        return parser
    }

    /** get all parser helper keys */
    get parseHelper(): Record<string, { description: string, parameters: string }> {
        const values: Record<string, { description: string, parameters: string }> = {}
        for (const key in parserKeys) {
            values[key] = {
                description: parserKeys[key].description,
                parameters: parserKeys[key].parameters
            }
        }

        return values
    }

    private _initSetWidthAndHeight(config: GraphConfig) {
        // Default pixels per unit value
        this.pixelsPerUnit = { x: 50, y: 50 }

        if (isDrawConfigWidthHeight(config)) {
            this._width = config.width
            this._height = config.height
        } else if (isDrawConfigUnitWidthHeight(config)) {
            // Determine automatically the pixelsPerUnit
            if (config.pixelsPerUnit === undefined || config.pixelsPerUnit === 0) {
                const ppu = this.clientWidth / config.dx
                this.pixelsPerUnit = { x: ppu, y: ppu }
            }

            this._width = config.dx * this.pixelsPerUnit.x
            this._height = config.dy * this.pixelsPerUnit.y
        } else if (isDrawConfigUnitMinMax(config)) {

            // Determine automatically the pixelsPerUnit
            if (config.pixelsPerUnit === undefined || config.pixelsPerUnit === 0) {
                const ppu = this.clientWidth / (Math.max(config.xMin, config.xMax) - Math.min(config.xMin, config.xMax))
                this.pixelsPerUnit = { x: ppu, y: ppu }
            }

            this._width = (config.xMax - config.xMin) * this.pixelsPerUnit.x
            this._height = (config.yMax - config.yMin) * this.pixelsPerUnit.y
            this._origin.x = -config.xMin * this.pixelsPerUnit.x
            this._origin.y = this._height + config.yMin * this.pixelsPerUnit.y
        } else {
            // Default width and height.
            this._width = 800
            this._height = 600
        }
    }

    private _initGetContainerId(id: string | HTMLElement): HTMLElement {
        let el: HTMLElement | null

        if (typeof id === 'string') {
            el = document.getElementById(id)

            if (!el) {
                el = document.getElementById('_' + id)
            }

            if (!el) {
                throw new Error('PiDraw: no HTML element found for ' + id)
            }
        } else if (id instanceof HTMLElement) {
            el = id
        } else {
            throw new Error('PiDraw: invalid container ID')
        }

        return el
    }

    private _initCreateSVG(): Svg {
        // Create the SVG wrapper.
        const wrapper = document.createElement('DIV')
        wrapper.style.position = 'relative'
        wrapper.style.width = '100%'
        wrapper.style.height = 'auto'
        this._container.appendChild(wrapper)

        // Create the SVG element.
        const svg = SVG().addTo(wrapper).size('100%', '100%')
        svg.viewbox(0, 0, this._width, this._height)

        return svg
    }

    private _randomID(name?: string): string {
        if (name) { return name }
        return Math.random().toString(36).substring(2, 9)
    }

    private _makeFigureConfig(name?: string, label?: Label): IFigureConfig {
        return {
            rootSVG: this.svg,
            name: this._randomID(name),
            graph: {
                width: this._width,
                height: this._height,
                origin: this._origin,
                pixelsPerUnit: this.pixelsPerUnit,
                unitXDomain: this.unitXDomain,
                figures: this.figures,
                markers: this.markers,
                getFigure: (name: string) => this.getFigure(name),
                unitsToPixels: (value: IPoint) => this.unitsToPixels(value),
                pixelsToUnits: (value: IPoint) => this.pixelsToUnits(value),
                distanceToPixels: (value: number) => this.distanceToPixels(value),
                layers: this._layers,
                update: () => this.update(),
                updateLayout: (config: GraphConfig, updateConstructions?: boolean) => this.updateLayout(config, updateConstructions),
                getGrid: (name?: string) => this.getGrid(name),
                getPoint: (name: string) => this.getPoint(name)
            },
            label
        }
    }
}