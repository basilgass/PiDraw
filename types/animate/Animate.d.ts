import type { Graph } from "../Graph";
import type { IGraphController } from "../Graph.types";
import { Point } from "../figures/Point/Point";
import type { IAnimateEventMap } from "./Animate.types";
import { LoopStyle } from "./Animate.types";
interface AnimationParams {
    point: Point;
    start: Point;
    end: Point;
    reversed: boolean;
    duration: number;
    delay: number;
    ease: (t: number) => number;
    loop: LoopStyle;
    elapsed: number;
}
export declare class Animate extends EventTarget implements IGraphController {
    protected _graph: Graph;
    protected _animatedPoints: Point[];
    protected _last: number | null;
    protected _paused: boolean;
    protected _rafId: number | null;
    protected _resetTimer: ReturnType<typeof setTimeout> | null;
    protected _animations: Map<string, AnimationParams>;
    constructor(graph: Graph);
    start(): void;
    pause(): void;
    restart(): void;
    stop(): void;
    dispose(): void;
    onFiguresRemoved(names: string[]): void;
    isRunning(): boolean;
    isPaused(): boolean;
    canBeAnimated(): boolean;
    on<K extends keyof IAnimateEventMap>(event: K, handler: (e: CustomEvent<IAnimateEventMap[K]>) => void): this;
    off<K extends keyof IAnimateEventMap>(event: K, handler: (e: CustomEvent<IAnimateEventMap[K]>) => void): this;
    protected _emit(event: keyof IAnimateEventMap): void;
    protected _begin(): void;
    protected _halt(): void;
    protected _updatePoints(): Point[];
    protected _step: (now: number) => void;
}
export {};
//# sourceMappingURL=Animate.d.ts.map