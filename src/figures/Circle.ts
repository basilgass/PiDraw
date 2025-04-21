import {Circle as svgCircle, Shape, Svg} from "@svgdotjs/svg.js"
import {AbstractFigure} from "./AbstractFigure"
import type {XY} from "../pidraw.common"
import {distanceAB, toPixels} from "../Calculus"
import type {Line} from "./Line"

export interface ICircleConfig {
    center: XY,
    radius: number | XY
}

export class Circle extends AbstractFigure {
    #config: ICircleConfig

    constructor(rootSVG: Svg, name: string, values: ICircleConfig) {
        super(rootSVG, name)

        // Default values
        this.#config = Object.assign({
            figures: [],
            property: 'fixed',
            center: {x: 0, y: 0},
            radius: 1,
        }, values)

        this.#makeShape()
        this.computed()

    }

    get config() {
        return this.#config
    }

    set config(value: ICircleConfig) {
        this.#config = value
        this.#makeShape()
    }

    get center() {
        return this.#config.center
    }

    get radius(): number {
        if (typeof this.#config.radius === 'number') {
            return toPixels(this.#config.radius, this.graphConfig)
        }

        return distanceAB(this.center, this.#config.radius)
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

    override follow(x: number, y: number): XY {
        const r = this.radius
        const dx = x - this.center.x
        const dy = y - this.center.y
        const d = Math.sqrt(dx ** 2 + dy ** 2)
        x = dx / d * r + this.center.x
        y = dy / d * r + this.center.y

        return {x, y}
    }

    intersectionWithLine(line: Line, segment?: boolean): XY[] | null {
        const {x: cx, y: cy} = this.center
        const {x: x1, y: y1} = line.start
        const {x: x2, y: y2} = line.end

        const dx = x2 - x1
        const dy = y2 - y1

        const fx = x1 - cx
        const fy = y1 - cy

        const a = dx * dx + dy * dy
        const b = 2 * (dx * fx + dy * fy)
        const c = fx * fx + fy * fy - this.radius * this.radius

        const discriminant = b * b - 4 * a * c

        if (discriminant < 0) {
            return null
        }

        const results: XY[] = []
        const sqrtDiscriminant = Math.sqrt(discriminant)

        const t1 = (-b - sqrtDiscriminant) / (2 * a)
        const t2 = (-b + sqrtDiscriminant) / (2 * a)

        for (const t of [t1, t2]) {
            // Si on ne regarde que le segment.
            if (segment && (t < 0 || t > 1)) {
                continue
            }

            results.push({
                x: x1 + t * dx,
                y: y1 + t * dy
            })

        }

        return results
    }

    #makeShape(): Shape {
        this.element.clear()

        this.shape = this.element.circle(this.radius)
            .center(this.center.x, this.center.y)

        this.shape.stroke(this.appearance.stroke.color)
        this.shape.fill(this.appearance.fill)
        return this.shape
    }
}