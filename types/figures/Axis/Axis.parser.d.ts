import type { PARSER } from "piparser";
import type { TickSelection } from "../../calculus";
import type { IAxisConfig } from "./Axis.types";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { BuildResult, FigureOptionHandler, IParserParameters, ParserItems } from "../../parser/parser.types";
import type { IAxisDisplay } from "../../Graph.types";
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
export declare function buildAxis(item: PARSER, figures: Record<string, AbstractFigure>): BuildResult<IAxisConfig>;
export type AxisOption = 'ticks' | 'numbers' | 'name' | 'side' | 'padding';
export declare function applyAxisOption(figure: AbstractFigure, option: AxisOption, parameter: IParserParameters): void;
export declare const AXIS_OPTION_HANDLERS: Record<AxisOption, FigureOptionHandler>;
export declare const AXIS_ITEMS: ParserItems;
//# sourceMappingURL=Axis.parser.d.ts.map