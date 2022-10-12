"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axis = void 0;
const Figure_1 = require("./Figure");
const enums_1 = require("../variables/enums");
const svg_js_1 = require("@svgdotjs/svg.js");
class Axis extends Figure_1.Figure {
    _minaxis;
    _offset;
    _orientation;
    constructor(graph, name, orientation) {
        super(graph, name);
        this.generateName();
        this._orientation = orientation;
        this._offset = 0.2;
        const markers = this.graph.createMarker(8);
        let { x1, y1, x2, y2 } = this._generateCoordinates();
        this._minaxis = false;
        this.svg = graph.svg.line(x1, y1, x2, y2).stroke({ width: 2, color: 'black' }).marker('end', markers.end);
    }
    get minaxis() {
        return this._minaxis;
    }
    set minaxis(value) {
        this._minaxis = value;
    }
    generateName() {
        let n = this.graph.figures.filter(fig => fig instanceof Axis).length;
        if (n === 0) {
            return 'x';
        }
        else if (n === 1) {
            return 'y';
        }
        else {
            return `axe_${n}`;
        }
    }
    update() {
        if (this.svg instanceof svg_js_1.Line) {
            let { x1, y1, x2, y2 } = this._generateCoordinates();
            this.svg.plot(x1, y1, x2, y2);
        }
        return this;
    }
    setMinAxis(minaxis) {
        if (minaxis === true) {
            this._minaxis = true;
        }
        else if (minaxis === false) {
            this._minaxis = false;
        }
        return this;
    }
    _generateCoordinates() {
        if (this._minaxis) {
            if (this._orientation === enums_1.AXIS.VERTICAL) {
                return {
                    x1: this.graph.origin.x,
                    y1: this.graph.origin.y + this.graph.pixelsPerUnit.y * this._offset,
                    x2: this.graph.origin.x,
                    y2: this.graph.origin.y - this.graph.pixelsPerUnit.y
                };
            }
            else if (this._orientation === enums_1.AXIS.HORIZONTAL) {
                return {
                    x1: this.graph.origin.x - this.graph.pixelsPerUnit.x * this._offset,
                    y1: this.graph.origin.y,
                    x2: this.graph.origin.x + this.graph.pixelsPerUnit.x,
                    y2: this.graph.origin.y
                };
            }
        }
        else {
            if (this._orientation === enums_1.AXIS.VERTICAL) {
                return {
                    x1: this.graph.origin.x,
                    y1: this.graph.height - this.graph.pixelsPerUnit.y * this._offset,
                    x2: this.graph.origin.x,
                    y2: this.graph.pixelsPerUnit.y * this._offset
                };
            }
            else if (this._orientation === enums_1.AXIS.HORIZONTAL) {
                return {
                    x1: this.graph.pixelsPerUnit.x * this._offset,
                    y1: this.graph.origin.y,
                    x2: this.graph.width - this.graph.pixelsPerUnit.x * this._offset,
                    y2: this.graph.origin.y
                };
            }
        }
    }
}
exports.Axis = Axis;
//# sourceMappingURL=Axis.js.map