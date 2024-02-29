"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plot = void 0;
const Figure_1 = require("./Figure");
const svg_js_1 = require("@svgdotjs/svg.js");
const Riemann_1 = require("./PlotPlugins/Riemann");
const Follow_1 = require("./PlotPlugins/Follow");
const FillBetween_1 = require("./PlotPlugins/FillBetween");
const Calculus_1 = require("../Calculus");
class Plot extends Figure_1.Figure {
    _config;
    _precision;
    _fx;
    _rawFx;
    _plugins;
    constructor(graph, name, fn, config) {
        super(graph, name);
        this._config = {
            samples: 20,
            domain: this.graph.unitXDomain,
            animate: false
        };
        if (config !== undefined) {
            this._config = Object.assign({}, this._config, config);
        }
        this.generateName();
        this._precision = 2;
        this.svg = this.graph.svg
            .path()
            .fill('none')
            .stroke({ color: 'black', width: 2 });
        this.plot(fn);
        this._plugins = [];
    }
    get fx() {
        return this._fx;
    }
    get plugins() {
        return this._plugins;
    }
    generateName() {
        if (this.name === undefined) {
            let n = this.graph.figures.filter(fig => fig instanceof Plot).length, idx = Math.trunc(n / 5);
            this.name = 'fghij'[n % 5] + (idx >= 1 ? idx : '');
        }
        return this.name;
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
        this._fx = this._parse(fn);
        // Create the path
        const { d, points } = this._getPath(this._config.domain.min, this._config.domain.max, this._config.samples);
        // Draw the path.
        if (this.svg instanceof svg_js_1.Path) {
            if (points.length !== this.svg.array().length) {
                // Make a flat path.
                this.svg.plot();
            }
            if (points.length === this.svg.array().length) {
                if (this.svg instanceof svg_js_1.Path) {
                    // @ts-ignore
                    this.svg.animate(speed === undefined ? 100 : speed).plot(d);
                }
            }
            else {
                if (this._config.animate) {
                    this.svg.hide().plot(d);
                    let L = this.svg.node.getTotalLength() * 2;
                    this.svg.attr({
                        'stroke-dasharray': L + ' ' + L,
                        'stroke-dashoffset': L
                    }).show().animate(1000).attr({
                        'stroke-dashoffset': 0
                    });
                }
                else {
                    this.svg.plot(d);
                }
            }
        }
        // Update the plugins.
        this.updatePlugins();
        return this;
    }
    riemann(from, to, rectangles, pos) {
        let R = new Riemann_1.Riemann(this, from, to, rectangles, pos);
        this._plugins.push(R);
        return R;
    }
    follow(showTangent) {
        let P = new Follow_1.Follow(this, showTangent);
        this._plugins.push(P);
        return P;
    }
    fillBetween(plot, from, to, samples, name) {
        let P = new FillBetween_1.FillBetween(this, plot, from, to, samples === undefined ? this._config.samples : samples, name);
        this._plugins.push(P);
        return P;
    }
    getPartialPath(from, to, samples, reversed, firstToken) {
        let { d, points } = this._getPath(from, to, samples === undefined ? this._config.samples : samples, firstToken);
        if (reversed) {
            let reversed = ((firstToken === undefined ? 'L' : firstToken) + d.substring(1, d.length)).split(' ').reverse();
            d = reversed.join(' ');
        }
        return d;
    }
    evaluate(x) {
        let y;
        if (this._fx instanceof Calculus_1.NumExp && this._fx.isValid) {
            y = this._fx.evaluate({ x: +x });
        }
        else if (typeof this._fx === 'function') {
            y = this._fx(x);
        }
        else {
            y = NaN;
            // console.log('Function type error: ', typeof this._fx)
        }
        return { x, y };
    }
    _parse(fn) {
        if (typeof fn === 'string') {
            this._rawFx = fn;
            // must accept more complex fn, with auto normalize.
            const expr = new Calculus_1.NumExp(fn, true);
            if (expr.isValid) {
                return new Calculus_1.NumExp(fn, true);
            }
            else {
                // The expression is not valid.
                return (x) => 0;
            }
        }
        else {
            this._rawFx = '';
        }
        return fn;
    }
    _getFlatPath(numberOfPoints) {
        if (numberOfPoints === undefined) {
            numberOfPoints = (this._config.domain.max - this._config.domain.min) * this._config.samples;
        }
        let h = this.graph.origin.y, pt = this.graph.unitsToPixels({ x: this._config.domain.min, y: 0 }), d = `M${pt.x},${pt.y}`;
        for (let x = 1; x < numberOfPoints; x++) {
            pt = this.graph.unitsToPixels({ x: this._config.domain.min + x / this._config.samples, y: 0 });
            d += `L${pt.x},${pt.y}`;
        }
        return d;
    }
    _getPath(from, to, samples, firstToken) {
        let d = '', points = [], nextToken = firstToken === undefined ? 'M' : firstToken, prevToken = '', graphHeight = this.graph.height, x = +from, y = 0, errorCounter = 0;
        // Make sure the samples is a positive number.
        if (samples <= 0) {
            samples = 20;
        }
        while (x <= to + 1 / samples) {
            // Evaluate the function at the point.
            const pt = this.graph.unitsToPixels(this.evaluate(x));
            if (isNaN(pt.y)) {
                errorCounter++;
                pt.y = 0;
                nextToken = 'M';
            }
            // if(errorCounter>samples*2){return {d, points}}
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
            x += 1 / samples;
        }
        return { d, points };
    }
    remove() {
        // Remove all plugins.
        for (let P of this._plugins) {
            P.clean();
        }
        super.remove();
    }
}
exports.Plot = Plot;
//# sourceMappingURL=Plot.js.map