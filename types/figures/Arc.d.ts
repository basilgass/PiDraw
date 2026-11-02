import { AbstractFigure } from "./AbstractFigure";
import type { IFigureContext, XY } from "../pidraw.common";
import { type LABEL_POSITION } from "../labels/Label";
import type { ArcDefinition } from "./Arc.constraints";
import type { IArcConfig } from "./Arc.types";
export declare class Arc extends AbstractFigure {
    constructor(context: IFigureContext, name: string, values: IArcConfig);
    protected _config: IArcConfig;
    get config(): IArcConfig;
    set config(value: IArcConfig);
    protected _center: XY;
    get center(): XY;
    protected _start: XY;
    get start(): XY;
    protected _end: XY;
    get end(): XY;
    protected _radius: number;
    get radius(): number;
    protected _from: number;
    protected _sweep: number;
    get angle(): number;
    get isSquare(): boolean;
    asSector(): this;
    asSquare(): this;
    computed(): this;
    protected _place({ center, start, end, radius }: ArcDefinition): this;
    readonly followable = true;
    follow(x: number, y: number): XY;
    protected _drawnAsSquare(): boolean;
    protected _directionAt(fraction: number): number;
    protected _pointAt(degrees: number, distance: number): XY;
    protected _drawnRadius(): number;
    protected _path(): string;
    _makeShape(): import("@svgdotjs/svg.js").Shape;
    protected _labelPlace(): {
        point: XY;
        alignement: LABEL_POSITION;
    };
    moveLabel(): this;
    tikz(): string;
    protected _tikzPath(): string;
}
//# sourceMappingURL=Arc.d.ts.map