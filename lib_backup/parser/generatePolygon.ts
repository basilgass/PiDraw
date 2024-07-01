import { Figure } from "../Figure"
import { Point } from "../figures/Point"
import { Parser } from "../Parser"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generatePolygon(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    // polygon code is:
    // <point:Point>,<point:Point>,... (list of points)
    // <sides:number>,<center: Point>,<radius: number|Point>

    if (code.length < 3) {
        return []
    }

    if (!isNaN(+code[0])) {
        // regular polygon
        const sides: number = +(code.shift() ?? 3),
            center: Point | string | undefined = parser.graph.getPoint(code.shift() ?? "")

        if (center === undefined) { return [] }

        const radius = parser.graph.getPoint(code.shift() ?? '') ?? 5

        return [
            parser.graph.polygon([center], name)
                .regular(
                    sides,
                    radius
                )
        ]
    }

    const polyPoints = code.map(pt => parser.graph.getPoint(pt)).filter(x => x !== undefined)
    return polyPoints.length >= 3 ? [parser.graph.polygon(polyPoints as Point[], name)] : []
}
