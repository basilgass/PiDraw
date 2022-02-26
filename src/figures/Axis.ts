import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {AXIS} from "../variables/enums";
import {Line as svgLine} from "@svgdotjs/svg.js";

export class Axis extends Figure {
    private _orientation: AXIS
    private _offset: number

    constructor(graph: Graph, name: string, orientation: AXIS) {
        super(graph, name);

        this.generateName()

        this._orientation = orientation
        this._offset = 0.2
        const markers = this.graph.createMarker(8)
        let {x1, y1, x2, y2} = this._generateCoordinates()

        this.svg = graph.svg.line(x1, y1, x2, y2).stroke({width: 2, color: 'black'}).marker('end', markers.end)
    }

    generateName(): string {
        let n = this.graph.figures.filter(fig => fig instanceof Axis).length
        if (n === 0) {
            return 'x'
        } else if (n === 1) {
            return 'y'
        } else {
            return `axe_${n}`
        }
    }

    update(): Axis {
        if (this.svg instanceof svgLine) {
            let {x1, y1, x2, y2} = this._generateCoordinates()
            this.svg.plot(x1, y1, x2, y2)
        }
        return this
    }

    private _generateCoordinates() {
        if (this._orientation === AXIS.VERTICAL) {
            return {
                x1: this.graph.origin.x,
                y1: this.graph.height - this.graph.pixelsPerUnit.y * this._offset,
                x2: this.graph.origin.x,
                y2: this.graph.pixelsPerUnit.y * this._offset
            }
        } else if (this._orientation === AXIS.HORIZONTAL) {
            return {
                x1: this.graph.pixelsPerUnit.x * this._offset,
                y1: this.graph.origin.y,
                x2: this.graph.width - this.graph.pixelsPerUnit.x * this._offset,
                y2: this.graph.origin.y
            }
        }
    }

}