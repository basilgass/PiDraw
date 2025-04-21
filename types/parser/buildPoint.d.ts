import { type PARSER } from "piparser";
import { AbstractFigure } from "../figures/AbstractFigure";
import { type IPointConfig } from "../figures/Point";
import { type IGraphConfig } from "../pidraw.common";
export declare function buildPoint(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPointConfig | {
    x: number;
    y: number;
} | null;
//# sourceMappingURL=buildPoint.d.ts.map