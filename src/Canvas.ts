import {G, Marker, SVG, Svg} from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js'
import {
    DrawConfig,
    IPoint,
    isDrawConfigUnitMinMax,
    isDrawConfigUnitWidthHeight,
    isDrawConfigWidthHeight
} from "./interfaces";
import {Figure} from "./figures/Figure";
import {Circle} from "./figures/Circle";
import {Point} from "./figures/Point";
import {Grid, gridType} from "./figures/Grid";
import {ConstructionSettings, Line} from "./figures/Line";
import {Plot, plotConfig} from "./figures/Plot";
import {AXIS, Axis} from "./figures/Axis";

export enum LAYER {
    BACKGROUND = 'background',
    GRIDS = 'grids',
    AXIS = 'axis',
    MAIN = 'main',
    PLOTS = 'plots',
    FOREGROUND = 'foreground',
    POINTS = 'points'
}

export interface ILayers {
    background: G,
    grids: G,
    axis: G,
    main: G,
    plots: G,
    foreground: G,
    points: G
}

export class Canvas {
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
     * Number of pixels on the canvas
     * @type {number}
     * @private
     */
    #width: number;
    /**
     * Number of pixels in the canvas
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
     * List of all figures drawn in the canvas.
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
     * Determine if all the canvas must be drawn or not.
     * @type {boolean}
     * @private
     */
    #freeze: boolean
    /**
     * Layers of the canvas
     * @type {ILayers}
     * @private
     */
    #layers: ILayers
    /**
     * Generate the marker element (arrow)
     * @type {{start: Marker, end: Marker}}
     * @private
     */
    #markers: {start: Marker, end: Marker}

    constructor(containerID: string | HTMLElement, config?: DrawConfig) {
        // By default, the canvas is frozen on initialisation
        this.#freeze = false

        // Determine the width and height of the canvas.
        this._initSetWidthAndHeight(config)

        // Create the container
        this._initGetContainerId(containerID)

        // Create the SVG
        this._initCreateSVG()

        // Init variables
        this.#figures = []
        this.#points = {}
        this.#origin = {
            x: 100, y: 400
        }
        this.#pixelsPerUnit = {
            x: 50, y: 50
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
            type: gridType.ORTHOGONAL
        })
        this.#figures.push(g)
        this.#layers.grids.add(g.svg)

        // Create the markers
        this.#createMarker(15)
    }

    private _initSetWidthAndHeight(config: DrawConfig) {
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
        wrapper.style.height = '100%'
        this.#container.appendChild(wrapper)

        // Create the SVG element.
        this.#svg = SVG().addTo(wrapper).size('100%', '100%')
        this.#svg.viewbox(0, 0, this.#width, this.#height)
    }

    distanceToPixels(distance: number, direction?: AXIS): number {
        if(direction===undefined || direction===AXIS.HORIZONTAL) {
            return distance * this.#pixelsPerUnit.x
        }else{
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

    getFigure(name: string): Figure {
        for(let figure of this.#figures){
            if(figure.name===name){return figure}
        }

        return
    }

    getPoint(name: string): Point {
        return this.#points[name]
    }

    axis(): {x: Axis, y: Axis} {
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

    line(A: Point|string, B: Point|string, construction?: ConstructionSettings ,name?: string): Line {
        const figure = new Line(
            this,
            name,
            (A instanceof Point)?A:this.getPoint(A),
            (B instanceof Point)?B:this.getPoint(B),
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

    plot(fn: Function | string, config?: plotConfig, name?: string): Plot {
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


    update(): Canvas {
        for(let figure of this.#figures){
            figure.update()
        }
        return this
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

    get figures(): Figure[] {
        return this.#figures;
    }

    get freeze(): boolean {
        return this.#freeze;
    }

    get unitXDomain(): {min: number, max: number} {
        return {
            min: Math.round(-this.#origin.x/this.#pixelsPerUnit.x),
            max: Math.round((this.#width-this.#origin.x)/this.#pixelsPerUnit.x)
        }
    }

    get unitYDomain(): { min: number, max: number } {
        return {
            max: Math.round(-(this.#height-this.#origin.y)/this.#pixelsPerUnit.y),
            min: Math.round(this.#origin.y/this.#pixelsPerUnit.y)
        }
    }


    get points(): { [p: string]: Point } {
        return this.#points;
    }


    get pixelsPerUnit(): IPoint {
        return this.#pixelsPerUnit;
    }

    #createMarker(scale: number) {
            this.#markers = {
                start: null,
                end: null
            };

            this.#markers.start = this.svg.marker(
                scale*1.2,
                scale*1.2,
                function (add) {
                    add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`).rotate(180)
                }).ref(0, scale / 2);
            this.#markers.end = this.svg.marker(
                scale+5,
                scale+5,
                function (add) {
                    add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`)
                }).ref(scale, scale / 2);
    }

    get markers(): { start: Marker; end: Marker } {
        return this.#markers;
    }


    get layers(): ILayers {
        return this.#layers;
    }
}