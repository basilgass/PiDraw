import { AbstractFigure } from '../figures/AbstractFigure';
import { IGraphConfig } from '../pidraw.common';
import { IParser } from './parser.common';

export declare const parser_config: Record<string, {
    name: string;
    description: string;
    code: string;
    parameters: string[];
    build: (values: IParser, figures: Record<string, AbstractFigure>, config: IGraphConfig) => unknown;
    create: string;
}>;
