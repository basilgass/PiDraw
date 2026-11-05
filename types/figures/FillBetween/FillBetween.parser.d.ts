import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IFillBetweenConfig } from "./FillBetween.types";
import type { BuildResult, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildFillBetween(item: PARSER, figures: Figures): BuildResult<IFillBetweenConfig>;
export declare const FILL_BETWEEN_ITEMS: ParserItems;
export {};
//# sourceMappingURL=FillBetween.parser.d.ts.map