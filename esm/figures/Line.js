"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.LINERULE = void 0;
const Figure_1 = require("./Figure");
const geometry_1 = require("pimath/esm/maths/geometry");
const svg_js_1 = require("@svgdotjs/svg.js");
var LINERULE;
(function (LINERULE) {
    LINERULE[LINERULE["DEFAULT"] = 0] = "DEFAULT";
    LINERULE[LINERULE["PARALLEL"] = 1] = "PARALLEL";
    LINERULE[LINERULE["PERPENDICULAR"] = 2] = "PERPENDICULAR";
    LINERULE[LINERULE["TANGENT"] = 3] = "TANGENT";
})(LINERULE = exports.LINERULE || (exports.LINERULE = {}));
class Line extends Figure_1.Figure {
    #A;
    #B;
    #construction;
    #math;
    #segment;
    constructor(canvas, name, A, B, construction) {
        super(canvas, name);
        this.#A = A;
        this.#B = B;
        this.generateName();
        if (construction) {
            this.#construction = construction;
        }
        this.svg = this.canvas.svg.line(0, 0, 0, 0).stroke('black');
        this.updateFigure();
    }
    get segment() {
        return this.#segment;
    }
    set segment(value) {
        this.#segment = value;
    }
    get A() {
        return this.#A;
    }
    get B() {
        return this.#B;
    }
    isSegment(value) {
        this.#segment = value === undefined || value;
        this.update();
    }
    generateName() {
        if (this.name === undefined) {
            this.name = `d_${this.A.name + this.B.name}`;
        }
        return this.name;
    }
    updateFigure() {
        this.#math = new geometry_1.Line(new geometry_1.Point(this.#A.x, this.#A.y), new geometry_1.Point(this.#B.x, this.#B.y));
        if (this.#math.slope.isInfinity()) {
            if (this.svg instanceof svg_js_1.Line) {
                this.svg.plot(this.#A.x, 0, this.#A.x, this.canvas.height);
            }
        }
        else {
            let x1 = this.#segment ? this.#A.x : 0, x2 = this.#segment ? this.#B.x : this.canvas.width;
            if (this.svg instanceof svg_js_1.Line) {
                this.svg.plot(x1, this.#math.getValueAtX(x1).value, x2, this.#math.getValueAtX(x2).value);
            }
        }
        return this;
    }
}
exports.Line = Line;
//# sourceMappingURL=Line.js.map