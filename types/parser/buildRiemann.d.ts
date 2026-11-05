import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import type { IRiemannConfig } from "../figures/Riemann.types";
import { type buildInterface } from "../pidraw.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildRiemann(item: PARSER, figures: Figures): buildInterface<IRiemannConfig>;
export {};
//# sourceMappingURL=buildRiemann.d.ts.map