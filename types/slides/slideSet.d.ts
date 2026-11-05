import type { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
import type { ISlideSet } from "./Slides.types";
export declare function checkSlideSet(set: ISlideSet, name: string): void;
export declare function slideIncludes(set: ISlideSet, step: number): boolean;
export declare function slideLast(set: ISlideSet): number;
export declare function frozenSlide(set: ISlideSet): ISlideSet;
export declare function slideOf(figure: AbstractFigure): ISlideSet | null;
export declare function setSlide(figure: AbstractFigure, set: ISlideSet | null): void;
//# sourceMappingURL=slideSet.d.ts.map