import type { XY } from "../pidraw.common";
import type { BezierSegment } from "./computeBezier";
export type PathCommand = {
    type: 'M';
    p: XY;
} | {
    type: 'L';
    p: XY;
} | {
    type: 'C';
    c1: XY;
    c2: XY;
    p: XY;
} | {
    type: 'Z';
};
export declare function parsePath(d: string): PathCommand[];
export declare function transformPath(commands: PathCommand[], change: (position: XY) => XY): PathCommand[];
export declare function pathToString(commands: PathCommand[]): string;
export declare function pathPieces(commands: PathCommand[]): BezierSegment[][];
//# sourceMappingURL=computePath.d.ts.map