import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IPolygonConfig } from "./Polygon.types";
import type { BuildResult, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildPolygon(item: PARSER, figures: Figures): BuildResult<IPolygonConfig>;
export declare const POLYGON_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Polygon.parser.d.ts.map