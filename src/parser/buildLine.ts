import {type PARSER} from "piparser"
import {toNumber, toPixels} from "../Calculus"
import {AbstractFigure} from "../figures/AbstractFigure"
import {type ILineConfig, type ILineType, Line} from "../figures/Line"
import {Point} from "../figures/Point"
import {type IGraphConfig} from "../pidraw.common"
import {convertIdToFigure, PARSER_TYPE} from "./parser.common"

export function buildLine(item: PARSER, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ILineConfig | null {
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
                through: {A, B},
                shape: lineType
            }
        }
    }

    if (item.key === PARSER_TYPE.LINE.toString() && code.length === 1) {
        // item.code = [<equation>] --> 2x-3y=4 or y=2/3x-1 or y=5 or x=3
        const equ = code[0] as string

        // It's an horizontal line
        if (equ.startsWith('y=') && !equ.includes('x')) {
            const value = convertIdToFigure([equ.split('=')[1]], figures)[0]

            const A = toPixels({x: 0, y: value as number}, graphConfig)
            return {
                director: {A, d: {x: 1, y: 0}},
                shape: 'line'
            }
        }

        // It's an vertical line
        if (equ.startsWith('x=')) {
            const value = convertIdToFigure([equ.split('=')[1]], figures)[0]

            const A = toPixels({x: value as number, y: 0}, graphConfig)
            return {
                director: {A, d: {x: 0, y: 1}},
                shape: 'line'
            }
        }

        // It's a general line
        const [left, right] = equ.split('=')

        const coefficientLeft = parsePolynom(left),
            coefficientRight = parsePolynom(right)

        const coefficients = {
            a: coefficientLeft.a - coefficientRight.a,
            b: coefficientLeft.b - coefficientRight.b,
            c: coefficientLeft.c - coefficientRight.c
        }

        // ax+by+c=0
        // A=(0, -c/b)
        // slope = -a/b

        const A = toPixels({x: 0, y: -coefficients.c / coefficients.b}, graphConfig)
        const d = {
            x: coefficients.b,
            y: coefficients.a
        }

        return {
            director: {A, d},
            shape: 'line'
        }
    }

    if (item.key === PARSER_TYPE.MEDIATOR.toString() && code.length === 2) {
        // item.code = [<point>,<point>]
        const [A, B] = code
        if (A instanceof Point && B instanceof Point) {
            return {mediator: {A, B}}
        }
    }

    if (item.key === PARSER_TYPE.PERPENDICULAR.toString() && code.length === 2) {
        // item.code = [<line>,<point>]
        const [to, through] = code
        if (to instanceof Line && through instanceof Point) {
            return {perpendicular: {to, through}}
        }
    }

    if (item.key === PARSER_TYPE.PARALLEL.toString() && code.length === 2) {
        // item.code = [<line>,<point>]
        const [to, through] = code
        if (to instanceof Line && through instanceof Point) {
            return {parallel: {to, through}}
        }
    }

    if (item.key === PARSER_TYPE.BISECTOR.toString() && code.length === 2) {
        const [d1, d2] = code
        if (d1 instanceof Line && d2 instanceof Line) {
            return {bisector: {d1, d2}}
        }
    }

    if (item.key === PARSER_TYPE.BISECTOR.toString() && code.length === 3) {
        const [B, A, C] = code
        if (A instanceof Point && B instanceof Point && C instanceof Point) {
            return {bisector: {A, B, C}}
        }
    }
    return null

}

export function parsePolynom(polynom: string): { a: number, b: number, c: number } {
    const data = polynom.split(/([+-]?[0-9./]*[xy]?)/).filter((d) => d.trim() !== '')

    const a = extractNumberFromMonoms(data, 'x')
    const b = extractNumberFromMonoms(data, 'y')
    const c = toNumber(data
        .filter((d) => (!d.includes('x') && !d.includes('y')))[0] ?? 0)

    return {
        a: +convertIdToFigure([a], {})[0],
        b: +convertIdToFigure([b], {})[0],
        c: +convertIdToFigure([c], {})[0],
    }
}

function extractNumberFromMonoms(data: string[], letter: string): number {
    return data
        .filter((d) => d.includes(letter))
        .map((d) => {
            // Remove the letter 'x'
            if (d === letter || d===`+${letter}`) {
                return 1
            }
            if (d === `-${letter}`) {
                return -1
            }

            return toNumber(d.replace(letter, ''))
        })[0] ?? 0
}