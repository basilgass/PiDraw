import type { XY } from "../pidraw.common";
import type { IAxisConfig, IAxisOptions, IAxisTicks } from "./Axis.types";
export declare const AXIS_PADDING = 20;
export type ResolvedTicks = Required<Omit<IAxisTicks, 'marks' | 'numbers'>> & Pick<IAxisTicks, 'marks' | 'numbers'>;
export declare const TICK_DEFAULTS: ResolvedTicks;
export declare const MIN_TICK_SPACING = 4;
export declare const MIN_LABEL_SPACING = 36;
export declare const ARROW_CLEARANCE = 10;
export declare const LABEL_GAP = 4;
export declare const NAME_GAP = 6;
export declare const MAX_DIGITS = 8;
export declare const MAX_EVERY = 1000;
export declare function ticksOf(config: IAxisOptions): ResolvedTicks | null;
export declare function checkAxis(config: IAxisConfig, name: string): void;
export declare function insetEnds(start: XY, end: XY, padding: number): [XY, XY] | null;
//# sourceMappingURL=Axis.constraints.d.ts.map