import type { XY } from "../pidraw.common";
import type { Line } from "./Line";
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
type Keys = keyof (CircleByRadius & CircleThrough & CircleTangent & CircleDiameter & CircleInscribed);
type Only<T> = T & Partial<Record<Exclude<Keys, keyof T>, never>>;
export type ICircleConfig = Only<CircleByRadius> | Only<CircleThrough> | Only<CircleTangent> | Only<CircleDiameter> | Only<CircleInscribed>;
export {};
//# sourceMappingURL=Circle.types.d.ts.map