import { Svg, Circle as svgCircle } from "@svgdotjs/svg.js"
import { AbstractFigure } from "./AbstractFigure"
import { XY } from "../pidraw.common"
import { Shape } from "@svgdotjs/svg.js"
import { distanceAB, toPixels } from "../Calculus"

export interface ICircleConfig {
    center: XY,
    radius: number | XY
}

export class Circle extends AbstractFigure {
    #config: ICircleConfig

    get config() { return this.#config }
    set config(value: ICircleConfig) {
        this.#config = value
        this.#makeShape()
    }

    get center() { return this.#config.center }
    get radius(): number {
        if (typeof this.#config.radius === 'number') {
            return toPixels(this.#config.radius, this.graphConfig).x
        }

        return distanceAB(this.center, this.#config.radius)
    }

    constructor(rootSVG: Svg, name: string, values: ICircleConfig) {
        super(rootSVG, name)

        // Default values
        this.#config = Object.assign({
            figures: [],
            property: 'fixed',
            center: { x: 0, y: 0 },
            radius: 1,
        }, values)

        this.#makeShape()
        this.computed()

    }

    #makeShape(): Shape {
        this.element.clear()

        this.shape = this.element.circle(this.radius)
            .center(this.center.x, this.center.y)

        this.shape.stroke(this.appearance.stroke.color)
        this.shape.fill(this.appearance.fill)
        return this.shape
    }

    computed(): this {
        const shape = this.shape as svgCircle
        shape.radius(this.radius)
        shape.center(this.center.x, this.center.y)

        return this
    }

    moveLabel(): this {
        if (this.label) {
            this.label.move(
                this.center.x + this.radius / 2,
                this.center.y - this.radius / 2
            )
        }

        return this
    }

    follow(x: number, y: number): XY {
        const r = this.radius
        const dx = x - this.center.x
        const dy = y - this.center.y
        const d = Math.sqrt(dx ** 2 + dy ** 2)
        x = dx / d * r + this.center.x
        y = dy / d * r + this.center.y

        return { x, y }
    }
}