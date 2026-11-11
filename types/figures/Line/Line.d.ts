import { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { XY, IFigureContext } from "../../pidraw.common";
import type { LabelFieldName, LabelFields } from "../Label/Label.types";
import type { Shape } from "@svgdotjs/svg.js";
import { mathLine } from "../../calculus";
import { type LineFound } from "./Line.constraints";
import type { ILineConfig, ILineResolvedConfig } from "./Line.types";
export declare class Line extends AbstractFigure {
    protected get _className(): string;
    constructor(context: IFigureContext, name: string, values: ILineConfig);
    protected _config: ILineResolvedConfig;
    get config(): ILineResolvedConfig;
    set config(value: ILineConfig);
    protected _end: XY;
    get end(): XY;
    set end(value: XY);
    protected _start: XY;
    get start(): XY;
    set start(value: XY);
    get angle(): number;
    get direction(): XY;
    get math(): mathLine;
    get normal(): XY;
    labelFields(): LabelFields;
    defaultLabelField(): LabelFieldName | null;
    protected _slopeIsExact(): boolean;
    computed(): this;
    protected _place({ start, direction, end }: LineFound): this;
    get snappable(): boolean;
    snapPoints(): XY[];
    readonly followable = true;
    follow(x: number, y: number): XY;
    tikz(): string;
    protected _labelPoint(): XY;
    moveLabel(): this;
    protected _makeShape(): Shape;
}
//# sourceMappingURL=Line.d.ts.map