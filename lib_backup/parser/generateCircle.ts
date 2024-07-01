import { Figure } from "../Figure"
import { Parser } from "."

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateCircle(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[] = []

    if (code.length >= 2) {
        const A = parser.graph.getPoint(code.shift() as unknown as string),
            radiusAsString = code.shift()

        if (A === null) { return [] }
        if (radiusAsString === undefined) { return [] }

        const radius = parser.graph.getPoint(radiusAsString) ?? 5

        figures = [parser.graph.circle(A, radius, name)]
    }
    return figures
}
