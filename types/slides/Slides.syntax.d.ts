import type { PiParse } from "piparser";
import type { IThemeSyntax } from "../parser/parser.types";
import type { ISlideSet } from "./Slides.types";
export declare function slideSetFrom(value: unknown): ISlideSet | null;
export declare function parseSteps(parser: PiParse, text: string): ISlideSet;
export declare const SLIDES_SYNTAX: IThemeSyntax;
//# sourceMappingURL=Slides.syntax.d.ts.map