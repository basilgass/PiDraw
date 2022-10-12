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
     * @type {boolean}
     * @private
     */
    private _freeze;
    get freeze(): boolean;
    set freeze(value: boolean);
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
    get tex(): string;
    draw(): void;
    update(): Figure;
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
    color(value: {
        color: string;
        opacity?: number;
    } | string): Figure;
    stroke(value: {
        width?: number;
        color?: string;
        opacity?: number;
    }): Figure;
    fill(value: {
        color: string;
        opacity?: number;
    } | string): Figure;
    hide(): Figure;
    show(): Figure;
    hideLabel(): Figure;
    showLabel(): Figure;
}
