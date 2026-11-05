import type { XY } from "../pidraw.common";
export declare function counterclockwiseSweep(from: number, to: number): number;
export declare function nearestOnArc(center: XY, radius: number, from: number, sweep: number, clockwise: boolean, position: XY): XY;
export declare function arcLength(radius: number, sweep: number): number;
export declare function sectorArea(radius: number, sweep: number): number;
//# sourceMappingURL=computeArc.d.ts.map