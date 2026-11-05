import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import { Arc } from "../figures/Arc";
import type { IArcConfig } from "../figures/Arc.types";
import type { buildInterface } from "../pidraw.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildArc(item: PARSER, figures: Figures): buildInterface<IArcConfig>;
declare const ARC_OPTIONS: {
    sector: (arc: Arc) => Arc;
    square: (arc: Arc) => Arc;
};
export type ArcOption = keyof typeof ARC_OPTIONS;
export declare const ARC_OPTION_NAMES: ArcOption[];
export declare function applyArcOption(figure: AbstractFigure, option: ArcOption, value: unknown): void;
export {};
//# sourceMappingURL=buildArc.d.ts.map