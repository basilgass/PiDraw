import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {IPoint} from "../variables/interfaces";
import {G, Path, Rect} from "@svgdotjs/svg.js";
import {Riemann} from "./PlotPlugins/Riemann";
import {Follow} from "./PlotPlugins/Follow";
import {FillBetween} from "./PlotPlugins/FillBetween";
import {NumExp} from "pimath/esm/maths/expressions/numexp";

export interface PlotConfig {
    domain: { min: number, max: number },
    samples: number
}

export class Plot extends Figure {
    private _config: PlotConfig
    private _precision: number
    private _fx: Function | NumExp
    private _rawFx: string
    private _plugins: any[]

    constructor(graph: Graph, name: string, fn: Function | string, config?: PlotConfig) {
        super(graph, name);

        this._config = {
            samples: 20,
            domain: this.graph.unitXDomain
        }

        if (config !== undefined) {
            this._config = Object.assign({}, this._config, config)
        }

        this.generateName()
        this._precision = 2

        this.svg = this.graph.svg.path().fill('none').stroke({color: 'black', width: 2});
        this.plot(fn);

        this._plugins = []
    }

    get tex(): string {
        if(this._fx instanceof NumExp){
            return this._rawFx.replaceAll('*', '\\cdot ')
        }else{
            return '?'
        }
    }

    get fx(): Function | NumExp {
        return this._fx;
    }

    generateName(): string {
        if (this.name === undefined) {
            let n = this.graph.figures.filter(fig => fig instanceof Plot).length,
                idx = Math.trunc(n / 5)
            this.name = 'fghij'[n % 5] + (idx >= 1 ? idx : '')
        }

        return this.name
    }

    updatePlugins(): Plot {
        if (this._plugins !== undefined) {
            for (let P of this._plugins) {
                P.update()
            }
        }
        return this
    }

    plot(fn: string | Function, speed?: number): Plot {
        // Parse the function
        this._fx = this._parse(fn)

        // Create the path
        const {d, points} = this._getPath(this._config.domain.min, this._config.domain.max, this._config.samples)

        // Draw the path.
        if (this.svg instanceof Path) {
            if (points.length !== this.svg.array().length) {
                // Make a flat path.
                this.svg.plot()
            }

            if (points.length === this.svg.array().length) {
                if (this.svg instanceof Path) {
                    // @ts-ignore
                    this.svg.animate(speed === undefined ? 100 : speed).plot(d)
                }
            } else {
                this.svg.hide().plot(d)

                let L = this.svg.node.getTotalLength() * 2

                this.svg.attr({
                    'stroke-dasharray': L + ' ' + L,
                    'stroke-dashoffset': L
                }).show().animate(1000).attr({
                    'stroke-dashoffset': 0
                })
            }
        }

        // Update the plugins.
        this.updatePlugins()
        return this
    }


    riemann(from: number, to: number, rectangles: number, pos?: number): Riemann {
        let R = new Riemann(this, from, to, rectangles, pos)

        this._plugins.push(R)
        return R
    }

    follow(showTangent?: boolean): Follow {
        let P = new Follow(this, showTangent)

        this._plugins.push(P)
        return P
    }

    fillBetween(plot: Plot, from: number, to: number, samples?: number): FillBetween {
        let P = new FillBetween(this, plot, from, to, samples === undefined ? this._config.samples : samples)

        this._plugins.push(P)
        return P
    }

    getPartialPath(from: number, to: number, samples?: number, reversed?: boolean, firstToken?: string): string {
        let {d, points} = this._getPath(from, to, samples === undefined ? this._config.samples : samples, firstToken)

        if (reversed) {
            let reversed = ((firstToken === undefined ? 'L' : firstToken) + d.substring(1, d.length)).split(' ').reverse()
            d = reversed.join(' ')
        }

        return d
    }

    evaluate(x: number): IPoint {
        let y
        if (this._fx instanceof NumExp && this._fx.isValid) {
            y = this._fx.evaluate({x: +x})
        } else if (typeof this._fx === 'function') {
            y = this._fx(x)
        } else {
            y = NaN
            // console.log('Function type error: ', typeof this._fx)
        }

        return {x, y}
    }

    private _parse(fn: Function | string): Function | NumExp {
        // TODO : must calculate differently
        if (typeof fn === 'string') {
            this._rawFx = fn
            return new NumExp(fn)
        }else{
            this._rawFx = ''
        }

        return fn
    }

    private _getFlatPath(numberOfPoints?: number): string {
        if (numberOfPoints === undefined) {
            numberOfPoints = (this._config.domain.max - this._config.domain.min) * this._config.samples
        }

        let h = this.graph.origin.y,
            pt = this.graph.unitsToPixels({x: this._config.domain.min, y: 0}),
            d: string = `M${pt.x},${pt.y}`

        for (let x = 1; x < numberOfPoints; x++) {
            pt = this.graph.unitsToPixels({x: this._config.domain.min + x / this._config.samples, y: 0})
            d += `L${pt.x},${pt.y}`
        }

        return d
    }

    private _getPath(from: number, to: number, samples: number, firstToken?: string): { d: string, points: IPoint[] } {
        let d = '',
            points: IPoint[] = [],
            nextToken = firstToken === undefined ? 'M' : firstToken,
            prevToken = '',
            graphHeight = this.graph.height,
            x = +from,
            y = 0,
            errorCounter = 0

        // Make sure the samples is a positive number.
        if (samples <= 0) {
            samples = 20
        }

        while (x <= to + 1 / samples) {
            // Evaluate the function at the point.
           const pt = this.graph.unitsToPixels(this.evaluate(x))
            if(isNaN(pt.y)){
                errorCounter++
                pt.y = 0
                nextToken = 'M'
            }
            // if(errorCounter>samples*2){return {d, points}}

            // store the previous token.
            prevToken = '' + nextToken

            // If it was already a line before (or will be after), add a L (lineto)
            d += `${(prevToken === 'L' || nextToken === 'L') ? nextToken : prevToken}`;

            // Create next coordinate, removing extra decimals
            if (Math.abs(pt.y) > graphHeight * 5) {
                if (pt.y > 0) {
                    y = this.graph.height + 100
                } else {
                    y = -100
                }
            } else {
                y = pt.y
            }
            d += `${pt.x.toFixed(this._precision)},${y.toFixed(this._precision)} `

            points.push(pt)

            // Prepare the next point (break or continuous line)
            if ((pt.y > -5000 && pt.y < graphHeight + 5000)) { // The point is not too far - draw a line.
                nextToken = 'L';
            } else {
                // The line is out of scope - no need to draw it !
                nextToken = 'M';
            }

            // Next point
            x += 1 / samples;
        }

        return {d, points}
    }

    public remove(){
        // Remove all plugins.
        for(let P of this._plugins){
            P.remove()
        }

        super.remove()
    }
}