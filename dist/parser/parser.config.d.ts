import { PARSER } from 'piparser/lib/PiParserTypes';
import { AbstractFigure } from '../figures/AbstractFigure';
import { IGraphConfig } from '../pidraw.common';

export declare const parser_config: Record<string, {
    name: string;
    description: string;
    code: string;
    parameters: string[];
    build: (values: PARSER, figures: Record<string, AbstractFigure>, config: IGraphConfig) => unknown;
    create: string;
    option?: string;
}>;
