import type { XY } from "../pidraw.common";
export interface Tick {
    index: number;
    value: number;
    point: XY;
}
export interface TickSelection {
    every?: number;
    first?: boolean;
}
export declare function tickPositions(zero: XY, unit: XY, step: number, start: XY, end: XY, minSpacing: number): Tick[];
export declare function selects(index: number, selection: TickSelection | undefined): boolean;
export declare function labelEvery(spacing: number, minSpacing: number): number;
export declare function piFraction(value: number): {
    p: number;
    q: number;
} | null;
export interface TickLabel {
    text: string;
    latex: string;
}
export declare function tickLabel(value: number, labels: 'numbers' | 'pi', digits: number): TickLabel;
//# sourceMappingURL=computeAxis.d.ts.map