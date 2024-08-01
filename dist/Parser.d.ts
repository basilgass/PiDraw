import { Graph } from './Graph';
import { IParser, IParserConfig } from './parser/parser.common';
import { IGraphConfig } from './pidraw.common';
import { AbstractFigure } from './figures/AbstractFigure';

export declare class Parser extends Graph {
    #private;
    constructor(id: string | HTMLElement, config?: IParserConfig);
    static documentation(): Record<string, {
        name: string;
        description: string;
        code: string;
        parameters: string[];
        build: (values: IParser, figures: Record<string, AbstractFigure>, config: IGraphConfig) => unknown;
        create: string;
    }>;
    get code(): IParser[];
    refresh(code: string): void;
    refreshLayout(code?: string): void;
}
