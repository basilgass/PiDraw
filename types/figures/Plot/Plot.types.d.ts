import type { Domain, Exclusive, XY } from "../../pidraw.common";
import type { CurveOptions } from "../Curve/Curve.types";
export interface PlotConstraints {
    expression: string;
    quadratic: {
        A: XY;
        B: XY;
        C: XY;
    };
}
export interface PlotOptions extends CurveOptions {
    image?: Domain;
}
export type IPlotConfig = Exclusive<PlotConstraints> & PlotOptions;
//# sourceMappingURL=Plot.types.d.ts.map