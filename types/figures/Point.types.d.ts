import type { Exclusive, XY } from "../pidraw.common";
import type { Circle } from "./Circle";
import type { Line } from "./Line";
import type { Plot } from "./Plot";
import type { Point } from "./Point";
export type PointCoordinateType = number | {
    point: Point;
    axis: 'x' | 'y';
} | {
    point1: Point;
    point2: Point;
};
export interface PointConfigCoordinates {
    x: PointCoordinateType;
    y: PointCoordinateType;
}
export type PointShape = 'circle' | 'square' | 'crosshair';
export interface PointConstraints {
    coordinates: PointConfigCoordinates;
    direction: {
        point: XY;
        direction: Line | {
            A: XY;
            B: XY;
        };
        distance: number;
        perpendicular?: boolean;
    };
    evaluation: {
        fx: Plot;
        x: PointCoordinateType;
    };
    intersection: {
        A: Line;
        B: Line;
    };
    intersectionBetweenCircles: {
        A: Circle;
        B: Circle;
        index: number;
    };
    intersectionWithCircle: {
        A: Circle;
        B: Line;
        index: number;
    };
    middle: {
        A: XY;
        B: XY;
    };
    projection: {
        axis: Line;
        point: XY;
    };
    symmetry: {
        A: XY;
        B: XY | Line;
    };
}
export type PointConstraint = Exclusive<PointConstraints>;
export interface IPointOptions {
    shape?: PointShape;
    size?: number;
}
export type IPointConfig = PointConstraint & IPointOptions;
export type IPointResolvedConfig = IPointConfig & Required<IPointOptions>;
//# sourceMappingURL=Point.types.d.ts.map