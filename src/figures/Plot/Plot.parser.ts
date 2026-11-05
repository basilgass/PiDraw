import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IPlotConfig} from "./Plot.types"
import type {BuildResult, ParserItems} from "../../parser/parser.types"
import {ParseError} from "../../errors"
import {buildError, convertIdToFigure, describeValue, isPoint, PARSER_TYPE} from "../../parser/parser.common"
import {curveValues, splitFunction} from "../../parser/parser.curve"

// Everything the parser needs to know about plots: how to build them from the code before the `->`, and how to read their
// shorthand (`f(x)=x^2`). A plot never reads the syntax of the parser: it gets a config. The options (after the `->`) are not read here.

const create = 'plot'

type Figures = Record<string, AbstractFigure>

const EXPECTED = 'an expression or three points (the parabola through them), then a number of samples per unit (@50), a domain (min:max, like -2pi:2pi) and an image (min:max)'

/**
 * The config of the plot that a line of code defines (`plot`), by the values it gives:
 * - `x^2+1`: the function, as text (a number is the constant function);
 * - `A,B,C`: the parabola through three points (a line if they are aligned);
 *
 * then, in any order, a number of samples per unit of x (`@50`), a domain and an image (`-3:3`, `-2pi:2pi`, the domain first; see
 * {@link curveValues}). The options of the line (after the `->`) are not read.
 *
 * @throws ParseError if the key is not `plot`, or the values are none of those: no function, a value that is not a number or
 * a domain, a number of samples that is not greater than 0, more than one number or two domains.
 */
export function buildPlot(item: PARSER, figures: Figures): BuildResult<IPlotConfig> {
    if (item.key !== PARSER_TYPE.PLOT.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a plot`)
    }

    const [A, B, C] = convertIdToFigure(item.values.slice(0, 3), figures)

    if (isPoint(A) && isPoint(B) && isPoint(C)) {
        return {create, config: {quadratic: {A, B, C}, ...curveValues(item.values.slice(3), item, 2, EXPECTED)}}
    }

    // The function is read as it is written: the name of a figure in it is not that figure.
    const expression = splitFunction(item.values.at(0))

    if (expression === null || expression.text.trim() === '') {
        return buildError(item, EXPECTED, item.values.length === 0 ? 'no value' : describeValue(item.values[0]))
    }

    return {
        create,
        config: {expression: expression.text, ...curveValues([...expression.samples, ...item.values.slice(1)], item, 2, EXPECTED)}
    }
}

/** The shorthand of a plot: a name of a letter and digits, `(x)`, and the function. */
const PLOT_SHORTHAND = /^([a-z][0-9]*)\(x\)/

/**
 * `f(x)=x^2+1`, the shorthand of `f=plot x^2+1`: the name and `(x)`, then `=` and the function with its samples, domain and
 * image (`f(x)=sin(x)@50,-3:3`).
 *
 * @returns the line in its standard form, or `null` if the text is not the shorthand of a plot.
 * @throws ParseError if it is, but it has no `=`, or nothing after it.
 */
export function parsePlotShorthand(text: string): string | null {
    const match = PLOT_SHORTHAND.exec(text)

    if (match === null) {
        return null
    }

    const rest = text.slice(match[0].length)

    if (!rest.startsWith('=') || rest.slice(1).trim() === '') {
        throw new ParseError(`Cannot read the plot "${text}": expected ${match[1]}(x)=<function>`)
    }

    return `${match[1]}=${PARSER_TYPE.PLOT} ${rest.slice(1)}`
}

/** The kind of plot of the syntax, by key. */
export const PLOT_ITEMS: ParserItems = {
    [PARSER_TYPE.PLOT]: {
        name: 'plot',
        description: 'Plot a function, or the parabola through three points (a line if they are aligned)',
        forms: [
            'f(x)=<function>[@<number>,<domain>,<image>]',
            'f=plot <function>[@<number>,<domain>,<image>]',
            'f=plot <point>,<point>,<point>[@<number>,<domain>,<image>]'
        ],
        summary: 'f=plot expr — function (or f(x)=expr)',
        build: buildPlot
    }
}
