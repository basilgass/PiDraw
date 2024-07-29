import { Svg } from "@svgdotjs/svg.js"
import { AbstractFigure } from "./AbstractFigure"
import { DOMAIN, XY } from "../pidraw.common"
import { NumExp, toPixels } from "../Calculus"
import { Path } from "@svgdotjs/svg.js"

export interface IParametricConfig {
    expressions: {
        x: string,
        y: string
    },
    domain?: DOMAIN,
    samples?: number
}

export class Parametric extends AbstractFigure {
    #config: IParametricConfig
    #numExp: {
        x: NumExp,
        y: NumExp
    }
    get config() { return this.#config }
    set config(value: IParametricConfig) {
        this.#config = value
        this.computed()
    }

    constructor(rootSVG: Svg, name: string, values: IParametricConfig) {
        super(rootSVG, name)

        // Store the constraints
        this.#config = Object.assign({
            expressions: { x: '', y: '' },
        }, values)

        this.#numExp = {
            x: new NumExp(this.#config.expressions.x),
            y: new NumExp(this.#config.expressions.y),
        }

        // Generate the base shape
        this.shape = this.#makeShape()

        // Compute the shape
        this.computed()
        return this
    }

    #makeShape() {
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
        const samples = (this.#config.samples ?? this.graphConfig.axis.x.x)
        const domain = (this.#config.domain ?? { min: -2 * Math.PI, max: 2 * Math.PI })

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
                x: this.#numExp.x.evaluate({ t }),
                y: this.#numExp.y.evaluate({ t })
            }
            , this.graphConfig)
    }
}