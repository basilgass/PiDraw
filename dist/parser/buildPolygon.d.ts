import { AbstractFigure } from '../figures/AbstractFigure';
import { IPolygonConfig } from '../figures/Polygon';
import { IGraphConfig } from '../pidraw.common';
import { IParser } from './parser.common';

export declare function buildPolygon(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPolygonConfig | null;
