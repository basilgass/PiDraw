import {Graph} from "../Graph";
import {G} from "@svgdotjs/svg.js";
import {IPoint} from "../variables/interfaces";
import {Figure} from "./Figure";
import {GRIDTYPE} from "../variables/enums";

export interface GridConfig {
    axisX: number,
    axisY: number,
    type: GRIDTYPE
}

export class Grid extends Figure{
    #config: GridConfig
    // #origin: IPoint;
    constructor(graph: Graph, name: string, config?:GridConfig) {
        super(graph, name)

        this.svg = this.graph.svg.group()

        // Default configuration of the grid.
        if(config){
            this.#config = config
        }else{
            this.#config = {
                axisX: 50,
                axisY: 50,
                type: GRIDTYPE.ORTHOGONAL
            }
        }

        // this.#origin = {x: 0, y: this.graph.height}

        this.load()
    }

    load(): Grid {
        const w = this.graph.width,
            h = this.graph.height,
            x = this.#config.axisX,
            y = this.#config.axisY,
            xOffset = this.graph.origin.x % x,
            yOffset = this.graph.origin.y % y

        // Vertical lines
        for (let pos = -x; pos <= w; pos += x) {
            this.svg.add(this.graph.svg.line(pos+xOffset, 0-yOffset, pos+xOffset, h+yOffset));
        }

        // Horizontal lines
        for (let pos = h+y; pos >= 0; pos -= y) {
            this.svg.add(this.graph.svg.line(0-xOffset, pos-yOffset, w+xOffset, pos-yOffset));
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
        if(this.#config.type===GRIDTYPE.ORTHOGONAL){
            let nX = Math.trunc(pt.x / this.#config.axisX)*this.#config.axisX,
                nY = Math.trunc(pt.y / this.#config.axisY)*this.#config.axisY

            nearestPoint.x = pt.x < nX+this.#config.axisX/2 ? nX: nX + this.#config.axisX
            nearestPoint.y = pt.y < nY+this.#config.axisY/2 ? nY: nY + this.#config.axisY
        }

        return nearestPoint;
    };


}