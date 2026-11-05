import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import type { IParametricConfig } from "../figures/Parametric.types";
import type { buildInterface } from "../pidraw.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildParametric(item: PARSER, _figures: Figures): buildInterface<IParametricConfig>;
export declare function parseParametricShorthand(text: string): string | null;
export {};
//# sourceMappingURL=buildParametric.d.ts.map