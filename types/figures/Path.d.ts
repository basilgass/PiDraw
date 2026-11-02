import type { Shape } from "@svgdotjs/svg.js";
import { type PathCommand } from "../calculus";
import { type LABEL_POSITION } from "../labels/Label";
import type { IFigureContext, XY } from "../pidraw.common";
import { AbstractFigure } from "./AbstractFigure";
import type { IPathConfig } from "./Path.types";
export declare class Path extends AbstractFigure {
    constructor(context: IFigureContext, name: string, values: IPathConfig);
    protected _config: IPathConfig;
    get config(): IPathConfig;
    set config(value: IPathConfig);
    get d(): string;
    set d(path: string);
    protected _commands: PathCommand[];
    protected _pixels: PathCommand[];
    get commands(): PathCommand[];
    computed(): this;
    readonly followable = true;
    follow(x: number, y: number): XY;
    protected _labelPlace(): {
        point: XY;
        alignement: LABEL_POSITION;
    } | null;
    moveLabel(): this;
    protected _tikzPath(): string;
    tikz(): string;
    _makeShape(): Shape;
}
//# sourceMappingURL=Path.d.ts.map