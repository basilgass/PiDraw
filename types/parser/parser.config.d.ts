import type { PARSER } from "piparser";
import { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
import type { buildInterface, IGraphConfig } from "../pidraw.common";
export interface parser_item {
    build: (values: PARSER, figures: Record<string, AbstractFigure>, config: IGraphConfig) => buildInterface<unknown> | buildInterface<unknown>[] | null;
    code: string;
    description: string;
    name: string;
    option?: string;
    parameters: string[];
}
export declare const parser_config: Record<string, parser_item>;
//# sourceMappingURL=parser.config.d.ts.map