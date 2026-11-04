import { type Svg } from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js';
import { type Domain, type IFigureContext, type IGraphConfig, LayerName, type XY } from "./pidraw.common";
import type { IAxisDisplay, IGraphConstructorConfig, IGraphController, IGraphDisplay, IGraphEventMap, IGraphUpdate, Layers, TeXConverterType } from "./Graph.types";
import { Point } from "./figures/Point/Point";
import type { IPointConfig } from "./figures/Point/Point.types";
import { Line } from "./figures/Line/Line";
import { Plot } from "./figures/Plot/Plot";
import { type AxisPlacement } from "./calculus";
import { AbstractFigure } from "./figures/AbstractFigure/AbstractFigure";
import { Circle } from "./figures/Circle/Circle";
import { Polygon } from "./figures/Polygon/Polygon";
import { Grid } from "./figures/Grid/Grid";
import { Arc } from "./figures/Arc/Arc";
import { Axis } from "./figures/Axis/Axis";
import { Parametric } from "./figures/Parametric/Parametric";
import { Follow } from "./figures/Follow/Follow";
import { FillBetween } from "./figures/FillBetween/FillBetween";
import { Riemann } from "./figures/Riemann/Riemann";
import { Path } from "./figures/Path/Path";
import { Bezier } from "./figures/Bezier/Bezier";
export type IDraggableFollow = ((x: number, y: number) => XY) | AbstractFigure;
export interface IDraggableConfig {
    along?: 'x' | 'y';
    bounds?: {
        x?: Domain;
        y?: Domain;
    };
    callback?: (point: Point) => void;
    follow?: IDraggableFollow[];
    grid?: boolean;
    target?: Point;
}
interface ILayoutFigures {
    axes: {
        x: Axis;
        y: Axis;
    };
    drawn: {
        x: Axis;
        y: Axis;
    };
}
export declare class Graph extends EventTarget {
    protected _controllers: IGraphController[];
    protected _layout: ILayoutFigures;
    protected _decor: AbstractFigure[];
    protected _lines: Map<string, Axis>;
    protected _held: Set<AbstractFigure>;
    protected _drags: Map<Point, {
        figure: Point;
        options: IDraggableConfig;
    }>;
    protected _total: number;
    protected _links: Map<AbstractFigure, {
        config: object;
        dependencies: AbstractFigure[];
    }>;
    protected _dependents: Map<AbstractFigure, AbstractFigure[]> | null;
    constructor(id: string | HTMLElement, config?: IGraphConstructorConfig);
    protected _wrapper: HTMLElement;
    protected _config: IGraphConfig;
    get config(): IGraphConfig;
    protected _display: IGraphDisplay;
    get display(): IGraphDisplay;
    protected _figures: Record<string, AbstractFigure>;
    get figures(): Record<string, AbstractFigure>;
    protected _layers: Layers;
    get layers(): Layers;
    protected _rootSVG: Svg;
    get rootSVG(): Svg;
    protected _toTex: TeXConverterType | undefined;
    get toTex(): TeXConverterType | undefined;
    get create(): {
        point: (coordinates: XY | IPointConfig, name: string, label?: {
            html: boolean;
        }) => Point;
        line: (config: import(".").ILineConfig, name: string) => Line;
        path: (config: import(".").IPathConfig, name: string) => Path;
        bezier: (config: import(".").IBezierConfig, name: string) => Bezier;
        plot: (config: import(".").IPlotConfig, name: string) => Plot;
        parametric: (config: import(".").IParametricConfig, name: string) => Parametric;
        circle: (config: import(".").ICircleConfig, name: string) => Circle;
        polygon: (config: import(".").IPolygonConfig, name: string) => Polygon;
        arc: (config: import(".").IArcConfig, name: string) => Arc;
        follow: (config: import(".").IFollowConfig, name: string) => Follow;
        fillbetween: (config: import(".").IFillBetweenConfig, name: string) => FillBetween;
        grid: (config: import(".").IGridConfig | undefined, name: string) => Grid;
        axis: (config: import(".").IAxisConfig, name: string) => Axis;
        riemann: (config: import(".").IRiemannConfig, name: string) => Riemann;
    };
    protected _mainGrid: Grid | null;
    get mainGrid(): Grid | null;
    get axes(): {
        x: Axis;
        y: Axis;
    };
    get drawnAxes(): {
        x: Axis;
        y: Axis;
    };
    remove(name: string, options?: {
        cascade?: boolean;
    }): string[];
    attach<T extends IGraphController>(controller: T): T;
    clear(): void;
    protected _notifyRemoved(names: string[]): void;
    dispose(): void;
    handle(target: Point, options?: IDraggableConfig): Point;
    dragTo(point: Point, pixels: XY): void;
    protected _dragMove(figure: Point, options: IDraggableConfig, mouse: XY): IGraphUpdate | null;
    draggable(figure: Point, options?: IDraggableConfig): Point;
    toPixels(value: number, axis?: 'x' | 'y'): number;
    toPixels(value: Domain, axis?: 'x' | 'y'): Domain;
    toPixels(value: XY): XY;
    toCoordinates(value: number, axis?: 'x' | 'y'): number;
    toCoordinates(value: Domain, axis?: 'x' | 'y'): Domain;
    toCoordinates(value: XY): XY;
    update(changed?: AbstractFigure | readonly AbstractFigure[], forceUpdate?: boolean): IGraphUpdate;
    updateLayout(config?: IGraphConfig, display?: IGraphDisplay): void;
    on<K extends keyof IGraphEventMap>(event: K, handler: (e: CustomEvent<IGraphEventMap[K]>) => void): this;
    off<K extends keyof IGraphEventMap>(event: K, handler: (e: CustomEvent<IGraphEventMap[K]>) => void): this;
    tikz(): string;
    tikzPreamble(): string;
    protected _fitSvg(): void;
    protected _emit<K extends keyof IGraphEventMap>(event: K, detail: IGraphEventMap[K]): void;
    protected _refresh(figure: AbstractFigure, forceUpdate?: boolean): boolean;
    protected _gridStep(): {
        x: number;
        y: number;
    };
    protected _checkDraggable(figure: unknown, options: IDraggableConfig): void;
    protected _detach(figure: AbstractFigure): void;
    protected _dependentsMap(): Map<AbstractFigure, AbstractFigure[]>;
    protected _affectedBy(sources: readonly AbstractFigure[]): AbstractFigure[];
    protected _clearLayout(): void;
    protected _makeLayout(): ILayoutFigures;
    protected _makeLayoutAxis(name: string, d: XY, display: IAxisDisplay | false, where: AxisPlacement): {
        line: Axis;
        drawn: Axis;
    };
    protected _makeAxis(name: string, d: XY, A: XY, display: IAxisDisplay | false, side: 'left' | 'right', kept?: boolean): Axis;
    protected _decorate<F extends AbstractFigure>(figure: F, layer: LayerName): F;
    protected _maker<C, F extends AbstractFigure>(Figure: new (context: IFigureContext, name: string, config: C) => F, layer: LayerName): (config: C, name: string) => F;
    protected _make<F extends AbstractFigure>(name: string, layer: LayerName, build: () => F): F;
    protected _checkName(name: string): void;
}
export {};
//# sourceMappingURL=Graph.d.ts.map