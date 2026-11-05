import { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IFigureContext, XY } from "../../pidraw.common";
import { type PolygonShape } from "../../calculus";
import type { IPolygonConfig } from "./Polygon.types";
export declare class Polygon extends AbstractFigure {
    constructor(context: IFigureContext, name: string, values: IPolygonConfig);
    protected static _copy(values: IPolygonConfig): IPolygonConfig;
    protected _config: IPolygonConfig;
    get config(): IPolygonConfig;
    set config(value: IPolygonConfig);
    protected _polygon: PolygonShape | null;
    get vertices(): XY[];
    get centroid(): XY;
    computed(): this;
    protected _place(shape: PolygonShape | null): this;
    readonly followable = true;
    follow(x: number, y: number): XY;
    moveLabel(): this;
    tikz(): string;
    _makeShape(): import("@svgdotjs/svg.js").Shape;
}
//# sourceMappingURL=Polygon.d.ts.map