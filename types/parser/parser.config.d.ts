import { PARSER } from 'piparser/lib/PiParserTypes';
import { AbstractFigure } from '../figures/AbstractFigure';
import { IGraphConfig } from '../pidraw.common';
export interface parser_item {
    name: string;
    description: string;
    code: string;
    parameters: string[];
    build: (values: PARSER, figures: Record<string, AbstractFigure>, config: IGraphConfig) => unknown;
    create: string;
    option?: string;
}
export declare const parser_config: Record<string, parser_item>;
