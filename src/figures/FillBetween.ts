import { Path, type PathCommand, Svg } from "@svgdotjs/svg.js"
import { AbstractFigure } from "./AbstractFigure"
import {type DOMAIN } from "../pidraw.common"
import { Plot } from "./Plot"
import { toPixels } from "../Calculus"

export interface IFillBetweenConfig {
    expressions: [Plot] | [Plot, Plot],
    domain?: DOMAIN,
    image?: DOMAIN,
}

export class FillBetween extends AbstractFigure {
    #config: IFillBetweenConfig
    get config() { return this.#config }
    set config(value: IFillBetweenConfig) {
        this.#config = value

        this.computed()
    }
    get domain() {

        if (this.#config.domain) {
            // return {
            //     min: isNaN(this.#config.domain.min) ? 0 :
            //         toPixels({ x: this.#config.domain.min, y: 0 }, this.graphConfig).x,
            //     max: isNaN(this.#config.domain.max) ? this.graphConfig.width :
            //         toPixels({ x: this.#config.domain.max, y: 0 }, this.graphConfig).x
            // }
            return toPixels(this.#config.domain, this.graphConfig)

        }

        return {
            min: 0,
            max: this.graphConfig.width
        }
    }
    get image() {
        if (this.#config.image) {
            // return {
            //     min: isNaN(this.#config.image.min) ? 0 : toPixels(this.#config.image.min, this.graphConfig).y,
            //     max: isNaN(this.#config.image.max) ? this.graphConfig.height : toPixels(this.#config.image.max, this.graphConfig).y
            // }
            return toPixels(this.#config.image, this.graphConfig, 'y')

        }

        return {
            min: 0, max: this.graphConfig.height
        }
    }

    constructor(rootSVG: Svg, name: string, values: IFillBetweenConfig) {
        super(rootSVG, name)

        // Store the constraints
        this.#config = Object.assign({
            samples: 100
        }, values)

        // Generate the base shape
        this.shape = this.#makeShape()

        // Compute the shape
        this.computed()
        return this
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
        // Build the shape:
        // - build the path using the first expresion.
        // -build the path using the second expression in reverse order.
        // - close the path.
        // - fill the path.

        const [f, g] = this.#config.expressions
        const domain = this.domain
        const image = this.image

        function flatten(array: PathCommand, index: number): string {
            const [command, x, y] = array
            return `${index === 0 ? 'M' : command} ${x ?? 0} ${y ?? 0}`
        }

        const path1 = (f.shape as Path).array()
            .filter((pt) => {
                const x = pt[1]
                return x !== undefined && x >= domain.min && x <= domain.max
            })
            .map(flatten)

        let path2: string[] = []
        if(g) {
            // There is a path
            path2 = [...(g.shape as Path).array()]
                .filter((pt) => {
                    const x = pt[1]
                    return x !== undefined && x >= domain.min && x <= domain.max
                })
                .map(flatten)
                .reverse()
        }else{
            path2 = [`m ${domain.min} 0`]
        }

        const shape = this.shape as Path

        shape.plot(`${path1.join(' ')} ${path2.join(' ')} Z`)

        return this
    }

    moveLabel(): this {
        return this
    }

}