import { type XY } from "../pidraw.common";
export declare function nowhere(): XY;
export declare function isDefinedPosition(position: XY): boolean;
export declare function distanceAB(A: XY, B: XY): number;
export declare class mathVector {
    x: number;
    y: number;
    constructor(x: number | XY, y?: number | XY);
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
    A: XY;
    director: mathVector;
    constructor(A: XY, B: XY | mathVector);
    intersection(value: mathLine): XY | null;
    projection(value: XY): XY;
}
export declare function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): XY;
export declare function cartesianToAngle(origin: XY, handle: XY): number;
//# sourceMappingURL=geometry.d.ts.map