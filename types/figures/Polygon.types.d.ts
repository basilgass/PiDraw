import type { Exclusive, XY } from "../pidraw.common";
export type PolygonRadius = number | {
    point1: XY;
    point2: XY;
};
export type PolygonVertices = XY[];
export interface PolygonRegular {
    center: XY;
    radius: PolygonRadius;
    sides: number;
    star?: number;
}
export interface PolygonOnSide {
    A: XY;
    B: XY;
    sides: number;
    star?: number;
}
export interface PolygonConstraints {
    vertices: PolygonVertices;
    regular: PolygonRegular;
    onSide: PolygonOnSide;
}
export type IPolygonConfig = Exclusive<PolygonConstraints>;
//# sourceMappingURL=Polygon.types.d.ts.map