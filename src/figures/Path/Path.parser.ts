import type {PARSER} from "piparser"
import {ParseError} from "../../errors"
import {parsePath} from "../../calculus"
import type {IPathConfig} from "./Path.types"
import type {BuildResult, ParserItems} from "../../parser/parser.types"
import {buildError, describeValue, PARSER_TYPE} from "../../parser/parser.common"

// Everything the parser needs to know about the path of the SVG: how to build it from the code before the `->`. The figure never reads
// the syntax of the parser: it gets a config. The options (after the `->`) are not read here.

const EXPECTED = 'the data of an SVG path in units of the coordinate system, like M 0,0 L 2,1 Q 3,3 4,0 Z'

/**
 * The config of the path that a line of code defines (`path`): the data of an SVG path, written in units of the coordinate system
 * (`p=path M 0,0 L 2,1 C 3,3 4,3 5,1 A 1,1 0 0 1 6,2 Z`). The commas of the line cut the data, which are put back together: the commas
 * of the data are kept, so what the line shows is the path (`M 0,0 L 2,1` is the data `M 0,0 L 2,1`).
 *
 * The options of the line (after the `->`) are not read.
 *
 * @throws ParseError if the key is not `path`, there is no value, a value is not a number or a text, or the data are not those of an
 * SVG path (it does not begin with `M`, a command does not exist, a number is missing...).
 */
export function buildPath(item: PARSER): BuildResult<IPathConfig> {
    if (item.key !== PARSER_TYPE.PATH.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a path`)
    }

    if (item.values.length === 0 || item.values.some(value => typeof value !== 'string' && typeof value !== 'number')) {
        return buildError(item, EXPECTED, item.values.length === 0 ? 'no value' : item.values.map(describeValue).join(', '))
    }

    const d = item.values.map(String).join(',')

    try {
        parsePath(d)
    } catch (error) {
        if (error instanceof ParseError) {
            throw new ParseError(`Cannot build "${item.name}" (${item.key}): ${error.message}`, {cause: error})
        }

        throw error
    }

    return {create: 'path', config: {d, units: true}}
}

/** The kind of path of the syntax, by key. */
export const PATH_ITEMS: ParserItems = {
    [PARSER_TYPE.PATH]: {
        name: 'path',
        description: 'Draw an SVG path, written in units of the coordinate system',
        forms: ['p=path M 0,0 L 2,1 Q 3,3 4,0 Z'],
        summary: 'p=path d — SVG path',
        build: buildPath
    }
}
