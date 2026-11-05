import type { XY } from "../../pidraw.common";
import type { LABEL_POSITION, LabelContent, LabelFields } from "./Label.types";
export declare function labelAlignementToward(x: number, y: number): LABEL_POSITION;
export declare function labelBesideWay(point: XY, direction: XY, gap: number): {
    point: XY;
    alignement: LABEL_POSITION;
};
export declare function checkLabelContent(content: LabelContent, fields: LabelFields, name: string): void;
export declare function renderLabelContent(content: LabelContent, fields: LabelFields): string;
export declare const LABEL_POSITIONS: readonly LABEL_POSITION[];
export declare const DEFAULT_LABEL_POSITION: LABEL_POSITION;
export declare function labelCenter(alignement: LABEL_POSITION, anchor: XY, width: number, height: number): XY;
//# sourceMappingURL=Label.constraints.d.ts.map