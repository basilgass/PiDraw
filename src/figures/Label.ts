import {Graph} from "../Graph";
import {Figure} from "./Figure";

export class Label extends Figure{
    constructor(graph: Graph, name: string) {
        // TODO : build the label class
        super(graph, name);

        this.generateName()
    }

    generateName(): string {
        return ''
    }
}