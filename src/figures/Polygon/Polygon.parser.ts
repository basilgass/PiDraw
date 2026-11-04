import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IPolygonConfig, PolygonRadius} from "./Polygon.types"
import type {BuildResult, IParserValues} from "../../parser/parser.types"
import {ParseError} from "../../errors"
import {
    buildError,
    convertIdToFigure,
    describeValue,
    isPoint,
    parseRadius,
    PARSER_TYPE
} from "../../parser/parser.common"

// Everything the parser needs to know about polygons: how to build them from the code before the `->`. A polygon never reads the
// syntax of the parser: it gets a config. The options (after the `->`) are not read here.

const create = 'polygon'

type Figures = Record<string, AbstractFigure>

const EXPECTED = 'three points or more, a center with a radius (a number or A:B) and a number of sides, or two points and a number '
    + 'of sides; the number of sides can be followed by the step of a star (5,2)'

/** A number of sides or a step, that must be an integer. @throws ParseError if it is not one. */
function integer(value: IParserValues | undefined, item: PARSER, what: string): number {
    if (typeof value === 'number' && Number.isInteger(value)) {
        return value
    }

    return buildError(item, EXPECTED, `${describeValue(value)} as the ${what} (an integer)`)
}

/** The radius of a regular polygon: a number, or `A:B`, the distance between two points. A point alone is not one (it is a vertex). */
function radiusOf(value: IParserValues | undefined, figures: Figures): PolygonRadius | null {
    const radius = parseRadius(value, figures)

    return typeof radius === 'number' || (radius !== null && 'point1' in radius) ? radius : null
}

/**
 * The config of the polygon that a line of code defines (`poly`), by the values it gives:
 * - `A,B,C,…`: the polygon through three points or more;
 * - `A,4,5`: the regular polygon of center `A`, radius 4 (a number in units of the x axis, or `B:C`, the distance between two
 *   points) and 5 sides;
 * - `A,B,5`: the regular polygon of 5 sides that has `[AB]` for a side, on the left of `A` to `B`;
 * - `A,4,5,2` and `A,B,5,2`: the regular star polygon `{5/2}`, the pentagram.
 *
 * The options of the line (after the `->`) are not read.
 *
 * @throws ParseError if the key is not `poly`, or the values are none of those: fewer than 3 points, a number of sides or a step
 * that is not an integer, a radius that is neither a number nor `A:B`, more values than a form has.
 */
export function buildPolygon(item: PARSER, figures: Figures): BuildResult<IPolygonConfig> {
    if (item.key !== PARSER_TYPE.POLYGON.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a polygon`)
    }

    const values = convertIdToFigure(item.values, figures)
    const failure = () => buildError(item, EXPECTED, values.length === 0 ? 'no value' : values.map(describeValue).join(', '))

    if (values.every(isPoint)) {
        return values.length >= 3 ? {create, config: {vertices: values}} : failure()
    }

    const [first, second, sides, star, ...spare] = values as (IParserValues | undefined)[]

    if (!isPoint(first) || sides === undefined || spare.length > 0) {
        return failure()
    }

    const steps = star === undefined ? {} : {star: integer(star, item, 'step of the star')}

    if (isPoint(second)) {
        return {create, config: {onSide: {A: first, B: second, sides: integer(sides, item, 'number of sides'), ...steps}}}
    }

    const radius = radiusOf(second, figures)

    return radius === null
        ? failure()
        : {create, config: {regular: {center: first, radius, sides: integer(sides, item, 'number of sides'), ...steps}}}
}
