import { Graph } from './Graph';
import { Point } from './figures/Point';
export declare enum LOOP_STYLE {
    RESET = "reset",
    REVERSE = "reverse",
    NONE = "none"
}
export declare class Animate {
    #private;
    protected _graph: Graph;
    protected _animatedPoints: Point[];
    protected _startTime: number;
    protected _elapsedAtPause: number;
    protected _paused: boolean;
    constructor(graph: Graph);
    start(): void;
    pause(): void;
    resume(): void;
    cancel(): void;
    isRunning(): boolean;
    isPaused(): boolean;
    canBeAnimated(): boolean;
}
export declare function getLoopStyle(loop: string | boolean | number): LOOP_STYLE;
