import {Canvas} from "../Canvas";
import {Figure} from "./Figure";

export class Label extends Figure{
    constructor(canvas: Canvas, name: string) {
        // TODO : build the label class
        super(canvas, name);

        this.generateName()
    }

    generateName(): string {
        return ''
    }
}