"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const Figure_1 = require("../Figure");
const svg_js_1 = require("@svgdotjs/svg.js");
class Follow extends Figure_1.Figure {
    constructor(plot, showTangent) {
        super(plot.graph, '');
        this._plot = plot;
        this._size = 10;
        this.svg = this.graph.svg.circle(this._size)
            .fill('white')
            .stroke({ width: 1, color: 'black' });
        this.graph.layers.points.add(this.svg);
        this._tangent = this.graph.svg.line()
            .stroke({ color: 'black', width: 1 });
        this._tangentVisible = showTangent === undefined ? false : showTangent;
        this._tangentDX = 0.001;
        this.graph.layers.plotsFG.add(this._tangent);
        this.updateFigure();
        // Add the event on the root
        this.graph.svg.on('mousemove', (handler) => {
            // Real Client coordinates
            let clientXY = this.graph.svg.node.createSVGPoint();
            clientXY.x = handler.clientX;
            clientXY.y = handler.clientY;
            clientXY = clientXY.matrixTransform(this.graph.svg.node.getScreenCTM().inverse());
            let ptInUnits1 = this.graph.pixelsToUnits(clientXY);
            // Get the bounding box
            let pt = this.graph.unitsToPixels(this._plot.evaluate(ptInUnits1.x));
            // Update the point
            if (isNaN(pt.y)) {
                this.svg.hide();
            }
            else {
                if (!this.svg.visible()) {
                    this.svg.show();
                }
                this.svg.center(pt.x, pt.y);
            }
            // Update the tangent
            let pt2 = this.graph.unitsToPixels(this._plot.evaluate(+ptInUnits1.x + this._tangentDX)), slope = (pt2.y - pt.y) / (pt2.x - pt.x), h = pt.y - slope * pt.x;
            if (isNaN(pt.y) || isNaN(pt2.y) || this._tangentVisible === false) {
                this._tangent.hide();
            }
            else {
                if (!this._tangent.visible()) {
                    this._tangent.show();
                }
                if (pt.y * pt.y < 0) {
                    // Vertical asymptote
                    this._tangent.plot(pt.x, 0, pt.x, this.graph.height);
                }
                else {
                    this._tangent.plot(0, h, this.graph.width, slope * this.graph.width + h);
                }
            }
        });
    }
    get plot() {
        return this._plot;
    }
    clean() {
        if (this._tangent) {
            this._tangent.remove();
        }
        this.svg.remove();
    }
    updateFigure() {
        return this;
    }
    setPointSize(value) {
        if (this.svg instanceof svg_js_1.Circle) {
            this.svg.radius(value);
        }
        return this;
    }
    showTangent(value) {
        this._tangentVisible = value === undefined || value;
        return this;
    }
}
exports.Follow = Follow;
//# sourceMappingURL=Follow.js.map