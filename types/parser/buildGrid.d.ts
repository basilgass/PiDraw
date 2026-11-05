import type { PARSER } from "piparser";
import type { AbstractFigure } from "../figures/AbstractFigure";
import type { IGridConfig } from "../figures/Grid.types";
import { type buildInterface } from "../pidraw.common";
import { type IParserParameters } from "./parser.common";
export interface IStep {
    step: number;
    pi: boolean;
}
export declare function parseStep({ value, options }: IParserParameters, key: string): IStep | null;
export declare function parseStepValue(value: unknown): IStep | null;
export declare const given: (parameter: IParserParameters | undefined) => parameter is IParserParameters;
export declare function buildGridParameters(grid?: IParserParameters, gridX?: IParserParameters, gridY?: IParserParameters): IGridConfig | null;
export declare function buildGrid(item: PARSER): buildInterface<IGridConfig>;
type GridOption = 'subgrid';
export declare function applyGridOption(figure: AbstractFigure, option: GridOption, value: unknown): void;
export {};
//# sourceMappingURL=buildGrid.d.ts.map