import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import { Bezier } from "./Bezier";
import type { IBezierConfig } from "./Bezier.types";
import type { BuildResult, FigureOptionHandler, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildBezier(item: PARSER, figures: Figures): BuildResult<IBezierConfig>;
declare const BEZIER_OPTIONS: {
    close: (curve: Bezier) => Bezier;
};
export type BezierOption = keyof typeof BEZIER_OPTIONS;
export declare const BEZIER_OPTION_NAMES: BezierOption[];
export declare function applyBezierOption(figure: AbstractFigure, option: BezierOption, value: unknown): void;
export declare const BEZIER_OPTION_HANDLERS: Record<BezierOption, FigureOptionHandler>;
export declare const BEZIER_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Bezier.parser.d.ts.map