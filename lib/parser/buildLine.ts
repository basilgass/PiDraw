import { toPixels } from "../Calculus"
import { AbstractFigure } from "../figures/AbstractFigure"
import { ILineConfig, ILineType, Line } from "../figures/Line"
import { Point } from "../figures/Point"
import { IGraphConfig } from "../pidraw.common"
import { convertValues, IParser, PARSER_TYPE } from "./parser.common"

export function buildLine(item: IParser, figures: Record<string, AbstractFigure>, graphConfig: IGraphConfig): ILineConfig | null {
    const code = convertValues(item.code, figures)

    if (item.key === PARSER_TYPE.LINE && code.length === 2) {
        // item.code = [<point>,<point>] --> A,B
        // item.code = [<point>,<number|string>] --> A,slope
        const [A, B] = code
        if (A instanceof Point && B instanceof Point) {
            const lineType = item.parameters.shape ? item.parameters.shape.value : 'line'
            return {
                through: { A, B },
                shape: lineType as ILineType
            }
        }
    }

    if (item.key === PARSER_TYPE.LINE && code.length === 1) {
        // item.code = [<equation>] --> 2x-3y=4 or y=2/3x-1 or y=5 or x=3
        const equ = code[0] as string

        // It's an horizontal line
        if (equ.startsWith('y=') && !equ.includes('x')) {
            const value = convertValues([equ.split('=')[1]], figures)[0]

            const A = toPixels({ x: 0, y: value as number }, graphConfig)
            return {
                director: { A, d: { x: 1, y: 0 } },
                shape: 'line'
            }
        }

        // It's an vertical line
        if (equ.startsWith('x=')) {
            const value = convertValues([equ.split('=')[1]], figures)[0]

            const A = toPixels({ x: value as number, y: 0 }, graphConfig)
            return {
                director: { A, d: { x: 0, y: 1 } },
                shape: 'line'
            }
        }

        // It's a general line
        const [left, right] = equ.split('=')

        const coefficientLeft = parsePolynom(left),
            coefficientRight = parsePolynom(right)

        const coefficient = {
            a: coefficientLeft.a - coefficientRight.a,
            b: coefficientLeft.b - coefficientRight.b,
            c: coefficientLeft.c - coefficientRight.c
        }

        const A = toPixels({ x: 0, y: -coefficient.c / coefficient.b }, graphConfig)
        const d = {
            x: -coefficient.b,
            y: coefficient.a
        }

        return {
            director: { A, d },
            shape: 'line'
        }
    }

    if (item.key === PARSER_TYPE.MEDIATOR && code.length === 2) {
        // item.code = [<point>,<point>]
        const [A, B] = code
        if (A instanceof Point && B instanceof Point) {
            return { mediator: { A, B } }
        }
    }

    if (item.key === PARSER_TYPE.PERPENDICULAR && code.length === 2) {
        // item.code = [<line>,<point>]
        const [to, through] = code
        if (to instanceof Line && through instanceof Point) {
            return { perpendicular: { to, through } }
        }
    }

    if (item.key === PARSER_TYPE.PARALLEL && code.length === 2) {
        // item.code = [<line>,<point>]
        const [to, through] = code
        if (to instanceof Line && through instanceof Point) {
            return { parallel: { to, through } }
        }
    }
    return null

}

function parsePolynom(polynom: string): { a: number, b: number, c: number } {
    const data = polynom.split(/([+-][0-9./]*[xy]?)/).filter((d) => d.trim() !== '')

    const a = data
        .filter((d) => d.includes('x'))
        .map((d) => {
            return d === 'x' ? '1' : d.replace('x', '')
        })[0] ?? '0',
        b = data
            .filter((d) => d.includes('y'))
            .map((d) => {
                return d === 'y' ? '1' : d.replace('y', '')
            })[0] ?? '0',
        c = data
            .filter((d) => (!d.includes('x') && !d.includes('y')))[0] ?? '0'

    return {
        a: convertValues([a], {})[0] as number,
        b: convertValues([b], {})[0] as number,
        c: convertValues([c], {})[0] as number,
    }
}