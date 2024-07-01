import { GRIDTYPE } from "../enums"
import { Figure, IFigureConfig } from "../Figure"
import { GridConfig, IPoint } from "../pidraw.interface"


export class Grid extends Figure {
    private _config: GridConfig
    private _refresh: boolean
    // _origin: IPoint;

    constructor(figureConfig: IFigureConfig, config?: GridConfig) {
        super(figureConfig)

        // Default configuration of the grid.
        if (config) {
            this._config = config
        } else {
            this._config = {
                axisX: 50,
                axisY: 50,
                type: GRIDTYPE.ORTHOGONAL
            }
        }

        // Storing the previous value.

        // this._origin = {x: 0, y: this.graph.height}
        this._refresh = true
        this.svg = this.rootSVG.group()
        this.load()
    }

    get config(): GridConfig {
        return this._config
    }

    set config(value: GridConfig) {
        this._config = value
        // Update the grid on config changes !!!!
        this._refresh = true
        this.load()
    }

    load(): this {
        // No need to refresh
        if (!this._refresh) { return this }

        if (this.svg) {
            this.svg.find('line').each(x => x.remove())
        }

        const w = this.graph.width,
            h = this.graph.height,
            x = this._config.axisX,
            y = this._config.axisY,
            xOffset = this.graph.origin.x % x,
            yOffset = this.graph.origin.y % y

        // Vertical lines
        for (let pos = -x; pos <= w; pos += x) {
            this.svg.add(this.rootSVG.line(pos + xOffset, 0 - yOffset, pos + xOffset, h + yOffset))
        }

        // Horizontal lines
        for (let pos = h + y; pos >= 0; pos -= y) {
            this.svg.add(this.rootSVG.line(0 - xOffset, pos - yOffset, w + xOffset, pos - yOffset))
        }

        this.svg.stroke({ color: 'lightgray', width: 0.5 })

        return this

    }

    show(): this {
        this.svg.show()
        return this
    }

    hide(): this {
        this.svg.hide()
        return this
    }

    nearestPoint = (pt: IPoint): IPoint => {
        const nearestPoint = { x: +pt.x, y: +pt.y }

        // Version for orthographic.
        if (this._config.type === GRIDTYPE.ORTHOGONAL) {
            const nX = Math.trunc(pt.x / this._config.axisX) * this._config.axisX,
                nY = Math.trunc(pt.y / this._config.axisY) * this._config.axisY

            nearestPoint.x = pt.x < nX + this._config.axisX / 2 ? nX : nX + this._config.axisX
            nearestPoint.y = pt.y < nY + this._config.axisY / 2 ? nY : nY + this._config.axisY
        }

        return nearestPoint
    }

    update(): this {
        this.load()
        return this
    }
}
