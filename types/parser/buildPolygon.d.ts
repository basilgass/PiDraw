import { PARSER } from 'piparser';
import { AbstractFigure } from '../figures/AbstractFigure';
import { IPolygonConfig } from '../figures/Polygon';
import { buildInterface, IGraphConfig } from '../pidraw.common';
export declare function buildPolygon(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IPolygonConfig> | null;
