import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {Arc} from "./Arc"
import type {IArcConfig} from "./Arc.types"
import type {BuildResult, FigureOptionHandler, IParserValues, ParserItems} from "../../parser/parser.types"
import {OptionError, ParseError} from "../../errors"
import {
    ALTERNATIVE,
    buildError,
    convertIdToFigure,
    describeValue,
    isAlternative,
    isPoint,
    parseRadius,
    PARSER_TYPE
} from "../../parser/parser.common"

// Everything the parser needs to know about arcs: how to build them from the code before the `->`, and how to apply the
// options that shape them (after the `->`). An arc never reads the syntax of the parser: it gets a config.

const create = 'arc'

type Figures = Record<string, AbstractFigure>

const EXPECTED = `three points (start, center, end) and a radius, a center with a radius and two angles, or a center, a point and an angle `
    + `and a radius (the radius is always optional but with the two angles), all with a last ${ALTERNATIVE} for the other arc`

/**
 * The config of the arc that a line of code defines (`arc`), by the values it gives:
 * - `B,A,C` or `B,A,C,r`: the angle BAC, from AB to AC counterclockwise, around the center A (the second point); the radius
 *   `r` is a number (in units of the x axis), a point or `A:B`, by default the distance AB;
 * - `O,2,30,120`: the arc of the circle of center O and radius 2 (a number) from 30 to 120 degrees;
 * - `O,A,60` or `O,A,60,r`: the arc that A draws when it turns by 60 degrees around O (clockwise if the angle is negative).
 *
 * A last `*` (`B,A,C,*`) gives the other arc between the same directions: clockwise instead of counterclockwise. The options of the
 * line (after the `->`) are not read: see {@link applyArcOption}.
 *
 * @throws ParseError if the key is not `arc`, or the values are none of those: number of values, type of figure, a radius that
 * is none of the above, a last value that is not `*`.
 */
export function buildArc(item: PARSER, figures: Figures): BuildResult<IArcConfig> {
    if (item.key !== PARSER_TYPE.ARC.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define an arc`)
    }

    const values = convertIdToFigure(item.values, figures)
    const alternative = isAlternative(values.at(-1))
    const given = alternative ? values.slice(0, -1) : values

    const config = arcOf(given, figures) ?? buildError(item, EXPECTED, values.length === 0 ? 'no value' : values.map(describeValue).join(', '))

    return {create, config: alternative ? {...config, alternative} : config}
}

/** The construction that the values give, or `null` if they give none. */
function arcOf(values: IParserValues[], figures: Figures): IArcConfig | null {
    const [first, second, third, fourth] = values as (IParserValues | undefined)[]

    if (!isPoint(first) || values.length < 3 || values.length > 4) {
        return null
    }

    // Three points: B,A,C or B,A,C,r
    if (isPoint(second) && isPoint(third)) {
        const radius = fourth === undefined ? undefined : parseRadius(fourth, figures)

        return radius === null ? null : {points: {start: first, center: second, end: third, ...(radius === undefined ? {} : {radius})}}
    }

    // A center, a radius and two angles: O,2,30,120
    if (typeof second === 'number' && typeof third === 'number' && typeof fourth === 'number') {
        return {angles: {center: first, radius: second, from: third, to: fourth}}
    }

    // A center, a point and an angle: O,A,60 or O,A,60,r
    if (isPoint(second) && typeof third === 'number') {
        const radius = fourth === undefined ? undefined : parseRadius(fourth, figures)

        return radius === null ? null : {rotation: {center: first, start: second, angle: third, ...(radius === undefined ? {} : {radius})}}
    }

    return null
}

/** The options that shape an arc. */
const ARC_OPTIONS = {
    sector: (arc: Arc) => arc.asSector(),
    square: (arc: Arc) => arc.asSquare()
}

export type ArcOption = keyof typeof ARC_OPTIONS

/** The options of the parser that shape an arc: `sector` (closed by its radii) and `square` (a right angle as a corner). */
export const ARC_OPTION_NAMES = Object.keys(ARC_OPTIONS) as ArcOption[]

/**
 * Apply an option that shapes an arc: `sector` (closed by its two radii, to be filled) or `square` (a right angle is drawn as a
 * square corner). They take no value.
 *
 * @throws OptionError if the figure is not an arc, or the option is given a value.
 */
export function applyArcOption(figure: AbstractFigure, option: ArcOption, value: unknown): void {
    if (!(figure instanceof Arc)) {
        throw new OptionError(option, `The option "${option}" shapes an arc, and "${figure.name}" is not an arc`)
    }

    if (value !== true) {
        throw new OptionError(option, `Invalid value ${describeValue(value)} for the option "${option}" of "${figure.name}": it takes no value`)
    }

    ARC_OPTIONS[option](figure)
}

/** The options of the parser that shape an arc, ready for the registry of options. */
export const ARC_OPTION_HANDLERS: Record<ArcOption, FigureOptionHandler> = {
    sector: (figure, {value}) => { applyArcOption(figure, 'sector', value) },
    square: (figure, {value}) => { applyArcOption(figure, 'square', value) }
}

/** The kind of arc of the syntax, by key. */
export const ARC_ITEMS: ParserItems = {
    [PARSER_TYPE.ARC]: {
        name: 'arc',
        description: `Create an arc: the angle BAC from three points, a center with a radius and two angles, or a point turned around a center by an angle (a last ${ALTERNATIVE} for the other arc)`,
        forms: [
            `a=arc <point>,<point>,<point>[,<radius>][,${ALTERNATIVE}]`,
            `a=arc <point>,<number>,<number>,<number>[,${ALTERNATIVE}]`,
            `a=arc <point>,<point>,<number>[,<radius>][,${ALTERNATIVE}]`
        ],
        summary: 'a=arc B,A,C — arc',
        labelFields: ['angle', 'length', 'radius', 'area'],
        build: buildArc
    }
}
