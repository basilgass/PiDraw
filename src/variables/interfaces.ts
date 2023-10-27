import {G} from "@svgdotjs/svg.js";
import {GRIDTYPE} from "./enums";

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


export function isDrawConfigWidthHeight(config: any): config is IDrawConfigWidthHeight {
    return config && 'width' in config
}

export function isDrawConfigUnitWidthHeight(config: any): config is IDrawConfigUnitWidthHeight {
    return config && 'dx' in config
}

export function isDrawConfigUnitMinMax(config: any): config is IDrawConfigUnitMinMax {
    return config && 'xMin' in config
}

export function isXY(config: any): config is IPoint {
    return config && 'x' in config && 'y' in config
}

export interface IPoint {
    x: number,
    y: number
}

