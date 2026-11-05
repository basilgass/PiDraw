import { type AnimationEasing } from "../calculus/easing";
import type { AbstractFigure } from "../figures/AbstractFigure/AbstractFigure";
import { Point } from "../figures/Point/Point";
import type { IThemeSyntax } from "../parser/parser.types";
import { LoopStyle } from "./Animate.types";
export declare function animationPoint(name: unknown, option: 'from' | 'to', figures: Record<string, AbstractFigure>): Point;
export declare function getLoopStyle(loop: unknown, figure: AbstractFigure): LoopStyle;
export declare function getEasing(easing: unknown, figure: AbstractFigure): AnimationEasing;
export declare const ANIMATE_SYNTAX: IThemeSyntax;
//# sourceMappingURL=Animate.syntax.d.ts.map