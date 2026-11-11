import type { EdgeSide } from "../../calculus";
import type { Point } from "../Point/Point";
export type { EdgeSide };
export interface IEdgeConfig {
    from: Point;
    to: Point;
    curve?: number;
    loopSide?: EdgeSide;
}
//# sourceMappingURL=Edge.types.d.ts.map