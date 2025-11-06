import {AbstractFigure} from "./AbstractFigure"
import type {XY} from "../pidraw.common"
import {Line as svgLine, Shape, Svg} from "@svgdotjs/svg.js"
import {computeLine, createMarker, mathLine, mathVector} from "../Calculus"

export type ILineType = 'segment' | 'ray' | 'line' | 'vector'

export interface ILineConfig {
    bisector?: { d1: Line, d2: Line } | { A: XY, B: XY, C: XY },
    director?: { A: XY, d: XY },
    mediator?: { A: XY, B: XY },
    parallel?: { to: Line, through: XY },
    perpendicular?: { to: Line, through: XY },
    shape?: ILineType
    through?: { A: XY, B: XY },
}

// A line is a figure defined by a point and a vector
export class Line extends AbstractFigure {
    constructor(rootSVG: Svg, name: string, values: ILineConfig) {
        super(rootSVG, name)

        // Default config
        this._config = Object.assign(
            {shape: 'line',},
            values
        )

        // Default values
        this._start = {x: 0, y: 0}
        this._end = {x: this.graphConfig.width, y: this.graphConfig.height}

        // Update the shape
        this.shape = this._makeShape()

        // Calculate
        this.computed()

        return this
    }

    protected _config: ILineConfig

    get config() {
        return this._config
    }

    set config(value: ILineConfig) {
        this._config = value
        this._makeShape()
    }

    protected _end: XY

    get end() {
        return this._end
    }

    set end(value: XY) {
        this._end = value
    }

    protected _start: XY

    get start() {
        return this._start
    }

    set start(value: XY) {
        this._start = value
    }

    get angle(): number {
        return Math.atan2(-this.direction.y, this.direction.x) * 180 / Math.PI
    }

    get direction(): XY {
        return {
            x: this.end.x - this.start.x,
            y: this.end.y - this.start.y
        }
    }

    get math(): mathLine {
        return new mathLine(this.start, this.end)
    }

    get normal(): XY {
        const d = this.direction

        return {
            x: d.y,
            y: -d.x
        }
    }

    computed(): this {
        let direction = {x: 0, y: 0}

        if (this._config.through?.A && this._config.through.B) {
            this.start = this._config.through.A
            this.end = this._config.through.B

            // Direction
            direction = this.direction
        } else if (this._config.director?.A && this._config.director.d) {
            this.start = this._config.director.A
            this.end = {
                x: this._config.director.A.x + this._config.director.d.x,
                y: this._config.director.A.y + this._config.director.d.y
            }
            direction = this._config.director.d
        } else if (this._config.parallel?.to && this._config.parallel.through) {
            this.start = this._config.parallel.through
            direction = this._config.parallel.to.direction
        } else if (this._config.perpendicular?.to && this._config.perpendicular.through) {
            this.start = this._config.perpendicular.through
            direction = this._config.perpendicular.to.normal
        } else if (this._config.mediator?.A && this._config.mediator.B) {
            // Start point is the middle of both figures
            this.start = {
                x: (this._config.mediator.A.x + this._config.mediator.B.x) / 2,
                y: (this._config.mediator.A.y + this._config.mediator.B.y) / 2
            }

            // We are in drawing mode. The y axis must be reversed
            direction = {
                x: this._config.mediator.B.y - this._config.mediator.A.y,
                y: -(this._config.mediator.B.x - this._config.mediator.A.x)
            }
        } else if (this._config.bisector) {
            // Either we have two lines or three points
            if ('d1' in this._config.bisector && 'd2' in this._config.bisector) {
                // TODO: Implement the bisector of two lines
            }

            if ('A' in this._config.bisector && 'B' in this._config.bisector && 'C' in this._config.bisector) {
                const {A, B, C} = this._config.bisector

                const AB = new mathVector(A, B),
                    normAB = AB.norm,
                    AC = new mathVector(A, C),
                    normAC = AC.norm


                // the bisector go through A
                this.start = A

                // The direction of the bisector is the sum of the two normalise vectors
                direction = {
                    x: AB.x / normAB + AC.x / normAC,
                    y: AB.y / normAB + AC.y / normAC
                }

            }
        }
        // else if (this._config.equation) {
        //     // the equation can be something like:
        //     // y=ax+b
        //     // y = a
        //     // x = a
        //     // ax+by+c=0
        //     const [left, right] = this._config.equation.equation.split('=')
        //     if (left === 'x') {
        //         // vetical line
        //         const x = toNumber(right)
        //         this.start = {x, y: 0}
        //         direction = {x: 0, y: 1}
        //     } else if (left === 'y' && !right.includes('y')) {
        //         // vetical line
        //         const y = toNumber(right)
        //         this.start = {x: 0, y}
        //         direction = {x: 1, y: 0}
        //     } else if (left === 'y') {
        //         // we have y=ax+b
        //         const a = toNumber(right.match(/^[-]?[0-9/]*/g)[0] || 0)
        //         const b = toNumber(right.match(/[-]?[0-9/]*$/g)
        //             .filter(x => x !== '')[0] || 0)
        //
        //         this.start = {x: 0, y: b}
        //         direction = {x: 1, y: a}
        //     } else if (!isNaN(+right)) {
        //         // we have ax+by+c=0 or ax+by=c
        //         const a: number = toNumber(this._config.equation.equation.match(/[+-]?[0-9/]*x/g)[0] || 0)
        //         const b: number = toNumber(this._config.equation.equation.match(/[+-]?[0-9/]*x/g)[0] || 0)
        //     }
        // }

        // If the line is not a segment and not a vector, we need to compute the line
        // it is designed for the line and ray
        if (this._config.shape === undefined || this._config.shape === 'line' || this._config.shape === 'ray') {

            // Get the start and end points of the line
            const data = computeLine(
                this.start,
                direction,
                this.graphConfig.width,
                this.graphConfig.height,
                0,
                this._config.shape === 'ray'
            )

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

    override follow(x: number, y: number): XY {

        const xy = this.math.projection({x, y})

        // If the line is a line, return
        if (this._config.shape === 'line') {
            return xy
        }

        // If the line is a ray, make sure the point is on the line
        const {x: x1, y: y1} = this.start
        const {x: x2, y: y2} = this.end

        const dx = x2 - x1
        const dy = y2 - y1

        const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)))

        return {
            x: x1 + t * dx,
            y: y1 + t * dy
        }
    }

    override move(x: number | XY): this {
        if (typeof x === 'number') {
            // Get the normal vector
            const d = new mathVector(this.normal).setLength(x)

            return this.move(d)
        }

        return super.move(x)
    }

    moveLabel(): this {
        if (!this.label) {
            return this
        }

        // If it's a segment, place it at the middle of the segment
        if (this._config.shape === 'segment' || this._config.shape === 'vector') {
            const x = (this.start.x + this.end.x) / 2
            const y = (this.start.y + this.end.y) / 2

            this.label.move(x, y)

            if (this.label.auto_rotate) {
                let angle = -this.angle
                if (angle > 90) {
                    angle = angle - 180
                }
                if (angle < -90) {
                    angle = angle + 180
                }

                this.label.position(undefined, undefined, angle)
            }
        }

        return this
    }

    _makeShape(): Shape {
        this.element.clear()

        // Define the coordinates of the point
        this.shape = this.element.line(
            this.start.x, this.start.y,
            this.end.x, this.end.y
        )

        // Apply the style
        if (this._config.shape === 'vector') {
            const marker = createMarker(this.rootSVG, this.name, 10)
            const line = this.shape as svgLine
            line.marker('end', marker)
        }

        // Apply the stroke and fill.
        this.fill().stroke()

        return this.shape
    }
}