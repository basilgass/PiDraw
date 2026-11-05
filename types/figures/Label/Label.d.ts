import { ForeignObject as svgHTML } from "@svgdotjs/svg.js";
import type { G, Text as svgLabel } from "@svgdotjs/svg.js";
import type { XY } from "../../pidraw.common";
import type { ILabelConfig, LABEL_POSITION, LabelOptions } from "./Label.types";
type LabelType = svgLabel | svgHTML;
export declare class Label {
    protected _element: G;
    protected _name: string;
    constructor(rootG: G, name: string, options?: LabelOptions);
    protected _shape: LabelType;
    get shape(): LabelType;
    protected _config: ILabelConfig;
    get config(): ILabelConfig;
    protected _displayName: string;
    get displayName(): string;
    protected _x: number;
    get x(): number;
    protected _y: number;
    get y(): number;
    autoRotate: boolean;
    get asHtml(): boolean;
    get alignement(): LABEL_POSITION;
    get visible(): boolean;
    hide(): this;
    show(): this;
    setLabel(text?: string): this;
    move(x: number, y: number): this;
    rotate(angle: number): this;
    get alignementGiven(): boolean;
    protected _alignementGiven: boolean;
    protected _applied: string | null;
    protected _state(): string;
    position(alignement?: LABEL_POSITION, offset?: XY, rotate?: number, push?: number | null): this;
    protected _size(): {
        width: number;
        height: number;
    };
    setAway(direction: XY | null): this;
    setClearance(pixels: number): this;
    protected _drawIfChanged(): void;
    protected _draw(): void;
    protected _html(): string;
    protected _style(): string;
    protected _write(): void;
    protected _makeLabel(): LabelType;
}
export {};
//# sourceMappingURL=Label.d.ts.map