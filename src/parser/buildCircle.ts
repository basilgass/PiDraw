import { type PARSER } from "piparser/lib/PiParserTypes"
import { AbstractFigure } from "../figures/AbstractFigure"
import { type IArcConfig } from "../figures/Arc"
import { type ICircleConfig } from "../figures/Circle"
import { Point } from "../figures/Point"
import { type IGraphConfig } from "../pidraw.common"
import { convertIdToFigure, PARSER_TYPE } from "./parser.common"

export function buildCircle(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ICircleConfig | IArcConfig | null {
    const code = convertIdToFigure(item.values, figures)

    if (item.key === PARSER_TYPE.CIRCLE.toString() && code.length >= 2) {
        // item.code = [<point>,<point>]
        const [center, radius] = code
        if (center instanceof Point && (radius instanceof Point || typeof radius === 'number')) {
            return { center, radius }
        }
    }

    return null

}

export function buildArc(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ICircleConfig | IArcConfig | null {
    const code = convertIdToFigure(item.values, figures)

    if (item.key === PARSER_TYPE.ARC.toString() && code.length >= 3) {
        // item.code = [<point>,<point>,<point>,[<radius>]]
        const [start, center, end, radius] = code

        if (start instanceof Point && center instanceof Point && end instanceof Point) {
            return { start, center, end, radius: radius as number | Point }
        }
    }

    return null
}