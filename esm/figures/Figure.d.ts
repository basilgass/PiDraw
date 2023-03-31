import { Graph } from "../Graph";
import { Label } from "./Label";
import { Shape } from "@svgdotjs/svg.js";
export declare class Figure {
    private _displayName;
    /**
     * Define if the object should update or not.
     * @type {boolean}
     * @private
     */
    private _freeze;
    /**
     * Canvas root object.
     * @type {Graph}
     * @private
     */
    private _graph;
    /**
     * Label figure
     * @type {Label}
     * @private
     */
    private _label;
    /**
     * Name of the figure
     * @type {string}
     * @private
     */
    private _name;
    /**
     * The SVG object
     * @type {unknown}
     * @private
     */
    private _svg;
    constructor(graph: Graph, name: string);
    get graph(): Graph;
    get freeze(): boolean;
    set freeze(value: boolean);
    get name(): string;
    set name(value: string);
    get displayName(): string;
    set displayName(value: string);
    get svg(): Shape;
    set svg(value: Shape);
    get label(): Label;
    set label(value: Label);
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
    } | string): Figure;
    fill(value: {
        color: string;
        opacity?: number;
    } | string): Figure;
    hide(): Figure;
    show(): Figure;
    hideLabel(): Figure;
    showLabel(): Figure;
    generateDisplayName(): Figure;
}
