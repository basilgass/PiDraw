import { PARSER } from 'piparser/lib/PiParserTypes';
import { AbstractFigure } from '../figures/AbstractFigure';
import { IPolygonConfig } from '../figures/Polygon';
import { IGraphConfig } from '../pidraw.common';

export declare function buildPolygon(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPolygonConfig | null;
