import {Figure} from "./Figure";
import {Canvas} from "../Canvas";

export class Triangle extends Figure{
    constructor(canvas: Canvas, name: string) {
        // TODO : build the triangle class
        super(canvas, name);

        this.generateName()
    }

    generateName(): string {
        return super.generateName();
    }
}