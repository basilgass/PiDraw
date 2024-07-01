import { Figure, IFigureConfig } from "../Figure"
import { Path as svgPath } from "@svgdotjs/svg.js"

export class Path extends Figure {
    private _d: string
    constructor(
        config: IFigureConfig, d: string) {
        super(config)

        this.svg = this.rootSVG.path().fill('none').stroke({ color: 'black', width: 1 })
        this.generateName()

        this._d = d

        this.plot(d)

        return this
    }

    plot(d: string): this {
        if (this.svg instanceof svgPath && d) {
            this.svg.plot(d)
        }

        return this
    }
    generateName(): string {
        return super.generateName()
    }
}
