import { Figure, IFigureConfig } from "../Figure"
import { AXIS } from "../enums"
import { Line as svgLine } from "@svgdotjs/svg.js"
import { Line } from "@svgdotjs/svg.js"
import { Marker } from "@svgdotjs/svg.js"
import { createMarker } from "../helpers/marker"

export class Axis extends Figure {
    private _minaxis: boolean
    private _offset: number
    private _orientation: AXIS
    // TODO: make the arrow marker much better to handle and modify.
    private _markerSize: number
    private _marker: Marker

    constructor(
        config: IFigureConfig,
        orientation: AXIS
    ) {
        super(config)

        // Generate the name
        this.generateName()

        this._orientation = orientation
        this._offset = 0.2

        // MOdification made in arrow too.
        this._markerSize = 6
        this._marker = createMarker(this.rootSVG, this._markerSize).end

        const { x1, y1, x2, y2 } = this._generateCoordinates()

        this._minaxis = false

        this.svg = this.rootSVG.line(x1, y1, x2, y2)
            .stroke({ width: 2, color: 'black' })
            .marker('end', this._marker)
    }

    get minaxis(): boolean {
        return this._minaxis
    }

    set minaxis(value: boolean) {
        this._minaxis = value
    }

    arrow(size?: number): this {
        this._markerSize = size ?? 6
        this._marker = createMarker(this.rootSVG, this._markerSize).end
        return this
    }

    update(): this {
        if (this.svg instanceof svgLine) {
            const { x1, y1, x2, y2 } = this._generateCoordinates()
            this.svg.plot(x1, y1, x2, y2)
        }

        // update the marker
        const markers = createMarker(this.rootSVG, this._markerSize);
        (this.svg as Line).marker('end', markers.end)

        return this
    }

    setMinAxis(minaxis: boolean, arrowSize?: number): this {
        if (arrowSize) { this.arrow(arrowSize) }

        if (minaxis) {
            this._minaxis = true
            return this
        }

        this._minaxis = false
        return this
    }

    private _generateCoordinates(): { x1: number, x2: number, y1: number, y2: number } {
        if (this._minaxis) {
            if (this._orientation === AXIS.VERTICAL) {
                return {
                    x1: this.graph.origin.x,
                    y1: this.graph.origin.y + this.graph.pixelsPerUnit.y * this._offset,
                    x2: this.graph.origin.x,
                    y2: this.graph.origin.y - this.graph.pixelsPerUnit.y
                }
            } else if (this._orientation === AXIS.HORIZONTAL) {
                return {
                    x1: this.graph.origin.x - this.graph.pixelsPerUnit.x * this._offset,
                    y1: this.graph.origin.y,
                    x2: this.graph.origin.x + this.graph.pixelsPerUnit.x,
                    y2: this.graph.origin.y
                }
            }

        }
        if (this._orientation === AXIS.VERTICAL) {
            return {
                x1: this.graph.origin.x,
                y1: this.graph.height - this.graph.pixelsPerUnit.y * this._offset,
                x2: this.graph.origin.x,
                y2: this.graph.pixelsPerUnit.y * this._offset
            }
        } else if (this._orientation === AXIS.HORIZONTAL) {
            return {
                x1: this.graph.pixelsPerUnit.x * this._offset,
                y1: this.graph.origin.y,
                x2: this.graph.width - this.graph.pixelsPerUnit.x * this._offset,
                y2: this.graph.origin.y
            }
        }

        throw new Error('Invalid axis orientation')
    }
}
