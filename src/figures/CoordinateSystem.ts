import {Line as svgLine, Marker, Svg} from "@svgdotjs/svg.js"
import {COORDINATE_SYSTEM, type IAxisConfig, type XY} from "../pidraw.common"
import {AbstractFigure} from "./AbstractFigure"
import {computeLine, createMarker} from "../Calculus"

export interface ICoordinateSystem {
    x: { direction: XY } & IAxisConfig,
    y: { direction: XY } & IAxisConfig
}

export class CoordinateSystem extends AbstractFigure {
    #config: ICoordinateSystem
    #axis: { x: svgLine, y: svgLine }

    constructor(rootSVG: Svg, name: string, values: COORDINATE_SYSTEM | ICoordinateSystem) {
        super(rootSVG, name)

        this.static = true

        if (Object.values(COORDINATE_SYSTEM).includes(values as COORDINATE_SYSTEM)) {
            this.#config = this.#defaultConfig(values as COORDINATE_SYSTEM)
        } else {
            this.#config = values as ICoordinateSystem
        }

        // Generate the base shape
        this.#axis = this.#makeShape()

        // Compute the shape
        this.computed()

        return this
    }

    get config() { return this.#config }

    set config(value: ICoordinateSystem) {
        this.#config = value
        this.computed()
    }

    get xAxis() { return this.#axis.x }

    get yAxis() { return this.#axis.y }

    computed(): this {
        // Loop through each axis and update the position, length, ...
        this.#updateAxis(this.#axis.x, this.#config.x.direction, this.#config.x)
        this.#updateAxis(this.#axis.y, this.#config.y.direction, this.#config.y)
        return this
    }

    moveLabel(): this {
        throw new Error("Method not implemented.")
    }

    #defaultConfig(coordinateSystem: COORDINATE_SYSTEM): ICoordinateSystem {
        if (coordinateSystem === COORDINATE_SYSTEM.POLAR) {
            // TODO: Implement the polar coordinate system
        }

        // Default return 2D Cartesian coordinate system
        return {
            x: {
                direction: this.graphConfig.axis.x,
                color: 'black',
                padding: 20,
                half: false,
                length: 0
            },
            y: {
                direction: this.graphConfig.axis.y,
                color: 'black',
                padding: 20,
                half: false,
                length: 0
            }
        }
    }

    #makeShape(): { x: svgLine, y: svgLine } {
        this.element.clear()

        // Create the path
        this.shape = this.element.group()
            .attr('id', 'coordinate-system')

        // Create the axis
        const axis: { x: svgLine, y: svgLine } = {
            x: this.element.line(0, 0, 0, 0)
                .attr('id', 'Ox'),
            y: this.element.line(0, 0, 0, 0)
                .attr('id', 'Oy')
        }
        this.shape.add(axis.x)
            .add(axis.y)


        // Add the shape to the group.
        this.element.add(this.shape)

        return axis
    }

    #updateAxis(axis: svgLine, direction: XY, config?: IAxisConfig): svgLine {
        const color = config?.color ?? 'black'
        const padding = config?.padding ?? 0
        const half_axis = config?.half ?? false
        const length = config?.length ?? 0

        const arrow: Marker = createMarker(this.rootSVG, `axis-${direction.x}-${direction.y}`, 10)
            .fill(color)

        // origin: XY, direction: XY, graph: { width: number, height: number }, padding = 0, half_axis = false, length?: number
        const data = computeLine(
            this.graphConfig.origin,
            direction,
            this.graphConfig.width,
            this.graphConfig.height,
            padding,
            half_axis,
            length
        ) as unknown as [XY, XY]

        if (data !== null) {
            axis.plot(data[0].x, data[0].y, data[1].x, data[1].y)
        }

        axis.stroke({ color: color, width: 1 })
            .marker('end', arrow)
        this.shape.add(axis)

        return axis
    }


}