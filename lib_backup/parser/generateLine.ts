import { Figure } from "../Figure"
import { isInfinity } from "../../lib/Calculus"
import { Parser } from "../Parser"
import { Point } from "../figures/Point"
import { LINECONSTRUCTION } from "../enums"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateLine(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    // d=line A,3/4     code: [A,3/4]
    // d=2x-3y=5        code: [2x-3y=5]
    // d=AB             code: ]A,B[
    // d=AB.             code: [A,B]

    if (code.length === 1) {
        // Get the point
        const left = parseLine(code[0].split('=')[0]),
            right = parseLine(code[0].split('=')[1])

        // Get the cartesian ax+by+c=0
        const a = left.a - right.a,
            b = left.b - right.b,
            c = left.c - right.c

        // ax + by + c = 0
        // director = (-b, a)
        // A = (0, -c/b)
        let A: Point
        if (b !== 0) {
            A = parser.graph.point(0, -c / b)

        } else if (a !== 0) {
            A = parser.graph.point(-c / a, 0)
        } else {
            return []
        }

        // Hide the point
        A.makeInvisible().label?.hide()

        return [
            A,
            parser.graph.line(A, null, {
                rule: LINECONSTRUCTION.SLOPE,
                value: -a / b
            },
                name)
        ]
    } else if (code.length >= 2) {
        let slope: number

        const A = parser.graph.getPoint(code.shift() ?? '')
        if (A === undefined) { return [] }

        const B = parser.graph.getPoint(code[0] ?? '')
        if (B === undefined) {
            slope = +code[0]
            if (isNaN(slope)) {
                return []
            }

            return [parser.graph.line(A, null, {
                rule: LINECONSTRUCTION.SLOPE,
                value: slope
            }, name)]
        }

        code.shift()

        // Must check if it's a segment or not.
        const segmentStart = code[0] === 'segment',
            segmentEnd = code[1] === 'segment'

        const line = parser.graph.line(A, B, undefined, name)

        line.segmentStart = segmentStart
        line.segmentEnd = segmentEnd
        return [line]
    }


    return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generatePerpendicular(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[] = []

    if (code.length >= 2) {
        const d = parser.graph.getFigure(code.shift()),
            P = parser.graph.getPoint(code.shift() ?? '')

        if (P === undefined || d === undefined) { return [] }

        figures = [parser.graph.line(
            P, null,
            {
                rule: LINECONSTRUCTION.PERPENDICULAR,
                value: d
            }, name)]

    }

    return figures
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateMediator(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[] = []

    if (code.length >= 2) {
        const P = parser.graph.getPoint(code.shift() ?? ''),
            Q = parser.graph.getPoint(code.shift() ?? '')

        if (P === undefined || Q === undefined) { return [] }

        const M = parser.graph.point((P.coord.x + Q.coord.x) / 2, (P.coord.y + Q.coord.y) / 2)
        M.makeInvisible().label?.hide()

        figures = [parser.graph.line(
            M, null,
            {
                rule: LINECONSTRUCTION.MEDIATOR,
                options: [P, Q]
            }, name)]
    }

    return figures
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateParallel(parser: Parser, name: string, code: string[], options: string[]): Figure[] {

    if (code.length >= 2) {
        const d = parser.graph.getFigure(code.shift()),
            P = parser.graph.getPoint(code.shift() ?? '')

        if (P === undefined || d === undefined) { return [] }

        return [parser.graph.line(
            P, null,
            {
                rule: LINECONSTRUCTION.PARALLEL,
                value: d
            }, name)]
    }

    return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateBissector(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    if (code.length >= 3) {
        const A = parser.graph.getPoint(code.shift() ?? ''),
            B = parser.graph.getPoint(code.shift() ?? ''),
            C = parser.graph.getPoint(code.shift() ?? '')

        if (A === undefined || B === undefined || C === undefined) { return [] }

        return [parser.graph.line(
            B, null,
            {
                rule: LINECONSTRUCTION.BISSECTOR,
                value: B,
                options: [A, C]
            }, name)]
    }

    return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateTangent(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    if (code.length >= 2) {
        const c = parser.graph.getFigure(code.shift()),
            P = parser.graph.getPoint(code.shift() ?? '')

        if (P === undefined || c === undefined) { return [] }

        // there are potentially TWO tangents.
        // The point name is generated:
        // name = t => t1 and t2
        return [
            parser.graph.line(
                P, null,
                {
                    rule: LINECONSTRUCTION.TANGENT,
                    value: c,
                    k: 1
                }, name + '1'),
            parser.graph.line(
                P, null,
                {
                    rule: LINECONSTRUCTION.TANGENT,
                    value: c,
                    k: 2
                }, name + '2')
        ]
    }

    return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateVector(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[] = []

    if (code.length > 0) {
        const A = parser.graph.getPoint(code.shift() ?? ''),
            B = parser.graph.getPoint(code.shift() ?? '')
        let k = +code[code.length - 1]

        if (A === undefined || B === undefined) { return [] }

        if (isNaN(k)) { k = 1 }

        const v = parser.graph.line(A, B, undefined, name).asVector(true, k)

        figures = [v]
    }

    return figures

}


function parseLine(equ: string): Record<string, number> {
    const x = equ.match(/([-0-9/.]+)x/g),
        y = equ.match(/([-0-9/.]+)y/g)

    let dx, dy, dc
    if (x?.[0].endsWith('x')) {
        equ = equ.replace(x[0], "")
        dx = x[0].substring(0, x[0].length - 1)

        if (dx.includes('/')) {
            const [n, d] = dx.split('/')
            dx = (+n) / (+d)
        }
    } else {
        dx = equ.includes('x') ? 1 : 0
    }

    if (y?.[0].endsWith('y')) {
        equ = equ.replace(y[0], "")
        dy = y[0].substring(0, y[0].length - 1)

        if (dy.includes('/')) {
            const [n, d] = dy.split('/')
            dy = (+n) / (+d)
        }
    } else {
        dy = equ.includes('y') ? 1 : 0
    }

    const c = equ.match(/([-0-9./]+)(?![xy])/)
    if (c) {
        if (c[0].includes('/')) {
            const [n, d] = c[0].split('/')
            dc = (+n) / (+d)
        } else {
            dc = +c[0]
        }
    } else {
        dc = 0
    }

    if (isInfinity(+dx)) { dx = 0 }
    if (isInfinity(+dy)) { dy = 0 }
    if (isInfinity(+dc)) { dc = 0 }

    return { a: +dx, b: +dy, c: +dc }
}