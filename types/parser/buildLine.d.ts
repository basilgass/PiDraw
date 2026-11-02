import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import type { ILineConfig } from "../figures/Line.types";
import type { buildInterface } from "../pidraw.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildLine(item: PARSER, figures: Figures): buildInterface<ILineConfig>;
export declare function parseLineShorthand(keyCode: string): string | null;
export {};
//# sourceMappingURL=buildLine.d.ts.map