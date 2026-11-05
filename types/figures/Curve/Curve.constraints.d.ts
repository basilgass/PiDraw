import { NumExp } from "../../calculus";
import type { Domain } from "../../pidraw.common";
import type { CurveOptions } from "./Curve.types";
export interface OptionCheck {
    valid: (value: unknown) => boolean;
    expected: string;
}
export declare const CURVE_CHECKS: Record<keyof CurveOptions, OptionCheck>;
export declare const IMAGE_CHECK: OptionCheck;
export declare function checkCurveOptions(config: CurveOptions, name: string, extra?: Record<string, OptionCheck>): void;
export declare function curveDomain(given: Domain | undefined, plots: readonly {
    config: {
        domain?: Domain;
    };
}[]): Domain | null;
export declare function compileExpression(expression: string, variable: string, where: string): NumExp;
//# sourceMappingURL=Curve.constraints.d.ts.map