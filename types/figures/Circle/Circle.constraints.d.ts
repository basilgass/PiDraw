import type { IGraphConfig } from "../../pidraw.common";
import { type CircleDefinition } from "../../calculus";
import type { ICircleConfig } from "./Circle.types";
type Constructions = 'radius' | 'through' | 'tangent' | 'diameter' | 'inscribed';
export declare function constructionOf(config: ICircleConfig, name: string): Constructions;
export declare function resolveConstraint(construction: Constructions, config: ICircleConfig, graph: IGraphConfig): CircleDefinition;
export {};
//# sourceMappingURL=Circle.constraints.d.ts.map