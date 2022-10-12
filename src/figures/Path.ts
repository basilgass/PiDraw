import {Figure} from "./Figure";
import {Graph} from "../Graph";
import {Path as svgPath} from "@svgdotjs/svg.js";

export class Path extends Figure{
    private _d: string
    constructor(graph: Graph, name: string, d: string) {
        super(graph, name);

        this.svg = this.graph.svg.path().fill('none').stroke({color: 'black', width: 1});
        this.generateName()

        this.plot(d)

        return this
    }

    plot(d: string): Path {
        if (this.svg instanceof svgPath && d) {
            this.svg.plot(d)
        }

        return this
    }
    generateName(): string {
        return super.generateName();
    }
}