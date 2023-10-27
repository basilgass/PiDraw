import { Figure } from "./Figure";
import { Graph } from "../Graph";
import { Point } from "./Point";
import { Line } from "./Line";
export type BezierPoint = {
    point: Point;
    control: string;
    ratio: number;
    c1?: {
        x: number;
        y: number;
        point?: Point;
        segment?: Line;
    };
    c2?: {
        x: number;
        y: number;
        point?: Point;
        segment?: Line;
    };
};
export declare class Bezier extends Figure {
    private _path;
    private _points;
    private _ratio;
    constructor(graph: Graph, name: string, values: (string | Point | {
        point: string | Point;
        control: string;
        ratio?: number;
    })[]);
    get points(): BezierPoint[];
    get path(): string;
    get ratio(): number;
    set ratio(value: number);
    /**
     * Defines the points for a graph.
     *
     * @param {Array.<string|Point|Object>} values - The values representing the points for the graph.
     *     Each value can be either a string representing the name of a point,
     *     an instance of the Point class, or an object with properties `point`, `control`, and `ratio`.
     * @param {string|Point} values.point - The name of the point or an instance of the Point class.
     * @param {string} values.control - The control type for the point. Possible values are 'min', 'max',
     *     'flat', or 'smooth'.
     * @param {number} [values.ratio] - The ratio for the point. Default value is `this.ratio`.
     * @param {Array} values.c1 - The control point for the curve before the current point.
     *     It is an object with properties `x` and `y`.
     * @param {Array} values.c2 - The control point for the curve after the current point.
     *     It is an object with properties `x` and `y`.
     * @return {void}
     */
    definePoints(values: (string | Point | {
        point: string | Point;
        control: string;
        ratio?: number;
    })[]): void;
    uniformizeControlType(ctrl: string): string;
    generateName(): string;
    isSmooth(control: string): boolean;
    isHorizontal(control: string): boolean;
    isVertical(control: string): boolean;
    plot(values?: (string | Point | {
        point: string | Point;
        control: string;
        ratio?: number;
    })[], speed?: number): Bezier;
    updateFigure(): Bezier;
}
