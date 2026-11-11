import type { G, Path, Shape } from "@svgdotjs/svg.js";
import { type TickLabel } from "../../calculus";
import type { LABEL_POSITION } from "../Label/Label.types";
import type { IFigureContext, XY } from "../../pidraw.common";
import type { IAxisConfig, IAxisOptions } from "./Axis.types";
import { Line } from "../Line/Line";
import { type LineFound } from "../Line/Line.constraints";
import type { ILineResolvedConfig } from "../Line/Line.types";
export type IAxisResolvedConfig = ILineResolvedConfig & IAxisOptions;
export interface DrawnTick {
    value: number;
    from: XY;
    to: XY;
    label: (TickLabel & {
        at: XY;
        alignement: LABEL_POSITION;
    }) | null;
}
export interface DrawnName {
    text: string;
    at: XY;
    alignement: LABEL_POSITION;
}
export declare class Axis extends Line {
    protected get _className(): string;
    protected _config: IAxisResolvedConfig;
    protected _marks?: Path;
    protected _texts?: G;
    protected _ticks: DrawnTick[];
    protected _drawnName: DrawnName | null;
    protected _unit: XY | null;
    constructor(context: IFigureContext, name: string, values: IAxisConfig);
    get config(): IAxisResolvedConfig;
    set config(value: IAxisConfig);
    get padding(): number;
    get unit(): XY | null;
    get ticks(): DrawnTick[];
    get drawnName(): DrawnName | null;
    protected _makeShape(): Shape;
    strokeable(): Shape[];
    protected _styleMarkers(): void;
    protected _place(found: LineFound): this;
    protected _numbersSide(direction: XY): XY;
    protected _graduate(found: LineFound, drawn: boolean): this;
    protected _ticksOf(found: LineFound, direction: XY, side: XY): DrawnTick[];
    protected _paint(): void;
    protected static _tikzSide(alignement: LABEL_POSITION): string;
    tikz(): string;
}
//# sourceMappingURL=Axis.d.ts.map