import type { IGraphConfig, XY } from "../../pidraw.common";
import { mathLine } from "../../calculus";
import type { LabelFormat } from "../Label/Label.types";
import type { Line } from "./Line";
import type { ILineConfig, LineConstraints } from "./Line.types";
export interface LineFound {
    start: XY;
    direction: XY;
    end?: XY;
}
export declare function mathLineOf(line: Line): mathLine;
export declare function slopeText(dx: number, dy: number, exact: boolean, digits: number | undefined, format: LabelFormat): string;
export declare function constraintOf(config: ILineConfig, name: string): keyof LineConstraints;
export declare function resolveConstraint(key: keyof LineConstraints, config: ILineConfig, graph: IGraphConfig): LineFound;
//# sourceMappingURL=Line.constraints.d.ts.map