import { Figure, IGraphConfig } from "../Figure"
import { isPoint } from "../pidraw.interface"

export enum STEP_TYPE {
    number = "number",
    point = "point",
    figure = "figure",
    option = "option"
}

export enum STEP_KIND {
    static,
    dynamic
}

export interface StepValueType {
    type: STEP_TYPE,
    kind: STEP_KIND,
    item: null | Figure | string | number | (null | Figure | number)[],
    option?: string
}

interface Parser {
    graph: IGraphConfig
}

/**
 * getStepType extract the value type.
 * It can be the following values:
 *    3 or 3.5 => a number, static
 *    3/7 => a number, static
 *    A.x => a number, dynamic
 *    A:B => distance from A ot B, dynamic
 *    A or A3 => a point, dynamic
 *    d, f1 => a figure, dynamic
 * @param value
 *
 */
export function getStepType(parser: Parser, value: string): StepValueType {
    // It's a number
    if (!isNaN(+value)) {
        return {
            type: STEP_TYPE.number,
            kind: STEP_KIND.static,
            item: +value
        }
    }

    // It's a number as fraction
    if (value.includes('/')) {
        const [den, num] = value.split("/"),
            v = +num / +den

        if (!isNaN(v)) {
            return {
                type: STEP_TYPE.number,
                kind: STEP_KIND.static,
                item: v
            }
        }
    }

    // It's a dynamic number based on a plot
    if (value.match(/[a-z]\(.*/)) {
        const v = getStepType(parser, value.split('(')[1].split(')')[0]).item as number
        const f = parser.graph.getFigure(value.split('(')[0])

        if (f === null) { return { type: STEP_TYPE.option, kind: STEP_KIND.static, item: value } }

        return {
            type: STEP_TYPE.number,
            kind: STEP_KIND.dynamic,
            item: [f, v],
            option: 'function'
        }
    }

    // It's a dynamic number based on a point
    if (value.endsWith('.x') || value.endsWith('.y')) {
        const [name, option] = value.split('.'),
            A = parser.graph.getPoint(name)

        if (A !== null) {
            return {
                type: STEP_TYPE.number,
                kind: STEP_KIND.dynamic,
                item: A,
                option
            }
        }
    }

    // It's a dynamic number bases on a distance between two points (or a point and an object).
    if (value.includes(':')) {
        let [nameA, nameB] = value.split(":"),
            direction = 1

        if (nameA.startsWith('-')) {
            direction = -1
            nameA = nameA.substring(1)
        }

        const A = parser.graph.getPoint(nameA),
            B = parser.graph.getPoint(nameB)

        if (A !== null && B !== null) {
            return {
                type: STEP_TYPE.number,
                kind: STEP_KIND.dynamic,
                item: [A, B, direction],
                option: 'distance'
            }
        }
    }

    // Get the figure or maybe the point
    const F = parser.graph.getFigure(value)


    if (F !== null) {
        return {
            type: (isPoint(F)) ? STEP_TYPE.point : STEP_TYPE.figure,
            kind: STEP_KIND.dynamic,
            item: F
        }
    }

    // Get anything else...
    return {
        type: STEP_TYPE.option,
        kind: STEP_KIND.static,
        item: value
    }
}

export function parseStep(parser: Parser, step: string, template: STEP_TYPE[]): (Figure | number | string)[] {
    const data = step.split(',')
    const figures: (Figure | number | string)[] = []


    if (data.length === 1) {
        // Handle special cases
        // TODO: parseStep: handel special case when data is of length 1.
    }

    for (let i = 0; i < template.length; i++) {
        if (data.length < i) { return figures }

        if (data.length < i || data[i] === "") { return [] }

        if (template[i] === STEP_TYPE.number) {
            // can be a
            // number 3 or 3.5
            // fraction 2/5
            // point coordinate A.x or A.y
            // a distance between two points A:B
            // a calculation ?

            if (!isNaN(+data[i])) {
                figures.push(+data[i])
            } else if (data[i].includes("/")) {
                const [num, den] = data[i].split('/'),
                    v = +num / +den
                if (!isNaN(v)) {
                    figures.push(+v)
                }
            } else if (typeof data[i] === 'string' && data[i].endsWith('.x') || data[i].endsWith('.y')) {
                const pt = parser.graph.getPoint(data[i].split('.')[0])
                if (pt !== null) {
                    // TODO: update .x .y coordinates
                    // figures.push(data[i].endsWith('.x') ? pt.coord.x : pt.coord.y)
                }
            } else if (data[i].includes(':')) {
                const [Aname, Bname] = data[i].split(':'),
                    A = parser.graph.getPoint(Aname),
                    B = parser.graph.getPoint(Bname)

                if (A !== null && B !== null) {
                    // TODO: update distanceToUnit
                    // figures.push(parser.graph.distanceToUnit(A.getDistanceTo(B)))
                }
            } else {
                console.warn(`Unsupported number value for ${data[i]}`)
            }
        }

        if (template[i] === STEP_TYPE.point) {
            // can be
            // - a simple point by name A, A2, ...
            // - a point on a line.
            // - a point on a circle
            const F = parser.graph.getPoint(data[i])
            if (F !== null) {
                figures.push(F)
            } else {
                // Special case... to be done.
                console.warn(`Unsupported point value for ${data[i]}`)
            }
        }

        if (template[i] === STEP_TYPE.figure) {
            const F = parser.graph.getFigure(data[i])
            if (F !== null) {
                figures.push(F)
            } else {
                console.warn(`Unsupported figure value for ${data[i]}`)
            }
        }
    }
    return figures
}