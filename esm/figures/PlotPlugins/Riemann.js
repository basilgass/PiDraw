"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Riemann = void 0;
const Figure_1 = require("../Figure");
const enums_1 = require("../../variables/enums");
class Riemann extends Figure_1.Figure {
    _plot;
    _from;
    _to;
    _number;
    _pos;
    _rectangles;
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
        // Add the riemann plugin to the plotBG
        this.graph.layers.plotsBG.add(this.svg);
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
            // Remove the listener
            r.off('riemann');
            r.click(null);
            r.mouseover(null);
            r.mouseout(null);
            r.remove();
        }
        this.svg.remove();
    }
    updateFigure() {
        let x = 0, y = 0, height, step = (this._to - this._from) / this._number, width = this.graph.distanceToPixels(step), pxX, pxY;
        // reset the rectangles if not the same number (for animation purpose)
        if (this._rectangles !== undefined && this._number !== this._rectangles.length) {
            this.clean();
        }
        // Generate the base version with "flatten rectangle"
        if (this._rectangles === undefined || this._number !== this._rectangles.length) {
            this._rectangles = [];
            // Create the zero height rectangles.
            for (let i = 0; i < this._number; i++) {
                // Unit value
                x = +this._from + step * i;
                y = x + step;
                // pixels value
                pxX = this.graph.unitsToPixels({ x: x, y: 0 });
                height = 0;
                const rectangle = this.graph.svg.rect(width, height)
                    .move(pxX.x, pxX.y)
                    .addTo(this.svg);
                this._rectangles.push(rectangle);
            }
            // Add events for all rectangles.
            const rectanglesForEvents = this._rectangles;
            this._rectangles.forEach(rectangle => {
                rectangle
                    .click(function () {
                    makeEvent('riemann.click', this.data('values'), rectanglesForEvents);
                })
                    .mouseover(function () {
                    makeEvent('riemann.mouseover', this.data('values'), rectanglesForEvents);
                })
                    .mouseout(function () {
                    makeEvent('riemann.mouseout', this.data('values'), rectanglesForEvents);
                });
            });
            this.svg.fill('yellow')
                .stroke({
                color: 'black', width: 1
            });
            // Add to the correct layer
            this.graph.layers.plots.add(this.svg);
        }
        for (let i = 0; i < this._number; i++) {
            // Unit value
            x = +this._from + step * i;
            y = x + step;
            // pixels value
            pxX = this.graph.unitsToPixels({ x: x, y: 0 });
            // The value can be negative
            // (this._pos === undefined || this._pos) ? this._plot.evaluate(x).y : this._plot.evaluate(y).y, AXIS.VERTICAL
            const dy = this._plot.evaluate(x + step * this._pos).y;
            height = this.graph.distanceToPixels(dy, enums_1.AXIS.VERTICAL);
            pxY = this.graph.unitsToPixels({ x: y, y: height });
            this._rectangles[i]
                .data('values', {
                index: i,
                box: {
                    x: pxX.x,
                    y: pxX.y,
                    height, width
                },
                coords: {
                    a: x,
                    b: y,
                    dx: step,
                    dy
                }
            })
                .animate(500)
                .height(Math.abs(height))
                .width(width)
                .move(pxX.x, pxX.y - (height > 0 ? height : 0));
        }
        return this;
    }
}
exports.Riemann = Riemann;
function makeEvent(name, values, targets) {
    let event = new CustomEvent(name, {
        detail: {
            ...values,
            rectangle: targets[values.index],
            rectangles: targets
        },
    });
    document.dispatchEvent(event);
}
//# sourceMappingURL=Riemann.js.map