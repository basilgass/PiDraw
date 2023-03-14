import {Figure} from "../figures/Figure";
import {Parser} from "../Parser";

export function generateBezier(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[] = []

    let bezier = parser.graph.bezier(code)

    figures = [
        bezier
    ]
    return figures
}
