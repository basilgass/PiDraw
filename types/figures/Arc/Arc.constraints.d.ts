import type { IGraphConfig, XY } from "../../pidraw.common";
import type { ArcConstraints, IArcConfig } from "./Arc.types";
export interface ArcDefinition {
    center: XY;
    start: XY;
    end: XY;
    radius: number;
}
export declare function constructionOf(config: IArcConfig, name: string): keyof ArcConstraints;
export declare function resolveConstraint(key: keyof ArcConstraints, config: IArcConfig, graph: IGraphConfig): ArcDefinition;
//# sourceMappingURL=Arc.constraints.d.ts.map