import type { PARSER, PiParse } from "piparser";
import { ParseError } from "../errors";
import type { IControlsFigure, IControlsGraph } from "../controls/controls.types";
import type { ICommandLine } from "../parser/parser.types";
export type IDrawCommand = ICommandLine;
export type IDrawLine = {
    number: number;
    text: string;
    indent: number;
} & ({
    item: PARSER;
    controls: Partial<IControlsFigure>;
    states: ReadonlyMap<string, unknown>;
    command?: never;
    error?: never;
} | {
    command: IDrawCommand;
    item?: never;
    controls?: never;
    states?: never;
    error?: never;
} | {
    error: ParseError;
    controls: Partial<IControlsFigure>;
    states: ReadonlyMap<string, unknown>;
    item?: never;
    command?: never;
});
export type IGraphControls = {
    [K in keyof IControlsGraph]?: IControlsGraph[K] | null;
};
export interface IDrawCode {
    lines: IDrawLine[];
    graphControls: IGraphControls;
}
export declare function standardForm(text: string): string;
export declare function readCode(input: string, parse: (text: string) => PARSER, parser: PiParse): IDrawCode;
//# sourceMappingURL=Draw.lines.d.ts.map