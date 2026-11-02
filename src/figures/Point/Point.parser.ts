import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {Circle} from "../Circle/Circle"
import {Line} from "../Line/Line"
import {Plot} from "../Plot/Plot"
import {Point} from "./Point"
import type {IPointConfig, PointCoordinateType} from "./Point.types"
import type {buildInterface} from "../../pidraw.common"
import {InvalidArgumentError, OptionError, ParseError} from "../../errors"
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
    parsePointPair,
    PARSER_TYPE,
    type PointShapeOption
} from "../../parser/parser.common"

// Everything the parser needs to know about points: how to build them from the code before the `->`, and how to apply the
// options of their shape after it. A point never reads the syntax of the parser: it gets a config.

const create = 'point'

type Figures = Record<string, AbstractFigure>

/** Builds the config of a point from the values of the line of code, already converted to figures. */
type PointBuilder = (values: IParserValues[], item: PARSER, figures: Figures) => IPointConfig

/**
 * A coordinate of a point: a number, `A.x` or `A.y` (the abscissa or ordinate of a point) or `A:B` (the distance between two points).
 * @throws ParseError for anything else, a point or an axis that does not exist included.
 */
function parseCoordinate(value: IParserValues | undefined, item: PARSER, figures: Figures): PointCoordinateType {
    const expected = 'a number, <point>.x, <point>.y or <point>:<point>'
    const named = (name: string) => Object.hasOwn(figures, name) ? figures[name] : undefined

    if (typeof value === 'number') {
        return value
    }

    if (typeof value === 'string' && value.includes('.')) {
        const [name, axis] = value.split('.')
        const point = named(name)

        if (point instanceof Point && (axis === 'x' || axis === 'y')) {
            return {point, axis}
        }
    }

    const pair = parsePointPair(value, figures)

    if (pair !== null) {
        return {point1: pair[0], point2: pair[1]}
    }

    return buildError(item, expected, describeValue(value))
}

/** One builder per key of the parser that defines a point. */
const POINT_BUILDERS: Record<string, PointBuilder> = {
    [PARSER_TYPE.POINT]: (values, item, figures) => {
        expectCount(item, values, 2, 2, 'two coordinates (x,y)')

        return {
            coordinates: {
                x: parseCoordinate(values[0], item, figures),
                y: parseCoordinate(values[1], item, figures)
            }
        }
    },

    [PARSER_TYPE.MIDDLE]: (values, item) => {
        expectCount(item, values, 2, 2, 'two points')
        const [A, B] = values

        if (isPoint(A) && isPoint(B)) {
            return {middle: {A, B}}
        }

        return buildError(item, 'two points', `${describeValue(A)} and ${describeValue(B)}`)
    },

    [PARSER_TYPE.PROJECTION]: (values, item) => {
        expectCount(item, values, 2, 2, 'a point and a line or an axis')
        const [point, axis] = values

        if (isPoint(point) && isLine(axis)) {
            return {projection: {point, axis}}
        }

        return buildError(item, 'a point and a line or an axis', `${describeValue(point)} and ${describeValue(axis)}`)
    },

    [PARSER_TYPE.SYMMETRY]: (values, item) => {
        expectCount(item, values, 2, 2, 'a point and a point, a line or an axis')
        const [A, B] = values

        if (isPoint(A) && (isPoint(B) || isLine(B))) {
            return {symmetry: {A, B}}
        }

        return buildError(item, 'a point and a point, a line or an axis', `${describeValue(A)} and ${describeValue(B)}`)
    },

    [PARSER_TYPE.DIRECTION_POINT]: (values, item) => {
        const expected = `a point, a line or an axis, a distance and, to be perpendicular, a last ${ALTERNATIVE}`
        expectCount(item, values, 3, 4, expected)
        const [point, direction, distance, alternative] = values as (IParserValues | undefined)[]

        if (isPoint(point) && isLine(direction) && typeof distance === 'number' && (alternative === undefined || isAlternative(alternative))) {
            return {direction: {point, direction, distance, perpendicular: alternative !== undefined}}
        }

        return buildError(item, expected, `${describeValue(point)}, ${describeValue(direction)} and ${describeValue(distance)}`)
    },

    [PARSER_TYPE.VECTOR_POINT]: (values, item) => {
        const expected = 'two points, then optionally a scale (a number) and a starting point'
        expectCount(item, values, 2, 4, expected)
        const [A, B, scale, start] = values as (IParserValues | undefined)[]

        if (isPoint(A) && isPoint(B) && (scale === undefined || typeof scale === 'number') && (start === undefined || isPoint(start))) {
            return {direction: {point: start ?? A, direction: {A, B}, distance: scale ?? 1}}
        }

        return buildError(item, expected, values.map(describeValue).join(', '))
    },

    [PARSER_TYPE.EVAL_FX]: (values, item, figures) => {
        expectCount(item, values, 2, 2, 'a curve and an abscissa')
        const [fx] = values

        if (fx instanceof Plot) {
            return {evaluation: {fx, x: parseCoordinate(values[1], item, figures)}}
        }

        return buildError(item, 'a curve and an abscissa', `${describeValue(fx)} as a curve`)
    }
}

/**
 * The config of the point that a line of code defines (`pt`, `mid`, `proj`, `sym`, `dpt`, `vpt`, `eval`). The options of the
 * line (after the `->`) are not read: see {@link applyPointShapeOption}.
 *
 * @throws ParseError if the key is not one of a point, or the values are not those the key expects (number, type, kind of figure).
 */
export function buildPoint(item: PARSER, figures: Figures): buildInterface<IPointConfig> {
    const build = Object.hasOwn(POINT_BUILDERS, item.key) ? POINT_BUILDERS[item.key] : undefined

    if (build === undefined) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a point`)
    }

    return {create, config: build(convertIdToFigure(item.values, figures), item, figures)}
}

/**
 * The points of the intersection of two figures (`inter`): one for two lines or axes, two (by index) when a circle is involved.
 *
 * @throws ParseError if the line does not give two lines or axes, a circle and a line, or two circles.
 */
export function buildIntersection(item: PARSER, figures: Figures): buildInterface<IPointConfig>[] {
    const expected = 'two figures: two lines or axes, a circle and a line, or two circles'

    if (item.key !== PARSER_TYPE.INTERSECTION.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key is not an intersection`)
    }

    const values = convertIdToFigure(item.values, figures)
    expectCount(item, values, 2, 2, expected)
    const [A, B] = values

    if (isLine(A) && isLine(B)) {
        return [{create, config: {intersection: {A, B}}}]
    }

    if (A instanceof Circle && B instanceof Circle) {
        return [0, 1].map(index => ({create, config: {intersectionBetweenCircles: {A, B, index}}}))
    }

    const circle = A instanceof Circle ? A : B
    const line = A instanceof Circle ? B : A

    if (circle instanceof Circle && line instanceof Line) {
        return [0, 1].map(index => ({create, config: {intersectionWithCircle: {A: circle, B: line, index}}}))
    }

    return buildError(item, expected, `${describeValue(A)} and ${describeValue(B)}`)
}

/** How each option of the shape of a point sets its shape, with a size or the default one. */
const SHAPE_OPTIONS: Record<PointShapeOption, (point: Point, size?: number) => Point> = {
    'o': (point, size) => point.asCircle(size),
    's': (point, size) => point.asSquare(size),
    '*': (point, size) => point.asCrosshair(size)
}

/**
 * Apply an option of the shape of a point: `o` (circle), `s` (square) or `*` (crosshair), alone for the default size or
 * with a size (`o=8`).
 *
 * @param value `true` for the default size of the shape, or the size.
 * @throws OptionError if the figure is not a point, or the size is not a number greater than 0.
 */
export function applyPointShapeOption(figure: AbstractFigure, option: PointShapeOption, value: unknown): void {
    if (!(figure instanceof Point)) {
        throw new OptionError(option, `The option "${option}" sets the shape of a point, and "${figure.name}" is not a point`)
    }

    if (value !== true && typeof value !== 'number') {
        throw new OptionError(
            option,
            `Invalid value ${describeValue(value)} for the option "${option}" of "${figure.name}": expected a size, a number greater than 0`
        )
    }

    try {
        SHAPE_OPTIONS[option](figure, value === true ? undefined : value)
    } catch (error) {
        if (error instanceof InvalidArgumentError) {
            throw new OptionError(option, `Invalid option "${option}" of "${figure.name}": ${error.message}`, {cause: error})
        }

        throw error
    }
}

/**
 * `A(3,4)`, the shorthand of `A=pt 3,4`: a name (a capital letter and digits) and the values in parentheses, all kept.
 *
 * @returns the line of code in its standard form, or `null` if the text is not this shorthand.
 */
export function parsePointShorthand(keyCode: string): string | null {
    const match = /^([A-Z][0-9]*)\((.*)\)$/.exec(keyCode)

    if (match === null) {
        return null
    }

    return `${match[1]}=pt ${match[2].split(',').map(value => value.trim()).join(',')}`
}
