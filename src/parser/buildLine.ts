import {type PARSER} from "piparser"
import {AbstractFigure} from "../figures/AbstractFigure"
import {type ILineConfig, type ILineType, Line} from "../figures/Line"
import {Point} from "../figures/Point"
import {type buildInterface, type IGraphConfig} from "../pidraw.common"
import {convertIdToFigure, PARSER_TYPE} from "./parser.common"

const create = 'line'

export function buildLine(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<ILineConfig> | null {
    const code = convertIdToFigure(item.values, figures)

    if (item.key === PARSER_TYPE.LINE.toString() ||
        item.key === PARSER_TYPE.SEGMENT.toString() ||
        item.key === PARSER_TYPE.VECTOR.toString() ||
        item.key === PARSER_TYPE.RAY.toString()
        && code.length === 2) {
        // item.code = [<point>,<point>] --> A,B
        // item.code = [<point>,<number|string>] --> A,slope
        const [A, B] = code
        if (A instanceof Point && B instanceof Point) {
            let lineType: ILineType = 'line'
            switch (item.key) {
                case PARSER_TYPE.SEGMENT.toString():
                    lineType = 'segment'
                    break
                case PARSER_TYPE.VECTOR.toString():
                    lineType = 'vector'
                    break
                case PARSER_TYPE.RAY.toString():
                    lineType = 'ray'
                    break

            }

            return {
                create,
                config: {
                    through: {A, B},
                    shape: lineType
                }

            }
        }
    }

    if (item.key === PARSER_TYPE.LINE.toString() && code.length === 1) {
        return {
            create,
            config:{
                equation: code[0] as string
            }
        }

    }

    if (item.key === PARSER_TYPE.MEDIATOR.toString() && code.length === 2) {
        // item.code = [<point>,<point>]
        const [A, B] = code
        if (A instanceof Point && B instanceof Point) {
            return {
                create,
                config: {mediator: {A, B}}
            }
        }
    }

    if (item.key === PARSER_TYPE.PERPENDICULAR.toString() && code.length === 2) {
        // item.code = [<line>,<point>]
        const [to, through] = code
        if (to instanceof Line && through instanceof Point) {
            return {
                create,
                config: {perpendicular: {to, through}}
            }
        }
    }

    if (item.key === PARSER_TYPE.PARALLEL.toString() && code.length === 2) {
        // item.code = [<line>,<point>]
        const [to, through] = code
        if (to instanceof Line && through instanceof Point) {
            return {
                create,
                config: {parallel: {to, through}}
            }
        }
    }

    if (item.key === PARSER_TYPE.BISECTOR.toString() && code.length === 2) {
        const [d1, d2] = code
        if (d1 instanceof Line && d2 instanceof Line) {
            return {
                create,
                config: {bisector: {d1, d2}}
            }
        }
    }

    if (item.key === PARSER_TYPE.BISECTOR.toString() && code.length === 3) {
        const [B, A, C] = code
        if (A instanceof Point && B instanceof Point && C instanceof Point) {
            return {
                create,
                config: {bisector: {A, B, C}}
            }
        }
    }
    return null

}

