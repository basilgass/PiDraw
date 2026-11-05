import type { CurveOptions } from "./Curve.types";
export interface OptionCheck {
    valid: (value: unknown) => boolean;
    expected: string;
}
export declare const CURVE_CHECKS: Record<keyof CurveOptions, OptionCheck>;
export declare const IMAGE_CHECK: OptionCheck;
export declare function checkCurveOptions(config: CurveOptions, name: string, extra?: Record<string, OptionCheck>): void;
//# sourceMappingURL=Curve.constraints.d.ts.map