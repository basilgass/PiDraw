import {Figure} from "../figures/Figure";
import {Parser} from "../Parser";
import {BezierPoint} from "../figures/Bezier";

export function generateBezier(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[] = []

    const bezierPoints:BezierPoint[] = code.map((pt)=>{
        const [ptName, control, ratio] = pt.split("/")
        return {
            point: parser.graph.getPoint(ptName),
            control: control?control:"smooth",
            ratio: ratio?+ratio:0.2
        }
    })
    let bezier = parser.graph.bezier(bezierPoints)

    figures = [
        bezier
    ]
    return figures
}
