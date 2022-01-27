"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axis = void 0;
const Figure_1 = require("./Figure");
const enums_1 = require("../variables/enums");
class Axis extends Figure_1.Figure {
    constructor(canvas, name, orientation) {
        super(canvas, name);
        this.generateName();
        const offset = 0.2;
        const markers = this.canvas.createMarker(8);
        if (orientation === enums_1.AXIS.HORIZONTAL) {
            this.svg = canvas.svg.line(this.canvas.pixelsPerUnit.x * offset, this.canvas.origin.y, this.canvas.width - this.canvas.pixelsPerUnit.x * offset, this.canvas.origin.y).stroke({ width: 2, color: 'black' }).marker('end', markers.end);
        }
        if (orientation === enums_1.AXIS.VERTICAL) {
            this.svg = canvas.svg.line(this.canvas.origin.x, this.canvas.height - this.canvas.pixelsPerUnit.y * offset, this.canvas.origin.x, this.canvas.pixelsPerUnit.y * offset).stroke({ width: 2, color: 'black' }).marker('end', markers.end);
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