import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
import type { IGraphConfig } from "../pidraw.common";
import type { BuildResult } from "./parser.types";
export interface ParserItem {
    build: (item: PARSER, figures: Record<string, AbstractFigure>, config: IGraphConfig) => BuildResult<unknown> | BuildResult<unknown>[] | null;
    code: string;
    description: string;
    name: string;
}
export declare const PARSER_CONFIG: Record<string, ParserItem>;
//# sourceMappingURL=parser.config.d.ts.map