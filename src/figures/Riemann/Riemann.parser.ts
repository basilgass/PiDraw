import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {Plot} from "../Plot/Plot"
import type {IRiemannConfig} from "./Riemann.types"
import type {BuildResult, ParserItems} from "../../parser/parser.types"
import {isDomain} from "../../pidraw.common"
import {ParseError} from "../../errors"
import {buildError, convertIdToFigure, describeValue, PARSER_TYPE} from "../../parser/parser.common"
import {curveValues} from "../../parser/parser.curve"

// Everything the parser needs to know about Riemann sums: how to build them from the code before the `->`. The figure never reads
// the syntax of the parser: it gets a config. The options (after the `->`) are not read here.

const create = 'riemann'

type Figures = Record<string, AbstractFigure>

const EXPECTED = 'a plot, then a domain (min:max, like 0:2pi), a number of rectangles and a position from 0 (left) to 1 (right)'

/**
 * The config of the Riemann sum that a line of code defines (`riemann`), by the values it gives: the plot, then in this order
 * - the domain (`0:4`, `0:2pi`), that the plot gives if it has one;
 * - the number of rectangles;
 * - the position where the plot is read in each interval, from 0 (left, the default) to 1 (right).
 *
 * Each of them can be left out from the end: `riemann f,0:4,10,0.5`, `riemann f,0:4,10`, `riemann f,0:4`, `riemann f`. A number
 * of rectangles alone is read when there is no domain: `riemann f,10`. The values are not checked here (see `checkRiemann`).
 * The options of the line (after the `->`) are not read.
 *
 * @throws ParseError if the key is not `riemann`, or the values are none of those: no plot, a figure that is not a plot, a domain
 * that is not an interval of numbers (or of expressions of numbers like 2pi), a value that is not a number, more values than that.
 */
export function buildRiemann(item: PARSER, figures: Figures): BuildResult<IRiemannConfig> {
    if (item.key !== PARSER_TYPE.RIEMANN.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a Riemann sum`)
    }

    const [plot, ...rest] = convertIdToFigure(item.values, figures)

    if (!(plot instanceof Plot)) {
        return buildError(item, EXPECTED, item.values.length === 0 ? 'no value' : `${describeValue(item.values[0])}, which is not a plot`)
    }

    // A domain is an interval, never a number.
    const hasDomain = rest.length > 0 && (typeof rest[0] === 'string' || isDomain(rest[0]))
    const numbers = hasDomain ? rest.slice(1) : rest
    const config: IRiemannConfig = {plot}

    if (hasDomain) {
        const read = curveValues([item.values[1]], item, 1, EXPECTED)

        if (read.samples !== undefined || read.domain === undefined) {
            return buildError(item, EXPECTED, describeValue(item.values[1]))
        }

        config.domain = read.domain
    }

    const rectangles = numbers.at(0)
    const position = numbers.at(1)

    if (numbers.length > 2 || numbers.some(value => typeof value !== 'number')) {
        return buildError(item, EXPECTED, item.values.map(describeValue).join(', '))
    }

    if (rectangles !== undefined) {
        config.rectangles = rectangles as number
    }

    if (position !== undefined) {
        config.position = position as number
    }

    return {create, config}
}

/** The kind of Riemann sum of the syntax, by key. */
export const RIEMANN_ITEMS: ParserItems = {
    [PARSER_TYPE.RIEMANN]: {
        name: 'riemann',
        description: 'Create the Riemann sum of a plot: rectangles from the x axis to its graph',
        forms: ['r=riemann <plot>[,<domain>][,<rectangles>][,<position>]'],
        summary: 'r=riemann f — Riemann sum',
        build: buildRiemann
    }
}
