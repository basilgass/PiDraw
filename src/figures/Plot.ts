import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {IPoint} from "../variables/interfaces";
import {NumExp} from "pimath/esm/maths/numexp";
import {G, Path, Rect} from "@svgdotjs/svg.js";
import {AXIS} from "../variables/enums";
import {Riemann} from "./PlotPlugins/Riemann";
import {Follow} from "./PlotPlugins/Follow";
import {FillBetween} from "./PlotPlugins/FillBetween";

export interface PlotConfig {
    domain: { min: number, max: number },
    samples: number
}

export class Plot extends Figure {
    #config: PlotConfig
    #precision: number
    #fx: Function | NumExp
    #plugins: any[]
    #riemann: { svg: G, rectangles: Rect[] }

    constructor(graph: Graph, name: string, fn: Function | string, config?: PlotConfig) {
        super(graph, name);

        this.#config = {
            samples: 20,
            domain: this.graph.unitXDomain
        }

        if (config !== undefined) {
            this.#config = Object.assign({}, this.#config, config)
        }

        this.generateName()
        this.#precision = 2

        this.svg = this.graph.svg.path().fill('none').stroke({color: 'black', width: 2});
        this.plot(fn);

        this.#plugins = []
    }

    generateName(): string {
        if (this.name === undefined) {
            let n = this.graph.figures.filter(fig => fig instanceof Plot).length,
                idx = Math.trunc(n / 5)
            this.name = 'fghij'[n % 5] + (idx >= 1 ? idx : '')
        }

        return this.name
    }

    updateFigure(): Plot {
        // Update the plot (using the plot function - so it's already done !)
        return this
    }

    updatePlugins(): Plot {
        if(this.#plugins!==undefined) {
            for (let P of this.#plugins) {
                P.update()
            }
        }
        return this
    }

    plot(fn: string | Function, speed?: number): Plot {
        // Parse the function
        this.#fx = this.#parse(fn)

        // Create the path
        const {d, points} = this.#getPath(this.#config.domain.min, this.#config.domain.max, this.#config.samples)

        // Draw the path.
        if (this.svg instanceof Path) {
            if (points.length !== this.svg.array().length) {
                // Make a flat path.
                this.svg.plot()
            }

            if (points.length === this.svg.array().length) {
                if (this.svg instanceof Path) {
                    // @ts-ignore
                    this.svg.animate(speed === undefined ? 500 : speed).plot(d)
                }
            } else {
                this.svg.hide().plot(d)

                let L = this.svg.node.getTotalLength()*2

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



    riemann(from: number, to: number, rectangles: number, below?:boolean): Riemann{
        let R = new Riemann(this, from, to, rectangles, below)

        this.#plugins.push(R)
        return R
    }

    follow(showTangent?: boolean): Follow {
        let P = new Follow(this, showTangent)

        this.#plugins.push(P)
        return P
    }

    fillBetween(plot: Plot, from: number, to: number, samples?:number): FillBetween {
        let P  = new FillBetween(this, plot, from, to, samples===undefined?this.#config.samples:samples)

        this.#plugins.push(P)
        return P
    }

    #parse(fn: Function | string): Function | NumExp {
        // TODO : must calculate differently
        if (typeof fn === 'string') {
            return new NumExp(fn)
        }
        return fn
    }

    #getFlatPath(numberOfPoints?: number): string {
        if (numberOfPoints === undefined) {
            numberOfPoints = (this.#config.domain.max - this.#config.domain.min) * this.#config.samples
        }

        let h = this.graph.origin.y,
            pt = this.graph.unitsToPixels({x: this.#config.domain.min, y: 0}),
            d: string = `M${pt.x},${pt.y}`

        for (let x = 1; x < numberOfPoints; x++) {
            pt = this.graph.unitsToPixels({x: this.#config.domain.min + x / this.#config.samples, y: 0})
            d += `L${pt.x},${pt.y}`
        }

        return d
    }

    #getPath(from: number, to: number, samples: number, firstToken?: string): { d: string, points: IPoint[] } {
        let d = '',
            points: IPoint[] = [],
            nextToken = firstToken===undefined?'M':firstToken,
            prevToken = '',
            graphHeight = this.graph.height,
            x = +from,
            y = 0

        while (x <= to) {
            // Evaluate the function at the point.
            const pt = this.graph.unitsToPixels(this.evaluate(x))

            // Do not add consecutive "move to"
            if (prevToken === 'M' && nextToken === 'M') {
            } else {
                // store the previous token.
                prevToken = '' + nextToken

                // If it was already a line before (or will be after), add a L (lineto)
                d += `${(prevToken === 'L' || nextToken === 'L') ? nextToken : prevToken}`;

                // Create next coordinate, removing extra decimals
                if (Math.abs(pt.y) > graphHeight * 5) {
                    if (pt.y > 0) {
                        y = this.graph.height + 50
                    } else {
                        y = -50
                    }
                } else {
                    y = pt.y
                }
                d += `${pt.x.toFixed(this.#precision)},${y.toFixed(this.#precision)} `

                points.push(pt)
            }

            // Prepare the next point (break or continuous line)
            if ((pt.y > -100 && pt.y < graphHeight + 100)) { // The point is not too far - draw a line.
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

    getPartialPath(from: number, to: number, samples?: number, reversed?: boolean, firstToken?: string):string{
        let {d, points} = this.#getPath(from, to, samples===undefined?this.#config.samples:samples, firstToken)

        if(reversed){
            let reversed = ((firstToken===undefined?'L':firstToken) + d.substring(1, d.length)).split(' ').reverse()
            d = reversed.join(' ')
        }

        return d
    }
    evaluate(x: number): IPoint {
        let y
        if (this.#fx instanceof NumExp) {
            y = this.#fx.evaluate({x: +x})
            if (isNaN(y)) {
                console.log('error calculating', this.#fx.expression, ' at ',  x)
            }
        } else if (typeof this.#fx === 'function') {
            y = this.#fx(x)
        } else {
            console.log('Function type error: ', typeof this.#fx)
        }

        return {x, y}
    }
}