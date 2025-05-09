import { Graph } from './Graph';
export declare enum LOOP_STYLE {
    RESET = "reset",
    REVERSE = "reverse",
    NONE = "none"
}
export declare class Animate {
    #private;
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
