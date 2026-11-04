import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {Bezier} from "./Bezier"
import type {BezierDirection, BezierPoint, IBezierConfig} from "./Bezier.types"
import {Point} from "../Point/Point"
import type {BuildResult, FigureOptionHandler} from "../../parser/parser.types"
import {InvalidArgumentError, OptionError, ParseError} from "../../errors"
import {ALTERNATIVE, buildError, describeValue, isAlternative, PARSER_TYPE} from "../../parser/parser.common"

// Everything the parser needs to know about Bézier curves: how to build them from the code before the `->`, and how to apply the option
// that closes them (after the `->`). A curve never reads the syntax of the parser: it gets a config.

const create = 'bezier'

type Figures = Record<string, AbstractFigure>

const EXPECTED = 'two points or more, each one a name that can be followed by a direction (H, V, S, or an angle in degrees) and a ratio '
    + `(A/H/0.4, B/45/0.3), or, with a last ${ALTERNATIVE}, 3 or 4 control points`

/** The point of the drawing that a name stands for, or `null`. */
function pointOf(name: string, figures: Figures): Point | null {
    const figure = Object.hasOwn(figures, name) ? figures[name] : undefined

    return figure instanceof Point ? figure : null
}

/** A number written as text (`45`, `-30`, `0.5`), or `null`. */
function numberOf(text: string): number | null {
    const value = +text

    return text.trim() === '' || !Number.isFinite(value) ? null : value
}

/** The direction written after the name of a point: `H`, `V`, `S` (smooth, the default), or an angle in degrees. */
function directionOf(text: string): BezierDirection | undefined | null {
    switch (text) {
        case 'H':
            return 'horizontal'
        case 'V':
            return 'vertical'
        case 'S':
            return undefined
        default:
            return numberOf(text)
    }
}

/** A point of a smooth curve: `A`, `A/H`, `A/45`, `A/H/0.4`. @throws ParseError if the name, the direction or the ratio is not valid. */
function throughPoint(text: unknown, item: PARSER, figures: Figures): BezierPoint {
    const parts = typeof text === 'string' ? text.split('/') : []
    const name = parts.at(0)
    const control = parts.at(1)
    const ratioText = parts.at(2)
    const point = name === undefined ? null : pointOf(name, figures)

    if (point === null) {
        return buildError(item, EXPECTED, `${describeValue(text)} as a point`)
    }

    const direction = control === undefined ? undefined : directionOf(control)
    const ratio = ratioText === undefined ? undefined : numberOf(ratioText)

    if (direction === null || parts.length > 3) {
        return buildError(item, EXPECTED, `${describeValue(text)} (the direction must be H, V, S or an angle in degrees)`)
    }

    if (ratio === null || (ratio !== undefined && ratio <= 0)) {
        return buildError(item, EXPECTED, `${describeValue(text)} (the ratio must be a number greater than 0)`)
    }

    return {point, ...(direction === undefined ? {} : {direction}), ...(ratio === undefined ? {} : {ratio})}
}

/**
 * The config of the Bézier curve that a line of code defines (`bezier`), by the values it gives:
 * - `A,B/H,C/45/0.4,D`: the smooth curve through the points; after a name, a direction (`H` horizontal, `V` vertical, `S` smooth, or an
 *   angle in degrees) and a ratio (how far the control points are, 0.2 by default);
 * - `A,B,C,D,*`: with a last `*`, the curve pulled by 3 or 4 control points (it goes through the first and the last only).
 *
 * The options of the line (after the `->`) are not read: see {@link applyBezierOption}.
 *
 * @throws ParseError if the key is not `bezier`, or the values are none of those: fewer than 2 points, a name that is not a point of
 * the drawing, a direction or a ratio that is not valid, a number of control points that is not 3 or 4.
 */
export function buildBezier(item: PARSER, figures: Figures): BuildResult<IBezierConfig> {
    if (item.key !== PARSER_TYPE.BEZIER.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a Bézier curve`)
    }

    const alternative = isAlternative(item.values.at(-1))
    const values = alternative ? item.values.slice(0, -1) : item.values

    if (alternative) {
        const controls = values.map(value => typeof value === 'string' ? pointOf(value, figures) : null)

        if ((controls.length !== 3 && controls.length !== 4) || controls.some(point => point === null)) {
            return buildError(item, EXPECTED, values.length === 0 ? 'no value' : values.map(describeValue).join(', '))
        }

        return {create, config: {controls: controls as Point[]}}
    }

    if (values.length < 2) {
        return buildError(item, EXPECTED, values.length === 0 ? 'no value' : describeValue(values[0]))
    }

    return {create, config: {through: values.map(value => throughPoint(value, item, figures))}}
}

/** The options of the parser that shape a Bézier curve. */
const BEZIER_OPTIONS = {
    close: (curve: Bezier) => curve.asClosed()
}

export type BezierOption = keyof typeof BEZIER_OPTIONS

/** The options of the parser that shape a Bézier curve: `close` (the last point is joined to the first one). */
export const BEZIER_OPTION_NAMES = Object.keys(BEZIER_OPTIONS) as BezierOption[]

/**
 * Apply an option that shapes a Bézier curve: `close` joins the last point to the first one, smoothly. It takes no value.
 *
 * @throws OptionError if the figure is not a Bézier curve, the option is given a value, or the curve cannot be closed (it is
 * pulled by control points, or goes through fewer than 3 points).
 */
export function applyBezierOption(figure: AbstractFigure, option: BezierOption, value: unknown): void {
    if (!(figure instanceof Bezier)) {
        throw new OptionError(option, `The option "${option}" shapes a Bézier curve, and "${figure.name}" is not one`)
    }

    if (value !== true) {
        throw new OptionError(option, `Invalid value ${describeValue(value)} for the option "${option}" of "${figure.name}": it takes no value`)
    }

    try {
        BEZIER_OPTIONS[option](figure)
    } catch (error) {
        if (error instanceof InvalidArgumentError) {
            throw new OptionError(option, `Invalid option "${option}" of "${figure.name}": ${error.message}`, {cause: error})
        }

        throw error
    }
}

/** The options of the parser that shape a Bézier curve, ready for the registry of options. */
export const BEZIER_OPTION_HANDLERS: Record<BezierOption, FigureOptionHandler> = {
    close: (figure, {value}) => { applyBezierOption(figure, 'close', value) }
}
