import { PARSER } from 'piparser';
import { AbstractFigure } from '../figures/AbstractFigure';
import { ILineConfig } from '../figures/Line';
import { IGraphConfig } from '../pidraw.common';
export declare function buildLine(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ILineConfig | null;
export declare function parsePolynom(polynom: string): {
    a: number;
    b: number;
    c: number;
};
