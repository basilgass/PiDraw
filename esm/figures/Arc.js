"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arc = void 0;
const Figure_1 = require("./Figure");
const Point_1 = require("./Point");
const svg_js_1 = require("@svgdotjs/svg.js");
const Label_1 = require("./Label");
const Calculus_1 = require("../Calculus");
class Arc extends Figure_1.Figure {
    _angle;
    _center;
    _end;
    _mark;
    _radius;
    _radiusReference;
    _sector;
    _square;
    _start;
    constructor(graph, name, center, start, stop, radius) {
        super(graph, name);
        // Points that describe the arc
        this._center = center;
        this._start = start;
        this._end = stop;
        // Arc configuration
        this._square = false;
        this._mark = false;
        this._sector = false;
        // Calculated values
        this._angle = null;
        this._radius = null;
        this._radiusReference = null;
        if (radius === undefined) {
            this._radiusReference = this._start;
        }
        else if (radius instanceof Point_1.Point) {
            this._radiusReference = radius;
        }
        else {
            this._radius = radius;
        }
        this.svg = this.graph.svg.path(this.getPath()).stroke('black').fill('none');
        // Add the label
        this.generateName();
        this.label = new Label_1.Label(this.graph, name, { el: this });
        this.label.center().middle();
    }
    get center() {
        return this._center;
    }
    get start() {
        return this._start;
    }
    get end() {
        return this._end;
    }
    get angle() {
        let { start, end } = this.getAngles();
        this._angle = end - start;
        if (this._angle < 0) {
            this._angle = 360 + this._angle;
        }
        return this._angle;
    }
    get mark() {
        return this._mark;
    }
    set mark(value) {
        this._mark = value;
        this.update();
    }
    get square() {
        return this._square;
    }
    set square(value) {
        this._square = value;
        this.update();
    }
    get sector() {
        return this._sector;
    }
    set sector(value) {
        this._sector = value;
        this.update();
    }
    get getRadius() {
        if (this._radiusReference !== null) {
            return this._center.getDistanceTo(this._radiusReference);
        }
        else if (this._radius > 0) {
            return this._radius;
        }
        return 40;
    }
    get isSquare() {
        return (0, Calculus_1.numberCorrection)((this._start.x - this._center.x) * (this._end.x - this._center.x) + (this._start.y - this._center.y) * (this._end.y - this._center.y)) === 0;
    }
    generateName() {
        if (this.name === undefined) {
            return `a_${this._start.name}${this._center.name}${this._end.name}`;
        }
        return super.generateName();
    }
    generateDisplayName() {
        if (this.displayName) {
            this.label.displayName = this.displayName
                .replace('?', this.name)
                .replace('@', (+this.angle.toFixed(2)).toString());
        }
        else {
            this.label.displayName = this.name;
        }
        if (this.label.isHtml) {
            this.label.updateFigure();
        }
        return this;
    }
    updateFigure() {
        if (this.svg instanceof svg_js_1.Path) {
            this.svg.plot(this.getPath());
        }
        this.generateDisplayName();
        return this;
    }
    /**
     * Get coordinate by radius / angle
     * Reference: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
     * @param centerX
     * @param centerY
     * @param radius
     * @param angleInDegrees
     */
    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        const angleInRadians = -(angleInDegrees) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }
    /**
     * get the angle from Ox to OP, where O is origin and P is the handle
     * @param {Point} origin
     * @param {Point} handle
     * @returns {number}
     */
    cartesianToAngle(origin, handle) {
        let angle, dx = handle.x - origin.x, dy = -(handle.y - origin.y);
        angle = (handle.x - origin.x === 0) ? 90 : Math.atan(dy / dx) * 180.0 / Math.PI;
        // Depending on the position in the grid, modify the value.
        if (dx >= 0) {
            if (dy >= 0) {
                // 0 -> 90
            }
            else {
                // 270->360
                while (angle < 270) {
                    angle += 180;
                }
            }
        }
        else {
            if (dy >= 0) {
                // 90->180
                while (angle < 90) {
                    angle += 180;
                }
            }
            else {
                // 180->270
                while (angle < 180) {
                    angle += 180;
                }
            }
        }
        return angle;
    }
    /**
     * Calculate the start and end angle of an arc
     * @returns {{startAngle: number, endAngle: number}}
     */
    getAngles() {
        // Get the angles defined be the three points
        return {
            start: +this.cartesianToAngle(this._center, this._start).toFixed(10),
            end: +this.cartesianToAngle(this._center, this._end).toFixed(10)
        };
    }
    getPath() {
        // Get the angles
        let { start, end } = this.getAngles(), radius = (this.isSquare && this._square) ? this.getRadius / 2 : this.getRadius, startXY = this.polarToCartesian(this._center.x, this._center.y, radius, start), endXY = this.polarToCartesian(this._center.x, this._center.y, radius, end);
        if (this._square && this.isSquare) {
            return this._describeSquare(this._center, startXY, endXY);
        }
        else {
            return this._describeArc(this._center, startXY, endXY, radius, end - start);
        }
    }
    angleDirection(enable) {
        if (this.svg instanceof svg_js_1.Path) {
            if (enable) {
                this.svg.marker('end', this.graph.markers.end);
            }
            else {
                this.svg.marker('end', null);
            }
        }
        return this;
    }
    _describeSquare(center, start, end) {
        return [
            "M", start.x, start.y,
            "l", (end.x - center.x), (end.y - center.y),
            "L", end.x, end.y
        ].join(" ");
    }
    _describeArc(center, start, end, radius, angle) {
        let largeArcFlag = (angle + 360) % 360 <= 180 ? 0 : 1, swipeFlag = 0;
        if (this._mark && angle < 0 && angle > -180) {
            largeArcFlag = (largeArcFlag + 1) % 2;
            swipeFlag = 1;
        }
        let p = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, swipeFlag, end.x, end.y
        ];
        if (this._sector) {
            p = p.concat(['L', center.x, center.y, 'L', start.x, start.y]);
        }
        return p.join(" ");
    }
}
exports.Arc = Arc;
//# sourceMappingURL=Arc.js.map