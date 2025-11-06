import {Path as svgPath, type Shape, Svg} from "@svgdotjs/svg.js"
import {AbstractFigure} from "./AbstractFigure"


export class Path extends AbstractFigure {
    constructor(rootSVG: Svg, name: string, path?: string) {
        super(rootSVG, name)

        if (path) {
            this._d = path
            this.computed()
            this._makeShape()
        }
    }

    protected _d = ''

    get d(): string {
        return this._d
    }

    set d(path: string) {
        this._d = path;

        (this.shape as svgPath).plot(this._d)
    }

    computed(): this {
        return this
    }

    moveLabel(): this {
        throw new Error("Method not implemented.")
    }

    _makeShape(): Shape {
        this.clear()

        this.shape = this.element.path(this._d).fill('none').stroke({color: 'black', width: 1})

        return this.shape
    }

}

