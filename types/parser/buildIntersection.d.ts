import { PARSER } from 'piparser';
import { AbstractFigure } from '../figures/AbstractFigure';
import { IPointConfig } from '../figures/Point';
import { buildInterface, IGraphConfig } from '../pidraw.common';
export declare function buildIntersection(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IPointConfig>[] | null;
