import type { ViewWindow } from "../calculus/computeZoom";
export type { ViewWindow };
export type ZoomAllow = 'both' | 'zoom' | 'move';
export declare const ZOOM_ALLOWS: readonly ZoomAllow[];
export interface IZoomOptions {
    allow?: ZoomAllow;
    gestures?: boolean;
}
export interface IZoomEventMap {
    'change': ViewWindow;
    'navigation': boolean;
}
//# sourceMappingURL=Zoom.types.d.ts.map