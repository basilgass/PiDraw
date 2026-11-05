import type { IParserParameters } from "./parser.types";
export interface IStep {
    step: number;
    pi: boolean;
}
export declare function parseStep({ value, options }: IParserParameters, key: string): IStep | null;
export declare function parseStepValue(value: unknown): IStep | null;
export declare const given: (parameter: IParserParameters | undefined) => parameter is IParserParameters;
//# sourceMappingURL=parser.step.d.ts.map