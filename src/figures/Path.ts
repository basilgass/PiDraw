import {Figure} from "./Figure";
import {Graph} from "../Graph";

export class Path extends Figure{
    constructor(graph: Graph, name: string) {
        // TODO : build the path class
        super(graph, name);

        this.generateName()
    }

    generateName(): string {
        return super.generateName();
    }
}