import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import type { IPolygonConfig } from "../figures/Polygon.types";
import type { buildInterface } from "../pidraw.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildPolygon(item: PARSER, figures: Figures): buildInterface<IPolygonConfig>;
export {};
//# sourceMappingURL=buildPolygon.d.ts.map