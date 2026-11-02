import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import { Bezier } from "../figures/Bezier";
import type { IBezierConfig } from "../figures/Bezier.types";
import type { buildInterface } from "../pidraw.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildBezier(item: PARSER, figures: Figures): buildInterface<IBezierConfig>;
declare const BEZIER_OPTIONS: {
    close: (curve: Bezier) => Bezier;
};
export type BezierOption = keyof typeof BEZIER_OPTIONS;
export declare const BEZIER_OPTION_NAMES: BezierOption[];
export declare function applyBezierOption(figure: AbstractFigure, option: BezierOption, value: unknown): void;
export {};
//# sourceMappingURL=buildBezier.d.ts.map