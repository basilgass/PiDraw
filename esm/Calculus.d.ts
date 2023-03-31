/**
 * The calculus class is intended to replace PiMath and avoid using "fractions" and work directly with number.
 */
import { Point } from "./figures/Point";
import { IPoint } from "./variables/interfaces";
export declare function numberCorrection(value: number, epsilonDigit?: number, epsilonNumberOfDigits?: number, number_of_digits?: number): number;
export declare function isInfinity(value: number): boolean;
export declare function distanceAB(A: IPoint, B: IPoint): number;
export declare class mathVector {
    constructor(x: number | Point | IPoint, y: number | Point | IPoint);
    private _x;
    get x(): number;
    set x(value: number);
    private _y;
    get y(): number;
    set y(value: number);
    get norm(): number;
    get normal(): mathVector;
    static scalarProduct(u: mathVector, v: mathVector): number;
    projection(on: mathVector): mathVector;
    rotate(angle: number): mathVector;
}
export declare class mathLine {
    constructor(A: IPoint, B: IPoint | mathVector);
    private _A;
    get A(): IPoint;
    set A(value: IPoint);
    private _director;
    get director(): mathVector;
    set director(value: mathVector);
    get normal(): mathVector;
    get slope(): number;
    get ordinate(): number;
    getValueAtX(x: number): number;
    getValueAtY(y: number): number;
    intersection(value: mathLine): IPoint;
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
        tokenType: string;
    }[];
    private _expression;
    get expression(): string;
    private _isValid;
    get isValid(): boolean;
    set isValid(value: boolean);
    evaluate(values: {
        [Key: string]: number;
    }): number;
    private _extractDecimalPart;
    private _addToStack;
}
