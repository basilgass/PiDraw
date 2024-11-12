import {AbstractFigure} from "./AbstractFigure"
import {BEZIERCONTROL, type XY} from "../pidraw.common"
import {Path as svgPath, type Shape, Svg} from "@svgdotjs/svg.js"
import {computeBezierPath} from "../functions/computedBezier"

interface IBezierControlPointInterface extends XY {
    point?: XY
}

interface pointWithName extends XY {
    name: string
}

export interface IBezierPointInterface {
    controls: {
        type: BEZIERCONTROL,
        ratio: number,
        left: IBezierControlPointInterface | null,
        right: IBezierControlPointInterface | null
    },
    point: pointWithName,
}

export interface IBezierConfig {
    points: IBezierPointInterface[]
}

export class Bezier extends AbstractFigure {
    #config: IBezierConfig
    #points: IBezierPointInterface[]

    constructor(rootSVG: Svg, name: string, values: IBezierConfig) {
        super(rootSVG, name)

        // Default config
        this.#config = values

        // Initialize
        this.#points = []
        this.points = values.points

        // Create the shape
        this.#makeShape()

        // Calculate the path.
        this.computed()
    }

    override computed(): this {

        const path = computeBezierPath(this.#points);
        (this.shape as svgPath).plot(path)

        return this
    }

    get config(): IBezierConfig {
        return this.#config
    }

    set config(value: IBezierConfig) {
        this.#config = value
    }

    getPointByName(name: string): IBezierPointInterface | undefined {
        return this.#points.find(x => x.point.name === name)
    }

    override moveLabel(): this {
        if (!this.label) {
            return this
        }

        throw new Error("Method not implemented.")
    }

    get points(): IBezierPointInterface[] {
        return this.#points
    }

    set points(values: IBezierPointInterface[]) {
        const defaultControl = {
            type: BEZIERCONTROL.SMOOTH,
            ratio: 0.2,
            left: null,
            right: null
        }

        this.#points = values
        this.#points.forEach(value => {
            value.controls = Object.assign({}, defaultControl, value.controls)
        })
    }

    setControlRatio(name: string, ratio: number): this {
        const pt = this.getPointByName(name)

        if (pt) {
            pt.controls.ratio = ratio
        }
        return this
    }

    setControlType(name: string, type: BEZIERCONTROL): this {
        const pt = this.getPointByName(name)

        if (pt) {
            pt.controls.type = type
        }
        return this
    }

    #makeShape(): Shape {
        this.element.clear()

        this.shape = this.element.path("")

        // Apply the stroke and fill.
        this.fill().stroke()

        return this.shape
    }
}