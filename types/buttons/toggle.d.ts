import type { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
import type { IFigureToggle } from "./Buttons.types";
export declare function checkToggle(toggle: IFigureToggle, name: string): void;
export declare function toggleOf(figure: AbstractFigure): IFigureToggle | null;
export declare function setToggle(figure: AbstractFigure, toggle: IFigureToggle | null): void;
//# sourceMappingURL=toggle.d.ts.map