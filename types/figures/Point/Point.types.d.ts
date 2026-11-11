import type { Exclusive, XY } from "../../pidraw.common";
import type { NodeAnchor, NodeShape } from "../../calculus";
import type { Circle } from "../Circle/Circle";
import type { Line } from "../Line/Line";
import type { Plot } from "../Plot/Plot";
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
    anchor: {
        node: Point;
        position: NodeAnchor;
    };
}
export type PointConstraint = Exclusive<PointConstraints>;
export interface IPointOptions {
    shape?: PointShape;
    size?: number;
    node?: NodeShape;
}
export type IPointConfig = PointConstraint & IPointOptions;
export type IPointResolvedConfig = IPointConfig & Required<Pick<IPointOptions, 'shape' | 'size'>>;
//# sourceMappingURL=Point.types.d.ts.map