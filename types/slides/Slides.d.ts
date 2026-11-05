import type { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
import type { Graph } from "../Graph";
import type { IGraphController } from "../Graph.types";
import type { ISlideTitles, ISlidesEventMap, ISlidesOptions, ISlidesState } from "./Slides.types";
export declare class Slides extends EventTarget implements IGraphController {
    protected _graph: Graph;
    protected _least: number;
    protected _current: number;
    protected _count: number;
    protected _disposed: boolean;
    protected _titles: ISlideTitles;
    constructor(graph: Graph, options?: ISlidesOptions);
    get current(): number;
    get count(): number;
    get title(): string | null;
    titleOf(step: number): string | null;
    get titles(): ISlideTitles;
    get state(): ISlidesState;
    next(): void;
    previous(): void;
    first(): void;
    last(): void;
    goto(step: number): void;
    onFigureChanged(name: string): void;
    onControlsChanged(key: string): void;
    onFiguresRemoved(): void;
    dispose(): void;
    on<K extends keyof ISlidesEventMap>(event: K, handler: (e: CustomEvent<ISlidesEventMap[K]>) => void): this;
    off<K extends keyof ISlidesEventMap>(event: K, handler: (e: CustomEvent<ISlidesEventMap[K]>) => void): this;
    protected _emit(): void;
    protected _countOfFigures(): number;
    protected _apply(figure: AbstractFigure): void;
    protected _applyAll(): void;
    protected _show(step: number): void;
    protected _sync(): void;
}
//# sourceMappingURL=Slides.d.ts.map