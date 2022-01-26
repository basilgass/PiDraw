import {Canvas} from "../Canvas";
import {Label} from "./Label";
import {Circle, G, Line, Path, Shape} from "@svgdotjs/svg.js";

export type svgShape = Shape | G | Line | Path | Circle

export class Figure {
    /**
     * Canvas root object.
     * @type {Canvas}
     * @private
     */
    #canvas: Canvas
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

    constructor(canvas: Canvas, name: string) {
        this.#freeze = true

        this.#canvas = canvas
        this.#name = name

        // TODO: handle labels - automatically add it ?
        // this.#label = new Label(canvas, name)

    }

    draw() {
        this.#freeze = false
        this.update()
    }
    update() {
        // We don't want to update.
        if (this.#freeze || this.#canvas.freeze) {
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

    get canvas(): Canvas {
        return this.#canvas;
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