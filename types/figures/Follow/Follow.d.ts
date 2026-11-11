import type { Circle as svgCircle, G, Line as svgLine, Shape } from "@svgdotjs/svg.js";
import { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IFigureContext, XY } from "../../pidraw.common";
import type { LABEL_POSITION } from "../Label/Label.types";
import type { IFollowConfig } from "./Follow.types";
interface FollowState {
    point: XY;
    direction: XY | null;
}
export declare class Follow extends AbstractFigure {
    protected get _className(): string;
    protected readonly _labelGap: number;
    constructor(context: IFigureContext, name: string, values: IFollowConfig);
    protected _config: IFollowConfig;
    get config(): IFollowConfig;
    set config(value: IFollowConfig);
    protected _mouse: XY | null;
    protected _state: FollowState | null;
    protected _listener: (event: Event) => void;
    protected _point?: svgCircle;
    protected _tangent?: svgLine;
    get position(): XY;
    dispose(): void;
    moveTo(x: number, y: number): this;
    protected _target(): XY;
    computed(): this;
    protected _tangentLine(): [XY, XY] | null;
    moveLabel(): this;
    protected _labelPlace({ point, direction }: FollowState): {
        point: XY;
        alignement: LABEL_POSITION;
    };
    tikz(): string;
    _makeShape(): G;
    strokeable(): Shape[];
    fillable(): Shape[];
}
export {};
//# sourceMappingURL=Follow.d.ts.map