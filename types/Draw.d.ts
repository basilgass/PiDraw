import { Graph } from './Graph';
import { IParserConfig, IParserSettings } from './parser/parser.common';
import { PARSER, PiParse } from 'piparser';
export declare const PARSER_PARAMETERS_KEYS: string[];
export declare class Draw extends Graph {
    #private;
    protected _parser: PiParse;
    protected _settings: IParserSettings;
    constructor(id: string | HTMLElement, config?: IParserConfig);
    protected _code: PARSER[];
    get code(): PARSER[];
    static documentation(): Record<string, import('./parser/parser.config').parser_item>;
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
