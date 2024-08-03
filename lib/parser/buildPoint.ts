import { mathVector, toPixels } from "../Calculus"
import { AbstractFigure } from "../figures/AbstractFigure"
import { Line } from "../figures/Line"
import { IPointConfig, Point } from "../figures/Point"
import { IGraphConfig, XY } from "../pidraw.common"
import { convertValues, IParser, PARSER_TYPE } from "./parser.common"

export function buildPoint(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPointConfig | { x: number, y: number } | null {

    let shape = 'circle',
        size = 5
    const shapeCode: string | null = Object.keys(item.parameters).filter((key) => key.includes('*') || key.includes('s'))[0] ?? 'o'

    switch (shapeCode) {
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
        return Object.assign(config, { shape, size })
    }

    return null
}

function buildPoint_config(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): IPointConfig | { x: number, y: number } | null {
    const code = convertValues(item.code, figures)

    if (item.key === PARSER_TYPE.POINT) {
        // item.code = [<number>,<number>] -> 2d
        // item.code = [<number>,<number>,<number>] -> 3d
        const [x, y] = code as number[]
        if (typeof x === 'number' && typeof y === 'number') {
            return { coordinates: { x, y } }
        }
    }

    if (item.key === PARSER_TYPE.MIDDLE && code.length === 2) {
        // item.code = [<Point>,<Point>]
        const A = code[0]
        const B = code[1]

        if (A instanceof Point && B instanceof Point) {
            return { middle: { A, B } }
        }
    }

    if (item.key === PARSER_TYPE.PROJECTION && code.length === 2) {
        // item.code = [<Point>,<Point>,<Point>]
        const A = code[0]
        const B = code[1]

        if (A instanceof Point && (B instanceof Line || B === 'Ox' || B === 'Oy')) {
            return { projection: { point: A, axis: B } }
        }
    }

    if (item.key === PARSER_TYPE.INTERSECTION && code.length === 2) {
        // item.code = [<Line>,<Line>]
        const A = code[0]
        const B = code[1]

        if ((A instanceof Line || A === 'Ox' || A === 'Oy') && (B instanceof Line || B === 'Ox' || B === 'Oy')) {
            return { intersection: { A, B } }
        }
    }

    if (item.key === PARSER_TYPE.SYMMETRY && code.length === 2) {
        // item.code = [<Point>,<Point|Line>]
        const A = code[0]
        const B = code[1]

        if (A instanceof Point &&
            (B instanceof Point || B instanceof Line || B === 'Ox' || B === 'Oy')
        ) {
            return { symmetry: { A, B } }
        }
    }

    if (item.key === PARSER_TYPE.DIRECTION_POINT && code.length >= 3) {
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

    if (item.key === PARSER_TYPE.VECTOR_POINT && code.length >= 2) {
        const [A, B, scale, startingPoint] = code

        if (A instanceof Point && B instanceof Point) {
            const point = startingPoint instanceof Point ? startingPoint : A
            const distance = typeof scale === "number" ? scale : 1

            return {
                direction: {
                    point,
                    direction: { A, B },
                    distance
                }
            }
        }
    }
    return null
}
