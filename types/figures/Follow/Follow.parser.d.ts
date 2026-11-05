import type { PARSER } from "piparser";
import { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IFollowConfig } from "./Follow.types";
import type { BuildResult, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildFollow(item: PARSER, figures: Figures): BuildResult<IFollowConfig>;
export declare const FOLLOW_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Follow.parser.d.ts.map