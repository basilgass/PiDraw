import {Path, Svg} from "@svgdotjs/svg.js"
import {AbstractFigure} from "./AbstractFigure"
import type {DOMAIN, XY} from "../pidraw.common"
import {NumExp, toPixels} from "../Calculus"

export interface IParametricConfig {
    expressions: {
        x: string,
        y: string
    },
    domain?: DOMAIN,
    samples?: number
}

export class Parametric extends AbstractFigure {
    protected _numExp: {
        x: NumExp,
        y: NumExp
    }

    constructor(rootSVG: Svg, name: string, values: IParametricConfig) {
        super(rootSVG, name)

        // Store the constraints
        this._config = Object.assign({
            expressions: { x: '', y: '' },
        }, values)

        this._numExp = {
            x: new NumExp(this._config.expressions.x),
            y: new NumExp(this._config.expressions.y),
        }

        // Generate the base shape
        this.shape = this._makeShape()

        // Compute the shape
        this.computed()
        return this
    }

    protected _config: IParametricConfig

    get config() { return this._config }

    set config(value: IParametricConfig) {
        this._config = value
        this.computed()
    }

    _makeShape() {
        this.element.clear()

        // Create the path
        this.shape = this.element.path('M0 0')

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }

    computed(): this {
        // Get the samples from the config
        const samples = (this._config.samples ?? this.graphConfig.axis.x.x)
        const domain = (this._config.domain ?? { min: -2 * Math.PI, max: 2 * Math.PI })

        // Make the numeric expression.

        // Get the (x;y) points from the function
        // 0 < x < width
        // y = fn(x)
        const points: XY[] = []

        for (let t = domain.min; t < domain.max; t += 1 / samples) {
            const { x, y } = this.evaluate(t)
            // const x = exprX.evaluate({ t }) * this.graphConfig.axis.x.x + this.graphConfig.origin.x,
            //     y = exprY.evaluate({ t }) * this.graphConfig.axis.y.y + this.graphConfig.origin.y
            points.push({ x, y })
        }

        // Create the path string from the points.
        const path = points.map(({ x, y }, index) => {
            // Determine the path command
            const cmd = index === 0 ? 'M' : 'L'

            return `${cmd} ${x} ${y}`
        }).join(' ')

        // Update the path
        const shape = this.shape as Path
        shape.plot(path)

        return this
    }

    moveLabel(): this {
        return this
    }

    evaluate(t: number): XY {
        return toPixels(
            {
                x: this._numExp.x.evaluate({ t }),
                y: this._numExp.y.evaluate({ t })
            }
            , this.graphConfig)
    }
}