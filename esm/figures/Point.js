"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const Figure_1 = require("./Figure");
const Grid_1 = require("./Grid");
const enums_1 = require("../variables/enums");
class Point extends Figure_1.Figure {
    #x;
    #y;
    #scale;
    #shape;
    #constrain;
    constructor(graph, name, pixels) {
        super(graph, name);
        this.#x = pixels.x;
        this.#y = pixels.y;
        this.generateName();
        this.#shape = enums_1.POINTSHAPE.CROSS;
        this.#scale = 6;
        this.#constrain = { type: enums_1.POINTCONSTRAIN.FIXED };
        this.#updateShape();
    }
    generateName() {
        if (this.name === undefined) {
            this.name = `P${Object.keys(this.graph.points).length}`;
        }
        return this.name;
    }
    #updateShape() {
        if (this.svg && this.#shape === this.svg.data('shape')) {
            return;
        }
        if (this.svg && this.#shape !== this.svg.data('shape')) {
            this.svg.remove();
        }
        if (this.#shape === enums_1.POINTSHAPE.CIRCLE) {
            this.svg = this.graph.svg.circle(this.#scale).stroke('black').fill('white').data('shape', enums_1.POINTSHAPE.CIRCLE);
        }
        else if (this.#shape === enums_1.POINTSHAPE.CROSS) {
            this.svg = this.graph.svg.path(`M${-this.#scale},${-this.#scale} L${+this.#scale},${+this.#scale} M${+this.#scale},${-this.#scale} L${-this.#scale},${+this.#scale}`).stroke('black').center(0, 0).data('shape', enums_1.POINTSHAPE.CROSS);
        }
        else if (this.#shape === enums_1.POINTSHAPE.HANDLE) {
            this.svg = this.graph.svg.circle(20).stroke('black').fill('white').opacity(0.4).data('shape', enums_1.POINTSHAPE.HANDLE);
        }
    }
    asCross() {
        this.#shape = enums_1.POINTSHAPE.CROSS;
        this.#updateShape();
        return this;
    }
    asCircle() {
        this.#shape = enums_1.POINTSHAPE.CIRCLE;
        this.update();
        return this;
    }
    setSize(value) {
        this.#scale = value;
        this.svg.data('shape', null);
        this.update();
        return this;
    }
    updateFigure() {
        if (this.freeze || this.graph.freeze) {
            return this;
        }
        this.#updateShape();
        this.#updateCoordinate();
        this.svg.center(this.#x, this.#y);
        return this;
    }
    #updateCoordinate() {
        if (this.#constrain.type === enums_1.POINTCONSTRAIN.MIDDLE) {
            const A = this.#constrain.data[0], B = this.#constrain.data[1];
            this.#x = (A.x + B.x) / 2;
            this.#y = (A.y + B.y) / 2;
        }
    }
    middleOf(A, B) {
        this.#constrain = {
            type: enums_1.POINTCONSTRAIN.MIDDLE,
            data: [A, B]
        };
        this.update();
        return this;
    }
    draggable(grid) {
        this.#shape = enums_1.POINTSHAPE.HANDLE;
        this.updateFigure();
        let point = this;
        function dragmove(e) {
            const { handler, box } = e.detail;
            let { x, y } = box;
            e.preventDefault();
            if (x < 0 || x > point.graph.width - box.width / 2) {
                return;
            }
            if (y < 0 || y > point.graph.height - box.height / 2) {
                return;
            }
            if (grid !== null) {
                if (grid instanceof Grid_1.Grid) {
                    const intersection = grid.nearestPoint({ x, y });
                    x = intersection.x;
                    y = intersection.y;
                }
            }
            handler.move(x, y);
            point.x = x;
            point.y = y;
            point.graph.update();
        }
        this.svg.draggable()
            .on('dragmove', dragmove);
        return this;
    }
    get x() {
        return this.#x;
    }
    get y() {
        return this.#y;
    }
    set x(value) {
        this.#x = value;
        this.update();
    }
    set y(value) {
        this.#y = value;
        this.update();
    }
    get coord() {
        return this.graph.pixelsToUnits(this);
    }
}
exports.Point = Point;
//# sourceMappingURL=Point.js.map