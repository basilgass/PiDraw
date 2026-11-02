import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import type { IPlotConfig } from "../figures/Plot.types";
import type { buildInterface } from "../pidraw.common";
type Figures = Record<string, AbstractFigure>;
export declare function buildPlot(item: PARSER, figures: Figures): buildInterface<IPlotConfig>;
export declare function parsePlotShorthand(text: string): string | null;
export {};
//# sourceMappingURL=buildPlot.d.ts.map