import {Figure} from "../figures/Figure";
import {Parser} from "../Parser";

export function generatePolygon(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    // polygon code is:
    // <point:Point>,<point:Point>,... (list of points)
    // <sides:number>,<center: Point>,<radius: number|Point>

    if (code.length < 3) {
        return []
    }

    if (!isNaN(+code[0])) {
        // regular polygon
        const sides = +code.shift(),
            center = parser.graph.getPoint(code.shift()),
            radius = code.shift()

        return [
            parser.graph.polygon([center], name)
                .regular(
                    sides,
                    isNaN(+radius) ? parser.graph.getPoint(radius) : +radius
                )
        ];
    }

    let polyPoints = code.map(pt => parser.graph.getPoint(pt)).filter(x => x !== null)
    return polyPoints.length >= 3 ? [parser.graph.polygon(polyPoints, name)] : []
}
