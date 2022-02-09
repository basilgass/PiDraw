import {Marker, SVG, Svg} from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js'
import {
    ILayers,
    IPoint,
    isDrawConfigUnitMinMax,
    isDrawConfigUnitWidthHeight,
    isDrawConfigWidthHeight
} from "./variables/interfaces";
import {Figure} from "./figures/Figure";
import {Circle} from "./figures/Circle";
import {Point} from "./figures/Point";
import {Grid} from "./figures/Grid";
import {Line, LineConfig, LINECONSTRUCTION} from "./figures/Line";
import {Plot, PlotConfig} from "./figures/Plot";
import {Axis} from "./figures/Axis";
import {AXIS, GRIDTYPE, LAYER} from "./variables/enums";
import {GraphConfig} from "./variables/types";
import {Arc} from "./figures/Arc";
import {Parser} from "./Parser";

export class Graph {
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
        this._freeze = false

        // Default values.
        this._origin = {
            x: 50, y: 550
        }
        this._pixelsPerUnit = {
            x: 50, y: 50
        }

        // Determine the width and height of the graph.
        this._initSetWidthAndHeight(config)

        // Create the container
        this._initGetContainerId(containerID)

        // Create the SVG
        this._initCreateSVG()

        // Init variables
        this._figures = []
        this._points = {}

        if (config) {
            if (config.origin !== undefined) {
                this._origin = config.origin
            }

            if (config.grid !== undefined) {
                this._pixelsPerUnit = config.grid
            }
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
        const g = new Grid(this, 'MAINGRID', {
            axisX: this._pixelsPerUnit.x,
            axisY: this._pixelsPerUnit.y,
            type: GRIDTYPE.ORTHOGONAL
        }).color('lightgray')
        this._figures.push(g)
        this._layers.grids.add(g.svg)

        // Create the markers
        this._markers = this.createMarker(10)
    }

    /**
     * HTML container
     * @type {HTMLElement}
     * @private
     */
    private _container: HTMLElement;

    get container(): HTMLElement {
        return this._container;
    }

    /**
     * SVG.js main element
     * @type {Svg}
     * @private
     */
    private _svg: Svg;

    get svg(): Svg {
        return this._svg;
    }

    /**
     * Number of pixels on the graph
     * @type {number}
     * @private
     */
    private _width: number;

    get width(): number {
        return this._width;
    }

    /**
     * Number of pixels in the graph
     * @type {number}
     * @private
     */
    private _height: number;

    get height(): number {
        return this._height;
    }

    /**
     * Origin position in unit coordinate
     * @type {IPoint}
     * @private
     */
    private _origin: IPoint

    get origin(): IPoint {
        return this._origin;
    }

    set origin(value: IPoint) {
        this._origin = value;
    }

    /**
     * Number of pixels per unit.
     * @type {IPoint}
     * @private
     */
    private _pixelsPerUnit: IPoint

    get pixelsPerUnit(): IPoint {
        return this._pixelsPerUnit;
    }

    /**
     * List of all figures drawn in the graph.
     * @type {Figure[]}
     * @private
     */
    private _figures: Figure[]

    get figures(): Figure[] {
        return this._figures;
    }

    /**
     * List of all points by name. Used to quickly get a point.
     * @type {{[p: string]: Point}}
     * @private
     */
    private _points: { [key: string]: Point }

    get points(): { [p: string]: Point } {
        return this._points;
    }

    /**
     * Determine if all the graph must be drawn or not.
     * @type {boolean}
     * @private
     */
    private _freeze: boolean

    get freeze(): boolean {
        return this._freeze;
    }

    /**
     * Layers of the graph
     * @type {ILayers}
     * @private
     */
    private _layers: ILayers

    get layers(): ILayers {
        return this._layers;
    }

    /**
     * Default markers for start and end
     * @type {{start: Marker, end: Marker}}
     * @private
     */
    private _markers: { start: Marker, end: Marker }

    get markers(): { start: Marker; end: Marker } {
        return this._markers;
    }

    get unitXDomain(): { min: number, max: number } {
        return {
            min: Math.round(-this._origin.x / this._pixelsPerUnit.x),
            max: Math.round((this._width - this._origin.x) / this._pixelsPerUnit.x)
        }
    }

    get unitYDomain(): { min: number, max: number } {
        return {
            max: Math.round(-(this._height - this._origin.y) / this._pixelsPerUnit.y),
            min: Math.round(this._origin.y / this._pixelsPerUnit.y)
        }
    }

    distanceToPixels(distance: number, direction?: AXIS): number {
        if (direction === undefined || direction === AXIS.HORIZONTAL) {
            return distance * this._pixelsPerUnit.x
        } else {
            return distance * this._pixelsPerUnit.y
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
        return {
            x: (point.x - this.origin.x) / this._pixelsPerUnit.x,
            y: -(point.y - this.origin.y) / this._pixelsPerUnit.y
        }
    }

    getFigure(name: string): Figure {
        for (let figure of this._figures) {
            if (figure.name === name) {
                return figure
            }
        }

        return null
    }

    getPoint(name: Point | string): Point {
        if (name instanceof Point) {
            return name
        }

        return this._points[name] || null
    }

    axis(): { x: Axis, y: Axis } {
        const axisX = new Axis(this, 'Ox', AXIS.HORIZONTAL)
        const axisY = new Axis(this, 'Oy', AXIS.VERTICAL)
        this._validateFigure(axisX, LAYER.AXIS)
        this._validateFigure(axisY, LAYER.AXIS)

        return {
            x: axisX,
            y: axisY
        }
    }

    point(x: number, y: number, name?: string): Point {
        const pixels = this.unitsToPixels({x, y})
        const figure = new Point(
            this,
            name,
            pixels
        );

        this._validateFigure(figure, LAYER.POINTS)
        return figure
    }

    segment(A: Point | string, B: Point | string, name?: string): Line {
        const figure = new Line(
            this,
            name,
            (A instanceof Point) ? A : this.getPoint(A),
            (B instanceof Point) ? B : this.getPoint(B)
        )
        figure.asSegment()

        this._validateFigure(figure)
        return figure
    }

    vector(A: Point | string, B: Point | string, name?: string): Line {
        const figure = new Line(
            this,
            name,
            (A instanceof Point) ? A : this.getPoint(A),
            (B instanceof Point) ? B : this.getPoint(B)
        )
        figure.asVector()

        this._validateFigure(figure)
        return figure
    }

    line(A: Point | string, B: Point | string, construction?: LineConfig, name?: string): Line {
        const figure = new Line(
            this,
            name,
            (A instanceof Point) ? A : this.getPoint(A),
            (B instanceof Point) ? B : this.getPoint(B),
            construction
        );

        this._validateFigure(figure)
        return figure
    }

    parallel(line: Line, P: Point | string, name?: string): Line {
        const figure = new Line(this, name, this.getPoint(P), null, {
            rule: LINECONSTRUCTION.PARALLEL,
            value: line
        })

        this._validateFigure(figure)
        return figure
    }

    perpendicular(line: Line, P: Point | string, name?: string): Line {
        const figure = new Line(this, name, this.getPoint(P), null, {
            rule: LINECONSTRUCTION.PERPENDICULAR,
            value: line
        })

        this._validateFigure(figure)
        return figure
    }

    circle(center: Point | IPoint | string, radius: number, name?: string): Circle {
        // Case the point is given as xy coordinate instead of an existing point.
        if (typeof center === 'string') {
            return this.circle(this.getPoint(center), radius, name)
        } else if (!(center instanceof Point)) {
            return this.circle(this.point(center.x, center.y), radius, name)
        }

        let figure = new Circle(
            this,
            name,
            center,
            radius)

        this._validateFigure(figure)
        return figure
    }

    plot(fn: Function | string, config?: PlotConfig, name?: string): Plot {
        //TODO: plot auto config ?
        const figure = new Plot(
            this,
            name,
            fn,
            config
        )

        this._validateFigure(figure, LAYER.PLOTS)
        return figure
    }

    arc(A: Point | string, O: Point | string, B: Point | string, radius?: number | Point, name?: string): Arc {
        const figure = new Arc(this, name, this.getPoint(O), this.getPoint(A), this.getPoint(B), radius)

        this._validateFigure(figure)
        return figure
    }

    update(): Graph {
        for (let figure of this._figures) {
            figure.update()
        }
        return this
    }

    createMarker(scale: number): { start: Marker, end: Marker } {
        return {
            start: this.svg.marker(
                scale * 1.2,
                scale * 1.2,
                function (add) {
                    add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`).rotate(180)
                }).ref(0, scale / 2),
            end: this.svg.marker(
                scale + 5,
                scale + 5,
                function (add) {
                    add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`)
                }).ref(scale, scale / 2)
        };
    }

    parse(construction: string): Parser {
        let parser = new Parser(this, construction)
        return parser
    }

    private _initSetWidthAndHeight(config: GraphConfig) {
        if (isDrawConfigWidthHeight(config)) {
            this._width = config.width
            this._height = config.height
        } else if (isDrawConfigUnitWidthHeight(config)) {
            this._width = config.dx * config.pixelsPerUnit
            this._height = config.dy * config.pixelsPerUnit
        } else if (isDrawConfigUnitMinMax(config)) {
            this._width = (config.xMax - config.xMin) * config.pixelsPerUnit
            this._height = (config.yMax - config.yMin) * config.pixelsPerUnit
            this._origin.x = -config.xMin * config.pixelsPerUnit
            this._origin.y = this._height + config.yMin * config.pixelsPerUnit
        } else {
            // Default width and height.
            this._width = 800
            this._height = 600
        }
    }

    private _initGetContainerId(id: string | HTMLElement) {
        let el: HTMLElement
        if (typeof id === 'string') {
            el = document.getElementById(id)

            if (!el) {
                el = document.getElementById('_' + id)
            }

            if (!el) {
                console.error('PiDraw: no HTML element found for ', id)
            }
        } else if (id instanceof HTMLElement) {
            el = id
        }

        this._container = el
    }

    private _initCreateSVG() {
        // Create the SVG wrapper.
        const wrapper = document.createElement('DIV')
        wrapper.style.position = 'relative'
        wrapper.style.width = '100%'
        wrapper.style.height = 'auto'
        this._container.appendChild(wrapper)

        // Create the SVG element.
        this._svg = SVG().addTo(wrapper).size('100%', '100%')
        this._svg.viewbox(0, 0, this._width, this._height)
    }

    private _validateFigure(figure: Figure, layer?: LAYER): void {
        // Add to the list of drawings, for updating.
        this._figures.push(figure)

        if (figure instanceof Point) {
            this._points[figure.name] = figure
        }

        // Add to the layer.
        this._layers[layer ? layer : LAYER.MAIN].add(figure.svg)

        // Release the figure
        figure.draw()
    }
}