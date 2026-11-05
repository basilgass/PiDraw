import type { XY } from "../../pidraw.common";
export type LABEL_POSITION = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br';
export type LabelFieldName = 'coordinates' | 'length' | 'sum' | 'rectangles' | 'area';
export interface LabelField {
    field: LabelFieldName;
    digits: number;
}
export type LabelContent = string | (string | LabelField)[];
export type LabelFields = Partial<Record<LabelFieldName, (digits: number) => string>>;
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
//# sourceMappingURL=Label.types.d.ts.map