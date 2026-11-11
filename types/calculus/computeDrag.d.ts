import type { Domain, IGraphConfig, XY } from "../pidraw.common";
export interface DragRules {
    along?: {
        axis: 'x' | 'y';
        keep: XY;
    };
    bounds?: {
        x?: Domain;
        y?: Domain;
    };
    step?: {
        x: number;
        y: number;
    };
}
export declare function snapCandidates<T extends XY>(position: XY, candidates: readonly T[], radius: number): T[];
export declare function constrainDrag(position: XY, rules: DragRules, config: IGraphConfig): XY;
//# sourceMappingURL=computeDrag.d.ts.map