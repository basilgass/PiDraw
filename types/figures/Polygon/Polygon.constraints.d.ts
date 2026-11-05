import type { IGraphConfig } from "../../pidraw.common";
import { type PolygonShape } from "../../calculus";
import type { IPolygonConfig, PolygonConstraints } from "./Polygon.types";
export declare const MAXIMUM_SIDES = 1000;
export declare function constructionOf(config: IPolygonConfig, name: string): keyof PolygonConstraints;
export declare function resolveConstraint(key: keyof PolygonConstraints, config: IPolygonConfig, graph: IGraphConfig): PolygonShape | null;
//# sourceMappingURL=Polygon.constraints.d.ts.map