import { PARSER } from 'piparser';
import { AbstractFigure } from '../figures/AbstractFigure';
import { buildInterface, IGraphConfig } from '../pidraw.common';
import { IBezierConfig } from '../figures/Bezier';
export declare function buildBezier(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IBezierConfig> | null;
