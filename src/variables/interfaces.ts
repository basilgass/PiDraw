import {Circle, G, Line, Path, Shape} from "@svgdotjs/svg.js";
import {Point} from "../figures/Point";
import {GRIDTYPE} from "./enums";

export interface IDrawConfig {
    origin?: {
        x: number,
        y: number
    },
    grid?: {
        x: number,
        y: number,
        type?: GRIDTYPE
    }
}

export interface IDrawConfigWidthHeight extends IDrawConfig {
    width: number,
    height: number,
}

export interface IDrawConfigUnitWidthHeight extends IDrawConfig {
    dx: number,
    dy: number,
    pixelsPerUnit: number
}

export interface IDrawConfigUnitMinMax extends IDrawConfig {
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number,
    pixelsPerUnit: number
}

export interface ILayers {
    background: G,
    grids: G,
    axis: G,
    main: G,
    plots: G,
    foreground: G,
    points: G
}

export interface plotConfig {
    domain: { min: number, max: number },
    samples: number
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


export interface ConstructionSettings {
    rule: string,
    point?: Point,
    k?: number
}

export interface gridConfig {
    axisX: number,
    axisY: number,
    type: GRIDTYPE
}

