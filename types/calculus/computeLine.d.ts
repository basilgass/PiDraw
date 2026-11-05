import type { XY } from "../pidraw.common";
import { type mathLine } from "./geometry";
export declare function computeLine(origin: XY, direction: XY, width: number, height: number, padding?: number, half_axis?: boolean, length?: number): [XY, XY] | null;
export declare function clipSegment(a: XY, b: XY, width: number, height: number): [XY, XY] | null;
export interface LineDefinition {
    point: XY;
    direction: XY;
}
export declare function mediatorOf(A: XY, B: XY): LineDefinition;
export declare function bisectorOfAngle(vertex: XY, B: XY, C: XY): LineDefinition;
export declare function bisectorOfLines(d1: mathLine, d2: mathLine, alternative?: boolean): LineDefinition;
//# sourceMappingURL=computeLine.d.ts.map