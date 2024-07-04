import { Svg, Path as svgPath } from "@svgdotjs/svg.js"
import { AbstractFigure } from "./AbstractFigure"
import { XY } from "../pidraw.common"
import { computeLine } from "../Calculus"

interface IGridConfig {
    axis: { x: XY, y: XY },
    scale?: { x: number, y: number },
    origin: XY,
    width: number,
    height: number,
    subdivisions: number

}
export class Grid extends AbstractFigure {
    #config: IGridConfig

    get config() { return this.#config }
    set config(value: IGridConfig) {
        this.#config = value
        this.computed()
    }

    constructor(rootSVG: Svg, name: string, values: IGridConfig) {
        super(rootSVG, name)

        this.static = true

        this.#config = Object.assign(
            {
                ...this.graphConfig,
                subdivisions: 0
            },
            values
        )

        // TODO: implement a "scaling factor" for the axis
        // this.#config.axis.x.x = Math.PI * this.#config.axis.x.x / 4

        // Generate the base shape
        this.shape = this.#makeShape()

        // Compute the shape
        this.computed()
        return this
    }

    #makeShape() {
        this.element.clear()

        // Create the path
        this.shape = this.element.path()

        // Apply the stroke.
        this.stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape as svgPath
    }

    computed(): this {
        const gridPath = [
            ...this.#computeLines(this.#config.axis.x, this.#config.axis.y),
            ...this.#computeLines(this.#config.axis.y, this.#config.axis.x)
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

    #computeLines(xDirection: XY, yDirection: XY): [XY, XY][] {
        // X axis lines (aka horizontal lines)
        let x = +this.#config.origin.x,
            y = +this.#config.origin.y

        const gridPath: [XY, XY][] = []

        // Determine the first line (through the origin)
        let data = computeLine(
            { x, y },
            xDirection,
            this.#config.width,
            this.#config.height,
        )

        // 'Horizontal lines' :
        // direction is the axis.x
        // moving the lines in the direction of the axis.y
        while (data) {
            gridPath.push(data)

            // Move to the next line
            x += yDirection.x
            y -= yDirection.y

            data = computeLine(
                { x, y },
                xDirection,
                this.#config.width,
                this.#config.height,
            )

            if (gridPath.length > 1000) { throw new Error('Too many lines') }
        }

        x = this.#config.origin.x - yDirection.x
        y = this.#config.origin.y + yDirection.y

        data = computeLine(
            { x, y },
            xDirection,
            this.#config.width,
            this.#config.height)

        while (data) {
            gridPath.push(data)

            // Move to the next line
            x -= yDirection.x
            y += yDirection.y

            // Make the next line
            data = computeLine(
                { x, y },
                xDirection,
                this.#config.width,
                this.#config.height)

            if (gridPath.length > 1000) { throw new Error('Too many lines') }
        }

        return gridPath
    }

    moveLabel(): this {
        return this
    }
}