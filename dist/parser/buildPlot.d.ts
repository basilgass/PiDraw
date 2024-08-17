import { PARSER } from 'piparser/lib/PiParserTypes';
import { AbstractFigure } from '../figures/AbstractFigure';
import { IFillBetweenConfig } from '../figures/FillBetween';
import { IFollowConfig } from '../figures/Follow';
import { IParametricConfig } from '../figures/Parametric';
import { IPlotConfig } from '../figures/Plot';
import { IRiemannConfig } from '../figures/Riemann';
import { IGraphConfig } from '../pidraw.common';

export declare function buildPlot(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPlotConfig | null;
export declare function buildParametric(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IParametricConfig | null;
export declare function buildFollow(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IFollowConfig | null;
export declare function buildFillBetween(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IFillBetweenConfig | null;
export declare function buildRiemann(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IRiemannConfig | null;
