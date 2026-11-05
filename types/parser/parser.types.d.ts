import type { PARSER, PARSER_VALUES, PiParse } from "piparser";
import type { IGraphConfig } from "../pidraw.common";
import type { PARSER_TYPE } from "./parser.common";
import type { IControlsFigure, IControlsGraph } from "../controls/controls.types";
import type { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
import type { LabelFieldName } from "../figures/Label/Label.types";
import type { Graph } from "../Graph";
import type { TeXConverterType } from "../Graph.types";
export type IParserValues = PARSER_VALUES | AbstractFigure;
export type FigureKind = keyof Graph['create'];
export interface BuildResult<T> {
    create: FigureKind;
    config: T;
}
export interface ParserItem {
    build: (item: PARSER, figures: Record<string, AbstractFigure>, config: IGraphConfig) => BuildResult<unknown> | BuildResult<unknown>[] | null;
    description: string;
    forms: string[];
    name: string;
    summary: string;
    labelFields?: readonly LabelFieldName[];
}
export type ParserItems = Partial<Record<PARSER_TYPE, ParserItem>>;
export interface IParserConfig {
    parameters?: string;
    code?: string;
    tex?: TeXConverterType;
}
export type PointShapeOption = 'o' | 's' | '*';
export interface IPointsSetting {
    shape: PointShapeOption;
    size?: number;
}
export interface IParserSettings {
    label?: boolean;
    tex?: boolean;
    points?: false | IPointsSetting;
}
export interface IParserParameters {
    value: IParserValues;
    options: IParserValues[];
}
export type FigureOptionHandler = (figure: AbstractFigure, option: IParserParameters) => void;
export type Options = Record<string, IParserParameters>;
export interface IOptionContext {
    graph: Graph;
    options: Options;
}
export type OptionHandler = (figure: AbstractFigure, option: IParserParameters, context: IOptionContext) => void;
export type OptionValueType = 'text' | 'set';
export interface ICommandLine {
    name: string;
    value: string;
    text: string;
}
export interface ICommandSyntax<State = unknown> {
    names: readonly string[];
    pattern: RegExp;
    initial: State;
    fold(state: State, command: ICommandLine, parser: PiParse): State;
    defaults(state: State): Partial<IControlsFigure>;
    graphControls?(state: State): {
        [K in keyof IControlsGraph]?: IControlsGraph[K] | null;
    };
}
export interface IThemeSyntax {
    options: Record<string, OptionHandler>;
    optionTypes?: Record<string, OptionValueType>;
    optionDetails?: Record<string, string>;
    optionValues?: Record<string, readonly string[]>;
    commands?: ICommandSyntax;
    handleControls?: readonly (keyof IControlsFigure)[];
}
//# sourceMappingURL=parser.types.d.ts.map