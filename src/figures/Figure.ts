import {Graph} from "../Graph";
import {Label} from "./Label";
import {Circle, G, Line, Path, Shape} from "@svgdotjs/svg.js";
import {svgShape} from "../variables/types";

export class Figure {
    /**
     * Canvas root object.
     * @type {Graph}
     * @private
     */
    #graph: Graph
    /**
     * Define if the object should update or not.
     * @type {Boolean}
     * @private
     */
    #freeze: Boolean
    /**
     * Name of the figure
     * @type {string}
     * @private
     */
    #name: string
    /**
     * THe Label object assign to this Figure.
     * @type {Label}
     * @private
     */
    #label: Label
    /**
     * The SVG object
     * @type {unknown}
     * @private
     */
    #svg: svgShape

    constructor(graph: Graph, name: string) {
        this.#freeze = false

        this.#graph = graph
        this.#name = name

        // TODO: handle labels - automatically add it ?
        // this.#label = new Label(graph, name)

    }

    draw() {
        this.#freeze = false
        this.update()
    }
    update() {
        // We don't want to update.
        if (this.#freeze || this.#graph.freeze) {
            return
        }
        this.updateFigure()
    }

    updateFigure():Figure {
        return this
    }

    generateName(): string {
        return this.#name
    }


    dash(value: number | string): Figure {
        if (typeof value === "number") {
            this.svg.stroke({'dasharray': `${value} ${value}`});
        } else {
            this.svg.stroke({'dasharray': value});
        }
        return this;
    }

    width(value: number): Figure {
        this.svg.stroke({width: value})

        return this
    }

    thin(): Figure {
        return this.width(1)
    }
    ultrathin(): Figure {
        return this.width(0.5)
    }
    thick(): Figure{
        return this.width(2)
    }
    ultrathick(): Figure {
        return this.width(3)
    }

    color(value: string): Figure {
        this.svg.stroke({color: value})

        return this
    }

    stroke(value: {width?: number, color?: string, opacity?: number}): Figure {
        this.svg.stroke(value)

        return this
    }

    get freeze(): Boolean {
        return this.#freeze;
    }

    get name(): string {
        return this.#name;
    }

    get label(): Label {
        return this.#label;
    }

    get graph(): Graph {
        return this.#graph;
    }

    get svg(): Shape {
        return this.#svg;
    }

    set freeze(value: Boolean) {
        this.#freeze = value;
    }

    set name(value: string) {
        this.#name = value;
    }

    set svg(value: Shape) {
        this.#svg = value;
    }


}