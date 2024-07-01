import { Figure, IFigureConfig } from "../Figure"
import { Path } from "@svgdotjs/svg.js"
import { Riemann } from "./PlotPlugins/Riemann"
import { Follow } from "./PlotPlugins/Follow"
import { FillBetween } from "./PlotPlugins/FillBetween"
import { NumExp } from "../../lib/Calculus"
import { IPoint, PlotConfig, plotFunction, pluginType } from "../pidraw.interface"

export class Plot extends Figure {
    private _config: PlotConfig
    private _precision: number
    private _fx: plotFunction | NumExp | undefined
    private _rawFx: string
    private _plugins: pluginType[]

    constructor(figureConfig: IFigureConfig, fn: plotFunction | string,
        config?: PlotConfig) {
        super(figureConfig)

        this._config = {
            samples: 20,
            domain: this.graph.unitXDomain,
            animate: false
        }

        if (config !== undefined) {
            this._config = Object.assign(this._config, config)
        }

        this.generateName()
        this._precision = 2

        this.svg = this.rootSVG
            .path()
            .fill('none')
            .stroke({ color: 'black', width: 2 })
        this.plot(fn)

        this._plugins = []
        this._fx = undefined
        this._rawFx = ''
    }

    get fx(): plotFunction | NumExp | undefined {
        return this._fx
    }

    get plugins(): pluginType[] {
        return this._plugins
    }

    // TODO: Generate name.
    // generateName(): string {
    //     if (this.name === '') {
    //         const n = this.graph.figures.filter(fig => fig instanceof Plot).length,
    //             idx = Math.trunc(n / 5)
    //         this.name = 'fghij'[n % 5] + (idx >= 1 ? idx.toString() : '')
    //     }

    //     return this.name
    // }

    updatePlugins(): this {
        if (this._plugins.length > 0) {
            for (const P of this._plugins) {
                P.update()
            }
        }
        return this
    }

    plot(fn: string | plotFunction, speed?: number): this {
        // Parse the function
        this._fx = this._parse(fn)

        const { min, max } = this._config.domain ?? this.graph.unitXDomain
        const samples = this._config.samples ?? 20

        // Create the path
        const { d, points } = this._getPath(min, max, samples)

        // Draw the path.
        if (this.svg instanceof Path) {
            if (points.length !== this.svg.array().length) {
                // Make a flat path.
                this.svg.plot()
            }

            if (points.length === this.svg.array().length) {
                if (this.svg instanceof Path) {
                    this.svg.animate(speed ?? 100).plot(d as unknown as object)
                }
            } else {

                if (this._config.animate) {
                    this.svg.hide().plot(d)

                    const L = this.svg.node.getTotalLength() * 2

                    this.svg.attr({
                        'stroke-dasharray': `${L} ${L}`,
                        'stroke-dashoffset': L
                    }).show().animate(1000).attr({
                        'stroke-dashoffset': 0
                    })
                } else {
                    this.svg.plot(d)
                }
            }
        }

        // Update the plugins.
        this.updatePlugins()
        return this
    }


    riemann(from: number, to: number, rectangles: number, pos?: number): Riemann {
        const R = new Riemann({
            rootSVG: this.rootSVG,
            name: `Riemann-${this.name}`,
            graph: this.graph
        }, this, from, to, rectangles, pos)
        this._plugins.push(R)
        return R
    }

    follow(showTangent?: boolean): Follow {
        const P = new Follow(
            {
                rootSVG: this.rootSVG,
                name: `Follow-${this.name}`,
                graph: this.graph
            }, this,
            showTangent
        )

        this._plugins.push(P)
        return P
    }

    fillBetween(plot: Plot | null, from: number, to: number, samples?: number): FillBetween {
        const P = new FillBetween(
            {
                rootSVG: this.rootSVG,
                name: `FillBetween-${this.name}`,
                graph: this.graph
            },
            this, null,
            from, to,
            samples ?? this._config.samples ?? 20
        )

        this._plugins.push(P)
        return P
    }

    getPartialPath(from: number, to: number, samples?: number, reversed?: boolean, firstToken?: string): string {
        let { d } = this._getPath(from, to, samples ?? this._config.samples ?? 20, firstToken)

        if (reversed) {
            const reversed = ((firstToken ?? 'L') + d.substring(1, d.length)).split(' ').reverse()
            d = reversed.join(' ')
        }

        return d
    }

    evaluate(x: number): IPoint {
        let y
        if (this._fx instanceof NumExp && this._fx.isValid) {
            y = this._fx.evaluate({ x: +x })
        } else if (typeof this._fx === 'function') {
            y = this._fx(x)
        } else {
            y = NaN
            // console.log('Function type error: ', typeof this._fx)
        }
        return { x, y }
    }

    private _parse(fn: plotFunction | string): plotFunction | NumExp {
        if (typeof fn === 'string') {
            this._rawFx = fn
            // must accept more complex fn, with auto normalize.
            const expr = new NumExp(fn, true)
            if (expr.isValid) {
                return new NumExp(fn, true)
            } else {
                // The expression is not valid.
                return () => NaN
            }
        } else {
            this._rawFx = ''
        }

        return fn
    }

    private _getFlatPath(numberOfPoints?: number): string {

        const { min, max } = this._config.domain ?? this.graph.unitXDomain
        const samples = this._config.samples ?? 20

        if (numberOfPoints === undefined) {
            numberOfPoints = (max - min) * samples
        }

        let pt = this.graph.unitsToPixels({ x: min, y: 0 }),
            d = `M${pt.x},${pt.y}`

        for (let x = 1; x < numberOfPoints; x++) {
            pt = this.graph.unitsToPixels({ x: min + x / samples, y: 0 })
            d += `L${pt.x},${pt.y}`
        }

        return d
    }

    private _getPath(from: number, to: number, samples: number, firstToken?: string): { d: string, points: IPoint[] } {
        let d = '',
            nextToken = firstToken ?? 'M',
            prevToken = '',
            x = +from,
            y = 0
        const points: IPoint[] = []
        const graphHeight = this.graph.height

        // Make sure the samples is a positive number.
        if (samples <= 0) {
            samples = 20
        }

        while (x <= to + 1 / samples) {
            // Evaluate the function at the point.
            const pt = this.graph.unitsToPixels(this.evaluate(x))
            if (isNaN(pt.y)) {
                pt.y = 0
                nextToken = 'M'
            }

            // store the previous token.
            prevToken = '' + nextToken

            // If it was already a line before (or will be after), add a L (lineto)
            d += (prevToken === 'L' || nextToken === 'L') ? nextToken : prevToken

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
                nextToken = 'L'
            } else {
                // The line is out of scope - no need to draw it !
                nextToken = 'M'
            }

            // Next point
            x += 1 / samples
        }

        return { d, points }
    }

    public remove() {
        // Remove all plugins.
        for (const P of this._plugins) {
            P.clean()
        }

        super.remove()
    }
}

