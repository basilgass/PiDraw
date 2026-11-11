import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IEdgeConfig } from "./Edge.types";
import type { BuildResult, FigureOptionHandler, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildEdge(item: PARSER, figures: Figures): BuildResult<IEdgeConfig>;
export declare const EDGE_OPTION_HANDLERS: Record<'curve' | 'loopSide', FigureOptionHandler>;
export declare const EDGE_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Edge.parser.d.ts.map