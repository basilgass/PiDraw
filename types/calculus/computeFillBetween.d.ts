import type { Domain, XY } from "../pidraw.common";
import { type CurveSampling } from "./computeCurve";
export interface FillBetweenRun {
    first: XY[];
    second: XY[];
}
export declare function fillBetweenRuns(first: (x: number) => XY, second: ((x: number) => XY) | null, baseline: number, domain: Domain, toX: (pixel: number) => number, sampling: CurveSampling): FillBetweenRun[];
export declare function fillBetweenPath(runs: FillBetweenRun[]): string;
export declare function fillBetweenArea(runs: FillBetweenRun[]): number;
//# sourceMappingURL=computeFillBetween.d.ts.map