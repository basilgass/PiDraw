import { Graph } from './Graph';
import { IParserConfig } from './parser/parser.common';
import { PARSER } from 'piparser/lib/PiParserTypes';
export declare const PARSER_PARAMETERS_KEYS: string[];
export declare class Draw extends Graph {
    #private;
    constructor(id: string | HTMLElement, config?: IParserConfig);
    static documentation(): Record<string, import('./parser/parser.config').parser_item>;
    get code(): PARSER[];
    /**
     * Refresh the code to display
     * @param code Code to parse and display
     */
    refresh(code: string): void;
    /**
     * Refresh the layout
     * @param code Layout code to parse
     */
    refreshLayout(code?: string): void;
}