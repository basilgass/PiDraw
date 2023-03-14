import {Figure} from "../figures/Figure";
import {Parser} from "../Parser";

export     function generatePolygon(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[]

    if (code.length > 2) {
        let polyPoints = code.map(pt => parser.graph.getPoint(pt)).filter(x => x !== null)
        figures = [parser.graph.polygon(polyPoints)]
    }

    return figures
}
