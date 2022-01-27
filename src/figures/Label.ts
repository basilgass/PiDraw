import {Graph} from "../Graph";
import {Figure} from "./Figure";

export class Label extends Figure{
    constructor(canvas: Graph, name: string) {
        // TODO : build the label class
        super(canvas, name);

        this.generateName()
    }

    generateName(): string {
        return ''
    }
}