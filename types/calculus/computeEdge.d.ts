import type { XY } from "../pidraw.common";
import type { BezierSegment } from "./computeBezier";
export type EdgeSide = 't' | 'r' | 'b' | 'l';
export declare const EDGE_SIDES: readonly EdgeSide[];
export declare const DEFAULT_LOOP_SIDE: EdgeSide;
export interface IEdgeEnd {
    position: XY;
    boundary(toward: XY): XY;
}
export declare function edgeSegments(from: IEdgeEnd, to: IEdgeEnd, curve: number): BezierSegment[] | null;
export declare function loopSegments(end: IEdgeEnd, side: EdgeSide): BezierSegment[] | null;
export declare function loopDirection(side: EdgeSide): XY;
//# sourceMappingURL=computeEdge.d.ts.map