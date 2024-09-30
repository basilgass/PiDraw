import { Svg, Circle as svgCircle, Line as svgLine, G, Shape } from "@svgdotjs/svg.js"
import { AbstractFigure } from "./AbstractFigure"
import type { XY } from "../pidraw.common"
import { computeLine, toCoordinates } from "../Calculus"
import { Plot } from "./Plot"

export interface IFollowConfig {
    follow: Plot,
    tangent?: boolean,
    size?: number
}

export class Follow extends AbstractFigure {
    #config: IFollowConfig

    #reference: XY
    #delta: XY
    #point: svgCircle
    #tangent: svgLine

    get config() { return this.#config }
    set config(value: IFollowConfig) {
        this.#config = value
        this.computed()
    }

    constructor(rootSVG: Svg, name: string, values: IFollowConfig) {
        super(rootSVG, name)

        // Store the constraints
        this.#config = Object.assign({
            size: 10,
        }, values)

        // Default fill color
        this.appearance.fill.color = 'black'

        this.#reference = this.#config.follow.follow(0, 0)
        this.#delta = { x: 0, y: 0 }
        this.#tangent = this.element.line()

        // Draw the point at x=0
        this.#point = this.element.circle(this.#config.size)
            .center(this.#reference.x, this.#reference.y)

        // Generate the base shape
        this.shape = this.#makeShape()

        // Compute the shape
        this.computed()

        // Load the event listeners
        // @ts-expect-error - Event handler
        this.rootSVG.on('mousemove', (handler: Event & { clientX: number, clientY: number }) => {
            let clientXY = this.rootSVG.node.createSVGPoint()

            clientXY.x = handler.clientX
            clientXY.y = handler.clientY

            // #reference is in pixels : it's the point where the mouse is
            clientXY = clientXY.matrixTransform(this.rootSVG.node.getScreenCTM()?.inverse())

            // calculate the follow point : it's the point on the Path
            // - it is automatically converted to pixels
            const follow = this.#config.follow.follow(clientXY.x, clientXY.y)


            // Update the point
            if (isNaN(follow.y)) {
                this.#point.hide()
            } else {
                // Make sure the point is visible
                this.#point.show()

                // Move the point
                this.#point.center(follow.x, follow.y)

                // Build the delta point and the corresponding line.
                this.#reference = follow
                this.#delta = this.#config.follow.follow(clientXY.x + 0.01, clientXY.y + 0.01)
                this.computed()
            }
        })
        return this
    }

    #makeShape(): G {
        // Create the path
        this.shape = this.element.group().attr({ id: this.name })

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape as G
    }

    computed(): this {
        const data = computeLine(
            this.#reference,
            {
                x: this.#delta.x - this.#reference.x,
                y: this.#delta.y - this.#reference.y
            },
            this.graphConfig.width, this.graphConfig.height
        )

        if (data === null) { return this }

        this.#tangent.plot(
            data[0].x, data[0].y,
            data[1].x, data[1].y
        )

        return this
    }

    moveLabel(): this {
        return this
    }

    override strokeable(): Shape[] {
        return [this.#tangent]
    }

    override fillable(): Shape[] {
        return [this.#point]
    }
}