import type { Shape } from "@svgdotjs/svg.js";
import type { XY, IFigureAnimation, IFigureContext } from "../pidraw.common";
import { AbstractFigure } from "./AbstractFigure";
import type { LabelFields } from "../labels/Label";
import type { IPointConfig, IPointResolvedConfig, PointShape } from "./Point.types";
export declare class Point extends AbstractFigure {
    constructor(context: IFigureContext, name: string, values: IPointConfig);
    protected _config: IPointResolvedConfig;
    get config(): IPointResolvedConfig;
    set config(value: IPointConfig);
    readonly animatable = true;
    protected _checkAnimation(animation: IFigureAnimation): void;
    protected _pixels: Readonly<XY>;
    get pixels(): Readonly<XY>;
    set pixels(value: Readonly<XY>);
    get coordinates(): XY;
    get size(): number;
    set size(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    asCircle(size?: number): this;
    asCrosshair(size?: number): this;
    asSquare(size?: number): this;
    protected _as(shape: PointShape, size?: number): this;
    labelFields(): LabelFields;
    computed(): this;
    tikz(): string;
    moveLabel(): this;
    protected _makeShape(): Shape;
    protected _centerShape<T extends Shape>(shape: T): T;
}
//# sourceMappingURL=Point.d.ts.map