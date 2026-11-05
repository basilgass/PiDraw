import type { TickSelection } from "../../calculus";
import type { LineConstraint } from "../Line/Line.types";
export interface IAxisTicks {
    step?: number;
    labels?: 'numbers' | 'pi';
    digits?: number;
    size?: number;
    zero?: boolean;
    marks?: TickSelection;
    numbers?: TickSelection | 'none';
}
export interface IAxisOptions {
    padding?: number;
    range?: {
        min: number;
        max: number;
    };
    ticks?: IAxisTicks;
    name?: string;
    side?: 'left' | 'right';
}
export type IAxisConfig = LineConstraint & IAxisOptions;
//# sourceMappingURL=Axis.types.d.ts.map