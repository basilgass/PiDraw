import type { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
import type { Graph } from "../Graph";
import type { IGraphController } from "../Graph.types";
import type { IControlsGraph } from "../controls/controls.types";
import type { IButton, IButtonDefinitions, IButtonsEventMap, IFigureToggle } from "./Buttons.types";
export declare class Buttons extends EventTarget implements IGraphController {
    protected _graph: Graph;
    protected _definitions: IButtonDefinitions;
    protected _active: Set<string>;
    protected _fades: Map<string, number>;
    protected _disposed: boolean;
    constructor(graph: Graph);
    get buttons(): IButton[];
    isActive(id: string): boolean;
    toggle(id: string): void;
    reset(): void;
    onFigureChanged(name: string): void;
    onControlsChanged(key: keyof IControlsGraph): void;
    onFiguresRemoved(names: string[]): void;
    dispose(): void;
    on<K extends keyof IButtonsEventMap>(event: K, handler: (e: CustomEvent<IButtonsEventMap[K]>) => void): this;
    off<K extends keyof IButtonsEventMap>(event: K, handler: (e: CustomEvent<IButtonsEventMap[K]>) => void): this;
    protected _check(id: string): void;
    protected _emit(toggled: string | null): void;
    protected _figuresOf(id: string): AbstractFigure[];
    protected _shown({ id, hidden }: IFigureToggle): boolean;
    protected _applyAll(animate?: boolean): void;
    protected _apply(figure: AbstractFigure, animate: boolean): void;
    protected _fade(figure: AbstractFigure, shown: boolean, duration: number): void;
    protected _stopFade(name: string): void;
}
//# sourceMappingURL=Buttons.d.ts.map