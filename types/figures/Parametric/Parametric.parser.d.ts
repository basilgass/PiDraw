import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IParametricConfig } from "./Parametric.types";
import type { BuildResult, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildParametric(item: PARSER, _figures: Figures): BuildResult<IParametricConfig>;
export declare function parseParametricShorthand(text: string): string | null;
export declare const PARAMETRIC_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Parametric.parser.d.ts.map