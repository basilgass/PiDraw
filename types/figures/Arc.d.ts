import { Svg } from "@svgdotjs/svg.js";
import { AbstractFigure } from "./AbstractFigure";
import type { XY } from "../pidraw.common";
export interface IArcConfig {
    start: XY;
    center: XY;
    end: XY;
    radius?: number | XY;
    morphToSquare?: boolean;
    sector?: boolean;
    acute?: boolean;
}
export declare class Arc extends AbstractFigure {
    constructor(rootSVG: Svg, name: string, values: IArcConfig);
    protected _config: IArcConfig;
    get config(): IArcConfig;
    set config(value: IArcConfig);
    get center(): XY;
    get start(): XY;
    get end(): XY;
    get radius(): number;
    get angle(): number;
    get isSquare(): boolean;
    computed(): this;
    moveLabel(): this;
    getAngles(): {
        start: number;
        end: number;
    };
    getPath(): string;
    _makeShape(): import("@svgdotjs/svg.js").Shape;
    private _describeSquare;
    private _describe_add_sector;
    private _describeArc;
}
//# sourceMappingURL=Arc.d.ts.map