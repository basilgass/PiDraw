import { type IBezierPointInterface } from "../figures/Bezier";
export type bezierCommandType = (bPoint: IBezierPointInterface, i: number, a: IBezierPointInterface[]) => string;
export declare function computeBezierPath(points: IBezierPointInterface[]): string;
//# sourceMappingURL=computedBezier.d.ts.map