import type { Graph } from "./Graph";
import { Point } from "./figures/Point/Point";
import type { XY } from "./pidraw.common";
export declare enum LOOP_STYLE {
    RESET = "reset",
    REVERSE = "reverse",
    NONE = "none"
}
interface animationParams {
    point: Point;
    from: XY;
    to: XY;
    duration: number;
    delay: number;
    ease: (t: number) => number;
    loop: LOOP_STYLE;
    reverse: boolean;
    startTime: number;
}
export declare class Animate {
    protected _graph: Graph;
    protected _animatedPoints: Point[];
    protected _startTime: number;
    protected _elapsedAtPause: number;
    protected _paused: boolean;
    protected _rafId: number | null;
    protected _resetTimer: ReturnType<typeof setTimeout> | null;
    protected _animations: Map<string, animationParams>;
    constructor(graph: Graph);
    start(): void;
    pause(): void;
    resume(): void;
    cancel(): void;
    stop(): void;
    protected _clearReset(): void;
    isRunning(): boolean;
    isPaused(): boolean;
    canBeAnimated(): boolean;
    _updatePoints(): Point[];
    _step: (now: number) => void;
}
export declare function getLoopStyle(loop: string | boolean | number): LOOP_STYLE;
export {};
//# sourceMappingURL=Animate.d.ts.map