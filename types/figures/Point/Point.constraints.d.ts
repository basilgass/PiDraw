import type { XY, IGraphConfig } from "../../pidraw.common";
import { type NodeShape } from "../../calculus";
import type { IPointConfig, IPointOptions, PointConstraints, PointCoordinateType } from "./Point.types";
export declare function nodeOf(config: Pick<IPointOptions, 'node' | 'shape' | 'size'>, name: string): NodeShape | null;
export declare function constraintOf(config: IPointConfig, name: string): keyof PointConstraints;
export declare function resolveConstraint(key: keyof PointConstraints, config: IPointConfig, graph: IGraphConfig): XY;
export declare function coordinateToNumber(coord: PointCoordinateType): number;
//# sourceMappingURL=Point.constraints.d.ts.map