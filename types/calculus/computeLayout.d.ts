import { type Domain, type IGraphConfig, type XY } from "../pidraw.common";
import type { IGraphConstructorConfig, IGraphDisplay } from "../Graph.types";
export declare const PX_PER_CM: number;
export declare function resolveGraphConfig(config?: IGraphConstructorConfig): {
    config: IGraphConfig;
    display: IGraphDisplay;
};
export declare function checkGraphConfig(config: IGraphConfig): void;
export interface LayoutSpec {
    x: Pick<Domain, 'min' | 'max'>;
    y: Pick<Domain, 'min' | 'max'>;
    unit: {
        x: number;
        y: number;
    };
}
export interface LayoutGeometry {
    width: number;
    height: number;
    origin: XY;
    axis: {
        x: XY;
        y: XY;
    };
}
export declare function layoutGeometry({ x, y, unit }: LayoutSpec): LayoutGeometry;
export declare const EDGE_MARGIN = 2;
export interface AxisPlacement {
    A: XY;
    displaced: boolean;
    side: 'left' | 'right';
}
export declare function axisPlacement(origin: XY, width: number, height: number, axis: {
    x: XY;
    y: XY;
}): {
    x: AxisPlacement;
    y: AxisPlacement;
};
//# sourceMappingURL=computeLayout.d.ts.map