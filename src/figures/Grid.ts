import {Canvas} from "../Canvas";
import {G} from "@svgdotjs/svg.js";
import {IPoint} from "../interfaces";
import {Figure} from "./Figure";

export interface gridConfig {
    axisX: number,
    axisY: number,
    type: gridType
}

export enum gridType {
    ORTHOGONAL = 4,
    TRIANGLE = 3,
    HEXAGONAL = 6
}

export class Grid extends Figure{
    #config: gridConfig
    #origin: IPoint;
    constructor(canvas: Canvas, name: string, config?:gridConfig) {
        super(canvas, name)

        this.svg = this.canvas.svg.group()

        // Default configuration of the grid.
        if(config){
            this.#config = config
        }else{
            this.#config = {
                axisX: 50,
                axisY: 50,
                type: gridType.ORTHOGONAL
            }
        }

        this.#origin = {x: 0, y: this.canvas.height}

        this.load()
    }

    load(): Grid {
        const w = this.canvas.width,
            h = this.canvas.height,
            x = this.#config.axisX,
            y = this.#config.axisY

        for (let pos = 0; pos <= w; pos += x) {
            this.svg.add(this.canvas.svg.line(pos, 0, pos, h));
        }

        for (let pos = h; pos >= 0; pos -= y) {
            this.svg.add(this.canvas.svg.line(0, pos, w, pos));
        }

        this.svg.stroke({color: 'black', width: 0.5});
        return this

    }
    show(): Grid {
        this.svg.show()
    return  this
    }

    hide(): Grid {
        this.svg.hide()
        return  this
    }

    nearestPoint = (pt: IPoint): IPoint => {
        let minDistance: boolean | number = false,
            distance = 0,
            nearestPoint = {x: +pt.x, y: +pt.y};

        // Version for orthographic.
        if(this.#config.type===gridType.ORTHOGONAL){
            let nX = Math.trunc(pt.x / this.#config.axisX)*this.#config.axisX,
                nY = Math.trunc(pt.y / this.#config.axisY)*this.#config.axisY

            nearestPoint.x = pt.x < nX+this.#config.axisX/2 ? nX: nX + this.#config.axisX
            nearestPoint.y = pt.y < nY+this.#config.axisY/2 ? nY: nY + this.#config.axisY
        }

        return nearestPoint;
    };


}