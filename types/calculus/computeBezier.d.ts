import type { XY } from "../pidraw.common";
export type BezierDirection = 'horizontal' | 'vertical' | number;
export interface BezierNode {
    point: XY;
    direction?: BezierDirection;
    ratio?: number;
}
export interface BezierSegment {
    start: XY;
    control1: XY;
    control2: XY;
    end: XY;
}
export declare const DEFAULT_RATIO = 0.2;
export declare function smoothBezierSegments(nodes: BezierNode[], closed?: boolean): BezierSegment[];
export declare function controlBezierSegments(points: XY[]): BezierSegment[];
export declare function bezierPath(segments: BezierSegment[], closed?: boolean): string;
export declare function bezierPolyline(segments: BezierSegment[], tolerance?: number): XY[];
export declare function bezierMiddle(segments: BezierSegment[]): {
    point: XY;
    direction: XY;
} | null;
//# sourceMappingURL=computeBezier.d.ts.map