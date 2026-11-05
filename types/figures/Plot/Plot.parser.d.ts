import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IPlotConfig } from "./Plot.types";
import type { BuildResult, ParserItems } from "../../parser/parser.types";
type Figures = Record<string, AbstractFigure>;
export declare function buildPlot(item: PARSER, figures: Figures): BuildResult<IPlotConfig>;
export declare function parsePlotShorthand(text: string): string | null;
export declare const PLOT_ITEMS: ParserItems;
export {};
//# sourceMappingURL=Plot.parser.d.ts.map