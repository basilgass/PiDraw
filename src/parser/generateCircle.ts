import {Figure} from "../figures/Figure";
import {Parser} from "../Parser";

export function generateCircle(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[]

    if (code.length >= 2) {
        let A = parser.graph.getPoint(code.shift()),
            radius = code.shift()

        figures = [parser.graph.circle(A, isNaN(+radius)?parser.graph.getPoint(radius):+radius, name)]
    }
    return figures
}
