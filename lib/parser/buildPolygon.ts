import { PARSER } from "piparser/lib/PiParserTypes"
import { AbstractFigure } from "../figures/AbstractFigure"
import { Point } from "../figures/Point"
import { IPolygonConfig } from "../figures/Polygon"
import { IGraphConfig, XY } from "../pidraw.common"
import { convertIdToFigure, PARSER_TYPE } from "./parser.common"

export function buildPolygon(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPolygonConfig | null {
    const code = convertIdToFigure(item.values, figures)

    if (item.key === PARSER_TYPE.POLYGON.toString() && code.length >= 2) {
        // item.code = [<point>,<point>,...]
        const points = code
        if (points.every(p => p instanceof Point)) {
            return { vertices: points as XY[] }
        }
    }

    if (item.key === PARSER_TYPE.REGULAR.toString() && code.length >= 3) {
        // item.code = [<point>,<number|point>,<number>]
        const [center, radius, sides] = code
        if (center instanceof Point && (typeof radius === 'number' || radius instanceof Point) && typeof sides === 'number') {
            return {
                regular: {
                    center,
                    radius,
                    sides
                }
            }
        }

    }


    return null

}