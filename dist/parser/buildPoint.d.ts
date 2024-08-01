import { AbstractFigure } from '../figures/AbstractFigure';
import { IPointConfig } from '../figures/Point';
import { IGraphConfig } from '../pidraw.common';
import { IParser } from './parser.common';

export declare function buildPoint(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPointConfig | {
    x: number;
    y: number;
} | null;
