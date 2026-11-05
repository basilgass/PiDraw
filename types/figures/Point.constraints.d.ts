import type { XY, IGraphConfig } from "../pidraw.common";
import type { IPointConfig, PointConstraints, PointCoordinateType } from "./Point.types";
export declare function constraintOf(config: IPointConfig, name: string): keyof PointConstraints;
export declare function resolveConstraint(key: keyof PointConstraints, config: IPointConfig, graph: IGraphConfig): XY;
export declare function coordinateToNumber(coord: PointCoordinateType): number;
//# sourceMappingURL=Point.constraints.d.ts.map