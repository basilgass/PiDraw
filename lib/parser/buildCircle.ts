import { AbstractFigure } from "../figures/AbstractFigure"
import { IArcConfig } from "../figures/Arc"
import { ICircleConfig } from "../figures/Circle"
import { Point } from "../figures/Point"
import { IGraphConfig } from "../pidraw.common"
import { convertValues, IParser, PARSER_TYPE } from "./parser.common"

export function buildCircle(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ICircleConfig | IArcConfig | null {
    const code = convertValues(item.code, figures)

    if (item.key === PARSER_TYPE.CIRCLE && code.length >= 2) {
        // item.code = [<point>,<point>]
        const [center, radius] = code
        if (center instanceof Point && (radius instanceof Point || typeof radius === 'number')) {
            return { center, radius }
        }
    }

    if (item.key === PARSER_TYPE.ARC && code.length >= 3) {
        // item.code = [<point>,<point>,<point>,[<radius>]]
        const [start, center, end, radius] = code

        if (start instanceof Point && center instanceof Point && end instanceof Point) {
            return { start, center, end, radius: radius as number | Point }
        }
    }


    return null

}