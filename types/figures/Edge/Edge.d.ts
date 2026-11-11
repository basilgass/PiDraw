import type { Mask, Rect } from "@svgdotjs/svg.js";
import { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IFigureContext, XY } from "../../pidraw.common";
import type { ILabelConfig, LABEL_POSITION } from "../Label/Label.types";
import { type BezierSegment } from "../../calculus";
import type { IEdgeConfig } from "./Edge.types";
export declare class Edge extends AbstractFigure {
    protected get _className(): string;
    constructor(context: IFigureContext, name: string, values: IEdgeConfig);
    protected _config: IEdgeConfig;
    get config(): IEdgeConfig;
    set config(value: IEdgeConfig);
    protected _segments: BezierSegment[] | null;
    get segments(): BezierSegment[];
    get isLoop(): boolean;
    computed(): this;
    readonly followable = true;
    follow(x: number, y: number): XY;
    protected _labelPlace(): {
        point: XY;
        alignement: LABEL_POSITION;
        away: XY | null;
    } | null;
    moveLabel(): this;
    protected _cut: Mask | null;
    protected _hole: Rect | null;
    get cutsLine(): boolean;
    protected _updateCut(): void;
    protected _removeCut(): void;
    setLabelStyle(style: Parameters<AbstractFigure['setLabelStyle']>[0]): this;
    dispose(): void;
    protected _tikzLabelConfig(config: ILabelConfig): ILabelConfig;
    tikz(): string;
    _makeShape(): import("@svgdotjs/svg.js").Shape;
}
//# sourceMappingURL=Edge.d.ts.map