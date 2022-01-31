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
import {Line, LineConfig} from "./figures/Line";
import {Plot, PlotConfig} from "./figures/Plot";
import {Axis} from "./figures/Axis";
import {AXIS, GRIDTYPE, LAYER} from "./variables/enums";
import {GraphConfig} from "./variables/types";

export class Graph {
    /**
     * HTML container
     * @type {HTMLElement}
     * @private
     */
    #container: HTMLElement;
    /**
     * SVG.js main element
     * @type {Svg}
     * @private
     */
    #svg: Svg;
    /**
     * Number of pixels on the graph
     * @type {number}
     * @private
     */
    #width: number;
    /**
     * Number of pixels in the graph
     * @type {number}
     * @private
     */
    #height: number;
    /**
     * Origin position in unit coordinate
     * @type {IPoint}
     * @private
     */
    #origin: IPoint
    /**
     * Number of pixels per unit.
     * @type {IPoint}
     * @private
     */
    #pixelsPerUnit: IPoint
    /**
     * List of all figures drawn in the graph.
     * @type {Figure[]}
     * @private
     */
    #figures: Figure[]
    /**
     * List of all points by name. Used to quickly get a point.
     * @type {{[p: string]: Point}}
     * @private
     */
    #points: { [key: string]: Point }
    /**
     * Determine if all the graph must be drawn or not.
     * @type {boolean}
     * @private
     */
    #freeze: boolean
    /**
     * Layers of the graph
     * @type {ILayers}
     * @private
     */
    #layers: ILayers

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
        this.#freeze = false

        // Determine the width and height of the graph.
        this._initSetWidthAndHeight(config)

        // Create the container
        this._initGetContainerId(containerID)

        // Create the SVG
        this._initCreateSVG()

        // Init variables
        this.#figures = []
        this.#points = {}

        this.#origin = {
            x: 50, y: 550
        }
        this.#pixelsPerUnit = {
            x: 50, y: 50
        }
        if (config) {
            if (config.origin !== undefined) {
                this.#origin = config.origin
            }

            if (config.grid !== undefined) {
                this.#pixelsPerUnit = config.grid
            }
        }

        // Init layers.
        this.#layers = {
            background: this.svg.group(),
            grids: this.svg.group(),
            axis: this.svg.group(),
            main: this.svg.group(),
            plots: this.svg.group(),
            foreground: this.svg.group(),
            points: this.svg.group()
        }

        // Create grid
        const g = new Grid(this, 'MAINGRID', {
            axisX: this.#pixelsPerUnit.x,
            axisY: this.#pixelsPerUnit.y,
            type: GRIDTYPE.ORTHOGONAL
        })
        this.#figures.push(g)
        this.#layers.grids.add(g.svg)

        // Create the markers
        this.createMarker(15)
    }

    get container(): HTMLElement {
        return this.#container;
    }

    get svg(): Svg {
        return this.#svg;
    }

    get width(): number {
        return this.#width;
    }

    get height(): number {
        return this.#height;
    }

    get origin(): IPoint {
        return this.#origin;
    }

    set origin(value: IPoint) {
        this.#origin = value;
    }

    get figures(): Figure[] {
        return this.#figures;
    }

    get freeze(): boolean {
        return this.#freeze;
    }

    get unitXDomain(): { min: number, max: number } {
        return {
            min: Math.round(-this.#origin.x / this.#pixelsPerUnit.x),
            max: Math.round((this.#width - this.#origin.x) / this.#pixelsPerUnit.x)
        }
    }

    get unitYDomain(): { min: number, max: number } {
        return {
            max: Math.round(-(this.#height - this.#origin.y) / this.#pixelsPerUnit.y),
            min: Math.round(this.#origin.y / this.#pixelsPerUnit.y)
        }
    }

    get points(): { [p: string]: Point } {
        return this.#points;
    }

    get pixelsPerUnit(): IPoint {
        return this.#pixelsPerUnit;
    }

    get layers(): ILayers {
        return this.#layers;
    }

    distanceToPixels(distance: number, direction?: AXIS): number {
        if (direction === undefined || direction === AXIS.HORIZONTAL) {
            return distance * this.#pixelsPerUnit.x
        } else {
            return distance * this.#pixelsPerUnit.y
        }
    }

    unitsToPixels(point: IPoint): IPoint {
        return {
            x: this.origin.x + (point.x * this.#pixelsPerUnit.x),
            y: this.origin.y - (point.y * this.#pixelsPerUnit.y)
        }
    }

    pixelsToUnits(point: IPoint): IPoint {
        // TODO: handle other grid types.
        return {
            x: (point.x - this.origin.x) / this.#pixelsPerUnit.x,
            y: -(point.y - this.origin.y) / this.#pixelsPerUnit.y
        }
    }

    getFigure(name: string): Figure {
        for (let figure of this.#figures) {
            if (figure.name === name) {
                return figure
            }
        }

        return
    }

    getPoint(name: string): Point {
        return this.#points[name]
    }

    axis(): { x: Axis, y: Axis } {
        const axisX = new Axis(this, 'x', AXIS.HORIZONTAL)
        const axisY = new Axis(this, 'y', AXIS.VERTICAL)
        this.#validateFigure(axisX, LAYER.AXIS)
        this.#validateFigure(axisY, LAYER.AXIS)

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

        this.#validateFigure(figure, LAYER.POINTS)
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

        this.#validateFigure(figure)
        return figure
    }

    circle(center: Point | IPoint, radius: number, name?: string): Circle {
        // Case the point is given as xy coordinate instead of an existing point.
        if (!(center instanceof Point)) {
            return this.circle(
                this.point(center.x, center.y),
                radius,
                name
            )
        }

        let figure = new Circle(
            this,
            name,
            center,
            radius)

        this.#validateFigure(figure)

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

        this.#validateFigure(figure, LAYER.PLOTS)

        return figure
    }

    update(): Graph {
        for (let figure of this.#figures) {
            figure.update()
        }
        return this
    }

    private _initSetWidthAndHeight(config: GraphConfig) {
        if (isDrawConfigWidthHeight(config)) {
            this.#width = config.width
            this.#height = config.height
        } else if (isDrawConfigUnitWidthHeight(config)) {
            this.#width = config.dx * config.pixelsPerUnit
            this.#height = config.dy * config.pixelsPerUnit
        } else if (isDrawConfigUnitMinMax(config)) {
            this.#width = (config.xMax - config.xMin) * config.pixelsPerUnit
            this.#height = (config.yMax - config.yMin) * config.pixelsPerUnit
        } else {
            // Default width and height.
            this.#width = 800
            this.#height = 600
        }
    }

    private _initGetContainerId(id: string | HTMLElement) {
        let el: HTMLElement
        if (typeof id === 'string') {
            el = document.getElementById(id)

            if (!el) {
                el = document.getElementById('#' + id)
            }

            if (!el) {
                console.error('PiDraw: no HTML element found for ', id)
            }
        } else if (id instanceof HTMLElement) {
            el = id
        }

        this.#container = el
    }

    private _initCreateSVG() {
        // Create the SVG wrapper.
        const wrapper = document.createElement('DIV')
        wrapper.style.position = 'relative'
        wrapper.style.width = '100%'
        wrapper.style.height = 'auto'
        this.#container.appendChild(wrapper)

        // Create the SVG element.
        this.#svg = SVG().addTo(wrapper).size('100%', '100%')
        this.#svg.viewbox(0, 0, this.#width, this.#height)
    }

    #validateFigure(figure: Figure, layer?: LAYER): void {
        // Add to the list of drawings, for updating.
        this.#figures.push(figure)

        if (figure instanceof Point) {
            this.#points[figure.name] = figure
        }

        // Add to the layer.
        this.#layers[layer ? layer : LAYER.MAIN].add(figure.svg)

        // Release the figure
        figure.draw()
    }

    createMarker(scale: number): { start: Marker, end: Marker }  {
        return  {
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
}