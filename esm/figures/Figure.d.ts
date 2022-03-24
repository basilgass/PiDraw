import { Graph } from "../Graph";
import { Label } from "./Label";
import { Shape } from "@svgdotjs/svg.js";
export declare class Figure {
    constructor(graph: Graph, name: string);
    /**
     * Canvas root object.
     * @type {Graph}
     * @private
     */
    private _graph;
    get graph(): Graph;
    /**
     * Define if the object should update or not.
     * @type {Boolean}
     * @private
     */
    private _freeze;
    get freeze(): Boolean;
    set freeze(value: Boolean);
    /**
     * Name of the figure
     * @type {string}
     * @private
     */
    private _name;
    get name(): string;
    set name(value: string);
    /**
     * The SVG object
     * @type {unknown}
     * @private
     */
    private _svg;
    get svg(): Shape;
    set svg(value: Shape);
    /**
     * Label figure
     * @type {Label}
     * @private
     */
    private _label;
    get label(): Label;
    set label(value: Label);
    draw(): void;
    update(): void;
    updateFigure(): Figure;
    updateLabel(): Figure;
    remove(): void;
    generateName(): string;
    dash(value: number | string): Figure;
    width(value: number): Figure;
    thin(): Figure;
    ultrathin(): Figure;
    thick(): Figure;
    ultrathick(): Figure;
    color(value: string): Figure;
    stroke(value: {
        width?: number;
        color?: string;
        opacity?: number;
    }): Figure;
    hide(): Figure;
    show(): Figure;
}
