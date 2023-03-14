import { Figure } from "../figures/Figure";
import { BuildStep, Parser } from "../Parser";
export declare function updatePlot(parser: Parser, BStep: BuildStep, fx: string): boolean;
export declare function generatePlot(parser: Parser, name: string, code: string[], options: string[]): Figure[];
export declare function generateParametricPlot(parser: Parser, name: string, code: string[], options: string[]): Figure[];
export declare function generateFillBetween(parser: Parser, name: string, code: string[], options: string[]): Figure[];
