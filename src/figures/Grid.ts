import {Graph} from "../Graph";
import {IPoint} from "../variables/interfaces";
import {Figure} from "./Figure";
import {GRIDTYPE} from "../variables/enums";

export interface GridConfig {
    axisX: number,
    axisY: number,
    type: GRIDTYPE
}

export class Grid extends Figure {
    // _origin: IPoint;
    constructor(graph: Graph, name: string, config?: GridConfig) {
        super(graph, name)

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

        // this._origin = {x: 0, y: this.graph.height}
        this.load()
    }

    private _config: GridConfig

    get config(): GridConfig {
        return this._config;
    }

    set config(value: GridConfig) {
        this._config = value;
    }

    load(): Grid {
        this.svg = this.graph.svg.group()
        const w = this.graph.width,
            h = this.graph.height,
            x = this._config.axisX,
            y = this._config.axisY,
            xOffset = this.graph.origin.x % x,
            yOffset = this.graph.origin.y % y

        // Vertical lines
        for (let pos = -x; pos <= w; pos += x) {
            this.svg.add(this.graph.svg.line(pos + xOffset, 0 - yOffset, pos + xOffset, h + yOffset));
        }

        // Horizontal lines
        for (let pos = h + y; pos >= 0; pos -= y) {
            this.svg.add(this.graph.svg.line(0 - xOffset, pos - yOffset, w + xOffset, pos - yOffset));
        }

        this.svg.stroke({color: 'lightgray', width: 0.5});
        return this

    }

    show(): Grid {
        this.svg.show()
        return this
    }

    hide(): Grid {
        this.svg.hide()
        return this
    }

    nearestPoint = (pt: IPoint): IPoint => {
        let minDistance: boolean | number = false,
            distance = 0,
            nearestPoint = {x: +pt.x, y: +pt.y};

        // Version for orthographic.
        if (this._config.type === GRIDTYPE.ORTHOGONAL) {
            let nX = Math.trunc(pt.x / this._config.axisX) * this._config.axisX,
                nY = Math.trunc(pt.y / this._config.axisY) * this._config.axisY

            nearestPoint.x = pt.x < nX + this._config.axisX / 2 ? nX : nX + this._config.axisX
            nearestPoint.y = pt.y < nY + this._config.axisY / 2 ? nY : nY + this._config.axisY
        }

        return nearestPoint;
    };

    update(): Grid {
        this.svg.remove()
        this.load()

        return this
    }
}