import type { XY } from "../pidraw.common";
export interface PolygonShape {
    vertices: XY[];
    cycles: number[][];
}
export declare function gcd(a: number, b: number): number;
export declare function polygonCycles(sides: number, step?: number): number[][];
export declare function regularPolygon(center: XY, radius: number, sides: number, step?: number): PolygonShape | null;
export declare function regularPolygonOnSide(A: XY, B: XY, sides: number, step?: number): PolygonShape | null;
export declare function polygonCentroid(vertices: XY[]): XY;
export declare function nearestOnPolygon(shape: PolygonShape, position: XY): XY;
export declare function polygonPath(shape: PolygonShape): string;
export declare function polygonPerimeter(shape: PolygonShape): number;
export declare function polygonArea(shape: PolygonShape): number;
//# sourceMappingURL=computePolygon.d.ts.map