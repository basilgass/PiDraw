import { G } from "@svgdotjs/svg.js"
import { POINTCONSTRAIN, GRIDTYPE, LABELPOS, LINECONSTRUCTION, BEZIERCONTROL } from "./enums"
import { Shape, Line as svgLine, Path, Circle } from "@svgdotjs/svg.js"

export type GraphConfig = IDrawConfigWidthHeight | IDrawConfigUnitWidthHeight | IDrawConfigUnitMinMax

export type svgShape = Shape | G | svgLine | Path | Circle

export type texConverterFunction = (text: string, options?: object) => string

export type plotFunction = (x: number) => number
export interface IDrawConfig {
    grid?: {
        x: number,
        y: number,
        type?: GRIDTYPE
    }
    origin?: {
        x: number,
        y: number
    },
}

export interface IDrawConfigWidthHeight extends IDrawConfig {
    height: number,
    width: number,
}

export interface IDrawConfigUnitWidthHeight extends IDrawConfig {
    dx: number,
    dy: number,
    pixelsPerUnit?: number
}

export interface IDrawConfigUnitMinMax extends IDrawConfig {
    pixelsPerUnit?: number
    xMax: number,
    xMin: number,
    yMax: number,
    yMin: number,
}

type DrawConfig = IDrawConfigWidthHeight | IDrawConfigUnitWidthHeight | IDrawConfigUnitMinMax

export interface ILayers {
    axis: G,
    background: G,
    foreground: G,
    grids: G,
    main: G,
    plots: G,
    plotsBG: G,
    plotsFG: G,
    points: G
}


export function isDrawConfigWidthHeight(config: unknown): config is IDrawConfigWidthHeight {
    return 'height' in (config as DrawConfig) && 'width' in (config as DrawConfig)
}

export function isDrawConfigUnitWidthHeight(config: unknown): config is IDrawConfigUnitWidthHeight {
    return 'dx' in (config as DrawConfig) && 'dy' in (config as DrawConfig)
}

export function isDrawConfigUnitMinMax(config: unknown): config is IDrawConfigUnitMinMax {
    return 'xMax' in (config as DrawConfig) &&
        'xMin' in (config as DrawConfig) &&
        'yMax' in (config as DrawConfig) &&
        'yMin' in (config as DrawConfig)
}

export function isPoint(config: unknown): config is IPoint {
    return 'x' in (config as IPoint) && 'y' in (config as IPoint)
}

export interface IPoint {
    x: number,
    y: number
}


export interface LineConfig {
    k?: number
    rule: LINECONSTRUCTION,
    value?: unknown,
    options?: unknown[]
}



export interface PointConfig {
    data?: unknown[]
    type: POINTCONSTRAIN,
}




export type BezierControlType = 'smooth' | 'min' | 'max' | 'flat' | 'vertical' | 'horizontal' | 'ah' | 'av' | 'h' | 'v'

export interface BezierPoint {
    point: IPoint,
    control: BEZIERCONTROL,
    ratio: number,
    c1?: { x: number, y: number, point?: unknown, segment?: unknown } | null,
    c2?: { x: number, y: number, point?: unknown, segment?: unknown } | null
}


export interface GridConfig {
    axisX: number,
    axisY: number,
    type: GRIDTYPE
}
export interface PlotConfig {
    domain?: { min: number, max: number },
    samples?: number,
    animate?: boolean
}

export interface pluginType {
    update: () => void,
    remove: () => void,
    clean: () => void
}



export interface LabelConfig {
    el?: unknown;
    name?: string;
    offset?: {
        x: number;
        y: number;
    };
    position?: {
        horizontal: LABELPOS;
        vertical: LABELPOS;
    };
    template?: string;
}



export interface IPlot {
    fx: plotFunction | undefined
    plugins: pluginType[]
    plot(fn: string | plotFunction, speed?: number): this
    getPartialPath(from: number, to: number, samples?: number, reversed?: boolean, firstToken?: string): string
    evaluate(x: number): IPoint
}
