import { PARSER } from 'piparser/lib/PiParserTypes';
import { AbstractFigure } from '../figures/AbstractFigure';
import { IPointConfig } from '../figures/Point';
import { IGraphConfig } from '../pidraw.common';
export declare function buildPoint(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPointConfig | {
    x: number;
    y: number;
} | null;
