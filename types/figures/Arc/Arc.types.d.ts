import type { Exclusive, XY } from "../../pidraw.common";
import type { CircleRadius } from "../Circle/Circle.types";
export interface ArcByPoints {
    start: XY;
    center: XY;
    end: XY;
    radius?: CircleRadius;
}
export interface ArcByAngles {
    center: XY;
    radius: number;
    from: number;
    to: number;
}
export interface ArcByRotation {
    start: XY;
    center: XY;
    angle: number;
    radius?: CircleRadius;
}
export interface ArcConstraints {
    points: ArcByPoints;
    angles: ArcByAngles;
    rotation: ArcByRotation;
}
export interface ArcOptions {
    alternative?: boolean;
    sector?: boolean;
    square?: boolean;
}
export type IArcConfig = Exclusive<ArcConstraints> & ArcOptions;
//# sourceMappingURL=Arc.types.d.ts.map