import type { IGraphConfig, XY } from "../pidraw.common";
import { type CircleDefinition } from "../calculus";
import type { CircleRadius, ICircleConfig } from "./Circle.types";
type Constructions = 'radius' | 'through' | 'tangent' | 'diameter' | 'inscribed';
export declare function positions<T extends Record<string, unknown>>(values: T, what: string): {
    [K in keyof T]: XY;
};
export declare function radiusOf(radius: CircleRadius, center: XY, graph: IGraphConfig): number;
export declare function constructionOf(config: ICircleConfig, name: string): Constructions;
export declare function resolveConstraint(construction: Constructions, config: ICircleConfig, graph: IGraphConfig): CircleDefinition;
export {};
//# sourceMappingURL=Circle.constraints.d.ts.map