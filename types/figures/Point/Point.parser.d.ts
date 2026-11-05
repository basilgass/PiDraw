import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IPointConfig } from "./Point.types";
import type { BuildResult, FigureOptionHandler, PointShapeOption, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildPoint(item: PARSER, figures: Figures): BuildResult<IPointConfig>;
export declare function buildIntersection(item: PARSER, figures: Figures): BuildResult<IPointConfig>[];
export declare function applyPointShapeOption(figure: AbstractFigure, option: PointShapeOption, value: unknown): void;
export declare function parsePointShorthand(keyCode: string): string | null;
export declare const POINT_OPTIONS: Record<PointShapeOption, FigureOptionHandler>;
export declare const POINT_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Point.parser.d.ts.map