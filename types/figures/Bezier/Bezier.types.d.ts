import type { BezierDirection } from "../../calculus";
import type { Exclusive, XY } from "../../pidraw.common";
export type { BezierDirection };
export interface BezierPoint {
    point: XY;
    direction?: BezierDirection;
    ratio?: number;
}
export interface BezierConstraints {
    through: BezierPoint[];
    controls: XY[];
}
export interface BezierOptions {
    closed?: boolean;
}
export type IBezierConfig = Exclusive<BezierConstraints> & BezierOptions;
//# sourceMappingURL=Bezier.types.d.ts.map