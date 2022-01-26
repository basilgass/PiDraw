"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = exports.gridType = void 0;
const Figure_1 = require("./Figure");
var gridType;
(function (gridType) {
    gridType[gridType["ORTHOGONAL"] = 4] = "ORTHOGONAL";
    gridType[gridType["TRIANGLE"] = 3] = "TRIANGLE";
    gridType[gridType["HEXAGONAL"] = 6] = "HEXAGONAL";
})(gridType = exports.gridType || (exports.gridType = {}));
class Grid extends Figure_1.Figure {
    #config;
    #origin;
    constructor(canvas, name, config) {
        super(canvas, name);
        this.svg = this.canvas.svg.group();
        if (config) {
            this.#config = config;
        }
        else {
            this.#config = {
                axisX: 50,
                axisY: 50,
                type: gridType.ORTHOGONAL
            };
        }
        this.#origin = { x: 0, y: this.canvas.height };
        this.load();
    }
    load() {
        const w = this.canvas.width, h = this.canvas.height, x = this.#config.axisX, y = this.#config.axisY;
        for (let pos = 0; pos <= w; pos += x) {
            this.svg.add(this.canvas.svg.line(pos, 0, pos, h));
        }
        for (let pos = h; pos >= 0; pos -= y) {
            this.svg.add(this.canvas.svg.line(0, pos, w, pos));
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
        if (this.#config.type === gridType.ORTHOGONAL) {
            let nX = Math.trunc(pt.x / this.#config.axisX) * this.#config.axisX, nY = Math.trunc(pt.y / this.#config.axisY) * this.#config.axisY;
            nearestPoint.x = pt.x < nX + this.#config.axisX / 2 ? nX : nX + this.#config.axisX;
            nearestPoint.y = pt.y < nY + this.#config.axisY / 2 ? nY : nY + this.#config.axisY;
        }
        return nearestPoint;
    };
}
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map