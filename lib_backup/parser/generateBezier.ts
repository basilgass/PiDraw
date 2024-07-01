import { Figure } from "../Figure"
import { Parser } from "../Parser"
import { BEZIERCONTROL } from "../enums"
import { Bezier } from "../figures/Bezier"
import { Point } from "../figures/Point"
import { BezierPoint } from "../pidraw.interface"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateBezier(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[] = []

    const bezierPoints: BezierPoint[] = (code.map((pt) => {
        const [ptName, control, ratio] = pt.split("/")
        const point = parser.graph.getPoint(ptName)

        if (point instanceof Point) {
            return {
                point,
                control: control ? Bezier.uniformizeControlType(control) : BEZIERCONTROL.SMOOTH,
                ratio: ratio ? +ratio : 0.2
            }
        }

        return null
    })).filter(item => item !== null) as BezierPoint[]

    const bezier = parser.graph.bezier(bezierPoints)

    figures = [
        bezier
    ]
    return figures
}
