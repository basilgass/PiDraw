"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const Figure_1 = require("./Figure");
const Grid_1 = require("./Grid");
const enums_1 = require("../variables/enums");
const Label_1 = require("./Label");
class Point extends Figure_1.Figure {
    _scale;
    _shape;
    _constrain;
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
    _x;
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.update();
    }
    _y;
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
    draggable(grid) {
        this._shape = enums_1.POINTSHAPE.HANDLE;
        this.updateFigure();
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
            if (grid !== null) {
                if (grid instanceof Grid_1.Grid) {
                    const intersection = grid.nearestPoint({ x, y });
                    x = intersection.x;
                    y = intersection.y;
                }
            }
            // Move the circle to the current positiovn
            handler.move(x, y);
            // TODO: Work with constrains.
            // Set the point shape coordinate
            point.x = x; //handler.el.cx()
            point.y = y; //handler.el.cy()
            // console.log(handler.el.cy())
            // Update the figures and labels.
            point.graph.update();
            // TODO: add after drag event ?
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
    }
}
exports.Point = Point;
//# sourceMappingURL=Point.js.map