import { NumExp } from "../calculus";
import type { IGraphConfig } from "../pidraw.common";
import type { IPlotConfig, PlotConstraints } from "./Plot.types";
export declare function constructionOf(config: IPlotConfig, name: string): keyof PlotConstraints;
export declare function resolveExpression(key: keyof PlotConstraints, config: IPlotConfig, graph: IGraphConfig): string | null;
export declare function compile(config: IPlotConfig, name: string, graph: IGraphConfig): {
    expression: string;
    numExp: NumExp;
} | null;
//# sourceMappingURL=Plot.constraints.d.ts.map