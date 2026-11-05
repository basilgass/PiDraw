import type { Domain, IGraphConfig, XY } from "../pidraw.common";
export interface ViewWindow {
    x: Pick<Domain, 'min' | 'max'>;
    y: Pick<Domain, 'min' | 'max'>;
}
export declare const ZOOM_LIMITS: {
    min: number;
    max: number;
};
export declare function zoomLayout(config: IGraphConfig, factor: number, center: XY): IGraphConfig;
export declare function moveLayout(config: IGraphConfig, delta: XY): IGraphConfig;
export declare function windowLayout(config: IGraphConfig, window: ViewWindow): IGraphConfig;
export declare function visibleWindow(config: IGraphConfig): ViewWindow;
export declare function zoomRatio(config: IGraphConfig, home: IGraphConfig): XY;
export declare function boundedFactor(factor: number, ratio: XY, limits?: {
    min: number;
    max: number;
}): number;
//# sourceMappingURL=computeZoom.d.ts.map