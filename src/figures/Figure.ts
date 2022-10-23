import {Graph} from "../Graph";
import {Label} from "./Label";
import {Shape} from "@svgdotjs/svg.js";
import {svgShape} from "../variables/types";
import {Grid} from "./Grid";

export class Figure {
    constructor(graph: Graph, name: string) {
        this._freeze = false

        this._graph = graph
        this._name = name
    }

    /**
     * Canvas root object.
     * @type {Graph}
     * @private
     */
    private _graph: Graph

    get graph(): Graph {
        return this._graph;
    }

    /**
     * Define if the object should update or not.
     * @type {boolean}
     * @private
     */
    private _freeze: boolean

    get freeze(): boolean {
        return this._freeze;
    }

    set freeze(value: boolean) {
        this._freeze = value;
    }

    /**
     * Name of the figure
     * @type {string}
     * @private
     */
    private _name: string

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    /**
     * The SVG object
     * @type {unknown}
     * @private
     */
    private _svg: svgShape

    get svg(): Shape {
        return this._svg;
    }

    set svg(value: Shape) {
        this._svg = value;
    }

    /**
     * Label figure
     * @type {Label}
     * @private
     */
    private _label: Label

    get label(): Label {
        return this._label;
    }

    set label(value: Label) {
        this._label = value;
    }

    get tex(): string {
        return ' - '
    }

    draw() {
        this._freeze = false
        this.update()
    }

    update(): Figure {
        // We don't want to update.
        if (this._freeze || this._graph.freeze) {
            return
        }

        this.updateFigure()
        if (this._label) {
            this._label.update()
        }

        return this
    }

    updateFigure(): Figure {
        return this
    }

    updateLabel(): Figure {
        return this
    }

    remove(): void {
        // Remove the label
        if (this.label) {
            this.label.svg.remove()
            this.label.html.remove()
        }
        // Remove the svg
        this.svg.remove()

        // Remove the item from the graph build list.
        if (this.graph.points[this.name] !== undefined) {
            delete this.graph.points[this.name]
        }

        for (let i = 0; i < this.graph.figures.length; i++) {
            if (this.graph.figures[i].name === this.name) {
                this.graph.figures.splice(i, 1)
            }
        }
    }

    generateName(): string {
        return this._name
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

    thick(): Figure {
        return this.width(2)
    }

    ultrathick(): Figure {
        return this.width(3)
    }

    color(value: { color: string, opacity?: number }|string): Figure {

        if(typeof value === 'string'){
            value = {color: value, opacity: 1}
        }

        this.svg.stroke(value)
        this.svg.fill(value)
        return this
    }

    stroke(value: { width?: number, color?: string, opacity?: number }): Figure {
        this.svg.stroke(value)
        return this
    }

    fill(value: { color: string, opacity?: number }|string): Figure {
        if(typeof value === "string"){
            this.svg.fill({color: value, opacity: 1})
        }else {
            this.svg.fill(value)
        }
        return this
    }

    hide(): Figure {
        this._svg.hide()
        return this
    }
    show(): Figure {
        this._svg.show()
        return this
    }

    hideLabel(): Figure {
        this._label.hide()
        return this
    }
    showLabel(): Figure {
        this._label.show()
        return this
    }

}