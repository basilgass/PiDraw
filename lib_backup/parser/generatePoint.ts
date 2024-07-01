/* Parser point class
A point is define using

A=(3,4)
B=proj A,d
C=sym A,[d,B]
D=vpt
 */

import { Parser } from "../Parser"
import { Figure } from "../Figure"
import { Line } from "../figures/Line"
import { Point } from "../figures/Point"
import { Circle } from "../figures/Circle"
import { getStepType, STEP_KIND, StepValueType } from "./parseStep"

export function setPointStyle(pt: Point, style: string, size?: number | null) {
    if (size === undefined || size === null) {
        size = +pt.defaultScale
    }
    if (style === 'o') {
        pt.asCircle(size)
        pt.fill('white').stroke('black')
    } else if (style === '*') {
        pt.asCircle(size)
        pt.fill('black').stroke('black')
    } else if (style === 'x') {
        pt.asCross()
    } else if (style === "sq") {
        pt.asSquare(size)
    } else if (style === "tick") {
        pt.asTick(size)
    }
}

export function generatePoint(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    // step should be
    // A(3,5)->[@,*o,x]

    // The label for the point can be:
    // letters with or without @
    const showCoords = options.includes('@') ||
        options.includes('coords') ||
        options.includes('coord')

    // If the figure exist, no need to continue
    if (parser.graph.getPoint(name)) { return [] }

    // analyse the step/code value and extract the data
    if (code.length < 2) { return [] }

    // Create the point
    const pt = parser.graph.point(-100, -100, name, true)
    // pt.hide().hideLabel()

    parser.graph.freeze = true

    // TODO: 3d mode is not yet completely implemented
    if (code.length === 3) {
        const x = getStepType(parser, code.shift() ?? '0'),
            y = getStepType(parser, code.shift() ?? '0'),
            z = getStepType(parser, code.shift() ?? '0')

        if (x.item === null || y.item === null || z.item === null) { return [] }

        const kx = 1
        const alphax = Math.PI / 4
        const ky = 1
        const alphay = 0
        const kz = 1
        const alphaz = 0

        const pixels = pt.graph.unitsToPixels({
            x: +x.item * kx * (-Math.cos(alphax)) + +y.item * ky * Math.cos(alphay) + +z.item * kz * Math.sin(alphaz),
            y: +x.item * kx * (-Math.sin(alphax)) + +y.item * ky * Math.sin(alphay) + +z.item * kz * Math.cos(alphaz)
        })
        pt.x = pixels.x
        pt.y = pixels.y
        pt.asCircle()

        parser.graph.freeze = false
        return [pt]
    }
    // Move the point
    const stepX = getStepType(parser, code.shift() ?? '0'),
        stepY = getStepType(parser, code.shift() ?? '0')

    if (stepX.item === null || stepY.item === null) { return [] }

    if (stepX.kind === STEP_KIND.static && stepY.kind === STEP_KIND.static) {
        const pixels = pt.graph.unitsToPixels({ x: +stepX.item, y: +stepY.item })
        pt.x = pixels.x
        pt.y = pixels.y
    } else {
        pt.fromCoord(stepX, stepY)
    }

    // By default, use a circle as point
    pt.asCircle()

    if (showCoords && pt.label) {
        pt.label.isTex = true
        pt.displayName = `${name} = @`
    }

    parser.graph.freeze = false

    return [pt]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateProjectionPoint(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    // let match = [...step.matchAll(/^([A-Z]_?[0-9]?),(([A-Za-z]_?[0-9]?)|(Ox)|(Oy))/g)]

    if (code.length > 0) {
        const A = parser.graph.getPoint(code[0]),
            to = !['Ox', 'Oy'].includes(code[1]) ? parser.graph.getFigure(code[1]) : code[1]
        let pt

        if (A === undefined) { return [] }

        if (to instanceof Line || typeof to === 'string') {
            pt = parser.graph.point(0, 0, name).projection(A, to)
        } else {
            return []
        }

        pt.fill('black')
        // pt.label.displayName = name
        return [pt]
    }
    return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateSymmetricPoint(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    if (code.length > 0) {
        const A = parser.graph.getPoint(code[0]),
            to = !['Ox', 'Oy'].includes(code[1]) ? parser.graph.getFigure(code[1]) : code[1]

        if (A === undefined) { return [] }

        if (to instanceof Line || to instanceof Point || typeof to === 'string') {
            return [parser.graph.point(0, 0, name).symmetry(A, to)]
        }
    }
    return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generatePointFromVector(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    if (code.length > 0) {
        const kA: string = code[0]
        let AName = code[0], k

        // Get the scale
        if (kA.includes("*")) {
            [k, AName] = kA.split("*")
        } else {
            k = 1
        }

        // Get the points.
        const A = parser.graph.getPoint(AName),
            B = parser.graph.getPoint(code[1]),
            X = parser.graph.getPoint(code[2])
        let pt: Point


        if (A !== undefined && B !== undefined) {
            pt = parser.graph
                .point(0, 0, name)
                .fromVector(A, B, +k, X)
            pt.asCircle().svg.fill('black')
            // pt.label.displayName = name
            return [pt]
        }
    }

    return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generatePointFromDirection(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    let A: Point | undefined,
        d: Figure | null,
        distance: number | StepValueType
    const perp = code[3] === 'p'

    if (code.length >= 3) {
        A = parser.graph.getPoint(code[0])
        d = parser.graph.getFigure(code[1])

        if (A === undefined || d === undefined) { return [] }

        if (isNaN(+code[2])) {
            distance = getStepType(parser, code[2])
        } else {
            distance = +code[2]
        }

        if (d instanceof Line) {
            const pt = parser.graph.point(0, 0, name).fromDirection(A, d, distance, perp)
            pt.asCircle().svg.fill('black')

            return [pt]
        }
    }

    return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateMidPoint(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    if (code.length > 0) {
        const A = parser.graph.getPoint(code[0]),
            B = parser.graph.getPoint(code[1])


        if (A === undefined || B === undefined) { return [] }

        const pt = parser.graph.point(0, 0, name).middleOf(A, B)

        pt.asCircle().svg.fill('black')
        // pt.label.displayName = name
        return [pt]
    }

    return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateIntersectionPoint(parser: Parser, name: string, code: string[], options: string[]): Figure[] {
    if (code.length > 0) {
        const d1 = parser.graph.getFigure(code[0]),
            d2 = parser.graph.getFigure(code[1])

        if (d1 instanceof Line && d2 instanceof Line) {
            const pt = parser.graph.point(0, 0, name).intersectionOf(d1, d2)

            if (!isNaN(pt.x)) {
                pt.asCircle().svg.fill('black')
                return [pt]
            }
        }

        if (d1 instanceof Circle && d2 instanceof Line) {
            const pt1 = parser.graph.point(0, 0, name + '1').intersectionOf(d2, d1, 1),
                pt2 = parser.graph.point(0, 0, name + '2').intersectionOf(d2, d1, 2)
            pt1.asCircle().svg.fill('black')
            pt2.asCircle().svg.fill('black')
            return [
                pt1, pt2
            ]
        } else if (d1 instanceof Line && d2 instanceof Circle) {
            const pt1 = parser.graph.point(0, 0, name + '1').intersectionOf(d1, d2, 1),
                pt2 = parser.graph.point(0, 0, name + '2').intersectionOf(d1, d2, 2)
            pt1.asCircle().svg.fill('black')
            pt2.asCircle().svg.fill('black')
            return [
                pt1, pt2
            ]
        }
    }

    return []
}