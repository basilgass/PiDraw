import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFillBetweenConfig} from "./FillBetween.types"
import {Plot} from "../Plot/Plot"
import type {BuildResult, ParserItems} from "../../parser/parser.types"
import {isDomain} from "../../pidraw.common"
import {ParseError} from "../../errors"
import {buildError, convertIdToFigure, describeValue, PARSER_TYPE} from "../../parser/parser.common"
import {curveValues} from "../../parser/parser.curve"

// Everything the parser needs to know about the area between plots: how to build it from the code before the `->`. The figure never
// reads the syntax of the parser: it gets a config. The options (after the `->`) are not read here.

const create = 'fillbetween'

type Figures = Record<string, AbstractFigure>

const EXPECTED = 'a plot, then another plot (or nothing for the x axis), then a domain (min:max, like 0:2pi)'

/**
 * The config of the area between plots that a line of code defines (`fill`), by the values it gives, in this order:
 * - a plot;
 * - another plot, that the area is between (without it, the area goes to the x axis);
 * - a domain (`0:3`, `0:2pi`); by default the one of the plots, and if they have none what is seen.
 *
 * The options of the line (after the `->`) are not read.
 *
 * @throws ParseError if the key is not `fill`, or the values are none of those: no plot, a figure that is not a plot, a domain that
 * is not an interval of numbers (or of expressions of numbers like 2pi), more values than that.
 */
export function buildFillBetween(item: PARSER, figures: Figures): BuildResult<IFillBetweenConfig> {
    if (item.key !== PARSER_TYPE.FILL_BETWEEN.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define an area between plots`)
    }

    const [plot, ...rest] = convertIdToFigure(item.values, figures)

    if (!(plot instanceof Plot)) {
        return buildError(item, EXPECTED, item.values.length === 0 ? 'no value' : `${describeValue(item.values[0])}, which is not a plot`)
    }

    const other = rest.at(0)
    const hasOther = other !== undefined && !(typeof other === 'string' || isDomain(other))

    if (hasOther && !(other instanceof Plot)) {
        return buildError(item, EXPECTED, `${describeValue(other)}, which is not a plot`)
    }

    const domainValues = item.values.slice(hasOther ? 2 : 1)

    if (domainValues.length > 1) {
        return buildError(item, EXPECTED, item.values.map(describeValue).join(', '))
    }

    const read = curveValues(domainValues, item, 1, EXPECTED)

    if (read.samples !== undefined) {
        return buildError(item, EXPECTED, describeValue(domainValues[0]))
    }

    return {
        create,
        config: {plot, ...(hasOther ? {other} : {}), ...(read.domain === undefined ? {} : {domain: read.domain})}
    }
}

/** The kind of area between curves of the syntax, by key. */
export const FILL_BETWEEN_ITEMS: ParserItems = {
    [PARSER_TYPE.FILL_BETWEEN]: {
        name: 'fillbetween',
        description: 'Fill the area between two plots, or between a plot and the x axis',
        forms: ['z=fill <plot>[,<plot>][,<domain>]'],
        summary: 'z=fill f,g — area between curves',
        labelFields: ['area'],
        build: buildFillBetween
    }
}
