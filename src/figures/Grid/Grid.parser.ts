import type {PARSER} from "piparser"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {Grid} from "./Grid"
import type {IGridConfig} from "./Grid.types"
import {InvalidArgumentError, OptionError, ParseError} from "../../errors"
import type {BuildResult, FigureOptionHandler, IParserParameters, ParserItems} from "../../parser/parser.types"
import {isXY} from "../../pidraw.common"
import {buildError, describeValue, PARSER_TYPE} from "../../parser/parser.common"
import {isIntervalValue, readInterval} from "../../parser/parser.interval"
import {given, parseStep, parseStepValue} from "../../parser/parser.step"

// Everything the parser needs to know about the grid: how to read the line of code that draws one (`g=grid 0:5,0:3,0.5`), the parameters
// `grid`, `gridX` and `gridY` of the layout, and the option `subgrid` of a grid. The figure never reads the syntax of the parser: it gets a
// config.

/**
 * The grid that the parameters `grid`, `gridX` and `gridY` of the layout ask for, with the step of each axis:
 * - `grid`: a step of 1 on each axis;
 * - `grid=0.5`: a step of 0.5 on each axis;
 * - `grid=pi`, `grid=2pi`, `grid=pi/3`: a step of pi/2, 2pi/2, pi/3 on the x axis (the denominator is the option, 2 by default), 1 on the y axis;
 * - `gridX=2`, `gridY=0.5`: the step of one axis, which `grid` leaves to 1 or gives (`grid=2,gridY=1`).
 *
 * The options (`->subgrid=4`) are not read here.
 *
 * @returns `null` when there is no parameter (or all are `false`): no grid.
 * @throws ParseError if a value is none of those (see {@link parseStep}).
 */
export function buildGridParameters(grid?: IParserParameters, gridX?: IParserParameters, gridY?: IParserParameters): IGridConfig | null {
    if (!given(grid) && !given(gridX) && !given(gridY)) {
        return null
    }

    const both = given(grid) ? parseStep(grid, 'grid') : null
    const x = given(gridX) ? parseStep(gridX, 'gridX') : null
    const y = given(gridY) ? parseStep(gridY, 'gridY') : null
    // A step in pi is for the x axis: the y axis keeps a step of 1.
    const step = {
        x: x?.step ?? both?.step ?? 1,
        y: y?.step ?? (both === null || both.pi ? 1 : both.step)
    }

    return step.x === 1 && step.y === 1 ? {} : {step}
}

const EXPECTED = 'an x interval and a y interval (0:5,0:3, a bound can be 2pi) for a part of the drawing, then a step: a number (0.5), a number of pi (pi/3) or a step for each axis (0.5;1)'

/**
 * The config of the grid that a line of code defines (`grid`), by the values it gives:
 * - nothing: the whole drawing, with a step of 1;
 * - `0.5`, `pi/3`, `0.5;1`: the step, for both axes, for the x axis (a step in pi, the y axis keeps 1), or for each axis;
 * - `0:5,0:3`: the part of the drawing that has the grid, then the step if there is one (`0:5,0:3,0.5`).
 *
 * The options of the line (after the `->`) are not read: see {@link applyGridOption}.
 *
 * @throws ParseError if the key is not `grid`, or the values are none of those: only one interval, an interval that is not valid, a step
 * that is not greater than 0, more values than that.
 */
export function buildGrid(item: PARSER): BuildResult<IGridConfig> {
    if (item.key !== PARSER_TYPE.GRID.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define a grid`)
    }

    // A key alone (`g=grid`) is read as a word by the parser.
    const values = item.values.length === 1 && item.values[0] === true ? [] : item.values
    const [first, second, ...others] = values
    const part = isIntervalValue(first)

    if (part && !isIntervalValue(second)) {
        return buildError(item, EXPECTED, `${describeValue(first)} alone`)
    }

    const rest = part ? others : values
    const config: IGridConfig = {}

    if (rest.length > 1) {
        return buildError(item, EXPECTED, values.map(describeValue).join(', '))
    }

    if (part) {
        try {
            config.x = readInterval(first, 'x')
            config.y = readInterval(second, 'y')
        } catch (error) {
            if (error instanceof ParseError) {
                throw new ParseError(`Cannot build "${item.name}" (${item.key}): ${error.message}`, {cause: error})
            }

            throw error
        }
    }

    if (rest.length === 1) {
        const [value] = rest
        const step = isXY(value) && !isIntervalValue(value) ? stepOfVector(value) : parseStepValue(value)

        if (step === null) {
            return buildError(item, EXPECTED, describeValue(value))
        }

        config.step = 'x' in step ? step : {x: step.step, y: step.pi ? 1 : step.step}
    }

    return {create: 'grid', config}
}

/** The step that a vector gives, one for each axis, or `null` if they are not greater than 0. */
function stepOfVector(value: { x: number, y: number }): { x: number, y: number } | null {
    return Number.isFinite(value.x) && Number.isFinite(value.y) && value.x > 0 && value.y > 0 ? {x: value.x, y: value.y} : null
}

/** The options of a grid. */
export type GridOption = 'subgrid'

/**
 * Apply an option to a grid: `subgrid` cuts each step in 2 parts, or in `n` with `subgrid=n`.
 *
 * @throws OptionError if the figure is not a grid, or the value is not an integer from 2 to 20.
 */
export function applyGridOption(figure: AbstractFigure, option: GridOption, value: unknown): void {
    if (!(figure instanceof Grid)) {
        throw new OptionError(option, `The option "${option}" cuts the steps of a grid, and "${figure.name}" is not one`)
    }

    const parts = value === true ? 2 : value

    try {
        figure.config = {...figure.config, subdivisions: parts as number}
    } catch (error) {
        if (error instanceof InvalidArgumentError) {
            throw new OptionError(option, `Invalid value ${describeValue(value)} for the option "${option}" of "${figure.name}": expected an integer from 2 to 20`, {cause: error})
        }

        throw error
    }
}

/** The options of the parser for a grid, ready for the registry of options. */
export const GRID_OPTION_HANDLERS: Record<GridOption, FigureOptionHandler> = {
    subgrid: (figure, {value}) => { applyGridOption(figure, 'subgrid', value) }
}

/** The kind of grid of the syntax, by key. */
export const GRID_ITEMS: ParserItems = {
    [PARSER_TYPE.GRID]: {
        name: 'grid',
        description: 'Draw a grid: on the whole drawing, or on a part of it. It does not change the grid of the graph',
        forms: ['g=grid [<x interval>,<y interval>][,<step>]'],
        summary: 'g=grid — grid',
        build: buildGrid
    }
}
