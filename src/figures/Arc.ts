import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {Point} from "./Point";

export class Arc extends Figure{
    #center: Point;
    #start: Point;
    #stop: Point;
    constructor(graph: Graph, name: string, center: Point, start: Point, stop: Point) {
        // TODO : build the arc class
        super(graph, name);

        this.#center = center
        this.#start = start
        this.#stop = stop

        this.generateName()
    }

    generateName(): string {
        if(this.name === undefined){
            return `a_${this.#start.name}${this.#center.name}${this.#stop.name}`
        }
        return super.generateName();
    }
}