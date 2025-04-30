import { ForeignObject as svgHTML, G, Text as svgLabel } from '@svgdotjs/svg.js';
import { XY } from '../pidraw.common';
type LabelType = svgLabel | svgHTML;
export type LABEL_POSITION = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br';
export interface ILabelConfig {
    text: string;
    asHtml: boolean;
    alignement: LABEL_POSITION;
    offset: XY;
    rotate?: number;
    texConverter: (value: string) => string;
}
export declare class Label {
    #private;
    constructor(rootG: G, name: string, config: ILabelConfig);
    get config(): ILabelConfig;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get asHtml(): boolean;
    get shape(): LabelType;
    get alignement(): LABEL_POSITION;
    get label(): LabelType;
    get displayName(): string;
    hide(): this;
    show(): this;
    setLabel(text?: string): this;
    move(x: number, y: number): this;
    rotate(angle: number): this;
    position(alignement?: LABEL_POSITION, offset?: XY, rotate?: number): this;
}
export {};
