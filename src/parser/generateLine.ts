import {Figure} from "../figures/Figure";
import {LINECONSTRUCTION} from "../figures/Line";
import {isInfinity} from "../Calculus";
import {Parser} from "../Parser";
import {Point} from "../figures/Point";

export function generateLine(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    // d=line A,3/4     code: [A,3/4]
    // d=2x-3y=5        code: [2x-3y=5]
    // d=AB             code: [A,B]

    if (code.length === 1) {
// Get the point
        let left = parseLine(code[0].split('=')[0]),
            right = parseLine(code[0].split('=')[1])

        // Get the cartesian ax+by+c=0
        let a = left.a - right.a,
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
            return null
        }

        A.hide().label.hide()
        return [
            A,
            parser.graph.line(A, null, {
                    rule: LINECONSTRUCTION.SLOPE,
                    value: -a / b
                },
                name)
        ]
    } else if (code.length >= 2) {
        let A: Point, B: Point, slope: number

        A = parser.graph.getPoint(code.shift())
        if (A === null) return []

        B = parser.graph.getPoint(code[0])
        if (B === null) {
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
        let segmentStart = code[0] === 'segment',
            segmentEnd = code[1] === 'segment'

        let line = parser.graph.line(A, B, null, name)

        line.segmentStart = segmentStart
        line.segmentEnd = segmentEnd
        return [line]
    }


    return []
}


export function generatePerpendicular(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[]

    if (code.length >= 2) {
        let d = parser.graph.getFigure(code.shift()),
            P = parser.graph.getPoint(code.shift())

        figures = [parser.graph.line(
            P, null,
            {
                rule: LINECONSTRUCTION.PERPENDICULAR,
                value: d
            }, name)]

    }

    return figures
}

export function generateParallel(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    if (code.length >= 2) {
        let d = parser.graph.getFigure(code.shift()),
            P = parser.graph.getPoint(code.shift()),
            k: number = code[0] !== undefined ? +code[0] : 0

        return [parser.graph.line(
            P, null,
            {
                rule: LINECONSTRUCTION.PARALLEL,
                value: d
            }, name)]
    }

    return []
}

export function generateBissector(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    if (code.length >= 3) {
        let A = parser.graph.getPoint(code.shift()),
            B = parser.graph.getPoint(code.shift()),
            C = parser.graph.getPoint(code.shift())

        return [parser.graph.line(
            B, null,
            {
                rule: LINECONSTRUCTION.BISSECTOR,
                value: B,
                options: [A,C]
            }, name)]
    }

    return []
}

export function generateTangent(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    if (code.length >= 2) {
        let c = parser.graph.getFigure(code.shift()),
            P = parser.graph.getPoint(code.shift()),
            k: number = code[0] === undefined ? 1 : +code[0]

        // there are potentially TWO tangents.
        // The point name is generated:
        // name = t => t1 and t2
        // TODO: tangent : get the two lines in one round.
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

export function generateVector(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let figures: Figure[]

    if (code.length > 0) {
        let A = parser.graph.getPoint(code.shift()),
            B = parser.graph.getPoint(code.shift())

        let k = code.length > 0 ? +code[0] : 1

        let v = parser.graph.line(A, B, null, name).asVector(true, k)

        figures = [v]
    }

    return figures

}


function parseLine(equ: string): { [key: string]: number } {
    const x = equ.match(/([-0-9/.]+)x/g),
        y = equ.match(/([-0-9/.]+)y/g)

    let dx, dy, dc
    if (x && x[0].endsWith('x')) {
        equ = equ.replace(x[0], "")
        dx = x[0].substring(0, x[0].length - 1)

        if (dx.includes('/')) {
            let [n, d] = dx.split('/')
            dx = (+n) / (+d)
        }
    } else {
        dx = equ.includes('x') ? 1 : 0;
    }

    if (y && y[0].endsWith('y')) {
        equ = equ.replace(y[0], "")
        dy = y[0].substring(0, y[0].length - 1)

        if (dy.includes('/')) {
            let [n, d] = dy.split('/')
            dy = (+n) / (+d)
        }
    } else {
        dy = equ.includes('y') ? 1 : 0;
    }

    let c = equ.match(/([-0-9./]+)(?![xy])/)
    if (c) {
        if (c[0].includes('/')) {
            let [n, d] = c[0].split('/')
            dc = (+n) / (+d)
        } else {
            dc = +c[0]
        }
    } else {
        dc = 0
    }

    if (isInfinity(+dx)) dx = 0
    if (isInfinity(+dy)) dy = 0
    if (isInfinity(+dc)) dc = 0

    return {a: +dx, b: +dy, c: +dc}
}