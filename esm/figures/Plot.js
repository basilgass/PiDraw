"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plot = void 0;
const Figure_1 = require("./Figure");
const numexp_1 = require("pimath/esm/maths/numexp");
const svg_js_1 = require("@svgdotjs/svg.js");
const Riemann_1 = require("./PlotPlugins/Riemann");
const Follow_1 = require("./PlotPlugins/Follow");
const FillBetween_1 = require("./PlotPlugins/FillBetween");
class Plot extends Figure_1.Figure {
    #config;
    #precision;
    #fx;
    #plugins;
    #riemann;
    constructor(graph, name, fn, config) {
        super(graph, name);
        this.#config = {
            samples: 20,
            domain: this.graph.unitXDomain
        };
        if (config !== undefined) {
            this.#config = Object.assign({}, this.#config, config);
        }
        this.generateName();
        this.#precision = 2;
        this.svg = this.graph.svg.path().fill('none').stroke({ color: 'black', width: 2 });
        this.plot(fn);
        this.#plugins = [];
    }
    generateName() {
        if (this.name === undefined) {
            let n = this.graph.figures.filter(fig => fig instanceof Plot).length, idx = Math.trunc(n / 5);
            this.name = 'fghij'[n % 5] + (idx >= 1 ? idx : '');
        }
        return this.name;
    }
    updateFigure() {
        return this;
    }
    updatePlugins() {
        if (this.#plugins !== undefined) {
            for (let P of this.#plugins) {
                P.update();
            }
        }
        return this;
    }
    plot(fn, speed) {
        this.#fx = this.#parse(fn);
        const { d, points } = this.#getPath(this.#config.domain.min, this.#config.domain.max, this.#config.samples);
        if (this.svg instanceof svg_js_1.Path) {
            if (points.length !== this.svg.array().length) {
                this.svg.plot();
            }
            if (points.length === this.svg.array().length) {
                if (this.svg instanceof svg_js_1.Path) {
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
        this.updatePlugins();
        return this;
    }
    riemann(from, to, rectangles, below) {
        let R = new Riemann_1.Riemann(this, from, to, rectangles, below);
        this.#plugins.push(R);
        return R;
    }
    follow(showTangent) {
        let P = new Follow_1.Follow(this, showTangent);
        this.#plugins.push(P);
        return P;
    }
    fillBetween(plot, from, to, samples) {
        let P = new FillBetween_1.FillBetween(this, plot, from, to, samples === undefined ? this.#config.samples : samples);
        this.#plugins.push(P);
        return P;
    }
    #parse(fn) {
        if (typeof fn === 'string') {
            return new numexp_1.NumExp(fn);
        }
        return fn;
    }
    #getFlatPath(numberOfPoints) {
        if (numberOfPoints === undefined) {
            numberOfPoints = (this.#config.domain.max - this.#config.domain.min) * this.#config.samples;
        }
        let h = this.graph.origin.y, pt = this.graph.unitsToPixels({ x: this.#config.domain.min, y: 0 }), d = `M${pt.x},${pt.y}`;
        for (let x = 1; x < numberOfPoints; x++) {
            pt = this.graph.unitsToPixels({ x: this.#config.domain.min + x / this.#config.samples, y: 0 });
            d += `L${pt.x},${pt.y}`;
        }
        return d;
    }
    #getPath(from, to, samples, firstToken) {
        let d = '', points = [], nextToken = firstToken === undefined ? 'M' : firstToken, prevToken = '', graphHeight = this.graph.height, x = +from, y = 0;
        while (x <= to) {
            const pt = this.graph.unitsToPixels(this.evaluate(x));
            if (prevToken === 'M' && nextToken === 'M') {
            }
            else {
                prevToken = '' + nextToken;
                d += `${(prevToken === 'L' || nextToken === 'L') ? nextToken : prevToken}`;
                if (Math.abs(pt.y) > graphHeight * 5) {
                    if (pt.y > 0) {
                        y = this.graph.height + 50;
                    }
                    else {
                        y = -50;
                    }
                }
                else {
                    y = pt.y;
                }
                d += `${pt.x.toFixed(this.#precision)},${y.toFixed(this.#precision)} `;
                points.push(pt);
            }
            if ((pt.y > -100 && pt.y < graphHeight + 100)) {
                nextToken = 'L';
            }
            else {
                nextToken = 'M';
            }
            x += 1 / samples;
        }
        return { d, points };
    }
    getPartialPath(from, to, samples, reversed, firstToken) {
        let { d, points } = this.#getPath(from, to, samples === undefined ? this.#config.samples : samples, firstToken);
        if (reversed) {
            let reversed = ((firstToken === undefined ? 'L' : firstToken) + d.substring(1, d.length)).split(' ').reverse();
            d = reversed.join(' ');
        }
        return d;
    }
    evaluate(x) {
        let y;
        if (this.#fx instanceof numexp_1.NumExp) {
            y = this.#fx.evaluate({ x: +x });
            if (isNaN(y)) {
                console.log('error calculating', this.#fx.expression, ' at ', x);
            }
        }
        else if (typeof this.#fx === 'function') {
            y = this.#fx(x);
        }
        else {
            console.log('Function type error: ', typeof this.#fx);
        }
        return { x, y };
    }
}
exports.Plot = Plot;
//# sourceMappingURL=Plot.js.map