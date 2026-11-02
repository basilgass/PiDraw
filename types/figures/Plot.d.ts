import { AbstractFigure } from "./AbstractFigure";
import type { IFigureContext, XY } from "../pidraw.common";
import { NumExp } from "../calculus";
import type { IPlotConfig } from "./Plot.types";
export declare class Plot extends AbstractFigure {
    constructor(context: IFigureContext, name: string, values: IPlotConfig);
    protected _fx: string;
    protected _numExp: NumExp;
    get numExp(): NumExp;
    protected _config: IPlotConfig;
    get config(): IPlotConfig;
    set config(value: IPlotConfig);
    computed(): this;
    valueAt(x: number): number;
    evaluate(x: number): XY;
    readonly followable = true;
    follow(x: number, y: number): XY;
    protected _draw(exists: boolean): this;
    protected _labelAnchor: {
        point: XY;
        direction: XY;
    } | null;
    protected _range: {
        from: number;
        to: number;
        intervals: number;
    } | null;
    moveLabel(): this;
    tikz(): string;
    protected _labelPlace({ point, direction }: {
        point: XY;
        direction: XY;
    }): {
        point: XY;
        rising: boolean;
    };
    protected _tikzPlot(): string;
    _makeShape(): import("@svgdotjs/svg.js").Shape;
}
//# sourceMappingURL=Plot.d.ts.map