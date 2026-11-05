import type { IAxisDisplay, IGraphDisplay } from "../../Graph.types";
import type { XY } from "../../pidraw.common";
import type { IAxisConfig, IAxisOptions, IAxisTicks } from "./Axis.types";
export declare const AXIS_PADDING = 20;
export type ResolvedTicks = Required<Omit<IAxisTicks, 'marks' | 'numbers'>> & Pick<IAxisTicks, 'marks' | 'numbers'>;
export declare const TICK_DEFAULTS: ResolvedTicks;
export declare const MAX_DIGITS = 8;
export declare const MAX_EVERY = 1000;
export declare function ticksOf(config: IAxisOptions): ResolvedTicks | null;
export declare function checkAxis(config: IAxisConfig, name: string): void;
export declare function axesDisplay(axis: IGraphDisplay['axis']): {
    x: IAxisDisplay | false;
    y: IAxisDisplay | false;
};
export declare function axisConfigOf(director: {
    A: XY;
    d: XY;
}, side: 'left' | 'right', display: IAxisDisplay | false): IAxisConfig;
export declare function insetEnds(start: XY, end: XY, padding: number): [XY, XY] | null;
//# sourceMappingURL=Axis.constraints.d.ts.map