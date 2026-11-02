import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import type { ICircleConfig } from "../figures/Circle.types";
import type { buildInterface } from "../pidraw.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildCircle(item: PARSER, figures: Figures): buildInterface<ICircleConfig>;
export {};
//# sourceMappingURL=buildCircle.d.ts.map