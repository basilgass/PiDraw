import {Polygon as svgPolygon, Svg} from "@svgdotjs/svg.js"
import {AbstractFigure} from "./AbstractFigure"
import {isXY, type XY} from "../pidraw.common"
import {distanceAB, mathVector, toPixels} from "../Calculus"

export interface IPolygonConfig {
    vertices?: XY[]
    regular?: {
        center: XY
        radius: number | XY,
        sides: number
    }
    mark?: {
        center?: {
            length?: number
        }
    }
}
export class Polygon extends AbstractFigure {
    constructor(rootSVG: Svg, name: string, values: IPolygonConfig) {
        super(rootSVG, name)

        // Default values
        this._config = Object.assign({
            shape: 'polygon',
        }, values)

        this._makeShape()
        this.computed()
    }

    protected _config: IPolygonConfig

    get config() { return this._config }

    set config(value: IPolygonConfig) {
        this._config = value
        this._makeShape()
    }

    get vertices() {
        return this._config.vertices
    }

    get radius(): number {
        if (!this._config.regular) { return this.graphConfig.axis.x.x }

        if (typeof this._config.regular.radius === 'number') {
            return toPixels(this._config.regular.radius, this.graphConfig)
        }

        if (this._config.vertices && isXY(this._config.vertices[0]) && isXY(this._config.regular.radius)) {
            return distanceAB(this._config.vertices[0], this._config.regular.radius)
        }

        return 0
    }

    _figuresXYtoArray(): [number, number][] {
        const arr: [number, number][] = []
        this._config.vertices?.forEach(pt => {
            if (isXY(pt)) {
                arr.push([pt.x, pt.y])
            }
        })

        return arr
    }
    _makeShape() {
        this.element.clear()

        const pointsCoordinates = this._figuresXYtoArray()
        this.shape = this.element.polygon(pointsCoordinates)

        this.fill().stroke()

        this.element.add(this.shape)

        // Add marks if they exists.
        if (this._config.mark) {

            // Set the length of the mark
            const length = this._config.mark.center?.length ?? 0

            // Get the center of the figure. It's the average of all vertices.
            const center = pointsCoordinates.reduce((acc, pt) => {
                acc.x += pt[0]
                acc.y += pt[1]
                return acc
            }
                , { x: 0, y: 0 })

            center.x /= pointsCoordinates.length
            center.y /= pointsCoordinates.length

            // Draw a thin gray line from the center to each vertex
            pointsCoordinates.forEach(pt => {
                // Get the vector from the center to the vertex
                const OP = new mathVector(center, { x: pt[0], y: pt[1] })
                if (length) {
                    OP.setLength(length * 20)
                }

                this.element.line(center.x, center.y, center.x + OP.x, center.y + OP.y).stroke({ color: 'gray', width: 0.5 })
            })

        }
        return this.shape
    }


    computed(): this {
        const polygon = this.shape as svgPolygon

        if (this._config.vertices && this._config.vertices.length > 2) {
            polygon.plot(this._figuresXYtoArray())
        } else if (
            this._config.regular
        ) {

            const plotPoints: [number, number][] = []
            const r = this.radius

            const OP = new mathVector(
                this._config.regular.center,
                isXY(this._config.regular.radius) ?
                    this._config.regular.radius :
                    { x: this._config.regular.center.x, y: this._config.regular.center.y - r }
            )

            for (let i = 0; i < this._config.regular.sides; i++) {
                plotPoints.push([
                    this._config.regular.center.x + OP.x,
                    this._config.regular.center.y + OP.y
                ])

                // Rotate the vector
                OP.rotate(360 / this._config.regular.sides)
            }

            polygon.plot(plotPoints)

        }
        return this
    }
    override update(): this {
        this.computed()
        return this
    }

    moveLabel(): this {
        return this
    }
}