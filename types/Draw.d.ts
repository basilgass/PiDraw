import { Graph } from "./Graph";
import { type IParserConfig } from "./parser/parser.common";
import type { PARSER } from "piparser";
export declare const PARSER_PARAMETERS_KEYS: string[];
export declare class Draw extends Graph {
    #private;
    constructor(id: string | HTMLElement, config?: IParserConfig);
    get code(): PARSER[];
    static documentation(): Record<string, import("./parser/parser.config").parser_item>;
    refresh(code: string): void;
    refreshLayout(code?: string): void;
}
//# sourceMappingURL=Draw.d.ts.map