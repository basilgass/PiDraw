import { Marker, Svg } from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js';
import { COORDINATE_SYSTEM, type DOMAIN, type IGraphConfig, type IGraphConstructorConfig, type IGraphDisplay, type ILayers, type XY } from "./pidraw.common";
import { type IPointConfig, Point } from "./figures/Point";
import { type ILineConfig, Line } from "./figures/Line";
import { type IPlotConfig, Plot } from "./figures/Plot";
import { AbstractFigure } from "./figures/AbstractFigure";
import { Circle, type ICircleConfig } from "./figures/Circle";
import { type IPolygonConfig, Polygon } from "./figures/Polygon";
import { Arc, type IArcConfig } from "./figures/Arc";
import { type IParametricConfig, Parametric } from "./figures/Parametric";
import { type IFollowConfig } from "./figures/Follow";
import { type IFillBetweenConfig } from "./figures/FillBetween";
import { type IRiemannConfig } from "./figures/Riemann";
import { Path } from "./figures/Path";
import { Bezier, type IBezierConfig } from "./figures/Bezier";
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
    get config(): IGraphConfig;
    set config(value: IGraphConfig);
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
    get display(): IGraphDisplay;
    set display(value: IGraphDisplay);
    get figures(): Record<string, AbstractFigure>;
    get layers(): ILayers;
    get rootSVG(): Svg;
    get toTex(): (value: string) => string;
    clear(): void;
    coordinate_system(system: COORDINATE_SYSTEM): AbstractFigure;
    draggable(figure: AbstractFigure, options?: IDraggableConfig): AbstractFigure;
    follow(value: string, obj: AbstractFigure): (x: number, y: number) => XY;
    grid(name: string, gridConfig: {
        x: XY;
        y: XY;
    }): AbstractFigure;
    marker(scale: number): {
        start: Marker;
        end: Marker;
    };
    subgrid(name: string, subdivision: number): AbstractFigure;
    toPixels<T>(pixels: T, axis?: 'x' | 'y'): T;
    update(except?: string[], forceUpdate?: boolean): void;
    updateLayout(): void;
}
//# sourceMappingURL=Graph.d.ts.map