import {Figure} from "./Figure";
import {Graph} from "../Graph";

export class Polygon extends Figure{
    constructor(canvas: Graph, name: string) {
        // TODO : build the polygon class
        super(canvas, name);

        this.generateName()
    }

    generateName(): string {
        return super.generateName();
    }
}