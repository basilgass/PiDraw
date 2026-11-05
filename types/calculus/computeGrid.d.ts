import type { XY } from "../pidraw.common";
export declare function gridLines(origin: XY, along: XY, across: XY, width: number, height: number, minSpacing: number, skipEvery?: number): [XY, XY][];
export interface GridInterval {
    min: number;
    max: number;
}
export declare function gridBoxLines(box: {
    x: GridInterval;
    y: GridInterval;
}, view: {
    x: GridInterval;
    y: GridInterval;
}, step: {
    x: number;
    y: number;
}, project: (position: XY) => XY, minSpacing: number, parts?: number): [XY, XY][];
//# sourceMappingURL=computeGrid.d.ts.map