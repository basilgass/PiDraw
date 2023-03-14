import {Figure} from "../figures/Figure";
import {Parser} from "../Parser";

export function generateCircle(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[]

    if (code.length > 0) {
        let A = parser.graph.getPoint(code[0]),
            radius = +code[1]

        figures = [parser.graph.circle(A, radius, name)]
    }
    return figures
}
