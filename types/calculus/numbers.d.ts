export declare function numberCorrection(value: number, number_of_digits?: number): number;
export interface Fraction {
    numerator: number;
    denominator: number;
}
export declare function toFraction(value: number, maxDenominator?: number): Fraction | null;
export declare function fractionToTex({ numerator, denominator }: Fraction): string;
export declare function fractionToText({ numerator, denominator }: Fraction): string;
export declare function toNumber(value: number | string): number;
//# sourceMappingURL=numbers.d.ts.map