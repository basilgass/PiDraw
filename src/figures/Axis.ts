import {Figure} from "./Figure";
import {Canvas} from "../Canvas";

export enum AXIS {
    HORIZONTAL,
    VERTICAL
}
export class Axis extends Figure {
    constructor(canvas: Canvas, name: string, orientation: AXIS) {
        super(canvas, name);

        this.generateName()

        const offset = 0.2
        if(orientation===AXIS.HORIZONTAL) {
            this.svg = canvas.svg.line(
                this.canvas.pixelsPerUnit.x * offset, this.canvas.origin.y,
                this.canvas.width - this.canvas.pixelsPerUnit.x * offset, this.canvas.origin.y
            ).stroke({width: 1, color: 'black'}).marker('end', this.canvas.markers.end)
        }
        if(orientation===AXIS.VERTICAL) {
            this.svg = canvas.svg.line(
                this.canvas.origin.x, this.canvas.height - this.canvas.pixelsPerUnit.y * offset,
                this.canvas.origin.x, this.canvas.pixelsPerUnit.y * offset
            ).stroke({width: 1, color: 'black'}).marker('end', this.canvas.markers.end)
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