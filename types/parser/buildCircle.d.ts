import { type PARSER } from "piparser";
import { AbstractFigure } from "../figures/AbstractFigure";
import { type IArcConfig } from "../figures/Arc";
import { type ICircleConfig } from "../figures/Circle";
import { type IGraphConfig } from "../pidraw.common";
export declare function buildCircle(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ICircleConfig | IArcConfig | null;
export declare function buildArc(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ICircleConfig | IArcConfig | null;
//# sourceMappingURL=buildCircle.d.ts.map