import {Figure} from "./Figure";
import {Canvas} from "../Canvas";

export class Path extends Figure{
    constructor(canvas: Canvas, name: string) {
        // TODO : build the path class
        super(canvas, name);

        this.generateName()
    }

    generateName(): string {
        return super.generateName();
    }
}