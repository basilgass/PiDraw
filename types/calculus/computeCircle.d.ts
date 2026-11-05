import type { XY } from "../pidraw.common";
export interface CircleDefinition {
    center: XY;
    radius: number;
}
export declare function circumcircle(A: XY, B: XY, C: XY): CircleDefinition;
export declare function incircle(A: XY, B: XY, C: XY): CircleDefinition;
export declare function circleWithDiameter(A: XY, B: XY): CircleDefinition;
export declare function circleTangentTo(center: XY, start: XY, end: XY): CircleDefinition;
export declare function circlePerimeter(radius: number): number;
export declare function circleArea(radius: number): number;
//# sourceMappingURL=computeCircle.d.ts.map