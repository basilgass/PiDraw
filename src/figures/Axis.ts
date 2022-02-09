import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {AXIS} from "../variables/enums";

export class Axis extends Figure {
    constructor(graph: Graph, name: string, orientation: AXIS) {
        super(graph, name);

        this.generateName()

        const offset = 0.2
        const markers = this.graph.createMarker(8)
        if (orientation === AXIS.HORIZONTAL) {
            this.svg = graph.svg.line(
                this.graph.pixelsPerUnit.x * offset, this.graph.origin.y,
                this.graph.width - this.graph.pixelsPerUnit.x * offset, this.graph.origin.y
            ).stroke({width: 2, color: 'black'}).marker('end', markers.end)
        }
        if (orientation === AXIS.VERTICAL) {
            this.svg = graph.svg.line(
                this.graph.origin.x, this.graph.height - this.graph.pixelsPerUnit.y * offset,
                this.graph.origin.x, this.graph.pixelsPerUnit.y * offset
            ).stroke({width: 2, color: 'black'}).marker('end', markers.end)
        }
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


}