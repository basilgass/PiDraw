import type { Exclusive, XY } from "../../pidraw.common";
import type { Line } from "./Line";
import type { Plot } from "../Plot/Plot";
export type ILineType = 'segment' | 'ray' | 'line' | 'vector';
export interface LineConstraints {
    bisector: {
        d1: Line;
        d2: Line;
        alternative?: boolean;
    } | {
        A: XY;
        B: XY;
        C: XY;
    };
    director: {
        A: XY;
        d: XY;
    };
    equation: string;
    mediator: {
        A: XY;
        B: XY;
    };
    parallel: {
        to: Line;
        through: XY;
    };
    perpendicular: {
        to: Line;
        through: XY;
    };
    slope: {
        A: XY;
        slope: number;
    };
    through: {
        A: XY;
        B: XY;
    };
    tangent: {
        f: Plot;
        A: XY;
    };
}
export type LineConstraint = Exclusive<LineConstraints>;
export interface ILineOptions {
    shape?: ILineType;
}
export type ILineConfig = LineConstraint & ILineOptions;
export type ILineResolvedConfig = ILineConfig & Required<ILineOptions>;
//# sourceMappingURL=Line.types.d.ts.map