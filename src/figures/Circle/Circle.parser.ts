import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {ICircleConfig} from "./Circle.types"
import type {buildInterface} from "../../pidraw.common"
import {ParseError} from "../../errors"
import {
    ALTERNATIVE,
    buildError,
    convertIdToFigure,
    describeValue,
    type IParserValues,
    isAlternative,
    isLine,
    isPoint,
    parsePointPair,
    parseRadius,
    PARSER_TYPE
} from "../../parser/parser.common"

// Everything the parser needs to know about circles: how to build them from the code before the `->`. A circle never reads
// the syntax of the parser: it gets a config. The options (after the `->`) are not read here.

const create = 'circle'

type Figures = Record<string, AbstractFigure>

const EXPECTED =
    `a center and a radius (a number, a point or A:B), a center and a line or an axis, three points (with a last ${ALTERNATIVE} for the inscribed circle), or A:B for a diameter`

/**
 * The config of the circle that a line of code defines (`circ`), by the values it gives:
 * - `O,3`, `O,A` or `O,A:B`: the center, and a radius that is a number (in units of the x axis), a point of the circle, or the
 *   distance between two points;
 * - `O,d`, `O,Ox` or `O,Oy`: the circle of that center that is tangent to the line `d`, or to an axis;
 * - `A,B,C`: the circle that goes through three points; with a last `*` (`A,B,C,*`), the circle inscribed in the triangle;
 * - `A:B`: the circle that has the segment `AB` for diameter.
 *
 * The options of the line (after the `->`) are not read.
 *
 * @throws ParseError if the key is not `circ`, or the values are none of those: number of values, type of figure, a name
 * that is not a point in `A:B`, a last value that is not `*`.
 */
export function buildCircle(item: PARSER, figures: Figures): buildInterface<ICircleConfig> {
    if (item.key !== PARSER_TYPE.CIRCLE.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a circle`)
    }

    const values = convertIdToFigure(item.values, figures)

    return {create, config: circleOf(values, item, figures)}
}

function circleOf(values: IParserValues[], item: PARSER, figures: Figures): ICircleConfig {
    const failure = () => buildError(item, EXPECTED, values.length === 0 ? 'no value' : values.map(describeValue).join(', '))

    if (values.length === 1) {
        const pair = parsePointPair(values[0], figures)

        return pair === null ? failure() : {diameter: {A: pair[0], B: pair[1]}}
    }

    if (values.length === 2) {
        const [center, second] = values

        if (!isPoint(center)) {
            return failure()
        }

        if (isLine(second)) {
            return {tangent: {center, to: second}}
        }

        const radius = parseRadius(second, figures)

        return radius === null ? failure() : {center, radius}
    }

    if (values.length === 3 || values.length === 4) {
        const [A, B, C, alternative] = values as (IParserValues | undefined)[]

        if (isPoint(A) && isPoint(B) && isPoint(C)) {
            if (values.length === 3) {
                return {through: {A, B, C}}
            }

            if (isAlternative(alternative)) {
                return {inscribed: {A, B, C}}
            }
        }
    }

    return failure()
}
