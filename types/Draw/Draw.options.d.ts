import type { Graph, IDraggableConfig } from "../Graph";
import type { PiParseOptions } from "piparser";
import type { IOptionContext, IParserSettings, OptionHandler, Options } from "../parser/parser.types";
import { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
export type { IOptionContext, OptionHandler, Options };
export declare function dragConfig(values: unknown[], figures: Record<string, AbstractFigure>): IDraggableConfig;
export declare function snapFigures(values: unknown[], figures: Record<string, AbstractFigure>): AbstractFigure[];
export declare function optionNames(): string[];
export declare function lineParseOptions(): PiParseOptions;
export declare function applyOptions(options: Options, figure: AbstractFigure, graph: Graph, states?: ReadonlyMap<string, unknown>): void;
export declare function withDefaults(options: Options, settings: IParserSettings, figure: AbstractFigure): Options;
//# sourceMappingURL=Draw.options.d.ts.map