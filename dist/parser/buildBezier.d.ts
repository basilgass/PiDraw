import { PARSER } from 'piparser';
import { AbstractFigure } from '../figures/AbstractFigure';
import { IGraphConfig } from '../pidraw.common';
import { IBezierConfig } from '../figures/Bezier';
export declare function buildBezier(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IBezierConfig | null;
