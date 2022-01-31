"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const Figure_1 = require("./Figure");
const enums_1 = require("../variables/enums");
class Grid extends Figure_1.Figure {
    #config;
    constructor(graph, name, config) {
        super(graph, name);
        this.svg = this.graph.svg.group();
        if (config) {
            this.#config = config;
        }
        else {
            this.#config = {
                axisX: 50,
                axisY: 50,
                type: enums_1.GRIDTYPE.ORTHOGONAL
            };
        }
        this.load();
    }
    load() {
        const w = this.graph.width, h = this.graph.height, x = this.#config.axisX, y = this.#config.axisY, xOffset = this.graph.origin.x % x, yOffset = this.graph.origin.y % y;
        for (let pos = -x; pos <= w; pos += x) {
            this.svg.add(this.graph.svg.line(pos + xOffset, 0 - yOffset, pos + xOffset, h + yOffset));
        }
        for (let pos = h + y; pos >= 0; pos -= y) {
            this.svg.add(this.graph.svg.line(0 - xOffset, pos - yOffset, w + xOffset, pos - yOffset));
        }
        this.svg.stroke({ color: 'black', width: 0.5 });
        return this;
    }
    show() {
        this.svg.show();
        return this;
    }
    hide() {
        this.svg.hide();
        return this;
    }
    nearestPoint = (pt) => {
        let minDistance = false, distance = 0, nearestPoint = { x: +pt.x, y: +pt.y };
        if (this.#config.type === enums_1.GRIDTYPE.ORTHOGONAL) {
            let nX = Math.trunc(pt.x / this.#config.axisX) * this.#config.axisX, nY = Math.trunc(pt.y / this.#config.axisY) * this.#config.axisY;
            nearestPoint.x = pt.x < nX + this.#config.axisX / 2 ? nX : nX + this.#config.axisX;
            nearestPoint.y = pt.y < nY + this.#config.axisY / 2 ? nY : nY + this.#config.axisY;
        }
        return nearestPoint;
    };
}
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map