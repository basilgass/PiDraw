import { type PARSER } from "piparser";
import { AbstractFigure } from "../figures/AbstractFigure";
import { type IFillBetweenConfig } from "../figures/FillBetween";
import { type IFollowConfig } from "../figures/Follow";
import { type IParametricConfig } from "../figures/Parametric";
import { type IPlotConfig } from "../figures/Plot";
import { type IRiemannConfig } from "../figures/Riemann";
import { type IGraphConfig } from "../pidraw.common";
export declare function buildPlot(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPlotConfig | null;
export declare function buildParametric(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IParametricConfig | null;
export declare function buildFollow(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IFollowConfig | null;
export declare function buildFillBetween(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IFillBetweenConfig | null;
export declare function buildRiemann(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IRiemannConfig | null;
//# sourceMappingURL=buildPlot.d.ts.map