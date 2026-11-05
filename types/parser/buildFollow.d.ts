import type { PARSER } from "piparser";
import { AbstractFigure } from "../figures/AbstractFigure";
import type { IFollowConfig } from "../figures/Follow.types";
import type { buildInterface } from "../pidraw.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildFollow(item: PARSER, figures: Figures): buildInterface<IFollowConfig>;
export {};
//# sourceMappingURL=buildFollow.d.ts.map