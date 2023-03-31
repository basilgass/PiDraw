"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.LINECONSTRUCTION = void 0;
const Figure_1 = require("./Figure");
const Point_1 = require("./Point");
const svg_js_1 = require("@svgdotjs/svg.js");
// import {Line as mathLine} from "pimath/esm/maths/geometry/line"
// import {Point as mathPoint} from "pimath/esm/maths/geometry/point"
// import {Fraction} from "pimath/esm/maths/coefficients/fraction";
// import {mathVector} from "pimath/esm/maths/geometry/vector";
const Label_1 = require("./Label");
const Calculus_1 = require("../Calculus");
const Circle_1 = require("./Circle");
var LINECONSTRUCTION;
(function (LINECONSTRUCTION) {
    LINECONSTRUCTION["PARALLEL"] = "parallel";
    LINECONSTRUCTION["PERPENDICULAR"] = "perpendicular";
    LINECONSTRUCTION["TANGENT"] = "tangent";
    LINECONSTRUCTION["SLOPE"] = "slope";
    LINECONSTRUCTION["BISSECTOR"] = "bissector";
})(LINECONSTRUCTION = exports.LINECONSTRUCTION || (exports.LINECONSTRUCTION = {}));
class Line extends Figure_1.Figure {
    constructor(graph, name, A, B, construction) {
        super(graph, name);
        this._A = A;
        this._B = B;
        this._scale = 1;
        this.generateName();
        // Construction
        if (construction) {
            this._construction = construction;
        }
        this.svg = this.graph.svg.line(0, 0, 0, 0).stroke('black');
        this.updateFigure();
        // Add the label
        this.label = new Label_1.Label(this.graph, name, { el: this });
        this.label.hide();
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
    _scale;
    get scale() {
        return this._scale;
    }
    set scale(value) {
        this._scale = value;
    }
    _segment;
    get segment() {
        return this._segment;
    }
    set segment(value) {
        this._segmentStart = value;
        this._segmentEnd = value;
        this._segment = value;
        this.update();
    }
    _segmentEnd;
    get segmentEnd() {
        return this._segmentEnd;
    }
    set segmentEnd(value) {
        this._segmentEnd = value;
        this._segment = this._segmentStart && this._segmentEnd;
        this.update();
    }
    _segmentStart;
    get segmentStart() {
        return this._segmentStart;
    }
    set segmentStart(value) {
        this._segmentStart = value;
        this._segment = this._segmentStart && this._segmentEnd;
        this.update();
    }
    get d() {
        if (this.B) {
            let A = this.graph.pixelsToUnits(this.A), B = this.graph.pixelsToUnits(this.B);
            return new Calculus_1.mathVector(B.x - A.x, B.y - A.y);
        }
        else {
            switch (this._construction.rule) {
                case LINECONSTRUCTION.SLOPE:
                    return new Calculus_1.mathVector(1, +this._construction.value);
                case LINECONSTRUCTION.PARALLEL:
                    if (this._construction.value instanceof Line) {
                        return this._construction.value.d;
                    }
                    break;
                case LINECONSTRUCTION.PERPENDICULAR:
                    if (this._construction.value instanceof Line) {
                        return this._construction.value.d.normal;
                    }
                    break;
                case LINECONSTRUCTION.TANGENT:
                    return new Calculus_1.mathVector(null, null);
            }
        }
        return new Calculus_1.mathVector(null, null);
    }
    asSegment(value, scale) {
        if (scale !== undefined) {
            this.scale = scale;
        }
        this.segment = value === undefined || value;
        this._addMarker(false);
        return this;
    }
    asVector(value, scale) {
        this.segment = value === undefined || value;
        if (scale !== undefined) {
            this.scale = scale;
        }
        this._addMarker(true);
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
    getPointOnLine() {
        let x, y;
        const slope = this.math.slope;
        if (slope === Number.POSITIVE_INFINITY || slope === Number.NEGATIVE_INFINITY) {
            // it's a vertical line
            y = 0;
            x = this.math.getValueAtY(0);
        }
        else {
            x = 0;
            y = this.math.getValueAtX(0);
        }
        return { x, y };
    }
    _addMarker(enable) {
        if (this.svg instanceof svg_js_1.Line) {
            if (enable) {
                this.svg.marker('end', this.graph.markers.end);
            }
            else {
                this.svg.marker('end', null);
            }
        }
        return this;
    }
    _updateLineThroughAandB() {
        this._math = new Calculus_1.mathLine(this._A, this._B);
        const slope = this._math.slope;
        if (slope === Number.POSITIVE_INFINITY || slope === Number.NEGATIVE_INFINITY) {
            if (this.svg instanceof svg_js_1.Line) {
                if (this._segmentStart === this._segmentEnd) {
                    this.svg.plot(this._A.x, this._segmentStart ? this._A.y : 0, this._A.x, this.segmentEnd ? this._B.y + (this._B.y - this._A.y) * (this.scale - 1) : this.graph.height);
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
                x2 = this._segmentEnd ? this._B.x + (this._B.x - this._A.x) * (this.scale - 1) : this.graph.width;
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
            if (this.svg instanceof svg_js_1.Line) {
                this.svg.plot(x1, this._math.getValueAtX(x1), x2, this._math.getValueAtX(x2));
            }
        }
    }
    _updateLineFromConstruction() {
        let x1 = 0, y1 = 0, x2 = this.graph.width, y2 = this.graph.height;
        if (this._construction) {
            if ((this._construction.rule === LINECONSTRUCTION.PARALLEL)) {
                if (this._construction.value instanceof Line) {
                    this._math = new Calculus_1.mathLine(this._A, this._construction.value.math.director);
                }
            }
            if ((this._construction.rule === LINECONSTRUCTION.PERPENDICULAR)) {
                if (this._construction.value instanceof Line) {
                    this._math = new Calculus_1.mathLine(this._A, this._construction.value.math.normal);
                }
            }
            if (this._construction.rule === LINECONSTRUCTION.BISSECTOR) {
                if (this._construction.options.length === 2) {
                    let A = this._construction.value, B = this._construction.options[0], C = this._construction.options[1];
                    if (A instanceof Point_1.Point && B instanceof Point_1.Point && C instanceof Point_1.Point) {
                        const AB = new Calculus_1.mathVector(A, B), normAB = AB.norm, AC = new Calculus_1.mathVector(A, C), normAC = AC.norm;
                        this._math = new Calculus_1.mathLine(A, new Calculus_1.mathVector(AB.x / normAB + AC.x / normAC, AB.y / normAB + AC.y / normAC));
                    }
                }
            }
            if ((this._construction.rule === LINECONSTRUCTION.SLOPE)) {
                if (!(this._construction.value instanceof Figure_1.Figure)) {
                    this._math = new Calculus_1.mathLine(this._A, (0, Calculus_1.isInfinity)(+this._construction.value) ?
                        new Calculus_1.mathVector(0, 1) :
                        new Calculus_1.mathVector(1, -this._construction.value));
                }
            }
            if (this._construction.rule === LINECONSTRUCTION.TANGENT) {
                // Construction value is [circle, point]
                if (this._construction.value instanceof Circle_1.Circle) {
                    const circle = this._construction.value, point = this._A;
                    const radius = circle.getRadiusAsPixels(), distance = circle.center.getDistanceTo(point);
                    // Point is inside => do nothing
                    if (distance < radius) {
                        return;
                    }
                    // Point is on the circle => perpendicular
                    if (distance === radius) {
                        this._math = new Calculus_1.mathLine(this._A, new Calculus_1.mathVector(circle.center, point).normal);
                    }
                    // Point is outside the circle => tangent
                    if (distance > radius) {
                        let c1 = circle.center.x, c2 = circle.center.y, p1 = point.x, p2 = point.y, r = circle.getRadiusAsPixels(), a = ((c1 - p1) ** 2) - (r ** 2), b = 2 * (c1 - p1) * (c2 - p2), c = ((c2 - p2) ** 2) - (r ** 2), delta = b ** 2 - 4 * a * c, m;
                        if (delta < 0) {
                            return;
                        }
                        // There are two tangents.
                        if (this._construction.k === undefined || this._construction.k === 1) {
                            // return the first tangent.
                            m = (-b + Math.sqrt(delta)) / (2 * a);
                        }
                        else {
                            // return the second tangent.
                            m = (-b - Math.sqrt(delta)) / (2 * a);
                        }
                        this._math = new Calculus_1.mathLine(this._A, (0, Calculus_1.isInfinity)(+m) ?
                            new Calculus_1.mathVector(0, 1) :
                            new Calculus_1.mathVector(1, -m));
                    }
                }
            }
            // Draw the line
            if ((0, Calculus_1.isInfinity)(this._math.slope)) {
                x1 = this._A.x;
                x2 = this._A.x;
                y1 = 0;
                y2 = this.graph.height;
            }
            else {
                y1 = this._math.getValueAtX(0);
                y2 = this._math.getValueAtX(this.graph.width);
            }
            if (this.svg instanceof svg_js_1.Line) {
                this.svg.plot(x1, y1, x2, y2);
            }
        }
    }
}
exports.Line = Line;
//# sourceMappingURL=Line.js.map