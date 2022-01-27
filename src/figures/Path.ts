import {Figure} from "./Figure";
import {Graph} from "../Graph";

export class Path extends Figure{
    constructor(canvas: Graph, name: string) {
        // TODO : build the path class
        super(canvas, name);

        this.generateName()
    }

    generateName(): string {
        return super.generateName();
    }
}