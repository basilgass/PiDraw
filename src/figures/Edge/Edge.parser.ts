import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {Edge} from "./Edge"
import type {IEdgeConfig} from "./Edge.types"
import {Point} from "../Point/Point"
import {DEFAULT_LOOP_SIDE, EDGE_SIDES, type EdgeSide} from "../../calculus"
import type {BuildResult, FigureOptionHandler, ParserItems} from "../../parser/parser.types"
import {OptionError, ParseError} from "../../errors"
import {buildError, convertIdToFigure, describeValue, expectCount, PARSER_TYPE} from "../../parser/parser.common"

// Everything the parser needs to know about edges: how to build them from the code before the `->`, and how to apply the options that shape
// them (after the `->`). An edge never reads the syntax of the parser: it gets a config.

const create = 'edge'

type Figures = Record<string, AbstractFigure>

const EXPECTED = 'two points: the one the edge starts at, and the one it ends at (the same one twice for a loop)'

/**
 * The config of the edge that a line of code defines (`edge`): `A,B` is the edge from the point `A` to the point `B`, which stops at their
 * borders (a node has one, a place of a node like `A.mr` is a point), and `A,A` is a loop on `A`.
 *
 * The options of the line (after the `->`) are not read: see {@link EDGE_OPTION_HANDLERS}.
 *
 * @throws ParseError if the key is not `edge`, or the values are not two points of the drawing.
 */
export function buildEdge(item: PARSER, figures: Figures): BuildResult<IEdgeConfig> {
    if (item.key !== PARSER_TYPE.EDGE.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define an edge`)
    }

    const values = convertIdToFigure(item.values, figures)
    expectCount(item, values, 2, 2, EXPECTED)
    const [from, to] = values

    if (!(from instanceof Point) || !(to instanceof Point)) {
        return buildError(item, EXPECTED, values.map(describeValue).join(', '))
    }

    return {create, config: {from, to}}
}

/** @throws OptionError if the figure is not an edge. */
function edgeOf(option: string, figure: AbstractFigure): Edge {
    if (!(figure instanceof Edge)) {
        throw new OptionError(option, `The option "${option}" shapes an edge, and "${figure.name}" is not one`)
    }

    return figure
}

/**
 * The options of the parser that shape an edge: `curve=0.3` bends it (a number: a part of its length, to the left of the way when it is positive),
 * `loopSide=r` gives the side of a loop (`t`, `r`, `b` or `l`, and `loopSide` alone is `t`; `loop` and `side` are options of other figures).
 *
 * @throws OptionError if the figure is not an edge, the value is not valid, or the option does not suit the edge (a side for an edge that is
 * not a loop, a curve for a loop).
 */
export const EDGE_OPTION_HANDLERS: Record<'curve' | 'loopSide', FigureOptionHandler> = {
    curve: (figure, {value}) => {
        const edge = edgeOf('curve', figure)

        if (typeof value !== 'number') {
            throw new OptionError('curve', `Invalid value ${describeValue(value)} for the option "curve" of "${figure.name}": expected a number, a part of the length of the edge (curve=0.3)`)
        }

        edge.config = {...edge.config, curve: value}
    },

    loopSide: (figure, {value}) => {
        const edge = edgeOf('loopSide', figure)
        const side = value === true ? DEFAULT_LOOP_SIDE : value

        if (typeof side !== 'string' || !EDGE_SIDES.includes(side as EdgeSide)) {
            throw new OptionError('loopSide', `Invalid value ${describeValue(value)} for the option "loopSide" of "${figure.name}": expected ${EDGE_SIDES.join(', ')}, or nothing for ${DEFAULT_LOOP_SIDE}`)
        }

        edge.config = {...edge.config, loopSide: side as EdgeSide}
    }
}

/** The kind of edge of the syntax, by key. */
export const EDGE_ITEMS: ParserItems = {
    [PARSER_TYPE.EDGE]: {
        name: 'edge',
        description: 'Create an edge: a line or a curve from a point to another that stops at the border of the nodes, or a loop when it is the same point twice',
        forms: ['e=edge <point>,<point>'],
        summary: 'e=edge A,B — edge between two points',
        build: buildEdge
    }
}
