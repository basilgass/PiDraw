import { Path as svgPath, Svg, Marker } from "@svgdotjs/svg.js"
import { AbstractFigure } from "./AbstractFigure"
import { XY } from "../pidraw.common"
import { cartesianToAngle, createMarker, distanceAB, mathVector, numberCorrection, polarToCartesian, toPixels } from "../Calculus"

export interface IArcConfig {
    start: XY,
    center: XY
    end: XY,
    radius?: number | XY,
    morphToSquare?: boolean,
    sector?: boolean,
    mark?: boolean
}
export class Arc extends AbstractFigure {
    #config: IArcConfig
    #markers: { start: Marker, end: Marker }

    get config() { return this.#config }
    set config(value: IArcConfig) {
        this.#config = value
        this.#makeShape()
        this.computed()
    }

    get center() { return this.#config.center }
    get start() { return this.#config.start }
    get end() { return this.#config.end }
    get radius() {
        if (typeof this.#config.radius === 'number') {
            return toPixels(this.#config.radius, this.graphConfig).x
        }

        return distanceAB(this.center, this.#config.radius ?? this.#config.start)
    }


    constructor(rootSVG: Svg, name: string, values: IArcConfig) {
        super(rootSVG, name)

        this.#config = Object.assign({
            start: { x: 0, y: 0 },
            center: { x: 10, y: 10 },
            end: { x: 0, y: 10 },
            radius: 50,
            morphToSquare: true,
            sector: false,
            mark: false
        }, values)

        this.#markers = createMarker(this.rootSVG, 8)

        // Store the config -> it triggers makeShape and computed.
        this.config = values
    }
    #makeShape() {
        this.element.clear()

        // Create the path
        this.shape = this.element.path('M0 0')

        // Apply the stroke and fill.
        this.fill().stroke()

        // Add the shape to the group.
        this.element.add(this.shape)

        return this.shape
    }

    computed(): this {
        const path = this.shape as svgPath
        path.plot(this.getPath())
        return this
    }
    moveLabel(): this {
        // No label - no need to continue
        if (!this.label) { return this }

        // Radius of the arc.
        const r = this.radius
        // Determiner the position of the arc (greater or smaller than 180)
        const d = this.angle < 180 ? 1 : -1

        // Make the OA and OB unit vectors
        const OA = new mathVector(this.center, this.start).unit
        const OB = new mathVector(this.center, this.end).unit
        // Make the unit direction vector
        const v = OA.add(OB).unit

        const x = this.center.x + d * v.x * (r + 20)
        const y = this.center.y + d * v.y * (r + 20)

        this.label.move(x, y)

        // Auto label placement.
        if (d * v.x > 0 && d * v.y > 0) {
            // Label is bottom right
            this.label.position('br')
        } else if (d * v.x < 0 && d * v.y > 0) {
            // Label is bottom left
            this.label.position('bl')
        } else if (d * v.x > 0 && d * v.y < 0) {
            // label is top right
            this.label.position('tr')
        } else if (d * v.x < 0 && d * v.y < 0) {
            // Label is top left
            this.label.position('tl')
        }

        return this
    }

    get angle(): number {
        const { start, end } = this.getAngles()
        if (end - start < 0) {
            return 360 + end - start
        }

        return end - start
    }

    get isSquare(): boolean {
        return numberCorrection((this.start.x - this.center.x) * (this.end.x - this.center.x) + (this.start.y - this.center.y) * (this.end.y - this.center.y)) === 0
    }

    /**
     * Calculate the start and end angle of an arc
     * @returns {{startAngle: number, endAngle: number}}
     */
    getAngles(): { start: number, end: number } {
        // Get the angles defined be the three points
        return {
            start: +cartesianToAngle(this.center, this.start).toFixed(10),
            end: +cartesianToAngle(this.center, this.end).toFixed(10)
        }
    }

    getPath(): string {
        // Get the angles
        const { start, end } = this.getAngles(),
            radius = (this.#config.morphToSquare && this.isSquare) ? this.radius / 2 : this.radius,
            startXY = polarToCartesian(this.center.x, this.center.y, radius, start),
            endXY = polarToCartesian(this.center.x, this.center.y, radius, end)

        if (this.#config.morphToSquare && this.isSquare) {
            return this._describeSquare(this.center, startXY, endXY)
        } else {
            return this._describeArc(this.center, startXY, endXY, radius, end - start)
        }
    }

    mark(enable: boolean): this {
        if (this.shape instanceof svgPath) {
            if (enable) {
                this.shape.marker('end', this.#markers.end)
            } else {
                this.shape.marker('end')
            }
        }
        return this
    }

    private _describeSquare(center: XY, start: XY, end: XY): string {
        return [
            "M", start.x, start.y,
            "l", (end.x - center.x), (end.y - center.y),
            "L", end.x, end.y
        ].join(" ")
    }

    private _describeArc(center: XY, start: XY, end: XY, radius: number, angle: number): string {
        const largeArcFlag = (angle + 360) % 360 <= 180 ? 0 : 1,
            swipeFlag = 0

        // TODO: Mark an angle: use always the smallest arc ?
        // this._mark &&
        // if (angle < 0 && angle > -180) {
        //     largeArcFlag = (largeArcFlag + 1) % 2
        //     swipeFlag = 1
        // }

        let p = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, swipeFlag, end.x, end.y
        ]

        if (this.#config.sector) {
            p = p.concat(['L', center.x, center.y, 'L', start.x, start.y])
        }

        return p.join(" ")
    }
}



