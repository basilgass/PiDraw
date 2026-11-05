import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import type { IFillBetweenConfig } from "../figures/FillBetween.types";
import { type buildInterface } from "../pidraw.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildFillBetween(item: PARSER, figures: Figures): buildInterface<IFillBetweenConfig>;
export {};
//# sourceMappingURL=buildFillBetween.d.ts.map