import { Svg } from "@svgdotjs/svg.js"
import { AbstractFigure } from "./AbstractFigure"
import { DOMAIN, XY } from "../pidraw.common"
import { NumExp } from "../Calculus"
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
        // Get the mathematical function from the config
        const fx: string = this.#config.expressions.x,
            fy: string = this.#config.expressions.y

        if (fx === '' || fy === '') { return this }

        // Get the samples from the config
        const samples = (this.#config.samples ?? this.graphConfig.axis.x.x)
        const domain = (this.#config.domain ?? { min: -2 * Math.PI, max: 2 * Math.PI })

        // Make the numeric expression.
        const exprX = new NumExp(fx),
            exprY = new NumExp(fy)

        // Get the (x;y) points from the function
        // 0 < x < width
        // y = fn(x)
        const points: XY[] = []

        for (let t = domain.min; t < domain.max; t += 1 / samples) {
            const x = exprX.evaluate({ t }) * this.graphConfig.axis.x.x + this.graphConfig.origin.x,
                y = exprY.evaluate({ t }) * this.graphConfig.axis.y.y + this.graphConfig.origin.y

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
}