import { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IFigureContext, XY } from "../../pidraw.common";
import type { LabelFields } from "../Label/Label.types";
import { type RiemannRectangle } from "../../calculus";
import type { IRiemannConfig } from "./Riemann.types";
export declare class Riemann extends AbstractFigure {
    protected readonly _labelGap: number;
    constructor(context: IFigureContext, name: string, values: IRiemannConfig);
    protected static _copy(values: IRiemannConfig): IRiemannConfig;
    protected _config: IRiemannConfig;
    get config(): IRiemannConfig;
    set config(value: IRiemannConfig);
    get rectangles(): number;
    set rectangles(value: number);
    get position(): number;
    set position(value: number);
    get rectanglesDrawn(): RiemannRectangle[];
    protected _rectangles: RiemannRectangle[];
    get sum(): number;
    computed(): this;
    protected _path(): string;
    protected _labelPlace(): XY | null;
    labelFields(): LabelFields;
    moveLabel(): this;
    tikz(): string;
    _makeShape(): import("@svgdotjs/svg.js").Shape;
}
//# sourceMappingURL=Riemann.d.ts.map