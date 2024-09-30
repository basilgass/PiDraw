import {type PARSER} from "piparser/lib/PiParserTypes"
import {AbstractFigure} from "../figures/AbstractFigure"
import {Line} from "../figures/Line"
import {type IPointConfig, Point} from "../figures/Point"
import {type IGraphConfig} from "../pidraw.common"
import {convertIdToFigure, type IParserValues, PARSER_TYPE} from "./parser.common"

export function buildPoint(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPointConfig | {
    x: number,
    y: number
} | null {
    // Default values
    let shape = 'circle', size = 5

    const shapeCode: string | null = Object.keys(item.parameters)
        .filter((key) =>
            key.includes('*') ||
            key.includes('s') ||
            key.includes('o') )[0] ?? 'o'

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

    const config = buildPoint_config(item, figures, graphConfig)

    if (config) {
        return Object.assign(config, {shape, size})
    }

    return null
}

function buildPoint_config(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPointConfig | {
    x: number,
    y: number
} | null {
    const code: IParserValues[] = convertIdToFigure(item.values, figures)

    if (item.key === PARSER_TYPE.POINT.toString()) {
        // item.code = [<number>,<number>] -> 2d
        // item.code = [<number>,<number>,<number>] -> 3d
        const [x, y] = code as number[]
        if (typeof x === 'number' && typeof y === 'number') {
            return {coordinates: {x, y}}
        }
    }

    if (item.key === PARSER_TYPE.MIDDLE.toString() && code.length === 2) {
        // item.code = [<Point>,<Point>]
        const A = code[0]
        const B = code[1]

        if (A instanceof Point && B instanceof Point) {
            return {middle: {A, B}}
        }
    }

    if (item.key === PARSER_TYPE.PROJECTION.toString() && code.length === 2) {
        // item.code = [<Point>,<Point>,<Point>]
        const A = code[0]
        const B = code[1]

        if (A instanceof Point && (B instanceof Line || B === 'Ox' || B === 'Oy')) {
            return {projection: {point: A, axis: B}}
        }
    }

    if (item.key === PARSER_TYPE.INTERSECTION.toString() && code.length === 2) {
        // item.code = [<Line>,<Line>]
        const A = code[0]
        const B = code[1]

        if ((A instanceof Line || A === 'Ox' || A === 'Oy') && (B instanceof Line || B === 'Ox' || B === 'Oy')) {
            return {intersection: {A, B}}
        }
    }

    if (item.key === PARSER_TYPE.SYMMETRY.toString() && code.length === 2) {
        // item.code = [<Point>,<Point|Line>]
        const A = code[0]
        const B = code[1]

        if (A instanceof Point &&
            (B instanceof Point || B instanceof Line || B === 'Ox' || B === 'Oy')
        ) {
            return {symmetry: {A, B}}
        }
    }

    if (item.key === PARSER_TYPE.DIRECTION_POINT.toString() && code.length >= 3) {
        const [A, line, distance, perpendicular] = code

        if (A instanceof Point &&
            (line instanceof Line || line === 'Ox' || line === 'Oy') &&
            typeof distance === 'number') {

            return {
                direction: {
                    direction: line,
                    distance: distance,
                    point: A,
                    perpendicular: perpendicular !== undefined
                },
            }
        }
    }

    if (item.key === PARSER_TYPE.VECTOR_POINT.toString() && code.length >= 2) {
        const [A, B, scale, startingPoint] = code

        if (A instanceof Point && B instanceof Point) {
            const point = startingPoint instanceof Point ? startingPoint : A
            const distance = typeof scale === "number" ? scale : 1

            return {
                direction: {
                    point,
                    direction: {A, B},
                    distance
                }
            }
        }
    }
    return null
}
