import { Figure, IFigureConfig } from "../../Figure"
import { Circle, Line as svgLine } from "@svgdotjs/svg.js"
import { IPlot } from "../../pidraw.interface"

export class Follow extends Figure {
    private _size: number
    private _tangent: svgLine
    private _tangentVisible: boolean
    private _tangentDX: number
    private _plot: IPlot

    constructor(config: IFigureConfig, plot: IPlot, showTangent?: boolean) {
        super(config)

        this._plot = plot
        this._size = 10


        this.svg = this.rootSVG.circle(this._size)
            .fill('white')
            .stroke({ width: 1, color: 'black' })
        this.graph.layers.points.add(this.svg)

        this._tangent = this.rootSVG.line()
            .stroke({ color: 'black', width: 1 })
        this._tangentVisible = showTangent ?? false
        this._tangentDX = 0.001
        this.graph.layers.plotsFG.add(this._tangent)

        this.updateFigure()

        // Add the event on the root

        // @ts-expect-error - Event handler
        this.rootSVG.on('mousemove', (handler: Event & { clientX: number, clientY: number }): void => {
            // Real Client coordinates
            let clientXY = this.rootSVG.node.createSVGPoint()

            clientXY.x = handler.clientX
            clientXY.y = handler.clientY
            clientXY = clientXY.matrixTransform(this.rootSVG.node.getScreenCTM()?.inverse())

            const ptInUnits1 = this.graph.pixelsToUnits(clientXY)
            // Get the bounding box
            const pt = this.graph.unitsToPixels(this._plot.evaluate(ptInUnits1.x))

            // Update the point
            if (isNaN(pt.y)) {
                this.svg.hide()
            } else {
                if (!this.svg.visible()) {
                    this.svg.show()
                }
                this.svg.center(pt.x, pt.y)
            }

            // Update the tangent

            const pt2 = this.graph.unitsToPixels(this._plot.evaluate(+ptInUnits1.x + this._tangentDX)),
                slope = (pt2.y - pt.y) / (pt2.x - pt.x),
                h = pt.y - slope * pt.x

            if (isNaN(pt.y) || isNaN(pt2.y) || !this._tangentVisible) {
                this._tangent.hide()
            } else {
                if (!this._tangent.visible()) {
                    this._tangent.show()
                }
                if (pt.y * pt.y < 0) {
                    // Vertical asymptote
                    this._tangent.plot(
                        pt.x, 0, pt.x, this.graph.height
                    )
                } else {
                    this._tangent.plot(
                        0, h, this.graph.width, slope * this.graph.width + h
                    )
                }
            }
        })
    }

    clean() {
        this.svg.remove()
    }

    updateFigure(): this {
        return this
    }

    setPointSize(value: number): this {
        if (this.svg instanceof Circle) {
            this.svg.radius(value)
        }
        return this
    }

    showTangent(value?: boolean): this {
        this._tangentVisible = value === undefined || value

        return this
    }
}
