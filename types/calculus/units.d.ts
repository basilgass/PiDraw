export type LengthUnit = 'pm' | 'nm' | 'µm' | 'mm' | 'cm' | 'dm' | 'm' | 'dam' | 'hm' | 'km' | 'u';
export declare const LENGTH_UNITS: readonly LengthUnit[];
export interface IMeasure {
    unit: LengthUnit | null;
    scale: number;
}
export declare const DEFAULT_MEASURE: Readonly<IMeasure>;
export declare function lengthUnitOf(text: string): LengthUnit | null;
export declare function checkMeasure(measure: IMeasure): void;
export declare function scaled(value: number, measure: IMeasure, power: 1 | 2): number;
export declare function withUnit(number: string, unit: LengthUnit | null, power: 1 | 2, tex: boolean): string;
export declare function withDegree(number: string, tex: boolean): string;
//# sourceMappingURL=units.d.ts.map