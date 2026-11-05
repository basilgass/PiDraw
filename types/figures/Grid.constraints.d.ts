import type { IGridConfig } from "./Grid.types";
export declare const DEFAULT_STEP: {
    x: number;
    y: number;
};
export declare const MAX_SUBDIVISIONS = 20;
export declare const MIN_SPACING = 3;
export declare function stepOf(config: IGridConfig): {
    x: number;
    y: number;
};
export declare function checkGrid(config: IGridConfig, name: string): void;
//# sourceMappingURL=Grid.constraints.d.ts.map