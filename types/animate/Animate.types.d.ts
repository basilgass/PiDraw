import type { AnimationEasing } from "../calculus/easing";
export type { AnimationEasing };
import type { Point } from "../figures/Point/Point";
import type { XY } from "../pidraw.common";
export declare enum LoopStyle {
    RESET = "reset",
    REVERSE = "reverse",
    NONE = "none"
}
export interface IFigureAnimation {
    from: Point | XY | null;
    to: Point | XY | null;
    duration: number;
    easing: AnimationEasing;
    delay: number;
    loop: LoopStyle;
    callback?: () => void;
}
export interface IAnimateEventMap {
    'start': null;
    'pause': null;
    'end': null;
    'stop': null;
}
//# sourceMappingURL=Animate.types.d.ts.map