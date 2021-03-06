"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
const svg_js_1 = require("@svgdotjs/svg.js");
require("@svgdotjs/svg.draggable.js");
const interfaces_1 = require("./variables/interfaces");
const Circle_1 = require("./figures/Circle");
const Point_1 = require("./figures/Point");
const Grid_1 = require("./figures/Grid");
const Line_1 = require("./figures/Line");
const Plot_1 = require("./figures/Plot");
const Axis_1 = require("./figures/Axis");
const enums_1 = require("./variables/enums");
const Arc_1 = require("./figures/Arc");
const Parser_1 = require("./Parser");
const Parametric_1 = require("./figures/Parametric");
const numeric_1 = require("pimath/esm/maths/numeric");
class Graph {
    /**
     * HTML container
     * @type {HTMLElement}
     * @private
     */
    _container;
    /**
     * List of all figures drawn in the graph.
     * @type {Figure[]}
     * @private
     */
    _figures;
    /**
     * Determine if all the graph must be drawn or not.
     * @type {boolean}
     * @private
     */
    _freeze;
    /**
     * Number of pixels in the graph
     * @type {number}
     * @private
     */
    _height;
    /**
     * Layers of the graph
     * @type {ILayers}
     * @private
     */
    _layers;
    /**
     * Default markers for start and end
     * @type {{start: Marker, end: Marker}}
     * @private
     */
    _markers;
    /**
     * Origin position in unit coordinate
     * @type {IPoint}
     * @private
     */
    _origin;
    /**
     * Number of pixels per unit.
     * @type {IPoint}
     * @private
     */
    _pixelsPerUnit;
    /**
     * List of all points by name. Used to quickly get a point.
     * @type {{[p: string]: Point}}
     * @private
     */
    _points;
    /**
     * SVG.js main element
     * @type {Svg}
     * @private
     */
    _svg;
    /**
     * Number of pixels on the graph
     * @type {number}
     * @private
     */
    _width;
    /**
     * Create the main graph canvas element
     * config: {origin: {x: number, y: number}, grid: {x: number, y: number, type: GRIDTYPE}}
     * config (dim pixels): {... width: number, height: number}
     * config (dim units): {... dx: number, dy: number, pixelsPerUnit: number}
     * config (plot wise): {... xMin: number, xMax: number, yMin: number, yMax: number, pixelsPerUnit: number}
     * @param {string | HTMLElement} containerID
     * @param {GraphConfig} config
     */
    constructor(containerID, config) {
        // By default, the graph is frozen on initialisation
        this._freeze = false;
        // Default values.
        this._origin = {
            x: 50, y: 550
        };
        this._pixelsPerUnit = {
            x: 50, y: 50
        };
        // Determine the width and height of the graph.
        this._initSetWidthAndHeight(config);
        // Create the container
        this._initGetContainerId(containerID);
        // Create the SVG
        this._initCreateSVG();
        // Init variables
        this._figures = [];
        this._points = {};
        if (config) {
            if (config.origin !== undefined) {
                this._origin = config.origin;
            }
            if (config.grid !== undefined) {
                this._pixelsPerUnit = config.grid;
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
        };
        // Create grid
        const g = new Grid_1.Grid(this, 'MAINGRID', {
            axisX: this._pixelsPerUnit.x,
            axisY: this._pixelsPerUnit.y,
            type: enums_1.GRIDTYPE.ORTHOGONAL
        });
        this._figures.push(g);
        this._layers.grids.add(g.svg);
        // Create the markers
        this._markers = this.createMarker(10);
    }
    get container() {
        return this._container;
    }
    get svg() {
        return this._svg;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get origin() {
        return this._origin;
    }
    set origin(value) {
        this._origin = value;
    }
    get pixelsPerUnit() {
        return this._pixelsPerUnit;
    }
    get figures() {
        return this._figures;
    }
    get points() {
        return this._points;
    }
    get freeze() {
        return this._freeze;
    }
    get layers() {
        return this._layers;
    }
    get markers() {
        return this._markers;
    }
    get unitXDomain() {
        return {
            min: Math.round(-this._origin.x / this._pixelsPerUnit.x),
            max: Math.round((this._width - this._origin.x) / this._pixelsPerUnit.x)
        };
    }
    get unitYDomain() {
        return {
            max: Math.round(-(this._height - this._origin.y) / this._pixelsPerUnit.y),
            min: Math.round(this._origin.y / this._pixelsPerUnit.y)
        };
    }
    distanceToPixels(distance, direction) {
        if (direction === undefined || direction === enums_1.AXIS.HORIZONTAL) {
            return distance * this._pixelsPerUnit.x;
        }
        else {
            return distance * this._pixelsPerUnit.y;
        }
    }
    unitsToPixels(point) {
        return {
            x: this.origin.x + (point.x * this._pixelsPerUnit.x),
            y: this.origin.y - (point.y * this._pixelsPerUnit.y)
        };
    }
    pixelsToUnits(point) {
        // TODO: handle other grid types.
        // Handle "rounding" issue.
        let x = (point.x - this.origin.x) / this._pixelsPerUnit.x, y = -(point.y - this.origin.y) / this._pixelsPerUnit.y;
        // TODO: should handle "rounding" problems externally (from PiMath ?)
        return { x: numeric_1.Numeric.numberCorrection(x), y: numeric_1.Numeric.numberCorrection(y) };
    }
    getFigure(name) {
        for (let figure of this._figures) {
            if (figure.name === name) {
                return figure;
            }
        }
        return null;
    }
    getGrid(name) {
        let grid = this.getFigure(typeof name === undefined ? 'MAINGRID' : name);
        if (grid instanceof Grid_1.Grid) {
            return grid;
        }
        else {
            return this.getGrid('MAINGRID');
        }
    }
    getPoint(name) {
        if (name instanceof Point_1.Point) {
            return name;
        }
        return this._points[name] || null;
    }
    axis() {
        const axisX = new Axis_1.Axis(this, 'Ox', enums_1.AXIS.HORIZONTAL);
        const axisY = new Axis_1.Axis(this, 'Oy', enums_1.AXIS.VERTICAL);
        this._validateFigure(axisX, enums_1.LAYER.AXIS);
        this._validateFigure(axisY, enums_1.LAYER.AXIS);
        return {
            x: axisX,
            y: axisY
        };
    }
    point(x, y, name) {
        const pixels = this.unitsToPixels({ x, y });
        const figure = new Point_1.Point(this, name, pixels);
        this._validateFigure(figure, enums_1.LAYER.POINTS);
        return figure;
    }
    segment(A, B, name) {
        const figure = new Line_1.Line(this, name, (A instanceof Point_1.Point) ? A : this.getPoint(A), (B instanceof Point_1.Point) ? B : this.getPoint(B));
        figure.asSegment();
        this._validateFigure(figure);
        return figure;
    }
    vector(A, B, name) {
        const figure = new Line_1.Line(this, name, (A instanceof Point_1.Point) ? A : this.getPoint(A), (B instanceof Point_1.Point) ? B : this.getPoint(B));
        figure.asVector();
        this._validateFigure(figure);
        return figure;
    }
    line(A, B, construction, name) {
        const figure = new Line_1.Line(this, name, (A instanceof Point_1.Point) ? A : this.getPoint(A), (B instanceof Point_1.Point) ? B : this.getPoint(B), construction);
        this._validateFigure(figure);
        return figure;
    }
    parallel(line, P, name) {
        const figure = new Line_1.Line(this, name, this.getPoint(P), null, {
            rule: Line_1.LINECONSTRUCTION.PARALLEL,
            value: line
        });
        this._validateFigure(figure);
        return figure;
    }
    perpendicular(line, P, name) {
        const figure = new Line_1.Line(this, name, this.getPoint(P), null, {
            rule: Line_1.LINECONSTRUCTION.PERPENDICULAR,
            value: line
        });
        this._validateFigure(figure);
        return figure;
    }
    circle(center, radius, name) {
        // Case the point is given as xy coordinate instead of an existing point.
        if (typeof center === 'string') {
            return this.circle(this.getPoint(center), radius, name);
        }
        else if (!(center instanceof Point_1.Point)) {
            return this.circle(this.point(center.x, center.y), radius, name);
        }
        let figure = new Circle_1.Circle(this, name, center, radius);
        this._validateFigure(figure);
        return figure;
    }
    plot(fn, config, name) {
        //TODO: plot auto config ?
        const figure = new Plot_1.Plot(this, name, fn, config);
        this._validateFigure(figure, enums_1.LAYER.PLOTS);
        return figure;
    }
    parametric(fx, fy, config, name) {
        const figure = new Parametric_1.Parametric(this, name, {
            x: fx,
            y: fy
        }, config);
        this._validateFigure(figure, enums_1.LAYER.PLOTS);
        return figure;
    }
    arc(A, O, B, radius, name) {
        const figure = new Arc_1.Arc(this, name, this.getPoint(O), this.getPoint(A), this.getPoint(B), radius);
        this._validateFigure(figure);
        return figure;
    }
    update() {
        for (let figure of this._figures) {
            figure.update();
        }
        return this;
    }
    updateLayout(config, updateConstructions) {
        let grid = this.getFigure('MAINGRID'), axisX = this.getFigure('Ox'), axisY = this.getFigure('Oy');
        // This sets the origin and width
        this._initSetWidthAndHeight(config);
        this._svg.viewbox(0, 0, this._width, this._height);
        if (grid instanceof Grid_1.Grid) {
            if ((0, interfaces_1.isDrawConfigUnitMinMax)(config)) {
                this._pixelsPerUnit.x = config.pixelsPerUnit;
                this._pixelsPerUnit.y = config.pixelsPerUnit;
            }
            grid.config = {
                axisX: this._pixelsPerUnit.x,
                axisY: this._pixelsPerUnit.y,
                type: enums_1.GRIDTYPE.ORTHOGONAL
            };
            // grid.update()
        }
        // if(axisX instanceof Axis){
        //     axisX.update()
        // }
        // if(axisY instanceof Axis){
        //     axisY.update()
        // }
        if (updateConstructions === true) {
            this.update();
        }
        return this;
    }
    createMarker(scale) {
        return {
            start: this.svg.marker(scale * 1.2, scale * 1.2, function (add) {
                add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`).rotate(180);
            }).ref(0, scale / 2),
            end: this.svg.marker(scale + 5, scale + 5, function (add) {
                add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`);
            }).ref(scale, scale / 2)
        };
    }
    parse(construction) {
        let parser = new Parser_1.Parser(this, construction);
        return parser;
    }
    _initSetWidthAndHeight(config) {
        if ((0, interfaces_1.isDrawConfigWidthHeight)(config)) {
            this._width = config.width;
            this._height = config.height;
        }
        else if ((0, interfaces_1.isDrawConfigUnitWidthHeight)(config)) {
            this._width = config.dx * config.pixelsPerUnit;
            this._height = config.dy * config.pixelsPerUnit;
        }
        else if ((0, interfaces_1.isDrawConfigUnitMinMax)(config)) {
            this._width = (config.xMax - config.xMin) * config.pixelsPerUnit;
            this._height = (config.yMax - config.yMin) * config.pixelsPerUnit;
            this._origin.x = -config.xMin * config.pixelsPerUnit;
            this._origin.y = this._height + config.yMin * config.pixelsPerUnit;
        }
        else {
            // Default width and height.
            this._width = 800;
            this._height = 600;
        }
    }
    _initGetContainerId(id) {
        let el;
        if (typeof id === 'string') {
            el = document.getElementById(id);
            if (!el) {
                el = document.getElementById('_' + id);
            }
            if (!el) {
                console.error('PiDraw: no HTML element found for ', id);
            }
        }
        else if (id instanceof HTMLElement) {
            el = id;
        }
        this._container = el;
    }
    _initCreateSVG() {
        // Create the SVG wrapper.
        const wrapper = document.createElement('DIV');
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.height = 'auto';
        this._container.appendChild(wrapper);
        // Create the SVG element.
        this._svg = (0, svg_js_1.SVG)().addTo(wrapper).size('100%', '100%');
        this._svg.viewbox(0, 0, this._width, this._height);
    }
    _validateFigure(figure, layer) {
        // Add to the list of drawings, for updating.
        this._figures.push(figure);
        if (figure instanceof Point_1.Point) {
            this._points[figure.name] = figure;
        }
        // Add to the layer.
        this._layers[layer ? layer : enums_1.LAYER.MAIN].add(figure.svg);
        // Release the figure
        figure.draw();
    }
}
exports.Graph = Graph;
//# sourceMappingURL=Graph.js.map