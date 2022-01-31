"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axis = void 0;
const Figure_1 = require("./Figure");
const enums_1 = require("../variables/enums");
class Axis extends Figure_1.Figure {
    constructor(graph, name, orientation) {
        super(graph, name);
        this.generateName();
        const offset = 0.2;
        const markers = this.graph.createMarker(8);
        if (orientation === enums_1.AXIS.HORIZONTAL) {
            this.svg = graph.svg.line(this.graph.pixelsPerUnit.x * offset, this.graph.origin.y, this.graph.width - this.graph.pixelsPerUnit.x * offset, this.graph.origin.y).stroke({ width: 2, color: 'black' }).marker('end', markers.end);
        }
        if (orientation === enums_1.AXIS.VERTICAL) {
            this.svg = graph.svg.line(this.graph.origin.x, this.graph.height - this.graph.pixelsPerUnit.y * offset, this.graph.origin.x, this.graph.pixelsPerUnit.y * offset).stroke({ width: 2, color: 'black' }).marker('end', markers.end);
        }
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
}
exports.Axis = Axis;
//# sourceMappingURL=Axis.js.map