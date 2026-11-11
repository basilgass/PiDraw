import type { G } from "@svgdotjs/svg.js";
import type { IControlsGraph } from "./controls/controls.types";
import type { IMeasure, TickSelection } from "./calculus";
import type { IGridConfig } from "./figures/Grid/Grid.types";
import type { Point } from "./figures/Point/Point";
import type { AbstractFigure } from "./figures/AbstractFigure/AbstractFigure";
import type { Graph } from "./Graph";
import type { AxisVectors, CoordinateSystem, IGraphConfig, LayerName, XY } from "./pidraw.common";
export type TeXConverterType = (value: string) => string;
export type Layers = Record<LayerName, G>;
export interface IGraphDragEvent {
    graph: Graph;
    figure: AbstractFigure;
    target: Point;
}
export interface IGraphMove extends IGraphUpdate {
    snapped: XY | null;
}
export interface IGraphUpdate {
    updated: number;
    total: number;
}
export interface IGraphDragMoveEvent extends IGraphDragEvent, IGraphMove {
}
export interface IGraphController {
    dispose(): void;
    onFiguresRemoved?(names: string[]): void;
    onFigureChanged?(name: string): void;
    onControlsChanged?(key: keyof IControlsGraph): void;
    onLayoutChanged?(config: IGraphConfig): void;
}
export interface IGraphEventMap {
    'dragstart': IGraphDragEvent;
    'dragmove': IGraphDragMoveEvent;
    'dragend': IGraphDragEvent;
}
export interface IAxisDisplay {
    step?: number;
    labels?: 'numbers' | 'pi';
    name?: string;
    marks?: TickSelection;
    numbers?: TickSelection | 'none';
    padding?: number;
    range?: {
        min: number;
        max: number;
    };
}
export interface IGraphDisplay {
    axis?: boolean | {
        x: IAxisDisplay | false;
        y: IAxisDisplay | false;
    };
    grid?: boolean | IGridConfig;
}
export interface IGraphConstructorConfig {
    axis?: AxisVectors;
    display?: IGraphDisplay;
    height?: number;
    measure?: Partial<IMeasure>;
    origin?: XY;
    system?: CoordinateSystem;
    tex?: TeXConverterType;
    width?: number;
}
//# sourceMappingURL=Graph.types.d.ts.map