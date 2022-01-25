export interface IDrawConfigWidthHeight {
    width: number,
    height: number,
}
export interface IDrawConfigUnitWidthHeight {
    dx: number,
    dy: number,
    pixelsPerUnit: number
}
export interface IDrawConfigUnitMinMax {
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number,
    pixelsPerUnit: number
}

export type DrawConfig = IDrawConfigWidthHeight | IDrawConfigUnitWidthHeight | IDrawConfigUnitMinMax
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