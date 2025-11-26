import { ForeignObject as svgHTML, G, Text as svgLabel } from '@svgdotjs/svg.js';
import { XY } from '../pidraw.common';
type LabelType = svgLabel | svgHTML;
export type LABEL_POSITION = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br';
export interface ILabelConfig {
    text: string;
    size?: string | null;
    asHtml: boolean;
    alignement: LABEL_POSITION;
    offset: XY;
    rotate?: number;
    texConverter: (value: string) => string;
}
export declare class Label {
    _element: G;
    protected _name: string;
    protected _style: string;
    constructor(rootG: G, name: string, config: ILabelConfig);
    protected _shape: LabelType;
    get shape(): LabelType;
    protected _config: ILabelConfig;
    get config(): ILabelConfig;
    protected _displayName: string;
    get displayName(): string;
    protected _x: number;
    get x(): number;
    set x(value: number);
    protected _y: number;
    get y(): number;
    set y(value: number);
    protected _auto_rotate: boolean;
    get auto_rotate(): boolean;
    set auto_rotate(value: boolean);
    get asHtml(): boolean;
    get alignement(): LABEL_POSITION;
    get label(): LabelType;
    hide(): this;
    show(): this;
    setLabel(text?: string): this;
    move(x: number, y: number): this;
    rotate(angle: number): this;
    position(alignement?: LABEL_POSITION, offset?: XY, rotate?: number): this;
    _makeLabel(): svgLabel | svgHTML;
}
export {};
