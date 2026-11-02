import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {Plot} from "../Plot/Plot"
import type {ILineConfig, ILineType} from "./Line.types"
import type {buildInterface} from "../../pidraw.common"
import {ParseError} from "../../errors"
import {toNumber} from "../../calculus"
import {
    ALTERNATIVE,
    buildError,
    convertIdToFigure,
    describeValue,
    expectCount,
    type IParserValues,
    isAlternative,
    isLine,
    isPoint,
    PARSER_TYPE
} from "../../parser/parser.common"

// Everything the parser needs to know about lines: how to build them from the code before the `->`, and how to read their
// shorthands (`d=AB`). A line never reads the syntax of the parser: it gets a config. The options (after the `->`) are not read here.

const create = 'line'

type Figures = Record<string, AbstractFigure>

/** Builds the config of a line from the values of the line of code, already converted to figures. */
type LineBuilder = (values: IParserValues[], item: PARSER) => ILineConfig

/** A segment, a vector or a ray through two points: the shape is the one of the key. */
const throughTwoPoints = (shape: ILineType): LineBuilder => (values, item) => {
    expectCount(item, values, 2, 2, 'two points')
    const [A, B] = values

    if (isPoint(A) && isPoint(B)) {
        return {through: {A, B}, shape}
    }

    return buildError(item, 'two points', `${describeValue(A)} and ${describeValue(B)}`)
}

/** A slope: a number, or a fraction written as text (`1/2`). @throws ParseError for anything else. */
function parseSlope(value: number | string, item: PARSER): number {
    try {
        return toNumber(value)
    } catch (error) {
        if (error instanceof ParseError) {
            return buildError(item, 'a slope, a number or a fraction', describeValue(value))
        }

        throw error
    }
}

/** A perpendicular or a parallel: to a line or an axis, through a point. */
const toLineThroughPoint = (key: 'perpendicular' | 'parallel'): LineBuilder => (values, item) => {
    const expected = 'a line or an axis, and a point'
    expectCount(item, values, 2, 2, expected)
    const [to, through] = values

    if (isLine(to) && isPoint(through)) {
        return key === 'perpendicular' ? {perpendicular: {to, through}} : {parallel: {to, through}}
    }

    return buildError(item, expected, `${describeValue(to)} and ${describeValue(through)}`)
}

/** One builder per key of the parser that defines a line. */
const LINE_BUILDERS: Record<string, LineBuilder> = {
    [PARSER_TYPE.LINE]: (values, item) => {
        const expected = 'an equation, two points, or a point and a slope'
        expectCount(item, values, 1, 2, expected)

        if (values.length === 1) {
            const [equation] = values

            if (typeof equation === 'string') {
                return {equation}
            }

            return buildError(item, expected, describeValue(equation))
        }

        const [A, B] = values

        if (isPoint(A) && isPoint(B)) {
            return {through: {A, B}, shape: 'line'}
        }

        // Only a line is given by a slope: a segment, a vector and a ray need two points.
        if (isPoint(A) && (typeof B === 'number' || typeof B === 'string')) {
            return {slope: {A, slope: parseSlope(B, item)}, shape: 'line'}
        }

        return buildError(item, expected, `${describeValue(A)} and ${describeValue(B)}`)
    },

    [PARSER_TYPE.SEGMENT]: throughTwoPoints('segment'),
    [PARSER_TYPE.VECTOR]: throughTwoPoints('vector'),
    [PARSER_TYPE.RAY]: throughTwoPoints('ray'),

    [PARSER_TYPE.PERPENDICULAR]: toLineThroughPoint('perpendicular'),
    [PARSER_TYPE.PARALLEL]: toLineThroughPoint('parallel'),

    [PARSER_TYPE.MEDIATOR]: (values, item) => {
        expectCount(item, values, 2, 2, 'two points')
        const [A, B] = values

        if (isPoint(A) && isPoint(B)) {
            return {mediator: {A, B}}
        }

        return buildError(item, 'two points', `${describeValue(A)} and ${describeValue(B)}`)
    },

    [PARSER_TYPE.TANGENT]: (values, item) => {
        const expected = 'a curve and a point'
        expectCount(item, values, 2, 2, expected)
        const [f, A] = values

        if (f instanceof Plot && isPoint(A)) {
            return {tangent: {f, A}}
        }

        return buildError(item, expected, `${describeValue(f)} and ${describeValue(A)}`)
    },

    [PARSER_TYPE.BISECTOR]: (values, item) => {
        const expected = `two lines or axes (with a last ${ALTERNATIVE} for the other bisector), or three points (the vertex of the angle is the second)`
        expectCount(item, values, 2, 3, expected)
        const [first, second] = values
        const third = values.at(2)

        if (isLine(first) && isLine(second) && (third === undefined || isAlternative(third))) {
            return third === undefined ? {bisector: {d1: first, d2: second}} : {bisector: {d1: first, d2: second, alternative: true}}
        }

        if (values.length === 3 && isPoint(first) && isPoint(second) && isPoint(third)) {
            return {bisector: {A: second, B: first, C: third}}
        }

        return buildError(item, expected, values.map(describeValue).join(', '))
    }
}

/**
 * The config of the line that a line of code defines (`line`, `seg`, `vec`, `ray`, `perp`, `para`, `med`, `tan`, `bis`). The
 * options of the line (after the `->`) are not read.
 *
 * @throws ParseError if the key is not one of a line, or the values are not those the key expects (number, type of figure).
 */
export function buildLine(item: PARSER, figures: Figures): buildInterface<ILineConfig> {
    const build = Object.hasOwn(LINE_BUILDERS, item.key) ? LINE_BUILDERS[item.key] : undefined

    if (build === undefined) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a line`)
    }

    return {create, config: build(convertIdToFigure(item.values, figures), item)}
}

/** The keys that can be written without a value, so without a space after them. */
const KEYS_ALONE: string[] = [PARSER_TYPE.GRID]

/** The name of a point in a shorthand: a capital letter and digits. */
const NAME = '[A-Z][0-9]*'

/** The shorthands of a line, from the text after the `=`, and the key each one stands for. */
const SHORTHANDS: [RegExp, string][] = [
    [new RegExp(`^v(${NAME})(${NAME})$`), PARSER_TYPE.VECTOR],
    [new RegExp(`^\\[(${NAME})(${NAME})\\]$`), PARSER_TYPE.SEGMENT],
    [new RegExp(`^(${NAME})(${NAME})\\.$`), PARSER_TYPE.SEGMENT],
    [new RegExp(`^\\[(${NAME})(${NAME})\\[$`), PARSER_TYPE.RAY],
    [new RegExp(`^(${NAME})(${NAME})\\[$`), PARSER_TYPE.RAY],
    [new RegExp(`^\\[(${NAME})(${NAME})$`), PARSER_TYPE.RAY],
    [new RegExp(`^(${NAME})(${NAME})$`), PARSER_TYPE.LINE]
]

/**
 * The shorthand of a line: `d=AB` (line), `d=AB.` or `d=[AB]` (segment), `d=AB[`, `d=[AB[` or `d=[AB` (ray), `d=vAB` (vector). The
 * points are two names, each a capital letter and digits (`d=A1B2`).
 *
 * @returns the line of code in its standard form (`d=seg A,B`), or `null` if the text is not a shorthand: it has no `=`, or it has
 * a space, so it is already written in full (`d=line A,B`), or it is a key alone (`g=grid`).
 * @throws ParseError if the text looks like a shorthand but is not one of those.
 */
export function parseLineShorthand(keyCode: string): string | null {
    const separator = keyCode.indexOf('=')

    if (separator <= 0 || keyCode.includes(' ')) {
        return null
    }

    const id = keyCode.slice(0, separator)
    const body = keyCode.slice(separator + 1)

    // A key that needs no value (`g=grid`) is already written in full.
    if (KEYS_ALONE.includes(body)) {
        return null
    }

    for (const [pattern, key] of SHORTHANDS) {
        const match = pattern.exec(body)

        if (match !== null) {
            return `${id}=${key} ${match[1]},${match[2]}`
        }
    }

    throw new ParseError(
        `Cannot read "${keyCode}" as a line: expected two points, like AB, AB., [AB], AB[, [AB[ or vAB, after the "="`
    )
}
