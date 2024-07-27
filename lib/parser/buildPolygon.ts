import { AbstractFigure } from "../figures/AbstractFigure"
import { Point } from "../figures/Point"
import { IPolygonConfig } from "../figures/Polygon"
import { IGraphConfig } from "../pidraw.common"
import { convertValues, IParser, PARSER_TYPE } from "./parser.common"

export function buildPolygon(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPolygonConfig | null {
    const code = convertValues(item.code, figures)

    if (item.key === PARSER_TYPE.POLYGON && code.length >= 2) {
        // item.code = [<point>,<point>,...]
        const points = code
        if (points.every(p => p instanceof Point)) {
            return { vertices: points }
        }
    }

    if (item.key === PARSER_TYPE.REGULAR && code.length >= 3) {
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