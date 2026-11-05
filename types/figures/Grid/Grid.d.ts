import type { Path, Shape } from "@svgdotjs/svg.js";
import { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IFigureContext, XY } from "../../pidraw.common";
import type { IGridConfig } from "./Grid.types";
export declare class Grid extends AbstractFigure {
    constructor(context: IFigureContext, name: string, values?: IGridConfig);
    protected _config: IGridConfig;
    get config(): IGridConfig;
    set config(value: IGridConfig);
    protected _lines: [XY, XY][];
    protected _subLines: [XY, XY][];
    protected _sub?: Path;
    get lines(): [XY, XY][];
    get subLines(): [XY, XY][];
    protected _view(): {
        x: {
            min: number;
            max: number;
        };
        y: {
            min: number;
            max: number;
        };
    };
    protected _family(parts: number, skipEvery: number): [XY, XY][];
    computed(): this;
    moveLabel(): this;
    strokeable(): Shape[];
    tikz(): string;
    protected _tikzGridPath(parts: number): string | null;
    _makeShape(): Shape;
}
//# sourceMappingURL=Grid.d.ts.map