import type { PARSER } from "piparser";
import type { TickSelection } from "../calculus";
import type { IAxisConfig } from "../figures/Axis.types";
import type { AbstractFigure } from "../figures/AbstractFigure";
import { type buildInterface, type IAxisDisplay } from "../pidraw.common";
import { type IParserParameters } from "./parser.common";
export interface IAxisParameters {
    axis?: IParserParameters;
    axisX?: IParserParameters;
    axisY?: IParserParameters;
    axisXname?: IParserParameters;
    axisYname?: IParserParameters;
}
export type IAxisExtra = Pick<IAxisDisplay, 'marks' | 'numbers' | 'padding'>;
export declare function parseSelection({ value, options }: IParserParameters, key: string, allowNone: true): TickSelection | 'none';
export declare function parseSelection({ value, options }: IParserParameters, key: string, allowNone: false): TickSelection;
export declare function splitAxisOptions(options: Record<string, IParserParameters>): {
    extra: IAxisExtra;
    style: Record<string, IParserParameters>;
};
export declare function buildAxes(parameters: IAxisParameters, extra?: {
    x?: IAxisExtra;
    y?: IAxisExtra;
}): {
    x: IAxisDisplay | false;
    y: IAxisDisplay | false;
};
export declare function buildAxis(item: PARSER, figures: Record<string, AbstractFigure>): buildInterface<IAxisConfig>;
export type AxisOption = 'ticks' | 'numbers' | 'name' | 'side' | 'padding';
export declare function applyAxisOption(figure: AbstractFigure, option: AxisOption, parameter: IParserParameters): void;
//# sourceMappingURL=buildAxis.d.ts.map