import { Graph } from "../Graph";
import type { IParserConfig, IParserSettings } from "../parser/parser.types";
import { type XY } from "../pidraw.common";
import { type ILayout } from "../parser/buildLayout";
import { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
import type { Point } from "../figures/Point/Point";
import { type PARSER, PiParse } from "piparser";
import { type IDrawLine } from "./Draw.lines";
import type { IControlsFigure } from "../controls/controls.types";
import { type ILineRecord } from "./Draw.diff";
import { type IDrawError, type IDrawReport, type IRefreshOptions } from "./Draw.report";
export declare class Draw {
    readonly graph: Graph;
    protected _parser: PiParse;
    protected _settings: IParserSettings;
    protected _report: IDrawReport;
    protected _layoutError: IDrawError | null;
    protected _lines: ILineRecord[];
    protected _parameters: string | undefined;
    protected _moved: Map<string, {
        text: string;
        coordinates: XY;
    }>;
    constructor(id: string | HTMLElement, config?: IParserConfig);
    protected _code: PARSER[];
    get code(): PARSER[];
    get report(): IDrawReport;
    get errors(): readonly IDrawError[];
    get layoutError(): IDrawError | null;
    static documentation(): Record<string, import("..").ParserItem>;
    refresh(code: string, options?: IRefreshOptions): IDrawReport;
    refreshLayout(code?: string): IDrawError | null;
    protected _applyLayoutOptions(options: ILayout['options']): void;
    protected _build(input: string, editing?: number, drag?: 'keep' | 'reset'): IDrawReport;
    protected _removeAfter(keep: ReadonlySet<string>): void;
    protected _reportOf(records: readonly ILineRecord[], editing: number | undefined): IDrawReport;
    protected _remember(point: Point): void;
    protected _restore(record: ILineRecord): void;
    protected _buildLine(line: IDrawLine, previous: ILineRecord | undefined): ILineRecord;
    protected _removeMade(names: readonly string[]): void;
    protected _buildItem(item: PARSER, controls: Partial<IControlsFigure>): void;
    protected _namedFigures(): Record<string, AbstractFigure>;
    protected _uniqueName(name: string): string;
}
//# sourceMappingURL=Draw.d.ts.map