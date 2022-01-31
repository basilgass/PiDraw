import {Figure} from "./Figure";
import {Graph} from "../Graph";

export class Polygon extends Figure{
    constructor(graph: Graph, name: string) {
        // TODO : build the polygon class
        super(graph, name);

        this.generateName()
    }

    generateName(): string {
        return super.generateName();
    }
}