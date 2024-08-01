import { AbstractFigure } from '../figures/AbstractFigure';
import { ILineConfig } from '../figures/Line';
import { IGraphConfig } from '../pidraw.common';
import { IParser } from './parser.common';

export declare function buildLine(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ILineConfig | null;
