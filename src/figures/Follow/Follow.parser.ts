import type {PARSER} from "piparser"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFollowConfig} from "./Follow.types"
import {Point} from "../Point/Point"
import type {BuildResult, ParserItems} from "../../parser/parser.types"
import {ParseError} from "../../errors"
import {ALTERNATIVE, buildError, convertIdToFigure, describeValue, isAlternative, PARSER_TYPE} from "../../parser/parser.common"

// Everything the parser needs to know about the point that follows the mouse along a figure: how to build it from the code before the
// `->`. The figure never reads the syntax of the parser: it gets a config. The options (after the `->`) are not read here.

const create = 'follow'

type Figures = Record<string, AbstractFigure>

const EXPECTED = `a line, a circle or a curve to follow, then a point where to start, and a last ${ALTERNATIVE} to draw the tangent`

/**
 * The config of the point that follows the mouse, that a line of code defines (`follow`), by the values it gives:
 * - `f`: the point follows the figure `f` (a line, a circle, a plot, a parametric curve);
 * - `f,A`: the point starts where `f` is the closest to the point `A` (by default at the origin);
 * - `f,*` or `f,A,*`: with a last `*`, the tangent of `f` at the point is drawn too.
 *
 * The options of the line (after the `->`) are not read.
 *
 * @throws ParseError if the key is not `follow`, or the values are none of those: no figure, a figure that cannot be followed, a
 * starting position that is not a point, more values than that.
 */
export function buildFollow(item: PARSER, figures: Figures): BuildResult<IFollowConfig> {
    if (item.key !== PARSER_TYPE.FOLLOW.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a point that follows a figure`)
    }

    const values = convertIdToFigure(item.values, figures)
    const tangent = isAlternative(values.at(-1))
    const given = tangent ? values.slice(0, -1) : values
    const target = given.at(0)
    const at = given.at(1)

    if (!(target instanceof AbstractFigure)) {
        return buildError(item, EXPECTED, values.length === 0 ? 'no value' : describeValue(values[0]))
    }

    if (!target.followable) {
        return buildError(item, EXPECTED, `${describeValue(target)}, which cannot be followed`)
    }

    if ((at !== undefined && !(at instanceof Point)) || given.length > 2) {
        return buildError(item, EXPECTED, values.map(describeValue).join(', '))
    }

    return {create, config: {follow: target, ...(at === undefined ? {} : {at}), ...(tangent ? {tangent} : {})}}
}

/** The kind of follower of the syntax, by key. */
export const FOLLOW_ITEMS: ParserItems = {
    [PARSER_TYPE.FOLLOW]: {
        name: 'follow',
        description: `Create a point that follows the mouse along a line, a circle or a curve (a last ${ALTERNATIVE} draws the tangent too)`,
        forms: [`t=follow <figure>[,<point>][,${ALTERNATIVE}]`],
        summary: 'F=follow f — point on a curve',
        build: buildFollow
    }
}
