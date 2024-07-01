import { Svg, Polygon as svgPolygon } from "@svgdotjs/svg.js"
import { AbstractFigure } from "./AbstractFigure"
import { XY, isXY } from "../pidraw.common"
import { distanceAB, mathVector, toPixels } from "../Calculus"

export interface IPolygonConfig {
    vertices?: XY[]
    regular?: {
        center: XY
        radius: number | XY,
        sides: number
    }
}
export class Polygon extends AbstractFigure {
    #config: IPolygonConfig

    get config() { return this.#config }
    set config(value: IPolygonConfig) {
        this.#config = value
        this.#makeShape()
    }

    get radius(): number {
        if (!this.#config.regular) { return this.graphConfig.axis.x.x }

        if (typeof this.#config.regular.radius === 'number') {
            return toPixels(this.#config.regular.radius, this.graphConfig).x
        }

        if (this.#config.vertices && isXY(this.#config.vertices[0]) && isXY(this.#config.regular.radius)) {
            return distanceAB(this.#config.vertices[0], this.#config.regular.radius)
        }

        return 0
    }

    constructor(rootSVG: Svg, name: string, values: IPolygonConfig) {
        super(rootSVG, name)

        // Default values
        this.#config = Object.assign({
            shape: 'polygon',
        }, values)

        this.#makeShape()
        this.computed()
    }

    #figuresXYtoArray(): [number, number][] {
        const arr: [number, number][] = []
        this.#config.vertices?.forEach(pt => {
            if (isXY(pt)) {
                arr.push([pt.x, pt.y])
            }
        })

        return arr
    }
    #makeShape() {
        this.element.clear()

        this.shape = this.element.polygon(this.#figuresXYtoArray())

        this.fill().stroke()

        this.element.add(this.shape)

        return this.shape
    }


    computed(): this {
        const polygon = this.shape as svgPolygon

        if (this.#config.vertices && this.#config.vertices.length > 2) {
            polygon.plot(this.#figuresXYtoArray())
        } else if (
            this.#config.regular
        ) {

            const plotPoints: [number, number][] = []
            const r = this.radius

            const OP = new mathVector(
                this.#config.regular.center,
                isXY(this.#config.regular.radius) ?
                    this.#config.regular.radius :
                    { x: this.#config.regular.center.x, y: this.#config.regular.center.y - r }
            )

            for (let i = 0; i < this.#config.regular.sides; i++) {
                plotPoints.push([
                    this.#config.regular.center.x + OP.x,
                    this.#config.regular.center.y + OP.y
                ])

                // Rotate the vector
                OP.rotate(360 / this.#config.regular.sides)
            }

            polygon.plot(plotPoints)

        }
        return this
    }
    update(): this {
        this.computed()
        return this
    }

    moveLabel(): this {
        return this
    }
}