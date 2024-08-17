import { Graph } from './Graph';
import { IParserConfig } from './parser/parser.common';
import { IGraphConfig } from './pidraw.common';
import { AbstractFigure } from './figures/AbstractFigure';
import { PARSER } from 'piparser/lib/PiParserTypes';

export declare const PARSER_PARAMETERS_KEYS: string[];
export declare class Parser extends Graph {
    #private;
    constructor(id: string | HTMLElement, config?: IParserConfig);
    static documentation(): Record<string, {
        name: string;
        description: string;
        code: string;
        parameters: string[];
        build: (values: PARSER, figures: Record<string, AbstractFigure>, config: IGraphConfig) => unknown;
        create: string;
        option?: string | undefined;
    }>;
    get code(): PARSER[];
    refresh(code: string): void;
    refreshLayout(code?: string): void;
}
