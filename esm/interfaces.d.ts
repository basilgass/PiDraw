export interface IDrawConfigWidthHeight {
    width: number;
    height: number;
}
export interface IDrawConfigUnitWidthHeight {
    dx: number;
    dy: number;
    pixelsPerUnit: number;
}
export interface IDrawConfigUnitMinMax {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    pixelsPerUnit: number;
}
export declare type DrawConfig = IDrawConfigWidthHeight | IDrawConfigUnitWidthHeight | IDrawConfigUnitMinMax;
export declare function isDrawConfigWidthHeight(config: any): config is IDrawConfigWidthHeight;
export declare function isDrawConfigUnitWidthHeight(config: any): config is IDrawConfigUnitWidthHeight;
export declare function isDrawConfigUnitMinMax(config: any): config is IDrawConfigUnitMinMax;
export declare function isXY(config: any): config is IPoint;
export interface IPoint {
    x: number;
    y: number;
}
