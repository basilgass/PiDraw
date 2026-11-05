import type { Domain } from "../pidraw.common";
export interface RiemannRectangle {
    x0: number;
    x1: number;
    y: number;
}
export declare function riemannRectangles(valueAt: (x: number) => number, domain: Domain, rectangles: number, position: number): RiemannRectangle[];
export declare function riemannSum(rectangles: RiemannRectangle[]): number;
//# sourceMappingURL=computeRiemann.d.ts.map