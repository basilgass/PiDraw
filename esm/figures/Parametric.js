"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametric = void 0;
const Figure_1 = require("./Figure");
const svg_js_1 = require("@svgdotjs/svg.js");
const numexp_1 = require("pimath/esm/maths/expressions/numexp");
class Parametric extends Figure_1.Figure {
    _config;
    _fx;
    _fy;
    _plugins;
    _precision;
    _riemann;
    constructor(graph, name, fn, config) {
        super(graph, name);
        this._config = {
            samples: 20,
            domain: {
                min: 0,
                max: 2 * Math.PI
            },
            animate: false
        };
        if (config !== undefined) {
            this._config = Object.assign({}, this._config, config);
        }
        this.generateName();
        this._precision = 2;
        this.svg = this.graph.svg.path().fill('none').stroke({ color: 'black', width: 2 });
        this.plot(fn);
        this._plugins = [];
    }
    generateName() {
        // TODO: Maybe the generated name should be more robust.
        if (this.name === undefined) {
            let n = this.graph.figures.filter(fig => fig instanceof Parametric).length, idx = Math.trunc(n / 5);
            this.name = 'fghij'[n % 5] + (idx >= 1 ? idx : '');
        }
        return this.name;
    }
    updateFigure() {
        // Update the plot (using the plot function - so it's already done !)
        return this;
    }
    updatePlugins() {
        if (this._plugins !== undefined) {
            for (let P of this._plugins) {
                P.update();
            }
        }
        return this;
    }
    plot(fn, speed) {
        // Parse the function
        this._fx = this._parse(fn.x);
        this._fy = this._parse(fn.y);
        // Create the path
        const { d, points } = this._getPath();
        // Draw the path.
        if (this.svg instanceof svg_js_1.Path) {
            if (points.length !== this.svg.array().length) {
                // Make a flat path.
                this.svg.plot();
            }
            if (points.length === this.svg.array().length) {
                if (this.svg instanceof svg_js_1.Path) {
                    // @ts-ignore
                    this.svg.animate(speed === undefined ? 500 : speed).plot(d);
                }
            }
            else {
                this.svg.hide().plot(d);
                let L = this.svg.node.getTotalLength() * 2;
                this.svg.attr({
                    'stroke-dasharray': L + ' ' + L,
                    'stroke-dashoffset': L
                }).show().animate(1000).attr({
                    'stroke-dashoffset': 0
                });
            }
        }
        // Update the plugins.
        this.updatePlugins();
        return this;
    }
    evaluate(t) {
        let x, y;
        if (this._fx instanceof numexp_1.NumExp) { //&& this._fx.isValid
            x = this._fx.evaluate({ t: +t });
        }
        else if (typeof this._fx === 'function') {
            x = this._fx(+t);
        }
        else {
            x = NaN;
        }
        if (this._fy instanceof numexp_1.NumExp) { // && this._fy.isValid
            y = this._fy.evaluate({ t: +t });
        }
        else if (typeof this._fy === 'function') {
            y = this._fy(+t);
        }
        else {
            y = NaN;
        }
        return { x, y };
    }
    remove() {
        // Remove all plugins.
        for (let P of this._plugins) {
            P.remove();
        }
        super.remove();
    }
    _parse(fn) {
        // TODO : must calculate differently
        if (typeof fn === 'string') {
            return new numexp_1.NumExp(fn);
        }
        return fn;
    }
    _getPath() {
        let d = '', points = [], nextToken = 'M', prevToken = '', graphHeight = this.graph.height, t = +this._config.domain.min, y = 0, errorCounter = 0;
        // Make sure the samples is a positive number.
        if (this._config.samples <= 0) {
            this._config.samples = 20;
        }
        while (t <= this._config.domain.max + 1 / this._config.samples) {
            // Evaluate the function at the point.
            const pt = this.graph.unitsToPixels(this.evaluate(t));
            if (isNaN(pt.y)) {
                errorCounter++;
                pt.y = 0;
                nextToken = 'M';
            }
            if (errorCounter > this._config.samples * 2) {
                return { d, points };
            }
            // store the previous token.
            prevToken = '' + nextToken;
            // If it was already a line before (or will be after), add a L (lineto)
            d += `${(prevToken === 'L' || nextToken === 'L') ? nextToken : prevToken}`;
            // Create next coordinate, removing extra decimals
            if (Math.abs(pt.y) > graphHeight * 5) {
                if (pt.y > 0) {
                    y = this.graph.height + 100;
                }
                else {
                    y = -100;
                }
            }
            else {
                y = pt.y;
            }
            d += `${pt.x.toFixed(this._precision)},${y.toFixed(this._precision)} `;
            points.push(pt);
            // Prepare the next point (break or continuous line)
            if ((pt.y > -5000 && pt.y < graphHeight + 5000)) { // The point is not too far - draw a line.
                nextToken = 'L';
            }
            else {
                // The line is out of scope - no need to draw it !
                nextToken = 'M';
            }
            // Next point
            t += 1 / this._config.samples;
        }
        return { d, points };
    }
}
exports.Parametric = Parametric;
//# sourceMappingURL=Parametric.js.map