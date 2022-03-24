"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Riemann = void 0;
const Figure_1 = require("../Figure");
const enums_1 = require("../../variables/enums");
class Riemann extends Figure_1.Figure {
    constructor(plot, from, to, rectangles, pos) {
        super(plot.graph, '');
        this._plot = plot;
        this._from = from;
        this._to = to;
        this._number = rectangles;
        this._pos = pos === undefined ? 0 : pos;
        if (pos < 0) {
            pos = 0;
        }
        if (pos > 1) {
            pos = 1;
        }
        this.svg = this.graph.svg.group();
        this._rectangles = [];
        this.updateFigure();
    }
    get plot() {
        return this._plot;
    }
    get from() {
        return this._from;
    }
    set from(value) {
        this._from = value;
        this.update();
    }
    get to() {
        return this._to;
    }
    set to(value) {
        this._to = value;
        this.update();
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
        this.update();
    }
    get pos() {
        return this._pos;
    }
    set below(value) {
        this._pos = value;
        this.update();
    }
    get rectangles() {
        return this._rectangles;
    }
    clean() {
        for (let r of this._rectangles) {
            r.remove();
        }
        this.svg.remove();
    }
    updateFigure() {
        let x = 0, y = 0, height, step = (this._to - this._from) / this._number, width = this.graph.distanceToPixels(step), pxX;
        if (this._rectangles !== undefined && this._number !== this._rectangles.length) {
            this.clean();
        }
        if (this._rectangles === undefined || this._number !== this._rectangles.length) {
            this._rectangles = [];
            for (let i = 0; i < this._number; i++) {
                x = +this._from + step * i;
                y = x + step;
                pxX = this.graph.unitsToPixels({ x: x, y: 0 });
                height = 0;
                this._rectangles.push(this.graph.svg.rect(width, height)
                    .click(function () {
                    let event = new CustomEvent('RiemannRectangleClick', {
                        detail: this.data('values')
                    });
                    document.dispatchEvent(event);
                })
                    .mouseover(function () {
                    this.fill('orange');
                })
                    .mouseout(function () {
                    this.fill('yellow');
                })
                    .move(pxX.x, pxX.y)
                    .addTo(this.svg));
            }
            this.svg.fill('yellow')
                .stroke({
                color: 'black', width: 1
            });
            this.graph.layers.main.add(this.svg);
        }
        for (let i = 0; i < this._number; i++) {
            x = +this._from + step * i;
            y = x + step;
            pxX = this.graph.unitsToPixels({ x: x, y: 0 });
            height = this.graph.distanceToPixels(this._plot.evaluate(x + step * this._pos).y, enums_1.AXIS.VERTICAL);
            this._rectangles[i]
                .data('values', { x, y, height, width })
                .animate(500)
                .height(Math.abs(height))
                .width(width)
                .move(pxX.x, pxX.y - (height > 0 ? height : 0));
        }
        return this;
    }
}
exports.Riemann = Riemann;
//# sourceMappingURL=Riemann.js.map