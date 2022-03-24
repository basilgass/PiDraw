"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.LINECONSTRUCTION = void 0;
const Figure_1 = require("./Figure");
const geometry_1 = require("pimath/esm/maths/geometry");
const svg_js_1 = require("@svgdotjs/svg.js");
const coefficients_1 = require("pimath/esm/maths/coefficients");
var LINECONSTRUCTION;
(function (LINECONSTRUCTION) {
    LINECONSTRUCTION["PARALLEL"] = "parallel";
    LINECONSTRUCTION["PERPENDICULAR"] = "perpendicular";
    LINECONSTRUCTION["TANGENT"] = "tangent";
    LINECONSTRUCTION["SLOPE"] = "slope";
})(LINECONSTRUCTION = exports.LINECONSTRUCTION || (exports.LINECONSTRUCTION = {}));
class Line extends Figure_1.Figure {
    constructor(graph, name, A, B, construction) {
        super(graph, name);
        this._A = A;
        this._B = B;
        this.generateName();
        if (construction) {
            this._construction = construction;
        }
        this.svg = this.graph.svg.line(0, 0, 0, 0).stroke('black');
        this.updateFigure();
    }
    get A() {
        return this._A;
    }
    get B() {
        return this._B;
    }
    get construction() {
        return this._construction;
    }
    get math() {
        return this._math;
    }
    get segment() {
        return this._segment;
    }
    set segment(value) {
        this._segment = value;
    }
    asSegment(value) {
        this._segment = value === undefined || value;
        this.update();
        return this;
    }
    asVector(value) {
        this._segment = value === undefined || value;
        if (this.svg instanceof svg_js_1.Line) {
            this.svg.marker('end', this.graph.markers.end);
        }
        this.update();
        return this;
    }
    generateName() {
        if (this.name === undefined) {
            if (this._B) {
                this.name = `d_${this.A.name + this.B.name}`;
            }
            else if (this._construction && this._construction.value instanceof Figure_1.Figure) {
                this.name = `p_${this._construction.value.name},${this.A.name}`;
            }
        }
        return this.name;
    }
    updateFigure() {
        if (this._B) {
            this._updateLineThroughAandB();
        }
        else {
            this._updateLineFromConstruction();
        }
        return this;
    }
    _updateLineThroughAandB() {
        this._math = new geometry_1.Line(new geometry_1.Point(this._A.x, this._A.y), new geometry_1.Point(this._B.x, this._B.y));
        if (this._math.slope.isInfinity()) {
            if (this.svg instanceof svg_js_1.Line) {
                this.svg.plot(this._A.x, 0, this._A.x, this.graph.height);
            }
        }
        else {
            let x1 = this._segment ? this._A.x : 0, x2 = this._segment ? this._B.x : this.graph.width;
            if (this.svg instanceof svg_js_1.Line) {
                this.svg.plot(x1, this._math.getValueAtX(x1).value, x2, this._math.getValueAtX(x2).value);
            }
        }
    }
    _updateLineFromConstruction() {
        let x1 = 0, y1 = 0, x2 = this.graph.width, y2 = this.graph.height;
        if (this._construction) {
            if ((this._construction.rule === LINECONSTRUCTION.PARALLEL)) {
                if (this._construction.value instanceof Line) {
                    let director = this._construction.value.math.director;
                    this._math = new geometry_1.Line(new geometry_1.Point(this._A.x, this._A.y), director, 1);
                }
            }
            if ((this._construction.rule === LINECONSTRUCTION.PERPENDICULAR)) {
                if (this._construction.value instanceof Line) {
                    let normal = this._construction.value.math.normal;
                    this._math = new geometry_1.Line(new geometry_1.Point(this._A.x, this._A.y), normal, 1);
                }
            }
            if ((this._construction.rule === LINECONSTRUCTION.SLOPE)) {
                if (!(this._construction.value instanceof Figure_1.Figure)) {
                    let value = new coefficients_1.Fraction(this._construction.value).value;
                    this._math = new geometry_1.Line(new geometry_1.Point(this._A.x, this._A.y), new geometry_1.Point(this._A.x + 1, this._A.y - value));
                }
            }
            if (this._math.slope.isInfinity()) {
                x1 = this._A.x;
                x2 = this._A.x;
                y1 = 0;
                y2 = this.graph.height;
            }
            else {
                y1 = this._math.getValueAtX(0).value;
                y2 = this._math.getValueAtX(this.graph.width).value;
            }
            if (this.svg instanceof svg_js_1.Line) {
                this.svg.plot(x1, y1, x2, y2);
            }
        }
    }
}
exports.Line = Line;
//# sourceMappingURL=Line.js.map