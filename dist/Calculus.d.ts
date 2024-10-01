import { Marker, Path as svgPath, Svg } from '@svgdotjs/svg.js';
import { IGraphConfig, XY } from './pidraw.common';
export declare function numberCorrection(value: number, number_of_digits?: number): number;
export declare function isInfinity(value: number): boolean;
export declare function distanceAB(A: XY, B: XY): number;
export declare class mathVector {
    constructor(x: number | XY, y?: number | XY);
    private _x;
    get x(): number;
    set x(value: number);
    private _y;
    get y(): number;
    set y(value: number);
    get norm(): number;
    get normal(): mathVector;
    get unit(): mathVector;
    static scalarProduct(u: mathVector, v: mathVector): number;
    projection(on: mathVector): mathVector;
    rotate(angle: number): this;
    add(v: mathVector): mathVector;
    setLength(length: number): this;
}
export declare class mathLine {
    constructor(A: XY, B: XY | mathVector);
    private _A;
    get A(): XY;
    set A(value: XY);
    private _director;
    get director(): mathVector;
    set director(value: mathVector);
    get normal(): mathVector;
    get slope(): number;
    get ordinate(): number;
    getValueAtX(x: number): number;
    getValueAtY(y: number): number;
    intersection(value: mathLine): XY | null;
    projection(value: XY): XY;
}
/** -----------------------------------------
 * numeric expression and shutting yard for expressions.
 *
 */
export declare class NumExp {
    constructor(value: string, uniformize?: boolean);
    private _rpn;
    get rpn(): {
        token: string;
        tokenType: ShutingyardType;
    }[];
    private _expression;
    get expression(): string;
    private _isValid;
    get isValid(): boolean;
    set isValid(value: boolean);
    evaluate(values?: Record<string, number>): number;
    private _extractDecimalPart;
    private _addToStack;
}
declare enum ShutingyardType {
    LEFT_PARENTHESIS = "(",
    RIGHT_PARENTHESIS = ")",
    VARIABLE = "variable",
    COEFFICIENT = "coefficient",
    OPERATION = "operation",
    CONSTANT = "constant",
    FUNCTION = "function",
    FUNCTION_ARGUMENT = "function-argument",
    MONOM = "monom"
}
export declare function toPixels<T>(coordinates: T, config: IGraphConfig, axis?: 'x' | 'y' | undefined): T;
export declare function toCoordinates(pixels: XY, config: IGraphConfig): XY;
export declare function computeLine(origin: XY, direction: XY, width: number, height: number, padding?: number, half_axis?: boolean, length?: number): [XY, XY] | null;
/**
 * Get coordinate by radius / angle
 * Reference: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
 * @param centerX
 * @param centerY
 * @param radius
 * @param angleInDegrees
 */
export declare function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): XY;
/**
 * get the angle from Ox to OP, where O is origin and P is the handle
 * @param {Point} origin
 * @param {Point} handle
 * @returns {number}
 */
export declare function cartesianToAngle(origin: XY, handle: XY): number;
export declare function createMarker(svg: Svg, scale: number, shape?: string): {
    start: Marker;
    end: Marker;
};
export declare function nearestPointToPath(value: XY, path: svgPath, precision?: number): XY;
export {};
