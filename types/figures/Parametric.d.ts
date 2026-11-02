import { AbstractFigure } from "./AbstractFigure";
import type { IFigureContext, XY } from "../pidraw.common";
import { type LABEL_POSITION } from "../labels/Label";
import { type ParametricFunctions } from "./Parametric.constraints";
import type { IParametricConfig } from "./Parametric.types";
export declare class Parametric extends AbstractFigure {
    constructor(context: IFigureContext, name: string, values: IParametricConfig);
    protected _numExp: ParametricFunctions;
    protected _config: IParametricConfig;
    get config(): IParametricConfig;
    set config(value: IParametricConfig);
    computed(): this;
    valueAt(t: number): XY;
    evaluate(t: number): XY;
    protected _draw(): this;
    protected _points: XY[];
    readonly followable = true;
    follow(x: number, y: number): XY;
    protected _range: {
        from: number;
        to: number;
        intervals: number;
    } | null;
    protected _labelAnchor: {
        point: XY;
        direction: XY;
    } | null;
    protected _labelPlace({ point, direction }: {
        point: XY;
        direction: XY;
    }): {
        point: XY;
        alignement: LABEL_POSITION;
    };
    moveLabel(): this;
    tikz(): string;
    protected _tikzCurve(): string;
    _makeShape(): import("@svgdotjs/svg.js").Shape;
}
//# sourceMappingURL=Parametric.d.ts.map