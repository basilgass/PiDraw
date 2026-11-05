import { type BezierSegment } from "../../calculus";
import type { BezierConstraints, IBezierConfig } from "./Bezier.types";
export declare function constructionOf(config: IBezierConfig, name: string): keyof BezierConstraints;
export declare function resolveConstraint(key: keyof BezierConstraints, config: IBezierConfig, name: string): BezierSegment[] | null;
//# sourceMappingURL=Bezier.constraints.d.ts.map