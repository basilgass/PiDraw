import { Marker, Svg } from '@svgdotjs/svg.js';
import { COORDINATE_SYSTEM, DOMAIN, IGraphConfig, IGraphConstructorConfig, IGraphDisplay, ILayers, XY } from './pidraw.common';
import { IPointConfig, Point } from './figures/Point';
import { ILineConfig, Line } from './figures/Line';
import { IPlotConfig, Plot } from './figures/Plot';
import { AbstractFigure } from './figures/AbstractFigure';
import { Circle, ICircleConfig } from './figures/Circle';
import { Polygon, IPolygonConfig } from './figures/Polygon';
import { Arc, IArcConfig } from './figures/Arc';
import { IParametricConfig, Parametric } from './figures/Parametric';
import { IFollowConfig } from './figures/Follow';
import { IFillBetweenConfig } from './figures/FillBetween';
import { IRiemannConfig } from './figures/Riemann';

export type IDraggableFollow = ((x: number, y: number) => XY) | AbstractFigure | string;
export interface IDraggableConfig {
    grid?: boolean;
    bounds?: {
        x?: DOMAIN;
        y?: DOMAIN;
    };
    follow?: (IDraggableFollow)[];
    callback?: (figure: AbstractFigure) => void;
}
export declare class Graph {
    #private;
    constructor(id: string | HTMLElement, config?: IGraphConstructorConfig);
    get rootSVG(): Svg;
    get figures(): Record<string, AbstractFigure>;
    get config(): IGraphConfig;
    set config(value: IGraphConfig);
    get display(): IGraphDisplay;
    set display(value: IGraphDisplay);
    get toTex(): (value: string) => string;
    get layers(): ILayers;
    grid(name: string, gridConfig: {
        x: XY;
        y: XY;
    }): AbstractFigure;
    subgrid(name: string, subdivision: number): AbstractFigure;
    coordinate_system(system: COORDINATE_SYSTEM): AbstractFigure;
    marker(scale: number): {
        start: Marker;
        end: Marker;
    };
    toPixels<T>(pixels: T, axis?: 'x' | 'y' | undefined): T;
    get create(): {
        point: (coordinates: XY | IPointConfig, name: string, label?: {
            html: boolean;
        }) => Point;
        line: (constraints: ILineConfig, name: string) => Line;
        plot: (constraints: IPlotConfig, name: string) => Plot;
        parametric: (constraints: IParametricConfig, name: string) => Parametric;
        circle: (constraints: ICircleConfig, name: string) => Circle;
        polygon: (values: IPolygonConfig, name: string) => Polygon;
        arc: (values: IArcConfig, name: string) => Arc;
        follow: (values: IFollowConfig, name: string) => AbstractFigure;
        fillbetween: (values: IFillBetweenConfig, name: string) => AbstractFigure;
        riemann: (values: IRiemannConfig, name: string) => AbstractFigure;
    };
    draggable(figure: AbstractFigure, target: AbstractFigure, options?: IDraggableConfig): AbstractFigure;
    clear(): void;
    updateLayout(): void;
    update(except?: string[], forceUpdate?: boolean): void;
    follow(value: string, obj: AbstractFigure): (x: number, y: number) => XY;
}
