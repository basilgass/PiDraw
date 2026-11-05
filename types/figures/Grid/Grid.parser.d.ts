import type { PARSER } from "piparser";
import type { AbstractFigure } from "../AbstractFigure/AbstractFigure";
import type { IGridConfig } from "./Grid.types";
import type { BuildResult, FigureOptionHandler, IParserParameters, ParserItems } from "../../parser/parser.types";
export declare function buildGridParameters(grid?: IParserParameters, gridX?: IParserParameters, gridY?: IParserParameters): IGridConfig | null;
export declare function buildGrid(item: PARSER): BuildResult<IGridConfig>;
export type GridOption = 'subgrid';
export declare function applyGridOption(figure: AbstractFigure, option: GridOption, value: unknown): void;
export declare const GRID_OPTION_HANDLERS: Record<GridOption, FigureOptionHandler>;
export declare const GRID_ITEMS: ParserItems;
//# sourceMappingURL=Grid.parser.d.ts.map