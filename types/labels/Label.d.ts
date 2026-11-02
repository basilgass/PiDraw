import { ForeignObject as svgHTML, G, Text as svgLabel } from "@svgdotjs/svg.js";
import type { XY } from "../pidraw.common";
type LabelType = svgLabel | svgHTML;
export type LABEL_POSITION = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br';
export declare function labelAlignementToward(x: number, y: number): LABEL_POSITION;
export declare function labelBesideWay(point: XY, direction: XY, gap: number): {
    point: XY;
    alignement: LABEL_POSITION;
};
export type LabelFieldName = 'coordinates' | 'length' | 'sum' | 'rectangles' | 'area';
export interface LabelField {
    field: LabelFieldName;
    digits: number;
}
export type LabelContent = string | (string | LabelField)[];
export type LabelFields = Partial<Record<LabelFieldName, (digits: number) => string>>;
export declare function checkLabelContent(content: LabelContent, fields: LabelFields, name: string): void;
export declare function renderLabelContent(content: LabelContent, fields: LabelFields): string;
export declare function labelCenter(alignement: LABEL_POSITION, anchor: XY, width: number, height: number): XY;
export interface ILabelConfig {
    asHtml: boolean;
    alignement: LABEL_POSITION;
    offset: XY;
    rotate: number;
    size: string;
    texConverter?: (value: string) => string;
}
export type LabelOptions = Partial<ILabelConfig> & {
    text?: string;
};
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
    position(alignement?: LABEL_POSITION, offset?: XY, rotate?: number): this;
    protected _size(): {
        width: number;
        height: number;
    };
    protected _draw(): void;
    protected _html(): string;
    protected _style(): string;
    protected _write(): void;
    protected _makeLabel(): LabelType;
}
export {};
//# sourceMappingURL=Label.d.ts.map