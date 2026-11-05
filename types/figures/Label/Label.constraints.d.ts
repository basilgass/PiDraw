import { type IMeasure } from "../../calculus";
import type { XY } from "../../pidraw.common";
import type { LABEL_POSITION, LabelContent, LabelFields, LabelFormat } from "./Label.types";
export declare function labelAlignementToward(x: number, y: number): LABEL_POSITION;
export declare function labelBesideWay(point: XY, direction: XY, gap: number): {
    point: XY;
    alignement: LABEL_POSITION;
};
export declare const DEFAULT_LABEL_DIGITS = 2;
export declare function fieldNumber(value: number, digits: number | undefined): string;
export declare function fieldLength(value: number, digits: number | undefined, measure: IMeasure | undefined, format: LabelFormat, power?: 1 | 2): string;
export declare function fieldAngle(degrees: number, digits: number | undefined, format: LabelFormat): string;
export declare function checkLabelContent(content: LabelContent, fields: LabelFields, name: string): void;
export declare function renderLabelContent(content: LabelContent, fields: LabelFields, format?: LabelFormat): string;
export declare function alignementDirection(alignement: LABEL_POSITION): XY | null;
export declare function unitDirection(direction: XY): XY | null;
export declare function labelAwayGap(direction: XY): XY;
export declare function labelCenterToward(anchor: XY, direction: XY, width: number, height: number): XY;
export declare function labelPush(direction: XY | null, distance: number): XY;
export declare const LABEL_POSITIONS: readonly LABEL_POSITION[];
export declare const DEFAULT_LABEL_POSITION: LABEL_POSITION;
export declare function labelCenter(alignement: LABEL_POSITION, anchor: XY, width: number, height: number): XY;
//# sourceMappingURL=Label.constraints.d.ts.map