import { Graph } from "./Graph";
import { type IParserConfig, type IParserParameters, type IParserSettings } from "./parser/parser.common";
import { type IGraphConfig, type IGraphDisplay } from "./pidraw.common";
import { AbstractFigure } from "./figures/AbstractFigure";
import { type PARSER, PiParse } from "piparser";
export declare const PARSER_PARAMETERS_KEYS: string[];
export declare class Draw extends Graph {
    protected _parser: PiParse;
    protected _settings: IParserSettings;
    constructor(id: string | HTMLElement, config?: IParserConfig);
    protected _code: PARSER[];
    get code(): PARSER[];
    static documentation(): Record<string, import("./parser/parser.config").parser_item>;
    refresh(code: string): void;
    refreshLayout(code?: string): void;
    protected _applyDrag(obj: AbstractFigure, key: string, options: Record<string, IParserParameters>): void;
    protected _applyOptions(options: Record<string, IParserParameters>, obj: AbstractFigure): void;
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
    protected _prepare(input: string): PARSER[];
    protected _uniqueName(name: string): string;
}
//# sourceMappingURL=Draw.d.ts.map