import type { IThemeSyntax, OptionValueType } from "../parser/parser.types";
import type { IControlsFigure } from "./controls.types";
export declare const THEMES: Readonly<Record<keyof IControlsFigure, IThemeSyntax>>;
export declare function themeSyntaxes(): IThemeSyntax[];
export declare function themeOptionTypes(): Record<string, OptionValueType>;
export declare function themeOptionDetails(): Record<string, string>;
export declare function themeOptionValues(): Record<string, readonly string[]>;
//# sourceMappingURL=controls.d.ts.map