import {Figure} from "./Figure";
import {Canvas} from "../Canvas";

export class Polygon extends Figure{
    constructor(canvas: Canvas, name: string) {
        // TODO : build the polygon class
        super(canvas, name);

        this.generateName()
    }

    generateName(): string {
        return super.generateName();
    }
}