export interface IVocabulary {
    keys: readonly string[];
    options: readonly string[];
    parameters: readonly string[];
    colors: readonly string[];
}
export declare const OPTION_VALUES: Readonly<Record<string, readonly string[]>>;
export declare const COLOR_OPTIONS: readonly string[];
export declare const KEY_DETAILS: Readonly<Record<string, string>>;
export declare const OPTION_DETAILS: Readonly<Record<string, string>>;
export declare const PARAMETER_DETAILS: Readonly<Record<string, string>>;
export declare function readVocabulary(): IVocabulary;
//# sourceMappingURL=vocabulary.d.ts.map