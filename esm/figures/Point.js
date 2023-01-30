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
const vector_1 = require("pimath/esm/maths/geometry/vector");
class Point extends Figure_1.Figure {
    _constrain;
    _scale;
    _shape;
    _x;
    _y;
    constructor(graph, name, pixels) {
        super(graph, name);
        this._x = pixels.x;
        this._y = pixels.y;
        this.generateName();
        this._shape = enums_1.POINTSHAPE.CROSS;
        this._scale = 6;
        this._constrain = { type: enums_1.POINTCONSTRAIN.FIXED };
        this._updateShape();
        // Add the label
        this.label = new Label_1.Label(this.graph, name, { el: this });
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
    addUnit(value, axis) {
        if (axis === undefined || axis === enums_1.AXIS.HORIZONTAL) {
            this.coordX = this.coord.x + value;
        }
        else {
            this.coordY = this.coord.y + value;
        }
        return this;
    }
    get tex() {
        let P = this.graph.pixelsToUnits(this);
        return `${this.name}${this.coordAsTex}`;
    }
    get coordAsTex() {
        let P = this.graph.pixelsToUnits(this);
        return `\\left( ${P.x} ; ${P.y} \\right)`;
    }
    generateName() {
        if (this.name === undefined) {
            this.name = `P${Object.keys(this.graph.points).length}`;
        }
        return this.name;
    }
    asCross() {
        this._shape = enums_1.POINTSHAPE.CROSS;
        this._updateShape();
        return this;
    }
    asCircle(size) {
        if (size !== undefined && size > 0) {
            this._scale = size;
        }
        this._shape = enums_1.POINTSHAPE.CIRCLE;
        this.update();
        return this;
    }
    asSquare(size, orientation) {
        if (size !== undefined && size > 0) {
            this._scale = size;
        }
        if (orientation !== undefined) {
            // TODO: add the orientation to the square - really useful ?
            console.log(orientation.tex);
        }
        this._shape = enums_1.POINTSHAPE.SQUARE;
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
    getDistanceTo(value) {
        if (value instanceof Point) {
            return Math.sqrt((this.x - value.x) ** 2 + (this.y - value.y) ** 2);
        }
        return 40;
    }
    updateFigure() {
        // The update mechanism is frozen.
        if (this.freeze || this.graph.freeze) {
            return this;
        }
        this._updateShape();
        this._updateCoordinate();
        this.svg.center(this._x, this._y);
        return this;
    }
    updateLabel() {
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
    fromVector(A, B, scale) {
        this._constrain = {
            type: enums_1.POINTCONSTRAIN.VECTOR,
            data: [A, B, scale]
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
            // Update the value to match the grid
            if (options.grid) {
                if (options.grid instanceof Grid_1.Grid) {
                    const intersection = options.grid.nearestPoint({ x, y });
                    x = intersection.x;
                    y = intersection.y;
                }
            }
            // Constrain
            if (options.constrain) {
                if (options.constrain.includes('x')) {
                    y = point.y;
                }
                else if (options.constrain.includes('y')) {
                    x = point.x;
                }
                else {
                    for (let c of options.constrain) {
                        if (c instanceof Circle_1.Circle) {
                            let v = new vector_1.Vector(c.center, { x, y }), r = c.getRadiusAsPixels();
                            x = c.center.x + v.x.value / v.norm * r;
                            y = c.center.y + v.y.value / v.norm * r;
                        }
                        else if (c instanceof Line_1.Line) {
                            y = c.math.getValueAtX(x).value;
                        }
                        else if (c instanceof Plot_1.Plot) {
                            const pt = point.graph.pixelsToUnits({ x, y });
                            y = point.graph.unitsToPixels(c.evaluate(pt.x)).y;
                        }
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
            this.svg = this.graph.svg.circle(this._scale).stroke('black').fill('white').data('shape', enums_1.POINTSHAPE.CIRCLE);
        }
        else if (this._shape === enums_1.POINTSHAPE.CROSS) {
            this.svg = this.graph.svg.path(`M${-this._scale},${-this._scale} L${+this._scale},${+this._scale} M${+this._scale},${-this._scale} L${-this._scale},${+this._scale}`).stroke('black').center(0, 0).data('shape', enums_1.POINTSHAPE.CROSS);
        }
        else if (this._shape === enums_1.POINTSHAPE.SQUARE) {
            this.svg = this.graph.svg.path(`M${-this._scale},${-this._scale} L${+this._scale},${-this._scale} L${+this._scale},${+this._scale} L${-this._scale},${+this._scale} Z`).stroke('black').center(0, 0).data('shape', enums_1.POINTSHAPE.SQUARE);
        }
        else if (this._shape === enums_1.POINTSHAPE.HANDLE) {
            this.svg = this.graph.svg.circle(20).stroke('black').fill('white').opacity(0.4).data('shape', enums_1.POINTSHAPE.HANDLE);
        }
    }
    _updateCoordinate() {
        if (this._constrain.type === enums_1.POINTCONSTRAIN.MIDDLE) {
            const A = this._constrain.data[0], B = this._constrain.data[1];
            this._x = (A.x + B.x) / 2;
            this._y = (A.y + B.y) / 2;
        }
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
                let u = to.math.director, A = { x: 0, y: to.math.getValueAtX(0).value }, // Point on the line
                AP = new vector_1.Vector(A, M), k = vector_1.Vector.scalarProduct(AP, u) / u.normSquare.value;
                this._x = A.x + k * u.x.value;
                this._y = A.y + k * u.y.value;
            }
        }
        if (this._constrain.type === enums_1.POINTCONSTRAIN.VECTOR) {
            const A = this._constrain.data[0], B = this._constrain.data[1], scale = this._constrain.data[2];
            this._x = A.x + (B.x - A.x) * scale;
            this._y = A.y + (B.y - A.y) * scale;
        }
    }
}
exports.Point = Point;
//# sourceMappingURL=Point.js.map