import { Svg, Circle as G } from "@svgdotjs/svg.js"
import { AbstractFigure } from "./AbstractFigure"
import { toPixels } from "../Calculus"
import { Plot } from "./Plot"
import { DOMAIN } from "../pidraw.common"

export interface IRiemannConfig {
    follow: Plot,
    domain: DOMAIN,
    rectangles: number,
    position: number,
}

export class Riemann extends AbstractFigure {
    #config: IRiemannConfig

    get config() { return this.#config }
    set config(value: IRiemannConfig) {
        this.#config = value
        this.computed()
    }

    get rectangles(): number {
        return this.#config.rectangles
    }
    set rectangles(value: number) {
        this.#config.rectangles = value > 0 ? value : 10
    }
    get position(): number {
        // Value is between 0 and 1
        if (this.#config.position < 0) { this.#config.position = 0 }
        if (this.#config.position > 1) { this.#config.position = 1 }

        return this.#config.position
    }
    set position(value: number) {
        // Value is between 0 and 1
        if (value < 0) { value = 0 }
        if (value > 1) { value = 1 }

        this.#config.position = value
    }

    constructor(rootSVG: Svg, name: string, values: IRiemannConfig) {
        super(rootSVG, name)

        // Store the constraints
        this.#config = Object.assign({
        }, values)

        // Generate the base shape
        this.shape = this.#makeShape()

        // Compute the shape
        this.computed()
    }

    #makeShape(): G {
        // Create the rectangles
        this.shape = this.element.group().attr({ id: this.name })

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape as G
    }

    computed(): this {
        // Clear the shape.
        this.shape.clear()

        // Determine the width of the rectangles.
        const domain = toPixels(this.#config.domain, this.graphConfig)
        const width = domain.max - domain.min
        const dxPixels = width / this.#config.rectangles
        const dx = (this.#config.domain.max - this.#config.domain.min) / this.#config.rectangles
        const yPixel = this.graphConfig.origin.y

        for (let index = 0; index < this.#config.rectangles; index += 1) {
            const xPixel = domain.min + index * dxPixels
            const x = this.#config.domain.min + (index + this.position) * dx

            // Create rectangle from the x axis to the function
            const y = this.#config.follow.evaluate(x).y
            this.shape.add(
                this.element
                    .rect(dxPixels, Math.abs(yPixel - y))
                    .move(xPixel, y)
            )
        }



        return this
    }

    moveLabel(): this {
        return this
    }

}