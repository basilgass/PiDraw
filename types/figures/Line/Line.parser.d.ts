import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { ILineConfig } from "./Line.types";
import type { BuildResult, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildLine(item: PARSER, figures: Figures): BuildResult<ILineConfig>;
export declare function parseLineShorthand(keyCode: string): string | null;
export declare const LINE_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Line.parser.d.ts.map