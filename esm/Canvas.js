"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const svg_js_1 = require("@svgdotjs/svg.js");
require("@svgdotjs/svg.draggable.js");
const interfaces_1 = require("./interfaces");
const Circle_1 = require("./figures/Circle");
const Point_1 = require("./figures/Point");
const Grid_1 = require("./figures/Grid");
const Line_1 = require("./figures/Line");
const Plot_1 = require("./figures/Plot");
const Axis_1 = require("./figures/Axis");
class Canvas {
    #container;
    #svg;
    #width;
    #height;
    #origin;
    #pixelsPerUnit;
    #figures;
    #points;
    #freeze;
    #layers;
    #markers;
    constructor(containerID, config) {
        this.#freeze = false;
        this._initSetWidthAndHeight(config);
        this._initGetContainerId(containerID);
        this._initCreateSVG();
        this.#figures = [];
        this.#points = {};
        this.#origin = {
            x: 100, y: 400
        };
        this.#pixelsPerUnit = {
            x: 50, y: 50
        };
        this.#layers = {
            background: this.svg.group(),
            grids: this.svg.group(),
            axis: this.svg.group(),
            main: this.svg.group(),
            plots: this.svg.group(),
            foreground: this.svg.group(),
            points: this.svg.group()
        };
        const g = new Grid_1.Grid(this, 'MAINGRID', {
            axisX: this.#pixelsPerUnit.x,
            axisY: this.#pixelsPerUnit.y,
            type: Grid_1.gridType.ORTHOGONAL
        });
        this.#figures.push(g);
        this.#layers.grids.add(g.svg);
        this.#createMarker(15);
    }
    _initSetWidthAndHeight(config) {
        if ((0, interfaces_1.isDrawConfigWidthHeight)(config)) {
            this.#width = config.width;
            this.#height = config.height;
        }
        else if ((0, interfaces_1.isDrawConfigUnitWidthHeight)(config)) {
            this.#width = config.dx * config.pixelsPerUnit;
            this.#height = config.dy * config.pixelsPerUnit;
        }
        else if ((0, interfaces_1.isDrawConfigUnitMinMax)(config)) {
            this.#width = (config.xMax - config.xMin) * config.pixelsPerUnit;
            this.#height = (config.yMax - config.yMin) * config.pixelsPerUnit;
        }
        else {
            this.#width = 800;
            this.#height = 600;
        }
    }
    _initGetContainerId(id) {
        let el;
        if (typeof id === 'string') {
            el = document.getElementById(id);
            if (!el) {
                el = document.getElementById('#' + id);
            }
            if (!el) {
                console.error('PiDraw: no HTML element found for ', id);
            }
        }
        else if (id instanceof HTMLElement) {
            el = id;
        }
        this.#container = el;
    }
    _initCreateSVG() {
        const wrapper = document.createElement('DIV');
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        this.#container.appendChild(wrapper);
        this.#svg = (0, svg_js_1.SVG)().addTo(wrapper).size('100%', '100%');
        this.#svg.viewbox(0, 0, this.#width, this.#height);
    }
    distanceToPixels(distance, direction) {
        if (direction === undefined || direction === Axis_1.AXIS.HORIZONTAL) {
            return distance * this.#pixelsPerUnit.x;
        }
        else {
            return distance * this.#pixelsPerUnit.y;
        }
    }
    unitsToPixels(point) {
        return {
            x: this.origin.x + (point.x * this.#pixelsPerUnit.x),
            y: this.origin.y - (point.y * this.#pixelsPerUnit.y)
        };
    }
    pixelsToUnits(point) {
        return {
            x: (point.x - this.origin.x) / this.#pixelsPerUnit.x,
            y: -(point.y - this.origin.y) / this.#pixelsPerUnit.y
        };
    }
    #validateFigure(figure, layer) {
        this.#figures.push(figure);
        if (figure instanceof Point_1.Point) {
            this.#points[figure.name] = figure;
        }
        this.#layers[layer ? layer : interfaces_1.LAYER.MAIN].add(figure.svg);
        figure.draw();
    }
    getFigure(name) {
        for (let figure of this.#figures) {
            if (figure.name === name) {
                return figure;
            }
        }
        return;
    }
    getPoint(name) {
        return this.#points[name];
    }
    axis() {
        const axisX = new Axis_1.Axis(this, 'x', Axis_1.AXIS.HORIZONTAL);
        const axisY = new Axis_1.Axis(this, 'y', Axis_1.AXIS.VERTICAL);
        this.#validateFigure(axisX, interfaces_1.LAYER.AXIS);
        this.#validateFigure(axisY, interfaces_1.LAYER.AXIS);
        return {
            x: axisX,
            y: axisY
        };
    }
    point(x, y, name) {
        const pixels = this.unitsToPixels({ x, y });
        const figure = new Point_1.Point(this, name, pixels);
        this.#validateFigure(figure, interfaces_1.LAYER.POINTS);
        return figure;
    }
    line(A, B, construction, name) {
        const figure = new Line_1.Line(this, name, (A instanceof Point_1.Point) ? A : this.getPoint(A), (B instanceof Point_1.Point) ? B : this.getPoint(B), construction);
        this.#validateFigure(figure);
        return figure;
    }
    circle(center, radius, name) {
        if (!(center instanceof Point_1.Point)) {
            return this.circle(this.point(center.x, center.y), radius, name);
        }
        let figure = new Circle_1.Circle(this, name, center, radius);
        this.#validateFigure(figure);
        return figure;
    }
    plot(fn, config, name) {
        const figure = new Plot_1.Plot(this, name, fn, config);
        this.#validateFigure(figure, interfaces_1.LAYER.PLOTS);
        return figure;
    }
    update() {
        for (let figure of this.#figures) {
            figure.update();
        }
        return this;
    }
    get container() {
        return this.#container;
    }
    get svg() {
        return this.#svg;
    }
    get width() {
        return this.#width;
    }
    get height() {
        return this.#height;
    }
    get origin() {
        return this.#origin;
    }
    get figures() {
        return this.#figures;
    }
    get freeze() {
        return this.#freeze;
    }
    get unitXDomain() {
        return {
            min: Math.round(-this.#origin.x / this.#pixelsPerUnit.x),
            max: Math.round((this.#width - this.#origin.x) / this.#pixelsPerUnit.x)
        };
    }
    get unitYDomain() {
        return {
            max: Math.round(-(this.#height - this.#origin.y) / this.#pixelsPerUnit.y),
            min: Math.round(this.#origin.y / this.#pixelsPerUnit.y)
        };
    }
    get points() {
        return this.#points;
    }
    get pixelsPerUnit() {
        return this.#pixelsPerUnit;
    }
    #createMarker(scale) {
        this.#markers = {
            start: null,
            end: null
        };
        this.#markers.start = this.svg.marker(scale * 1.2, scale * 1.2, function (add) {
            add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`).rotate(180);
        }).ref(0, scale / 2);
        this.#markers.end = this.svg.marker(scale + 5, scale + 5, function (add) {
            add.path(`M1,0 L1,${scale}, L${scale * 1.2},${scale / 2} L1,0z`);
        }).ref(scale, scale / 2);
    }
    get markers() {
        return this.#markers;
    }
    get layers() {
        return this.#layers;
    }
}
exports.Canvas = Canvas;
//# sourceMappingURL=Canvas.js.map