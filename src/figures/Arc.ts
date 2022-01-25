import {Figure} from "./Figure";
import {Canvas} from "../Canvas";
import {Point} from "./Point";

export class Arc extends Figure{
    #center: Point;
    #start: Point;
    #stop: Point;
    constructor(canvas: Canvas, name: string, center: Point, start: Point, stop: Point) {
        // TODO : build the arc class
        super(canvas, name);

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