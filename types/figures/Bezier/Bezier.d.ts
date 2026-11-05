import { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IFigureContext, XY } from "../../pidraw.common";
import type { LABEL_POSITION } from "../Label/Label.types";
import { type BezierSegment } from "../../calculus";
import type { IBezierConfig } from "./Bezier.types";
export declare class Bezier extends AbstractFigure {
    constructor(context: IFigureContext, name: string, values: IBezierConfig);
    protected static _copy(values: IBezierConfig): IBezierConfig;
    protected _config: IBezierConfig;
    get config(): IBezierConfig;
    set config(value: IBezierConfig);
    protected _segments: BezierSegment[] | null;
    get segments(): BezierSegment[];
    asClosed(): this;
    computed(): this;
    protected _place(segments: BezierSegment[] | null): this;
    readonly followable = true;
    follow(x: number, y: number): XY;
    protected _labelPlace(): {
        point: XY;
        alignement: LABEL_POSITION;
    } | null;
    moveLabel(): this;
    tikz(): string;
    _makeShape(): import("@svgdotjs/svg.js").Shape;
}
//# sourceMappingURL=Bezier.d.ts.map