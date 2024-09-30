import { Svg } from "@svgdotjs/svg.js"
import { AbstractFigure } from "./AbstractFigure"
import type { DOMAIN, XY } from "../pidraw.common"
import { NumExp, toPixels, toCoordinates } from "../Calculus"
import { Path } from "@svgdotjs/svg.js"

export interface IPlotConfig {
    expression: string,
    domain?: DOMAIN,
    image?: DOMAIN,
    samples?: number
}

export class Plot extends AbstractFigure {
    #config: IPlotConfig
    #numExp: NumExp
    get config() { return this.#config }
    set config(value: IPlotConfig) {
        this.#config = value

        this.#numExp = new NumExp(this.#config.expression)

        this.computed()
    }

    constructor(rootSVG: Svg, name: string, values: IPlotConfig) {
        super(rootSVG, name)

        // Store the constraints
        this.#config = Object.assign({
            expression: '',
            samples: this.graphConfig.axis.x.x,
        }, values)

        // Generate the base shape
        this.shape = this.#makeShape()

        this.#numExp = new NumExp(this.#config.expression)

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
        const fn: string = this.#config.expression

        if (!fn || fn === '') { return this }

        // Get the domain from the config
        const minX = -this.graphConfig.origin.x / this.graphConfig.axis.x.x - 1
        const maxX = (this.graphConfig.width - this.graphConfig.origin.x) / this.graphConfig.axis.x.x + 1
        const domain = (this.#config.domain ?? { min: minX, max: maxX })
        const image = (this.#config.image ?? { min: -Infinity, max: Infinity })

        // Get the samples from the config
        const samples = (this.#config.samples ?? this.graphConfig.axis.x.x)

        // Make the numeric expression.
        const expr = this.#numExp


        // Get the (x;y) points from the function
        // 0 < x < width
        // y = fn(x)
        const points: XY[] = []

        for (let x = domain.min; x < domain.max; x += 1 / samples) {
            const y = expr.evaluate({ x })

            if (isNaN(y) || y === Infinity || y === -Infinity || y < image.min || y > image.max) {
                const coords = toPixels({ x, y: 0 }, this.graphConfig)
                points.push({ x: coords.x, y: NaN })
            } else {
                points.push(toPixels({ x, y }, this.graphConfig))
            }
        }

        // Create the path string from the points.
        let previous: XY = points[0]
        const path = points.map(({ x, y }, index) => {
            // Determine the path command
            let cmd = index === 0 ? 'M' : 'L'

            if (isNaN(y)) {
                // If the y value is not defined, move the cursor to the next point.
                cmd = 'M'
                y = -123456789
            } else if (previous.y === -123456789) {
                // If the previous value was not defined, move the cursor to the next point.
                cmd = 'M'
            }
            // Set the current point as the previous point
            previous = { x, y }

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

    evaluate(x: number, asCoordinates?: boolean): XY {
        if (asCoordinates === true) {
            return { x, y: this.#numExp.evaluate({ x }) }
        }

        return toPixels(
            { x, y: this.#numExp.evaluate({ x }) }
            , this.graphConfig)
    }

    override follow(x: number, y: number): XY {

        /**
         * TODO: implement the nearestPointToPath function
         * return nearestPointToPath( { x, y }, fig.shape as svgPath, 1 )
         */
        const pt = toCoordinates({ x, y }, this.graphConfig)
        return this.evaluate(pt.x)
    }
}