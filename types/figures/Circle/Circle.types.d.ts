import type { XY } from "../../pidraw.common";
import type { Line } from "../Line/Line";
export type CircleRadius = number | XY | {
    point1: XY;
    point2: XY;
};
export interface CircleByRadius {
    center: XY;
    radius: CircleRadius;
}
export interface CircleThrough {
    through: {
        A: XY;
        B: XY;
        C: XY;
    };
}
export interface CircleTangent {
    tangent: {
        center: XY;
        to: Line;
    };
}
export interface CircleDiameter {
    diameter: {
        A: XY;
        B: XY;
    };
}
export interface CircleInscribed {
    inscribed: {
        A: XY;
        B: XY;
        C: XY;
    };
}
export type CircleKeys = keyof (CircleByRadius & CircleThrough & CircleTangent & CircleDiameter & CircleInscribed);
export type CircleOnly<T> = T & Partial<Record<Exclude<CircleKeys, keyof T>, never>>;
export type ICircleConfig = CircleOnly<CircleByRadius> | CircleOnly<CircleThrough> | CircleOnly<CircleTangent> | CircleOnly<CircleDiameter> | CircleOnly<CircleInscribed>;
//# sourceMappingURL=Circle.types.d.ts.map