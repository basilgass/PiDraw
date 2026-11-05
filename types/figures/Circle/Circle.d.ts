import type { Shape } from "@svgdotjs/svg.js";
import { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IFigureContext, XY } from "../../pidraw.common";
import type { CircleDefinition } from "../../calculus";
import type { LabelFields } from "../Label/Label.types";
import type { ICircleConfig } from "./Circle.types";
import type { Line } from "../Line/Line";
export declare class Circle extends AbstractFigure {
    readonly followable = true;
    constructor(context: IFigureContext, name: string, values: ICircleConfig);
    protected _config: ICircleConfig;
    get config(): ICircleConfig;
    set config(value: ICircleConfig);
    protected _center: XY;
    get center(): XY;
    protected _radius: number;
    get radius(): number;
    computed(): this;
    tikz(): string;
    moveLabel(): this;
    follow(x: number, y: number): XY;
    intersectionWithLine(line: Line): XY[] | null;
    intersectionWithCircle(circle: Circle): XY[] | null;
    protected _place({ center, radius }: CircleDefinition): this;
    labelFields(): LabelFields;
    readonly referenceable = true;
    referenceAnchorPoint(): XY | null;
    protected _labelPoint(): XY;
    protected _makeShape(): Shape;
}
//# sourceMappingURL=Circle.d.ts.map