import { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IFigureContext, XY } from "../../pidraw.common";
import type { LabelFields } from "../Label/Label.types";
import { type FillBetweenRun } from "../../calculus";
import type { IFillBetweenConfig } from "./FillBetween.types";
export declare class FillBetween extends AbstractFigure {
    constructor(context: IFigureContext, name: string, values: IFillBetweenConfig);
    protected static _copy(values: IFillBetweenConfig): IFillBetweenConfig;
    protected _config: IFillBetweenConfig;
    get config(): IFillBetweenConfig;
    set config(value: IFillBetweenConfig);
    protected _runs: FillBetweenRun[];
    protected _range: {
        from: number;
        to: number;
        intervals: number;
    } | null;
    get area(): number;
    computed(): this;
    labelFields(): LabelFields;
    protected _labelPlace(): XY | null;
    moveLabel(): this;
    tikz(): string;
    protected _tikzArea({ from, to, intervals }: {
        from: number;
        to: number;
        intervals: number;
    }): string;
    _makeShape(): import("@svgdotjs/svg.js").Shape;
}
//# sourceMappingURL=FillBetween.d.ts.map