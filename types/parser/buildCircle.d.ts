import { PARSER } from 'piparser';
import { AbstractFigure } from '../figures/AbstractFigure';
import { IArcConfig } from '../figures/Arc';
import { ICircleConfig } from '../figures/Circle';
import { IGraphConfig } from '../pidraw.common';
export declare function buildCircle(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ICircleConfig | IArcConfig | null;
export declare function buildArc(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ICircleConfig | IArcConfig | null;
