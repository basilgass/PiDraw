import { Figure, IFigureConfig } from "../Figure"
import { IPoint, PlotConfig, plotFunction, pluginType } from "../pidraw.interface"
import { NumExp } from "../../src/Calculus"

import { Path } from "@svgdotjs/svg.js"


export class Parametric extends Figure {
    private _config: PlotConfig
    private _fx: plotFunction | NumExp | undefined
    private _fy: plotFunction | NumExp | undefined
    private _plugins: pluginType[]
    private _precision: number

    constructor(
        figureConfig: IFigureConfig,
        fn: { x: plotFunction | string, y: plotFunction | string },
        config?: PlotConfig
    ) {
        super(figureConfig)

        this._config = {
            samples: 20,
            domain: {
                min: 0,
                max: 2 * Math.PI
            },
            animate: false
        }

        if (config !== undefined) {
            this._config = Object.assign(this._config, config)
        }

        this.generateName()
        this._precision = 2

        this._fx = undefined
        this._fy = undefined
        this.svg = this.rootSVG.path().fill('none').stroke({ color: 'black', width: 2 })
        this.plot(fn)

        this._plugins = []
    }

    updateFigure(): this {
        // Update the plot (using the plot function - so it's already done !)
        return this
    }

    updatePlugins(): this {
        if (this._plugins.length > 0) {
            for (const P of this._plugins) {
                P.update()
            }
        }
        return this
    }

    plot(fn: { x: string | plotFunction, y: string | plotFunction }, speed?: number): this {
        // Parse the function
        this._fx = this._parse(fn.x)
        this._fy = this._parse(fn.y)

        // Create the path
        const { d, points } = this._getPath()

        // Draw the path.
        if (this.svg instanceof Path) {
            if (points.length !== this.svg.array().length) {
                // Make a flat path.
                this.svg.plot()
            }

            if (points.length === this.svg.array().length) {
                if (this.svg instanceof Path) {
                    this.svg.animate(speed ?? 500).plot(d as unknown as object)
                }
            } else {
                this.svg.hide().plot(d)

                const L = this.svg.node.getTotalLength() * 2

                this.svg.attr({
                    'stroke-dasharray': `${L} ${L}`,
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

    evaluate(t: number): IPoint {
        let x, y
        if (this._fx instanceof NumExp) { //&& this._fx.isValid
            x = this._fx.evaluate({ t: +t })
        } else if (typeof this._fx === 'function') {
            x = this._fx(+t)
        } else {
            x = NaN
        }

        if (this._fy instanceof NumExp) { // && this._fy.isValid
            y = this._fy.evaluate({ t: +t })
        } else if (typeof this._fy === 'function') {
            y = this._fy(+t)
        } else {
            y = NaN
        }

        return { x, y }
    }

    public remove() {
        // Remove all plugins.
        for (const P of this._plugins) {
            P.remove()
        }

        super.remove()
    }

    private _parse(fn: plotFunction | string): plotFunction | NumExp {
        if (typeof fn === 'string') {
            return new NumExp(fn)
        }

        return fn
    }

    private _getPath(): { d: string, points: IPoint[] } {

        const { min, max } = this._config.domain ?? this.graph.unitXDomain
        const samples = this._config.samples ?? 20

        let d = '',
            nextToken = 'M',
            prevToken = '',
            t = +min,
            y = 0,
            errorCounter = 0

        const points: IPoint[] = []
        const graphHeight = this.graph.height

        // Make sure the samples is a positive number.
        if (samples <= 0) {
            this._config.samples = 20
        }

        while (t <= max + 1 / samples) {
            // Evaluate the function at the point.
            const pt = this.graph.unitsToPixels(this.evaluate(t))

            if (isNaN(pt.y)) {
                errorCounter++
                pt.y = 0
                nextToken = 'M'
            }

            if (errorCounter > samples * 2) {
                return { d, points }
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
            t += 1 / (this._config.samples ?? 20)
        }

        return { d, points }
    }
}