import { AbstractFigure } from "./AbstractFigure"
import { XY } from "../pidraw.common"
import { Svg, Shape, Line as svgLine } from "@svgdotjs/svg.js"
import { computeLine, mathLine } from "../Calculus"

export interface ILineConfig {
    through?: { A: XY, B: XY },
    mediator?: { A: XY, B: XY },
    parallel?: { to: Line, through: XY },
    perpendicular?: { to: Line, through: XY },
    shape?: 'segment' | 'half_line' | 'line' | 'vector'
}

// A line is a figure defined by a point and a vector
export class Line extends AbstractFigure {
    #config: ILineConfig
    #start: XY
    #end: XY

    get config() { return this.#config }
    set config(value: ILineConfig) {
        this.#config = value
        this.#makeShape()
    }

    get start() { return this.#start }
    set start(value: XY) {
        this.#start = value
    }
    get end() { return this.#end }
    set end(value: XY) {
        this.#end = value
    }

    get angle(): number {
        return Math.atan2(-this.direction.y, this.direction.x) * 180 / Math.PI
    }

    constructor(rootSVG: Svg, name: string, values: ILineConfig) {
        super(rootSVG, name)

        // Default config
        this.#config = Object.assign(
            { shape: 'line', },
            values
        )

        // Default values
        this.#start = { x: 0, y: 0 }
        this.#end = { x: this.graphConfig.width, y: this.graphConfig.height }

        // Update the shape
        this.shape = this.#makeShape()

        // Calculate
        this.computed()

        return this
    }

    get direction(): XY {
        return {
            x: this.end.x - this.start.x,
            y: this.end.y - this.start.y
        }
    }
    get normal(): XY {
        const d = this.direction

        return {
            x: -d.y,
            y: d.x
        }
    }

    get math(): mathLine {
        return new mathLine(this.start, this.end)
    }

    #makeShape(): Shape {
        this.element.clear()

        // Define the coordinates of the point
        this.shape = this.element.line(
            this.start.x, this.start.y,
            this.end.x, this.end.y
        )

        // Apply the stroke and fill.
        this.fill().stroke()

        return this.shape
    }

    computed(): this {
        let direction = { x: 0, y: 0 }

        if (this.#config.through && this.#config.through.A && this.#config.through.B) {
            this.start = this.#config.through.A
            this.end = this.#config.through.B

            // Direction
            direction = this.direction

        } else if (this.#config.parallel && this.#config.parallel.to && this.#config.parallel.through) {
            this.start = this.#config.parallel.through
            direction = this.#config.parallel.to.direction
        } else if (this.#config.perpendicular && this.#config.perpendicular.to && this.#config.perpendicular.through) {
            this.start = this.#config.perpendicular.through
            direction = this.#config.perpendicular.to.normal
        } else if (this.#config.mediator && this.#config.mediator.A && this.#config.mediator.B) {
            // Start point is the middle of both figures
            this.start = {
                x: (this.#config.mediator.A.x + this.#config.mediator.B.x) / 2,
                y: (this.#config.mediator.A.y + this.#config.mediator.B.y) / 2
            }

            // We are in drawing mode. The y axis must be reversed
            direction = {
                x: this.#config.mediator.B.y - this.#config.mediator.A.y,
                y: -(this.#config.mediator.B.x - this.#config.mediator.A.x)
            }
        }

        if (this.#config.shape === undefined || this.#config.shape === 'line' || this.#config.shape === 'half_line') {

            // Get the start and end points of the line
            const data = computeLine(
                this.start,
                direction,
                this.graphConfig.width,
                this.graphConfig.height,
                0,
                this.#config.shape === 'half_line'
            )

            // (this.#config.shape === 'line' || this.#config.shape === 'half_line') && 
            // If the data is not null, update the start and end points of the line
            if (data !== null) {
                this.start = data[0]
                this.end = data[1]
            }
            // 
        }

        const shape = this.shape as svgLine
        shape.plot(this.start.x, this.start.y, this.end.x, this.end.y)

        return this
    }

    moveLabel(): this {
        if (!this.label) { return this }

        // If it's a segment, place it at the middle of the segment
        if (this.#config.shape === 'segment') {
            const x = (this.start.x + this.end.x) / 2
            const y = (this.start.y + this.end.y) / 2

            let angle = -this.angle
            if (angle > 90) { angle = angle - 180 }
            if (angle < -90) { angle = angle + 180 }

            this.label.move(x, y)
            this.label.rotate(angle)
            this.label.position()
        }

        return this
    }
}