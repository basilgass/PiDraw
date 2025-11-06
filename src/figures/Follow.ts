import {Circle as svgCircle, G, Line as svgLine, Shape, Svg} from "@svgdotjs/svg.js"
import {AbstractFigure} from "./AbstractFigure"
import type {XY} from "../pidraw.common"
import {computeLine} from "../Calculus"
import {Plot} from "./Plot"

export interface IFollowConfig {
    follow: Plot,
    tangent?: boolean,
    size?: number
}

export class Follow extends AbstractFigure {
    protected _reference: XY
    protected _delta: XY
    protected _point: svgCircle
    protected _tangent: svgLine

    constructor(rootSVG: Svg, name: string, values: IFollowConfig) {
        super(rootSVG, name)

        // Store the constraints
        this._config = Object.assign({
            size: 10,
        }, values)

        // Default fill color
        this.appearance.fill.color = 'black'

        this._reference = this._config.follow.follow(0, 0)
        this._delta = { x: 0, y: 0 }
        this._tangent = this.element.line()

        // Draw the point at x=0
        this._point = this.element.circle(this._config.size)
            .center(this._reference.x, this._reference.y)

        // Generate the base shape
        this.shape = this._makeShape()

        // Compute the shape
        this.computed()

        // Load the event listeners
        // @ts-expect-error - Event handler
        this.rootSVG.on('mousemove', (handler: Event & { clientX: number, clientY: number }) => {
            let clientXY = this.rootSVG.node.createSVGPoint()

            clientXY.x = handler.clientX
            clientXY.y = handler.clientY

            // _reference is in pixels : it's the point where the mouse is
            clientXY = clientXY.matrixTransform(this.rootSVG.node.getScreenCTM()?.inverse())

            // calculate the follow point : it's the point on the Path
            // - it is automatically converted to pixels
            const follow = this._config.follow.follow(clientXY.x, clientXY.y)


            // Update the point
            if (isNaN(follow.y)) {
                this._point.hide()
            } else {
                // Make sure the point is visible
                this._point.show()

                // Move the point
                this._point.center(follow.x, follow.y)

                // Build the delta point and the corresponding line.
                this._reference = follow
                this._delta = this._config.follow.follow(clientXY.x + 0.01, clientXY.y + 0.01)
                this.computed()
            }
        })
        return this
    }

    protected _config: IFollowConfig

    get config() { return this._config }

    set config(value: IFollowConfig) {
        this._config = value
        this.computed()
    }

    _makeShape(): G {
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
            this._reference,
            {
                x: this._delta.x - this._reference.x,
                y: this._delta.y - this._reference.y
            },
            this.graphConfig.width, this.graphConfig.height
        )

        if (data === null) { return this }

        this._tangent.plot(
            data[0].x, data[0].y,
            data[1].x, data[1].y
        )

        return this
    }

    moveLabel(): this {
        return this
    }

    override strokeable(): Shape[] {
        return [this._tangent]
    }

    override fillable(): Shape[] {
        return [this._point]
    }
}