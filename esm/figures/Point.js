"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const Figure_1 = require("./Figure");
const Grid_1 = require("./Grid");
const enums_1 = require("../variables/enums");
const Label_1 = require("./Label");
const Circle_1 = require("./Circle");
const Line_1 = require("./Line");
const Plot_1 = require("./Plot");
const Calculus_1 = require("../Calculus");
const svg_js_1 = require("@svgdotjs/svg.js");
class Point extends Figure_1.Figure {
    get shape() {
        return this._shape;
    }
    _constrain;
    _scale;
    _shape;
    _trace;
    _isTracing;
    _hiddenPoint;
    _defaultScale;
    _x;
    _y;
    constructor(graph, name, pixels) {
        super(graph, name);
        this._defaultScale = 6;
        this._x = pixels.x;
        this._y = pixels.y;
        this._shape = enums_1.POINTSHAPE.CIRCLE;
        this._scale = +this._defaultScale;
        this._hiddenPoint = false;
        this._constrain = { type: enums_1.POINTCONSTRAIN.FIXED };
        // this._updateShape()
        // Add the label
        this.generateName();
        this.label = new Label_1.Label(this.graph, name, { el: this });
    }
    get isTracing() {
        return this._isTracing;
    }
    set isTracing(value) {
        this._isTracing = value;
    }
    get hiddenPoint() {
        return this._hiddenPoint;
    }
    set hiddenPoint(value) {
        this._hiddenPoint = value;
    }
    get defaultScale() {
        return this._defaultScale;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.update();
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.update();
    }
    get coord() {
        return this.graph.pixelsToUnits(this);
    }
    set coord(value) {
        this.coordX = value.x;
        this.coordY = value.y;
    }
    set coordX(value) {
        this._x = this.graph.unitsToPixels({
            x: value,
            y: 0
        }).x;
    }
    set coordY(value) {
        this._y = this.graph.unitsToPixels({
            x: 0,
            y: value
        }).y;
    }
    get coordAsTex() {
        let P = this.graph.pixelsToUnits(this);
        return `\\left( ${P.x} ; ${P.y} \\right)`;
    }
    addUnit(value, axis) {
        if (axis === undefined || axis === enums_1.AXIS.HORIZONTAL) {
            this.coordX = this.coord.x + value;
        }
        else {
            this.coordY = this.coord.y + value;
        }
        return this;
    }
    asCross() {
        this._shape = enums_1.POINTSHAPE.CROSS;
        this.update();
        return this;
    }
    asCircle(size) {
        if (size !== undefined && size > 0) {
            this.setSize(size);
        }
        this._shape = enums_1.POINTSHAPE.CIRCLE;
        this.update();
        return this;
    }
    asSquare(size) {
        if (size !== undefined && size > 0) {
            this.setSize(size);
        }
        this._shape = enums_1.POINTSHAPE.SQUARE;
        this.update();
        return this;
    }
    asTick(size) {
        if (size !== undefined && size > 0) {
            this.setSize(size);
        }
        this._shape = enums_1.POINTSHAPE.TICK;
        this.update();
        return this;
    }
    setSize(value) {
        this._scale = value;
        // Force update
        this.svg.data('shape', null);
        this.update();
        return this;
    }
    getDistanceTo(value, byDefault = 40) {
        if (value instanceof Point) {
            return Math.sqrt((this.x - value.x) ** 2 + (this.y - value.y) ** 2);
        }
        return byDefault;
    }
    updateFigure() {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) {
            return this;
        }
        this._updateShape();
        this._updateCoordinate();
        this.svg.center(this._x, this._y);
        this.generateDisplayName();
        return this;
    }
    updateLabel() {
        return this;
    }
    generateName() {
        if (this.name === undefined) {
            this.name = `P${Object.keys(this.graph.points).length}`;
        }
        return super.generateName();
    }
    generateDisplayName() {
        if (this.displayName) {
            this.label.displayName = this.displayName
                .replace('?', this.name)
                .replace('@', this.coordAsTex);
        }
        else {
            this.label.displayName = this.name;
        }
        // TODO: check if removing this extra updateFigure breaks things...
        // if (this.label.isHtml) {
        //     this.label.updateFigure()
        // }
        return this;
    }
    /**
     * Constrain the point to be the middle of two other points.
     * @param {Point} A
     * @param {Point} B
     * @returns {Point}
     */
    middleOf(A, B) {
        this._constrain = {
            type: enums_1.POINTCONSTRAIN.MIDDLE,
            data: [A, B]
        };
        this.update();
        return this;
    }
    intersectionOf(a, b, k) {
        if (b instanceof Line_1.Line) {
            this._constrain = {
                type: enums_1.POINTCONSTRAIN.INTERSECTION_LINES,
                data: [a, b]
            };
        }
        else if (b instanceof Circle_1.Circle) {
            this._constrain = {
                type: enums_1.POINTCONSTRAIN.INTERSECTION_CIRCLE_LINE,
                data: [b, a, k === undefined ? 1 : k]
            };
        }
        return this;
    }
    fromVector(A, B, scale, X) {
        this._constrain = {
            type: enums_1.POINTCONSTRAIN.VECTOR,
            data: [A, B, scale, X]
        };
        this.update();
        return this;
    }
    fromDirection(A, d, size, perpendicular) {
        this._constrain = {
            type: enums_1.POINTCONSTRAIN.DIRECTION,
            data: [A, d, size, perpendicular]
        };
        this.update();
        return this;
    }
    fromCoord(ptX, ptY) {
        this._constrain = {
            type: enums_1.POINTCONSTRAIN.COORDINATES,
            data: [ptX, ptY]
        };
        this.update();
        return this;
    }
    /**
     * Constrain the point to be bound to an axis or projection
     * @param A: Point
     * @param to: Line | string
     */
    projection(A, to) {
        this._constrain = {
            type: enums_1.POINTCONSTRAIN.PROJECTION,
            data: [A, to]
        };
        this.update();
        return this;
    }
    symmetry(A, of) {
        this._constrain = {
            type: enums_1.POINTCONSTRAIN.SYMMETRY,
            data: [A, of]
        };
        this.update();
        return this;
    }
    draggable(options) {
        this._shape = enums_1.POINTSHAPE.HANDLE;
        this.updateFigure();
        if (options === undefined)
            options = {};
        let point = this;
        // let grid = this.graph.getFigure('MAINGRID')
        function dragmove(e) {
            // Get the event details
            const { handler, box } = e.detail;
            // Get the bounding box
            let { x, y } = box;
            // Prevent default behavior
            e.preventDefault();
            // Do not allow to go outside the graph.
            if (x < 0 || x > point.graph.width - box.width / 2) {
                return;
            }
            if (y < 0 || y > point.graph.height - box.height / 2) {
                return;
            }
            // Do not allow to go outside the bounds.
            if (options.bounds?.x) {
                if (x < point.graph.unitsToPixels({ x: options.bounds.x[0], y: 0 }).x ||
                    x > point.graph.unitsToPixels({ x: options.bounds.x[1], y: 0 }).x) {
                    return;
                }
            }
            if (options.bounds?.y) {
                if (y > point.graph.unitsToPixels({ y: options.bounds.y[0], x: 0 }).y ||
                    y < point.graph.unitsToPixels({ y: options.bounds.y[1], x: 0 }).y) {
                    return;
                }
            }
            // Constrain
            if (options.constrain) {
                // Update the value to match the grid
                if (options.constrain instanceof Grid_1.Grid) {
                    const intersection = options.constrain.nearestPoint({ x, y });
                    x = intersection.x;
                    y = intersection.y;
                }
                else if (options.constrain === 'x') {
                    y = point.y;
                }
                else if (options.constrain === 'y') {
                    x = point.x;
                }
                else {
                    if (options.constrain instanceof Circle_1.Circle) {
                        let v = new Calculus_1.mathVector(options.constrain.center, { x, y }), r = options.constrain.getRadiusAsPixels();
                        if (options.bounds?.d) {
                            const d = Math.sqrt(v.x ** 2 + v.y ** 2);
                            if (d < options.bounds.d[0] || d > options.bounds.d[1]) {
                                r = (d < options.bounds.d[0]) ? options.bounds.d[0] : options.bounds.d[1];
                                x = options.constrain.center.x + v.x / v.norm * r;
                                y = options.constrain.center.y + v.y / v.norm * r;
                            }
                        }
                        else {
                            x = options.constrain.center.x + v.x / v.norm * r;
                            y = options.constrain.center.y + v.y / v.norm * r;
                        }
                    }
                    else if (options.constrain instanceof Line_1.Line) {
                        //TODO: must constrain to the segment
                        y = options.constrain.math.getValueAtX(x);
                    }
                    else if (options.constrain instanceof Plot_1.Plot) {
                        const pt = point.graph.pixelsToUnits({ x, y });
                        y = point.graph.unitsToPixels(options.constrain.evaluate(pt.x)).y;
                    }
                }
            }
            // Move the circle to the current position
            handler.move(x, y);
            // Set the point shape coordinate
            point.x = x; //handler.el.cx()
            point.y = y; //handler.el.cy()
            // console.log(handler.el.cy())
            // Update the figures and labels.
            point.graph.update();
            // Callback at the end, with the point
            if (options.callback) {
                options.callback(point);
            }
        }
        this.svg.draggable()
            .on('dragmove', dragmove);
        return this;
    }
    makeInvisible(value) {
        this._hiddenPoint = value !== false;
        this.hide();
        return this;
    }
    isInvisible() {
        return this._hiddenPoint;
    }
    trace(color, width) {
        // Initilaisation must be with parameters.
        if (this._trace == undefined && color === undefined)
            return;
        // Make sur the group exists.
        if (this._trace === undefined) {
            this._trace = this.graph.svg.group();
            this._isTracing = {
                enabled: true,
                color: color,
                width: width ? width : this._scale
            };
        }
        // Add the point to the group.
        const pt = this.svg.clone();
        pt.fill(this._isTracing.color);
        pt.stroke(this._isTracing.color);
        // @ts-ignore
        pt.radius(this._isTracing.width);
        this._trace.add(pt);
        //
        // // When moving the point add a new point to the group
        // this.svg.on('dragmove', (e: any) => {
        //     const {handler, box} = e.detail;
        //     let {x, y} = box;
        //
        //     // Prevent default behavior
        //     e.preventDefault()
        //
        //     // Do not allow to go outside the graph.
        //     if (x < 0 || x > this.graph.width - box.width / 2) {
        //         return
        //     }
        //     if (y < 0 || y > this.graph.height - box.height / 2) {
        //         return
        //     }
        //
        //     // Add the point to the group.
        //     this._trace.add(this.svg.clone().stroke(color).stroke({width}))
        // })
    }
    _updateShape() {
        // If the shape exist and is the same, no need to continue.
        if (this.svg && this._shape === this.svg.data('shape')) {
            return;
        }
        // Remove the current shape if it already exist and is not the same
        if (this.svg && this._shape !== this.svg.data('shape')) {
            this.svg.remove();
        }
        // Create the new shape
        if (this._shape === enums_1.POINTSHAPE.CIRCLE) {
            this.svg = this.graph.svg.circle(this._scale)
                .stroke('black').fill('white')
                .data('shape', enums_1.POINTSHAPE.CIRCLE);
        }
        else if (this._shape === enums_1.POINTSHAPE.CROSS) {
            this.svg = this.graph.svg
                .path(`M${-this._scale},${-this._scale} L${+this._scale},${+this._scale} M${+this._scale},${-this._scale} L${-this._scale},${+this._scale}`)
                .stroke('black')
                .data('shape', enums_1.POINTSHAPE.CROSS);
        }
        else if (this._shape === enums_1.POINTSHAPE.SQUARE) {
            this.svg = this.graph.svg
                .path(`M${-this._scale},${-this._scale} L${+this._scale},${-this._scale} L${+this._scale},${+this._scale} L${-this._scale},${+this._scale} Z`)
                .stroke('black')
                .data('shape', enums_1.POINTSHAPE.SQUARE);
        }
        else if (this._shape === enums_1.POINTSHAPE.HANDLE) {
            this.svg = this.graph.svg.circle(20)
                .stroke('black').fill('white').opacity(0.4)
                .data('shape', enums_1.POINTSHAPE.HANDLE);
        }
        else if (this._shape === enums_1.POINTSHAPE.TICK) {
            if (this.coord.x !== 0 && this.coord.y === 0) {
                this.svg = this.graph.svg
                    .path(`M0,${-this._scale} L0,${this._scale}`)
                    .stroke('black')
                    .data('shape', enums_1.POINTSHAPE.TICK);
            }
            else if (this.coord.x === 0 && this.coord.y !== 0) {
                this.svg = this.graph.svg
                    .path(`M${-this._scale},0 L${this._scale},0`)
                    .stroke('black')
                    .data('shape', enums_1.POINTSHAPE.TICK);
            }
            else {
                this.svg = this.graph.svg
                    .path(`M${-this._scale},0 L${this._scale},0 M0,${-this._scale} L0,${this._scale}`)
                    .stroke('black')
                    .data('shape', enums_1.POINTSHAPE.TICK);
            }
        }
    }
    _updateCoordinate() {
        // this._constrain.data = [Point, Point]
        if (this._constrain.type === enums_1.POINTCONSTRAIN.MIDDLE) {
            const A = this._constrain.data[0], B = this._constrain.data[1];
            this._x = (A.x + B.x) / 2;
            this._x = (A.x + B.x) / 2;
            this._y = (A.y + B.y) / 2;
        }
        // this._constrain.data = [Line, Line]
        if (this._constrain.type === enums_1.POINTCONSTRAIN.INTERSECTION_LINES) {
            let a = this._constrain.data[0].math, b = this._constrain.data[1].math, intersection = a.intersection(b);
            if (intersection !== null) {
                this._x = intersection.x;
                this._y = intersection.y;
                this.show();
            }
            else {
                // TODO: must mark an invalid point
                this.hide();
            }
        }
        // this._constrain.data = [circle, line, k]
        if (this._constrain.type === enums_1.POINTCONSTRAIN.INTERSECTION_CIRCLE_LINE) {
            let circle = this._constrain.data[0], d = this._constrain.data[1], k = this._constrain.data[2] || 1;
            // Get the intersection of the circle with the line.
            const m = d.math.slope, h = d.math.ordinate, r = circle.getRadiusAsPixels(), c1 = circle.center.x, c2 = circle.center.y, a = m ** 2 + 1, b = -2 * c1 + 2 * m * (h - c2), c = c1 ** 2 + (h - c2) ** 2 - r ** 2, delta = b ** 2 - 4 * a * c;
            if (delta < 0) {
                this.hide();
                return;
            }
            this.show();
            if (delta === 0) {
                this._x = -b / (2 * a);
                this._y = m * (-b / (2 * a)) + h;
            }
            else {
                const x1 = (-b + Math.sqrt(delta)) / (2 * a), y1 = m * x1 + h, x2 = (-b - Math.sqrt(delta)) / (2 * a), y2 = m * x2 + h;
                if (x1 <= x2) {
                    this._x = k === 1 ? x1 : x2;
                    this._y = k === 1 ? y1 : y2;
                }
                else {
                    this._x = k === 1 ? x2 : x1;
                    this._y = k === 1 ? y2 : y1;
                }
            }
        }
        // this._constrain.data = [Point, Line|string]
        if (this._constrain.type === enums_1.POINTCONSTRAIN.PROJECTION) {
            const M = this._constrain.data[0], to = this._constrain.data[1];
            if (to === 'Ox') {
                this._x = M.x;
                this._y = this.graph.origin.y;
            }
            else if (to === 'Oy') {
                this._x = this.graph.origin.x;
                this._y = M.y;
            }
            else if (to instanceof Line_1.Line) {
                // Get the projection to a line.
                let u = to.math.director, A = to.getPointOnLine(), // Point on the line
                AP = new Calculus_1.mathVector(A, M), k = Calculus_1.mathVector.scalarProduct(AP, u) / (u.norm ** 2);
                this._x = A.x + k * u.x;
                this._y = A.y + k * u.y;
            }
        }
        // this._constrain.data = [A:Point, symmetry:Point|string|Line]
        if (this._constrain.type === enums_1.POINTCONSTRAIN.SYMMETRY) {
            const symmetry_reference = this._constrain.data[1], pt = this._constrain.data[0];
            if (pt instanceof Point && symmetry_reference instanceof Point) {
                this._x = pt.x + 2 * (symmetry_reference.x - pt.x);
                this._y = pt.y + 2 * (symmetry_reference.y - pt.y);
            }
            else if (typeof symmetry_reference === "string") {
                if (symmetry_reference === 'Ox') {
                    this._x = pt.x;
                    this._y = this.graph.origin.y - (pt.y - this.graph.origin.y);
                }
                else if (symmetry_reference === 'Oy') {
                    this._x = this.graph.origin.x - (pt.x - this.graph.origin.x);
                    this._y = pt.y;
                }
            }
            else if (symmetry_reference instanceof Line_1.Line) {
                // Get the projection to a line.
                let u = symmetry_reference.math.director;
                let A = symmetry_reference.getPointOnLine(), // Point on the line
                AP = new Calculus_1.mathVector(A, pt), k = Calculus_1.mathVector.scalarProduct(AP, u) / (u.norm ** 2), proj = {
                    x: A.x + k * u.x,
                    y: A.y + k * u.y
                };
                this._x = pt.x + 2 * (proj.x - pt.x);
                this._y = pt.y + 2 * (proj.y - pt.y);
            }
        }
        // this._constrain.data = [A:Point, B:Point, scale, <From point>Point]
        if (this._constrain.type === enums_1.POINTCONSTRAIN.VECTOR) {
            const A = this._constrain.data[0], B = this._constrain.data[1], scale = this._constrain.data[2], X = this._constrain.data[3];
            if (X) {
                this._x = X.x + (B.x - A.x) * scale;
                this._y = X.y + (B.y - A.y) * scale;
            }
            else {
                this._x = A.x + (B.x - A.x) * scale;
                this._y = A.y + (B.y - A.y) * scale;
            }
        }
        // this._constrain.data = [A:Point, d:Line, distance:number, perpendicular:boolean]
        if (this._constrain.type === enums_1.POINTCONSTRAIN.DIRECTION) {
            const A = this._constrain.data[0], d = this._constrain.data[1], perp = this._constrain.data[3], v = perp ? d.math.normal : d.math.director, norm = v.norm;
            let distance = 1;
            if (!isNaN(this._constrain.data[2])) {
                distance = this.graph.distanceToPixels(this._constrain.data[2]);
            }
            else {
                // this._constrain.data[2]
                // return {
                //     type: STEP_TYPE.number,
                //     kind: STEP_KIND.dynamic,
                //     item: [A, B],
                //     option: 'distance'
                // }
                const [X, Y] = this._constrain.data[2].item;
                if (X instanceof Point && Y instanceof Point) {
                    distance = X.getDistanceTo(Y);
                }
            }
            this._x = A.x + v.x * distance / norm;
            this._y = A.y + v.y * distance / norm;
        }
        // this._constrain.data = [A:StepValueType, B:StepValueType]
        // StepValueType: {
        //      type<number|figure|point|option>,
        //      kind<static|dynamic>,
        //      item<Point | Figure | string | number | (Point|Figure|number)[]>,
        //      option?: string
        // }
        if (this._constrain.type === enums_1.POINTCONSTRAIN.COORDINATES) {
            let ptX, ptY;
            [ptX, ptY] = this._constrain.data;
            this._x = this._updateOneCoordinate(ptX);
            this._y = this._updateOneCoordinate(ptY);
        }
    }
    _updateOneCoordinate(value) {
        if (!isNaN(+value.item)) {
            return this.graph.unitsToPixels({ x: +value.item, y: 0 }).x;
        }
        else {
            if (value.option === 'x' && value.item instanceof Point) {
                return value.item.x;
            }
            else if (value.option === 'y' && value.item instanceof Point) {
                return value.item.y;
            }
            else if (value.option === 'distance' && value.item instanceof svg_js_1.Array) {
                const [X, Y, direction] = value.item;
                if (X instanceof Point && Y instanceof Point)
                    return this.graph.origin.x + (+direction) * X.getDistanceTo(Y);
            }
            else if (value.option === "function" && value.item instanceof svg_js_1.Array) {
                const [f, v] = value.item;
                if (f instanceof Plot_1.Plot) {
                    const vx = this.graph.pixelsToUnits({
                        x: this._updateOneCoordinate(v),
                        y: 0
                    }).x;
                    return this.graph.unitsToPixels({
                        x: +v,
                        y: f.evaluate(vx).y
                    }).y;
                }
            }
            else {
                console.warn("Point constrain is not supported for ");
                console.log(this._constrain);
            }
        }
    }
}
exports.Point = Point;
//# sourceMappingURL=Point.js.map