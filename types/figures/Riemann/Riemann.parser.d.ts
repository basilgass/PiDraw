import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IRiemannConfig } from "./Riemann.types";
import type { BuildResult, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildRiemann(item: PARSER, figures: Figures): BuildResult<IRiemannConfig>;
export declare const RIEMANN_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Riemann.parser.d.ts.map