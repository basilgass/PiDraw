import { type BezierSegment } from "../../calculus";
import type { IEdgeConfig } from "./Edge.types";
export declare function isLoop(config: Pick<IEdgeConfig, 'from' | 'to'>): boolean;
export declare function checkEdge(config: IEdgeConfig, name: string): void;
export declare function resolveEdge(config: IEdgeConfig): BezierSegment[] | null;
//# sourceMappingURL=Edge.constraints.d.ts.map