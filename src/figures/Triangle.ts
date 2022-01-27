import {Figure} from "./Figure";
import {Graph} from "../Graph";

export class Triangle extends Figure{
    constructor(canvas: Graph, name: string) {
        // TODO : build the triangle class
        super(canvas, name);

        this.generateName()
    }

    generateName(): string {
        return super.generateName();
    }
}