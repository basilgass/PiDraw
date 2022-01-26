"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plot = void 0;
const Figure_1 = require("./Figure");
const numexp_1 = require("pimath/esm/maths/numexp");
const svg_js_1 = require("@svgdotjs/svg.js");
const Axis_1 = require("./Axis");
class Plot extends Figure_1.Figure {
    #config;
    #precision;
    #fx;
    #riemann;
    constructor(canvas, name, fn, config) {
        super(canvas, name);
        this.#config = {
            samples: 20,
            domain: this.canvas.unitXDomain
        };
        if (config !== undefined) {
            this.#config = config;
        }
        this.generateName();
        this.#precision = 2;
        this.svg = this.canvas.svg.path(this.#getFlatPath()).fill('none').stroke({ color: 'black', width: 2 });
        this.plot(fn);
    }
    generateName() {
        if (this.name === undefined) {
            let n = this.canvas.figures.filter(fig => fig instanceof Plot).length, idx = Math.trunc(n / 5);
            this.name = 'fghij'[n % 5] + (idx >= 1 ? idx : '');
        }
        return this.name;
    }
    updateFigure() {
        return this;
    }
    plot(fn, speed) {
        this.#fx = this.#parse(fn);
        const { d, points } = this.#getPath();
        if (this.svg instanceof svg_js_1.Path) {
            if (points.length !== this.svg.array().length) {
                this.svg.plot(this.#getFlatPath(points.length));
            }
            if (points.length === this.svg.array().length) {
                if (this.svg instanceof svg_js_1.Path) {
                    this.svg.animate(speed === undefined ? 500 : speed).plot(d);
                }
            }
            else {
                this.svg.plot(d);
            }
        }
        return this;
    }
    riemann(from, to, n, below) {
        let x = 0, y = 0, height, step = (to - from) / n, pxX;
        if (this.#riemann !== undefined && n !== this.#riemann.rectangles.length) {
            for (let r of this.#riemann.rectangles) {
                r.remove();
            }
        }
        if (this.#riemann === undefined || n !== this.#riemann.rectangles.length) {
            this.#riemann = {
                svg: this.canvas.svg.group(),
                rectangles: []
            };
            for (let i = 0; i < n; i++) {
                x = +from + step * i;
                y = x + step;
                pxX = this.canvas.unitsToPixels({ x: x, y: 0 });
                height = 0;
                this.#riemann.rectangles.push(this.canvas.svg.rect(this.canvas.distanceToPixels(step), height)
                    .move(pxX.x, pxX.y)
                    .addTo(this.#riemann.svg));
            }
            this.#riemann.svg.fill('yellow')
                .stroke({
                color: 'black', width: 1
            });
            this.canvas.layers.main.add(this.#riemann.svg);
        }
        for (let i = 0; i < n; i++) {
            x = +from + step * i;
            y = x + step;
            pxX = this.canvas.unitsToPixels({ x: x, y: 0 });
            height = this.canvas.distanceToPixels((below === undefined || below) ? this.#evaluate(x).y : this.#evaluate(y).y, Axis_1.AXIS.VERTICAL);
            this.#riemann.rectangles[i]
                .animate(500)
                .height(height).move(pxX.x, pxX.y - height);
        }
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
        let h = this.canvas.origin.y, pt = this.canvas.unitsToPixels({ x: this.#config.domain.min, y: 0 }), d = `M${pt.x},${pt.y}`;
        for (let x = 1; x < numberOfPoints; x++) {
            pt = this.canvas.unitsToPixels({ x: this.#config.domain.min + x / this.#config.samples, y: 0 });
            d += `L${pt.x},${pt.y}`;
        }
        return d;
    }
    #getPath() {
        let d = '', points = [], nextToken = 'M', prevToken = '', canvasHeight = this.canvas.height, x = +this.#config.domain.min, y = 0;
        while (x <= this.#config.domain.max) {
            const pt = this.canvas.unitsToPixels(this.#evaluate(x));
            if (prevToken === 'M' && nextToken === 'M') {
            }
            else {
                prevToken = '' + nextToken;
                d += `${(prevToken === 'L' || nextToken === 'L') ? nextToken : prevToken}`;
                if (Math.abs(pt.y) > canvasHeight * 5) {
                    if (pt.y > 0) {
                        y = this.canvas.height + 50;
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
            if ((pt.y > -100 && pt.y < canvasHeight + 100)) {
                nextToken = 'L';
            }
            else {
                nextToken = 'M';
            }
            x += 1 / this.#config.samples;
        }
        return { d, points };
    }
    #evaluate(x) {
        let y;
        if (this.#fx instanceof numexp_1.NumExp) {
            y = this.#fx.evaluate({ x: +x });
            if (isNaN(y)) {
                console.log('error calculating', this.#fx.expression, x);
                y = 0;
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