import type { IGraphConfig, XY } from "../pidraw.common";
import type { CircleRadius } from "./Circle/Circle.types";
export declare function singleConstraint<K extends string>(config: Partial<Record<K, unknown>>, keys: readonly K[], name: string, kind: string): K;
export declare function constraintIn<K extends string>(resolvers: Record<K, unknown>, config: Partial<Record<NoInfer<K>, unknown>>, name: string, kind: string): K;
export declare function resolveIn<K extends string, R, E>(resolvers: Record<K, (value: never, extra: E) => R>, key: K, config: Partial<Record<NoInfer<K>, unknown>>, extra: E): R;
export declare function positions<T extends Record<string, unknown>>(values: T, what: string): {
    [K in keyof T]: XY;
};
export declare function positionList(values: readonly unknown[], what: string): XY[];
export declare function radiusOf(radius: CircleRadius, center: XY, graph: IGraphConfig): number;
//# sourceMappingURL=constraints.d.ts.map