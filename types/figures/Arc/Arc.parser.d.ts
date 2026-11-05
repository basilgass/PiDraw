import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import { Arc } from "./Arc";
import type { IArcConfig } from "./Arc.types";
import type { BuildResult, FigureOptionHandler, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildArc(item: PARSER, figures: Figures): BuildResult<IArcConfig>;
declare const ARC_OPTIONS: {
    sector: (arc: Arc) => Arc;
    square: (arc: Arc) => Arc;
};
export type ArcOption = keyof typeof ARC_OPTIONS;
export declare const ARC_OPTION_NAMES: ArcOption[];
export declare function applyArcOption(figure: AbstractFigure, option: ArcOption, value: unknown): void;
export declare const ARC_OPTION_HANDLERS: Record<ArcOption, FigureOptionHandler>;
export declare const ARC_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Arc.parser.d.ts.map