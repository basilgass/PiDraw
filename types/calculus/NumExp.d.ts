export declare class NumExp {
    private readonly _expression;
    private readonly _run;
    constructor(expression: string);
    private readonly _pgf;
    toPgf(rename?: Record<string, string>): string;
    get expression(): string;
    evaluate(values?: Values): number;
}
type Values = Record<string, number>;
export {};
//# sourceMappingURL=NumExp.d.ts.map