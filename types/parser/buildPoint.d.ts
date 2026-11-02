import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import type { IPointConfig } from "../figures/Point.types";
import type { buildInterface } from "../pidraw.common";
import { type IParserParameters, type IPointsSetting, type PointShapeOption } from "./parser.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildPoint(item: PARSER, figures: Figures): buildInterface<IPointConfig>;
export declare function buildIntersection(item: PARSER, figures: Figures): buildInterface<IPointConfig>[];
export declare function applyPointShapeOption(figure: AbstractFigure, option: PointShapeOption, value: unknown): void;
export declare function parsePointsSetting({ value, options }: IParserParameters): IPointsSetting;
export declare function parsePointShorthand(keyCode: string): string | null;
export {};
//# sourceMappingURL=buildPoint.d.ts.map