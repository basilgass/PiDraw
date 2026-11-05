import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IParametricConfig} from "./Parametric.types"
import type {BuildResult, ParserItems} from "../../parser/parser.types"
import {ParseError} from "../../errors"
import {buildError, describeValue, PARSER_TYPE} from "../../parser/parser.common"
import {curveValues, splitFunction} from "../../parser/parser.curve"

// Everything the parser needs to know about parametric curves: how to build them from the code before the `->`, and how to read
// their shorthand (`f(t)=cos(t),sin(t)`). A curve never reads the syntax of the parser: it gets a config. The options (after the
// `->`) are not read here.

const create = 'parametric'

type Figures = Record<string, AbstractFigure>

const EXPECTED = 'two functions of t (x then y), then a domain (min:max, like 0:2pi) and a number of samples per unit (@50)'

/**
 * The config of the parametric curve that a line of code defines (`parametric`): the function of `x` and the function of `y`
 * as text (a number is a constant), then, in any order, a domain `min:max` where each bound is a number or an expression of
 * numbers (`-1.5:2.5`, `0:2pi`, `.5pi:pi`), and a number of samples per unit of `t` (`@50`). The options of the line (after
 * the `->`) are not read.
 *
 * @throws ParseError if the key is not `parametric`, or the values are none of those: not two functions, a value that is
 * not a domain or a number of samples, more than one domain, a number of samples that is not greater than 0.
 */
export function buildParametric(item: PARSER, _figures: Figures): BuildResult<IParametricConfig> {
    if (item.key !== PARSER_TYPE.PARAMETRIC.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a parametric curve`)
    }

    // The functions are read as they are written: the name of a figure in them is not that figure.
    const x = splitFunction(item.values.at(0))
    const y = splitFunction(item.values.at(1))

    if (x === null || y === null || x.text.trim() === '' || y.text.trim() === '') {
        return buildError(item, EXPECTED, item.values.length === 0 ? 'no value' : item.values.map(describeValue).join(', '))
    }

    // The samples can be at the end of any of the values (`sin(t)@50`, `0:2pi@50`).
    const {domain, samples} = curveValues([...x.samples, ...y.samples, ...item.values.slice(2)], item, 1, EXPECTED)

    return {
        create,
        config: {
            expressions: {x: x.text, y: y.text},
            ...(domain === undefined ? {} : {domain}),
            ...(samples === undefined ? {} : {samples})
        }
    }
}

/** The shorthand of a parametric curve: a name of a letter and digits, `(t)`, and the functions. */
const PARAMETRIC_SHORTHAND = /^([a-z][0-9]*)\(t\)/

/**
 * `f(t)=cos(t),sin(t)`, the shorthand of `f=parametric cos(t),sin(t)`: the name and `(t)`, then `=` and the functions with their
 * domain and samples (`f(t)=cos(t),sin(t),0:2pi`).
 *
 * @returns the line in its standard form, or `null` if the text is not the shorthand of a parametric curve.
 * @throws ParseError if it is, but it has no `=`, or nothing after it.
 */
export function parseParametricShorthand(text: string): string | null {
    const match = PARAMETRIC_SHORTHAND.exec(text)

    if (match === null) {
        return null
    }

    const rest = text.slice(match[0].length)

    if (!rest.startsWith('=') || rest.slice(1).trim() === '') {
        throw new ParseError(`Cannot read the curve "${text}": expected ${match[1]}(t)=<function of x>,<function of y>`)
    }

    return `${match[1]}=${PARSER_TYPE.PARAMETRIC} ${rest.slice(1)}`
}

/** The kind of parametric curve of the syntax, by key. */
export const PARAMETRIC_ITEMS: ParserItems = {
    [PARSER_TYPE.PARAMETRIC]: {
        name: 'parametric',
        description: 'Plot a parametric function',
        forms: ['f(t)=<function_x>,<function_y>[,<domain>][@<number>]', 'f=parametric <function_x>,<function_y>[,<domain>][,@<number>]'],
        summary: 'f=parametric x(t),y(t) — parametric curve',
        build: buildParametric
    }
}
