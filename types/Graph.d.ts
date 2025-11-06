import { Svg } from '@svgdotjs/svg.js';
import { COORDINATE_SYSTEM, DOMAIN, IGraphConfig, IGraphConstructorConfig, IGraphDisplay, ILayers, XY } from './pidraw.common';
import { IPointConfig, Point } from './figures/Point';
import { ILineConfig, Line } from './figures/Line';
import { IPlotConfig, Plot } from './figures/Plot';
import { AbstractFigure } from './figures/AbstractFigure';
import { Circle, ICircleConfig } from './figures/Circle';
import { IPolygonConfig, Polygon } from './figures/Polygon';
import { Arc, IArcConfig } from './figures/Arc';
import { IParametricConfig, Parametric } from './figures/Parametric';
import { IFollowConfig } from './figures/Follow';
import { IFillBetweenConfig } from './figures/FillBetween';
import { IRiemannConfig } from './figures/Riemann';
import { Path } from './figures/Path';
import { Bezier, IBezierConfig } from './figures/Bezier';
import { Animate } from './Animate';
export type IDraggableFollow = ((x: number, y: number) => XY) | AbstractFigure | string;
export interface IDraggableConfig {
    bounds?: {
        x?: DOMAIN;
        y?: DOMAIN;
    };
    callback?: (figure: AbstractFigure) => void;
    follow?: (IDraggableFollow)[];
    grid?: boolean;
    target?: AbstractFigure;
}
export declare class Graph {
    #private;
    constructor(id: string | HTMLElement, config?: IGraphConstructorConfig);
    protected _config: IGraphConfig;
    get config(): IGraphConfig;
    set config(value: IGraphConfig);
    protected _display: IGraphDisplay;
    get display(): IGraphDisplay;
    set display(value: IGraphDisplay);
    protected _figures: Record<string, AbstractFigure>;
    get figures(): Record<string, AbstractFigure>;
    protected _layers: ILayers;
    get layers(): ILayers;
    protected _rootSVG: Svg;
    get rootSVG(): Svg;
    protected _toTex: (value: string) => string;
    get toTex(): (value: string) => string;
    get create(): {
        point: (coordinates: XY | IPointConfig, name: string, label?: {
            html: boolean;
        }) => Point;
        line: (constraints: ILineConfig, name: string) => Line;
        path: (constraints: string, name: string) => Path;
        bezier: (constraints: IBezierConfig, name: string) => Bezier;
        plot: (constraints: IPlotConfig, name: string) => Plot;
        parametric: (constraints: IParametricConfig, name: string) => Parametric;
        circle: (constraints: ICircleConfig, name: string) => Circle;
        polygon: (values: IPolygonConfig, name: string) => Polygon;
        arc: (values: IArcConfig, name: string) => Arc;
        follow: (values: IFollowConfig, name: string) => AbstractFigure;
        fillbetween: (values: IFillBetweenConfig, name: string) => AbstractFigure;
        riemann: (values: IRiemannConfig, name: string) => AbstractFigure;
    };
    get animation(): Animate;
    clear(): void;
    coordinate_system(system: COORDINATE_SYSTEM): AbstractFigure;
    draggable(figure: AbstractFigure, options?: IDraggableConfig): AbstractFigure;
    follow(value: string, obj: AbstractFigure): (x: number, y: number) => XY;
    grid(name: string, gridConfig: {
        x: XY;
        y: XY;
    }): AbstractFigure;
    subgrid(name: string, subdivision: number): AbstractFigure;
    toPixels<T>(pixels: T, axis?: 'x' | 'y'): T;
    toCoordinates<T>(pixels: T, axis?: 'x' | 'y'): T;
    update(except?: string[], forceUpdate?: boolean): void;
    updateLabels(except: string[], forceUpdate?: boolean): void;
    updateLayout(): void;
}
