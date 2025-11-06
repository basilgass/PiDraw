import {Path as svgPath, Svg} from "@svgdotjs/svg.js"
import {AbstractFigure} from "./AbstractFigure"
import type {XY} from "../pidraw.common"
import {computeLine} from "../Calculus"

interface IGridConfig {
    axis: { x: XY, y: XY },
    scale?: { x: number, y: number },
    origin: XY,
    width: number,
    height: number,
    subdivisions: number

}

export class Grid extends AbstractFigure {
    constructor(rootSVG: Svg, name: string, values: IGridConfig) {
        super(rootSVG, name)

        this.static = true

        this._config = Object.assign(
            {
                ...this.graphConfig,
                subdivisions: 0
            },
            values
        )

        // Generate the base shape
        this.shape = this._makeShape()

        // Compute the shape
        this.computed()
        return this
    }

    protected _config: IGridConfig

    get config() {
        return this._config
    }

    set config(value: IGridConfig) {
        this._config = value
        this.computed()
    }

    computed(): this {
        const gridPath = [
            ...this._computeLines(this._config.axis.x, this._config.axis.y),
            ...this._computeLines(this._config.axis.y, this._config.axis.x)
        ]

        // BUild the path
        const path = gridPath.reduce((acc, cur) => {
            const [start, end] = cur
            return acc + `M${start.x},${start.y} L${end.x},${end.y}`
        }, '')

        const shape = this.shape as svgPath
        shape.plot(path)

        return this


    }

    moveLabel(): this {
        return this
    }

    _makeShape() {
        this.element.clear()

        // Create the path
        this.shape = this.element.path()

        // Apply the stroke.
        this.stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape as svgPath
    }

    _computeLines(xDirection: XY, yDirection: XY): [XY, XY][] {
        // X axis lines (aka horizontal lines)
        let x = +this._config.origin.x,
            y = +this._config.origin.y

        const gridPath: [XY, XY][] = []

        // Determine the first line (through the origin)
        let data = computeLine(
            {x, y},
            xDirection,
            this._config.width,
            this._config.height,
        )

        // 'Horizontal lines' :
        // direction is the axis.x
        // moving the lines in the direction of the axis.y
        const max_iteration = (this._config.width + this._config.height)/2
        let counter = 0

        while (counter<max_iteration) {
            if (data) {
                gridPath.push(data)
            }

            // Move to the next line
            x += yDirection.x
            y -= yDirection.y


            data = computeLine(
                {x, y},
                xDirection,
                this._config.width,
                this._config.height,
            )

            if (data === null && (x > this._config.width || y > this._config.height)) {
                break
            }

            if (gridPath.length > 1000) {
                throw new Error('Too many lines')
            }

            counter++
        }

        x = this._config.origin.x - yDirection.x
        y = this._config.origin.y + yDirection.y

        data = computeLine(
            {x, y},
            xDirection,
            this._config.width,
            this._config.height)

        counter = 0
        while (counter<max_iteration) {
            if(data) {
                gridPath.push(data)
            }

            // Move to the next line
            x -= yDirection.x
            y += yDirection.y

            // Make the next line
            data = computeLine(
                {x, y},
                xDirection,
                this._config.width,
                this._config.height)

            if (data === null && (x < 0 || y < 0)) {
                break
            }

            if (gridPath.length > 1000) {
                throw new Error('Too many lines')
            }

            counter++
        }

        return gridPath
    }
}