import { Graph, type IDraggableConfig } from "./Graph";
import { type IParserConfig, type IParserParameters, type IParserSettings } from "./parser/parser.common";
import { parser_config } from "./parser/parser.config";
import { type ILayout } from "./parser/buildLayout";
import { AbstractFigure } from "./figures/AbstractFigure/AbstractFigure";
import { Point } from "./figures/Point/Point";
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
    protected _applyLayoutOptions(options: ILayout['options']): void;
    protected _applyDrag(obj: AbstractFigure, key: string, options: Record<string, IParserParameters>): void;
    protected _dragConfig(values: unknown[]): IDraggableConfig;
    protected _animationPoint(name: unknown, option: 'from' | 'to'): Point;
    protected _applyOptions(options: Record<string, IParserParameters>, obj: AbstractFigure): void;
    protected _build(input: string): void;
    protected _buildItem(item: PARSER, pConfig: typeof parser_config): void;
    protected _buildOptions(obj: AbstractFigure, item: PARSER): void;
    protected _defineCommand(command: string): {
        key: string;
        value: boolean;
    };
    protected _parseKeyCode(key_code: string): string;
    protected _prepare(input: string): PARSER[];
    protected _namedFigures(): Record<string, AbstractFigure>;
    protected _uniqueName(name: string): string;
}
//# sourceMappingURL=Draw.d.ts.map