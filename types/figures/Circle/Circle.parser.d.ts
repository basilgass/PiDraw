import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { ICircleConfig } from "./Circle.types";
import type { BuildResult, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildCircle(item: PARSER, figures: Figures): BuildResult<ICircleConfig>;
export declare const CIRCLE_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Circle.parser.d.ts.map