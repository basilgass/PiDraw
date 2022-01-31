import {Figure} from "./Figure";
import {Graph} from "../Graph";

export class Triangle extends Figure{
    constructor(graph: Graph, name: string) {
        // TODO : build the triangle class
        super(graph, name);

        this.generateName()
    }

    generateName(): string {
        return super.generateName();
    }
}