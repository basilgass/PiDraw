import { Svg, Shape } from "@svgdotjs/svg.js"
import { XY, isLine } from "../pidraw.common"
import { AbstractFigure } from "./AbstractFigure"
import { Line } from "./Line"

export interface IPointConfig {
    shape?: 'circle' | 'square' | 'crosshair'
    size?: number,
    coordinates?: XY,
    middle?: { A: XY, B: XY },
    intersection?: { A: Line, B: Line }
    projection?: { axis: 'x' | 'y' | Line, point: XY }
}

export class Point extends AbstractFigure {
    // Coordinates of the point in pixels
    #coordinates: XY

    #config: IPointConfig

    get config() { return this.#config }
    set config(value: IPointConfig) {
        this.#config = value
        this.#makeShape()
    }

    get size() {
        return this.#config.size as unknown as number
    }
    set size(value: number) {
        this.#config.size = value
        this.#makeShape()
    }

    constructor(rootSVG: Svg, name: string, values: IPointConfig) {
        super(rootSVG, name)

        // Default values
        this.#coordinates = { x: NaN, y: NaN }

        // Default config
        this.#config = Object.assign(
            {
                size: 2,
                shape: 'circle',
            },
            values
        )

        this.computed()

        // Update the shape
        this.shape = this.#makeShape()

        return this
    }

    get coordinates() { return this.#coordinates }
    set coordinates(value: XY) {
        this.#coordinates = value
        this.shape.center(this.#coordinates.x, this.#coordinates.y)
    }
    get x() { return this.#coordinates.x }
    set x(value: number) {
        this.#coordinates.x = value
        this.shape.center(value, this.#coordinates.y)
    }
    get y() { return this.#coordinates.y }
    set y(value: number) {
        this.#coordinates.y = value
        this.shape.center(this.#coordinates.x, value)
    }

    asCircle(size?: number): this {
        this.config.shape = 'circle'
        this.config.size = size ?? 2
        this.#makeShape()
        return this
    }
    asSquare(size?: number): this {
        this.config.shape = 'square'
        this.config.size = size ?? 10
        this.#makeShape()
        return this
    }
    asCrosshair(size?: number): this {
        this.config.shape = 'crosshair'
        this.config.size = size ?? 10
        this.#makeShape()
        return this
    }

    #makeShape(): Shape {
        this.clear()

        switch (this.config.shape) {
            case 'circle':
                this.shape = this.element.circle(this.size)
                    .center(this.#coordinates.x, this.#coordinates.y)
                break
            case 'square':
                this.shape = this.element.rect(this.size, this.size)
                    .center(this.#coordinates.x, this.#coordinates.y)
                break
            case 'crosshair':
                {
                    const diagonal_size = this.size / Math.sqrt(2)
                    this.shape = this.element.path(
                        `M ${-diagonal_size} ${diagonal_size} L ${diagonal_size} ${-diagonal_size} M ${-diagonal_size} ${-diagonal_size} L ${diagonal_size} ${diagonal_size}`
                    ).center(this.#coordinates.x, this.#coordinates.y)
                    break
                }
        }

        // Apply the stroke and fill.
        this.fill().stroke()

        return this.shape
    }

    computed(): this {
        // Update the coordinates, depending on the constraints settings
        if (this.#config.coordinates && isNaN(this.#coordinates.x)) {
            this.coordinates = this.#config.coordinates

            return this
        }

        if (this.#config.middle) {
            const A = this.#config.middle.A
            const B = this.#config.middle.B
            this.x = (A.x + B.x) / 2
            this.y = (A.y + B.y) / 2
            return this
        }

        if (this.#config.projection) {

            const pt = this.#config.projection.point

            if (this.#config.projection.axis === 'x') {
                this.x = pt.x
                this.y = this.graphConfig.origin.y
                return this
            }

            if (this.#config.projection.axis === 'y') {
                this.x = this.graphConfig.origin.x
                this.y = pt.y
                return this
            }

            if (isLine(this.#config.projection.axis)) {

                const line = this.#config.projection.axis
                const x0 = line.start.x
                const y0 = line.start.y
                const dx = pt.x - x0
                const dy = pt.y - y0
                const direction = line.direction
                const dotProduct = dx * direction.x + dy * direction.y
                const dotProductLength = direction.x * direction.x + direction.y * direction.y

                this.x = x0 + dotProduct * direction.x / dotProductLength
                this.y = y0 + dotProduct * direction.y / dotProductLength
            }
        }

        if (this.#config.intersection) {
            const line1 = this.#config.intersection.A
            const line2 = this.#config.intersection.B
            // Get the intersection of two lines.
            const coord = line1.math
                .intersection(line2.math)

            if (coord === null) { return this }

            this.coordinates = coord
        }

        return this
    }

    moveLabel(): this {
        if (this.label) {
            this.label.move(this.x, this.y)
        }

        return this
    }

}