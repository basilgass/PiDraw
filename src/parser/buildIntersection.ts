import {type PARSER} from "piparser"
import {AbstractFigure} from "../figures/AbstractFigure"
import {Line} from "../figures/Line"
import {type IPointConfig} from "../figures/Point"
import {type buildInterface, type IGraphConfig} from "../pidraw.common"
import {convertIdToFigure, type IParserValues, PARSER_TYPE} from "./parser.common"
import {Circle} from "../figures/Circle"

const create = 'point'

export function buildIntersection(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): buildInterface<IPointConfig>[] | null {
    // Default values
    let shape = 'circle', size = 5

    const shapeCode: string | undefined = Object.keys(item.parameters)
        .find((key) =>
            key.includes('*') ||
            key.includes('s') ||
            key.includes('o'))

    switch (shapeCode) {
        case 'o':
            shape = 'circle'
            size = item.parameters[shapeCode].value === true ? 5 : item.parameters[shapeCode].value as number
            break
        case 's':
            shape = 'square'
            size = item.parameters[shapeCode].value === true ? 10 : item.parameters[shapeCode].value as number
            break
        case '*':
            shape = 'crosshair'
            size = item.parameters[shapeCode].value === true ? 10 : item.parameters[shapeCode].value as number
            break
    }

    const configs = buildPoint_config(item, figures, graphConfig)

    if (configs) {
        return configs.map((config) => {
            return {
                create,
                config: Object.assign(config, {shape, size})
            }
        })
    }

    return null
}

function buildPoint_config(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPointConfig[] | null {
    const code: IParserValues[] = convertIdToFigure(item.values, figures)

    if (item.key === PARSER_TYPE.INTERSECTION.toString() && code.length >= 2) {
        // item.code = [<Line>|<Circle>,<Line>|<Circle>]
        const A = code[0]
        const B = code[1]
        const C = code.length > 2 ? code[2] : undefined

        if ((A instanceof Line || A === 'Ox' || A === 'Oy') && (B instanceof Line || B === 'Ox' || B === 'Oy')) {
            return [
                {
                    intersection: {A, B}
                }
            ]
        }

        if (A instanceof Circle && B instanceof Line) {
            return [
                {
                    circle_intersection: {
                        A, B,
                        index: 0
                    }
                },
                {
                    circle_intersection: {
                        A, B,
                        index: 1
                    }
                }
            ]
        }
    }

    return null
}
