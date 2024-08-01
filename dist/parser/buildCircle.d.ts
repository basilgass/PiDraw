import { AbstractFigure } from '../figures/AbstractFigure';
import { IArcConfig } from '../figures/Arc';
import { ICircleConfig } from '../figures/Circle';
import { IGraphConfig } from '../pidraw.common';
import { IParser } from './parser.common';

export declare function buildCircle(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ICircleConfig | IArcConfig | null;
export declare function buildArc(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ICircleConfig | IArcConfig | null;
