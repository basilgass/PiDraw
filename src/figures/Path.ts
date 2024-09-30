import {type Shape, Svg, Path as svgPath} from "@svgdotjs/svg.js"
import {AbstractFigure} from "./AbstractFigure"


export class Path extends AbstractFigure {
    #d = ''

    constructor(rootSVG: Svg, name: string, path?: string) {
        super(rootSVG, name)

        if (path) {
            this.#d = path
            this.computed()
            this.#makeShape()
        }
    }

    computed(): this {
        return this
    }

    get d(): string {
        return this.#d
    }

    set d(path: string) {
        this.#d = path;

        (this.shape as svgPath).plot(this.#d)
    }

    moveLabel(): this {
        throw new Error("Method not implemented.")
    }

    #makeShape(): Shape {
        this.clear()

        this.shape = this.element.path(this.#d).fill('none').stroke({color: 'black', width: 1})

        return this.shape
    }

}

