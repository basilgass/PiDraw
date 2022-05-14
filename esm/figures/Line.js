"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.LINECONSTRUCTION = void 0;
const Figure_1 = require("./Figure");
const svg_js_1 = require("@svgdotjs/svg.js");
const line_1 = require("pimath/esm/maths/geometry/line");
const point_1 = require("pimath/esm/maths/geometry/point");
const esm_1 = require("pimath/esm");
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
        // Construction
        if (construction) {
            this._construction = construction;
        }
        this.svg = this.graph.svg.line(0, 0, 0, 0).stroke('black');
        this.updateFigure();
    }
    _A;
    get A() {
        return this._A;
    }
    _B;
    get B() {
        return this._B;
    }
    _construction;
    get construction() {
        return this._construction;
    }
    _math;
    get math() {
        return this._math;
    }
    _segment;
    _segmentStart;
    _segmentEnd;
    get segment() {
        return this._segment;
    }
    set segment(value) {
        this._segmentStart = value;
        this._segmentEnd = value;
        this._segment = value;
        this.update();
    }
    get segmentStart() {
        return this._segmentStart;
    }
    set segmentStart(value) {
        this._segmentStart = value;
        this.update();
    }
    get segmentEnd() {
        return this._segmentEnd;
    }
    set segmentEnd(value) {
        this._segmentEnd = value;
        this.update();
    }
    asSegment(value) {
        this.segment = value === undefined || value;
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
        this._math = new line_1.Line(new point_1.Point(this._A.x, this._A.y), new point_1.Point(this._B.x, this._B.y));
        console.log('A', this._A.x, this._A.y);
        console.log('B', this._B.x, this._B.y);
        if (this._math.slope.isInfinity()) {
            if (this.svg instanceof svg_js_1.Line) {
                if (this._segmentStart === this._segmentEnd) {
                    this.svg.plot(this._A.x, this._segmentStart ? this._A.y : 0, this._A.x, this.segmentEnd ? this._B.y : this.graph.height);
                }
                else {
                    if (this._segmentStart) {
                        this.svg.plot(this._A.x, this._A.y > this._B.y ? 0 : this._A.y, this._A.x, this._A.y > this._B.y ? this._A.y : this.graph.height);
                    }
                    else {
                        this.svg.plot(this._A.x, this._A.y > this._B.y ? this._B.y : 0, this._A.x, this._A.y > this._B.y ? this.graph.height : this._B.y);
                    }
                }
            }
        }
        else {
            let x1, x2;
            if (this._segmentStart === this._segmentEnd) {
                x1 = this._segmentStart ? this._A.x : 0;
                x2 = this._segmentEnd ? this._B.x : this.graph.width;
            }
            else {
                if (this._segmentStart) {
                    x1 = this.A.x > this.B.x ? 0 : this.A.x;
                    x2 = this.A.x > this.B.x ? this.A.x : this.graph.width;
                }
                else {
                    x1 = this.A.x > this.B.x ? this._B.x : 0;
                    x2 = this.A.x > this.B.x ? this.graph.width : this.B.x;
                }
            }
            // [AB]=[BA] OK
            // ]AB[=]BA[ OK
            // the problem comes for half rules - the order is then important depending of the relative position of each reference point
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
                    this._math = new line_1.Line(new point_1.Point(this._A.x, this._A.y), this._construction.value.math.director, LINECONSTRUCTION.PARALLEL);
                }
            }
            if ((this._construction.rule === LINECONSTRUCTION.PERPENDICULAR)) {
                if (this._construction.value instanceof Line) {
                    this._math = new line_1.Line(new point_1.Point(this._A.x, this._A.y), this._construction.value.math.director, LINECONSTRUCTION.PERPENDICULAR);
                }
            }
            if ((this._construction.rule === LINECONSTRUCTION.SLOPE)) {
                if (!(this._construction.value instanceof Figure_1.Figure)) {
                    let value = new esm_1.PiMath.Fraction(this._construction.value).value;
                    this._math = new line_1.Line(new point_1.Point(this._A.x, this._A.y), new point_1.Point(this._A.x + 1, this._A.y - value));
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