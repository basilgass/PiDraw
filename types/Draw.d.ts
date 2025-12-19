import { Graph } from './Graph';
import { IParserConfig, IParserParameters, IParserSettings } from './parser/parser.common';
import { IGraphConfig, IGraphDisplay } from './pidraw.common';
import { AbstractFigure } from './figures/AbstractFigure';
import { PARSER, PiParse } from 'piparser';
export declare const PARSER_PARAMETERS_KEYS: string[];
export declare class Draw extends Graph {
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
    protected _applyDrag(obj: AbstractFigure, key: string, options: Record<string, IParserParameters>): void;
    protected _applyOptions(options: Record<string, IParserParameters>, obj: AbstractFigure): void;
    /**
     * Build the figures from the code
     */
    protected _build(input: string): void;
    protected _buildOptions(obj: AbstractFigure, item: PARSER): void;
    protected _defineCommand(command: string): {
        key: string;
        value: boolean;
    };
    protected _parseKeyCode(key_code: string): string;
    protected _parseKeyCodeLine(key_code: string): string;
    protected _parseKeyCodePlot(key_code: string): string;
    protected _parseKeyCodePoint(key_code: string): string;
    protected _parseLayout(code?: string): {
        config: IGraphConfig;
        display: IGraphDisplay;
        settings: IParserSettings;
    };
    /**
     * Prepare the code to load
     * @param input Input code to parse and prepare
     * @returns
     */
    protected _prepare(input: string): PARSER[];
    protected _uniqueName(name: string): string;
}
