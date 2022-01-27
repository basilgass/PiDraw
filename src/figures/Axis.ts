import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {AXIS} from "../variables/enums";

export class Axis extends Figure {
    constructor(canvas: Graph, name: string, orientation: AXIS) {
        super(canvas, name);

        this.generateName()

        const offset = 0.2
        const markers = this.canvas.createMarker(8)
        if(orientation===AXIS.HORIZONTAL) {
            this.svg = canvas.svg.line(
                this.canvas.pixelsPerUnit.x * offset, this.canvas.origin.y,
                this.canvas.width - this.canvas.pixelsPerUnit.x * offset, this.canvas.origin.y
            ).stroke({width: 2, color: 'black'}).marker('end', markers.end)
        }
        if(orientation===AXIS.VERTICAL) {
            this.svg = canvas.svg.line(
                this.canvas.origin.x, this.canvas.height - this.canvas.pixelsPerUnit.y * offset,
                this.canvas.origin.x, this.canvas.pixelsPerUnit.y * offset
            ).stroke({width: 2, color: 'black'}).marker('end', markers.end)
        }
    }

    generateName(): string {
        let n = this.canvas.figures.filter(fig=>fig instanceof Axis).length
        if(n===0){
            return 'x'
        }else if(n===1){
            return 'y'
        }else{
            return `axe_${n}`
        }
    }


}