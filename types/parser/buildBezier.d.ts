import type { PARSER } from "piparser";
import { AbstractFigure } from "../figures/AbstractFigure";
import { type buildInterface, type IGraphConfig } from "../pidraw.common";
import type { IBezierConfig } from "../figures/Bezier";
export declare function buildBezier(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IBezierConfig> | null;
//# sourceMappingURL=buildBezier.d.ts.map