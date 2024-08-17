import { PARSER } from 'piparser/lib/PiParserTypes';
import { AbstractFigure } from '../figures/AbstractFigure';
import { ILineConfig } from '../figures/Line';
import { IGraphConfig } from '../pidraw.common';

export declare function buildLine(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ILineConfig | null;
