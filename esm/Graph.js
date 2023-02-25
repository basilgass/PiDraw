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
// import {Numeric} from "pimath/esm/maths/numeric";
const Bezier_1 = require("./figures/Bezier");
const Path_1 = require("./figures/Path");
const Polygon_1 = require("./figures/Polygon");
const Calculus_1 = require("./Calculus");
class Graph {
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
        // Initialize the ToTex converter.
        // @ts-ignore
        this.texConverter = {
            toTex: null,
            options: {}
        };
    }
    /**
     * HTML container
     * @type {HTMLElement}
     * @private
     */
    _container;
    get container() {
        return this._container;
    }
    /**
     * List of all figures drawn in the graph.
     * @type {Figure[]}
     * @private
     */
    _figures;
    get figures() {
        return this._figures;
    }
    /**
     * Determine if all the graph must be drawn or not.
     * @type {boolean}
     * @private
     */
    _freeze;
    get freeze() {
        return this._freeze;
    }
    set freeze(value) {
        this._freeze = value;
    }
    /**
     * Number of pixels in the graph
     * @type {number}
     * @private
     */
    _height;
    get height() {
        return this._height;
    }
    /**
     * Layers of the graph
     * @type {ILayers}
     * @private
     */
    _layers;
    get layers() {
        return this._layers;
    }
    /**
     * Default markers for start and end
     * @type {{start: Marker, end: Marker}}
     * @private
     */
    _markers;
    get markers() {
        return this._markers;
    }
    /**
     * Origin position in unit coordinate
     * @type {IPoint}
     * @private
     */
    _origin;
    get origin() {
        return this._origin;
    }
    set origin(value) {
        this._origin = value;
    }
    /**
     * Number of pixels per unit.
     * @type {IPoint}
     * @private
     */
    _pixelsPerUnit;
    get pixelsPerUnit() {
        return this._pixelsPerUnit;
    }
    set pixelsPerUnit(value) {
        this._pixelsPerUnit = value;
    }
    /**
     * List of all points by name. Used to quickly get a point.
     * @type {{[p: string]: Point}}
     * @private
     */
    _points;
    get points() {
        return this._points;
    }
    /**
     * SVG.js main element
     * @type {Svg}
     * @private
     */
    _svg;
    get svg() {
        return this._svg;
    }
    /**
     * Number of pixels on the graph
     * @type {number}
     * @private
     */
    _width;
    get width() {
        return this._width;
    }
    _texConverter;
    set texConverter(value) {
        this._texConverter = value;
    }
    get unitXDomain() {
        return {
            min: Math.round(-this._origin.x / this._pixelsPerUnit.x),
            max: Math.round((this._width - this._origin.x) / this._pixelsPerUnit.x)
        };
    }
    get unitYDomain() {
        return {
            min: Math.round(-(this._height - this._origin.y) / this._pixelsPerUnit.y),
            max: Math.round(this._origin.y / this._pixelsPerUnit.y)
        };
    }
    toTex(value) {
        return this._texConverter.toTex(value, this._texConverter.options);
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
        return { x: (0, Calculus_1.numberCorrection)(x), y: (0, Calculus_1.numberCorrection)(y) };
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
    point(x, y, name, asPixel) {
        const pixels = asPixel ? { x, y } : this.unitsToPixels({ x, y });
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
    polygon(points, name) {
        // Case the point is given as xy coordinate instead of an existing point.
        let polyPoints = points.map(pt => {
            if (typeof pt === 'string') {
                return this.getPoint(pt);
            }
            else if (!(pt instanceof Point_1.Point)) {
                return this.point(pt.x, pt.y);
            }
            else if (pt instanceof Point_1.Point) {
                return pt;
            }
            else {
                return null;
            }
        });
        let figure = new Polygon_1.Polygon(this, name, polyPoints);
        this._validateFigure(figure);
        return figure;
    }
    plot(fn, config, name) {
        //TODO: plot auto config ?
        const figure = new Plot_1.Plot(this, name, fn, config);
        this._validateFigure(figure, enums_1.LAYER.PLOTS);
        return figure;
    }
    path(d, name) {
        const figure = new Path_1.Path(this, name, d);
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
    bezier(values, name) {
        const figure = new Bezier_1.Bezier(this, name, values);
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
        let grid = this.getFigure('MAINGRID');
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
        }
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