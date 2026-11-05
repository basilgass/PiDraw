import type { XY } from "../pidraw.common";
export declare const PIXELS_PER_SAMPLE = 8;
export interface CurveView {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export interface CurveSampling {
    intervals: number;
    tolerance: number;
    maxDepth: number;
    view: CurveView;
    bound: number;
}
export declare function sampleCurve(at: (t: number) => XY, from: number, to: number, sampling: CurveSampling): XY[];
export declare function endOfCurve(points: XY[], width: number, height: number): {
    point: XY;
    direction: XY;
} | null;
export declare function nearestOnPolyline(points: XY[], position: XY): XY;
export declare function directionAlong(follow: (x: number, y: number) => XY, point: XY, step?: number): XY | null;
export declare function pathNumber(value: number): number;
export declare function curvePath(points: XY[], jump: number): string;
//# sourceMappingURL=computeCurve.d.ts.map