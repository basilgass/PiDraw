import { Parser } from "../Parser"
import { Figure } from "../Figure"
import { Point } from "../figures/Point"

export function generateArc(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[] = []
    const showAngle = options.includes("coord") || options.includes("@")

    if (code.length > 0) {
        const A = parser.graph.getPoint(code[0]),
            O = parser.graph.getPoint(code[1]),
            B = parser.graph.getPoint(code[2]),
            radiusValue = code[3] ?? 1
        let radius: number | Point

        if (A === undefined || O === undefined || B === undefined) { return [] }

        if (isNaN(+radiusValue)) {
            radius = parser.graph.getPoint(radiusValue) as unknown as Point
        } else {
            radius = parser.graph.distanceToPixels(+radiusValue)
        }

        const arc = parser.graph.arc(A, O, B, radius, name)

        if (options.includes('square')) {
            arc.square = true
        }

        if (showAngle && arc.label) {
            arc.label.isTex = true

            arc.displayName = `${name} = @°`
        }
        figures = [arc]
    }
    return figures
}
