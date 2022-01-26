"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axis = exports.AXIS = void 0;
const Figure_1 = require("./Figure");
var AXIS;
(function (AXIS) {
    AXIS[AXIS["HORIZONTAL"] = 0] = "HORIZONTAL";
    AXIS[AXIS["VERTICAL"] = 1] = "VERTICAL";
})(AXIS = exports.AXIS || (exports.AXIS = {}));
class Axis extends Figure_1.Figure {
    constructor(canvas, name, orientation) {
        super(canvas, name);
        this.generateName();
        const offset = 0.2;
        if (orientation === AXIS.HORIZONTAL) {
            this.svg = canvas.svg.line(this.canvas.pixelsPerUnit.x * offset, this.canvas.origin.y, this.canvas.width - this.canvas.pixelsPerUnit.x * offset, this.canvas.origin.y).stroke({ width: 1, color: 'black' }).marker('end', this.canvas.markers.end);
        }
        if (orientation === AXIS.VERTICAL) {
            this.svg = canvas.svg.line(this.canvas.origin.x, this.canvas.height - this.canvas.pixelsPerUnit.y * offset, this.canvas.origin.x, this.canvas.pixelsPerUnit.y * offset).stroke({ width: 1, color: 'black' }).marker('end', this.canvas.markers.end);
        }
    }
    generateName() {
        let n = this.canvas.figures.filter(fig => fig instanceof Axis).length;
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
}
exports.Axis = Axis;
//# sourceMappingURL=Axis.js.map