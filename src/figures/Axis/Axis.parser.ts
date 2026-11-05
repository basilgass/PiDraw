import type {PARSER} from "piparser"
import type {TickSelection} from "../../calculus"
import {Axis} from "./Axis"
import {MAX_EVERY} from "./Axis.constraints"
import type {IAxisConfig} from "./Axis.types"
import type {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import {InvalidArgumentError, OptionError, ParseError} from "../../errors"
import type {BuildResult, FigureOptionHandler, IParserParameters, ParserItems} from "../../parser/parser.types"
import type {IAxisDisplay} from "../../Graph.types"
import {given, parseStep, parseStepValue} from "../../parser/parser.step"
import {buildError, convertIdToFigure, describeValue, isPoint, PARSER_TYPE} from "../../parser/parser.common"

// Everything the parser needs to know about axes: how to read the line of code that draws a graduated line (`a=axis A,B,0.5`), the
// parameters `axis`, `axisX`, `axisY`, `axisXname` and `axisYname` of the layout (and the options `ticks`, `numbers` and `padding` of
// the entries `axis`), and the options of an axis. The figure never reads the syntax of the parser: it gets a config.

/** The parameters of the layout that concern the axes. */
export interface IAxisParameters {
    axis?: IParserParameters,
    axisX?: IParserParameters,
    axisY?: IParserParameters,
    axisXname?: IParserParameters,
    axisYname?: IParserParameters
}

/** What the options of an entry `axis` say about one axis, besides its step. */
export type IAxisExtra = Pick<IAxisDisplay, 'marks' | 'numbers' | 'padding'>

/** The name of an axis: a text, or a number. */
function nameOf(parameter: IParserParameters, key: string): string {
    const {value, options} = parameter

    if ((typeof value !== 'string' && typeof value !== 'number') || options.length > 0 || String(value).trim() === '') {
        throw new ParseError(`Cannot read the parameter "${key}=${describeValue(value)}": expected a name (${key}=x)`)
    }

    return String(value)
}

/**
 * A selection of ticks, from an option or a parameter:
 * - `5`: the multiples of 5; `first`: the first tick alone; `5/first`: the multiples of 5 and the first tick;
 * - `none` (when `allowNone`): no tick.
 *
 * @param key the name of the option, for the messages.
 * @throws ParseError if the value is none of those, or the number is not an integer from 1 to 1000.
 */
export function parseSelection({value, options}: IParserParameters, key: string, allowNone: true): TickSelection | 'none'
export function parseSelection({value, options}: IParserParameters, key: string, allowNone: false): TickSelection
export function parseSelection({value, options}: IParserParameters, key: string, allowNone: boolean): TickSelection | 'none' {
    if (value === 'none' && allowNone && options.length === 0) {
        return 'none'
    }

    if (value === 'first' && options.length === 0) {
        return {first: true}
    }

    if (typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= MAX_EVERY) {
        if (options.length === 0) {
            return {every: value}
        }

        if (options.length === 1 && options[0] === 'first') {
            return {every: value, first: true}
        }
    }

    const text = [value, ...options].map(item => describeValue(item)).join('/')

    throw new ParseError(`Cannot read the option "${key}=${text}": expected an integer from 1 to ${MAX_EVERY} (${key}=5), first, 5/first${allowNone ? ' or none' : ''}`)
}

/**
 * The options of an entry `axis` that are for the graduation of the axes of the graph, and the other options (the style).
 * - `ticks=5`, `ticks=first`, `ticks=5/first`: which ticks are drawn (see {@link parseSelection});
 * - `numbers=2`, `numbers=5/first`, `numbers=none`: on which ticks a number is written;
 * - `padding=40`: how far the axis stops from the borders, in pixels.
 *
 * @throws ParseError if one of them is not valid, or is `name` or `side` (the name is `axisXname`, and the graph chooses the side).
 */
export function splitAxisOptions(options: Record<string, IParserParameters>): { extra: IAxisExtra, style: Record<string, IParserParameters> } {
    const extra: IAxisExtra = {}
    const style: Record<string, IParserParameters> = {}

    for (const [key, parameter] of Object.entries(options)) {
        if (key === 'ticks') {
            extra.marks = parseSelection(parameter, key, false)
        } else if (key === 'numbers') {
            extra.numbers = parseSelection(parameter, key, true)
        } else if (key === 'padding') {
            extra.padding = paddingOf(parameter)
        } else if (key === 'name' || key === 'side') {
            throw new ParseError(`The option "${key}" is for an axis drawn from the code, not for the axes of the graph: ${key === 'name' ? 'use axisXname or axisYname' : 'the graph puts the numbers inside of the drawing'}`)
        } else {
            style[key] = parameter
        }
    }

    return {extra, style}
}

/** How far an axis stops from the borders of the drawing: a number of 0 or more. */
function paddingOf({value, options}: IParserParameters): number {
    if (typeof value !== 'number' || options.length > 0 || !(Number.isFinite(value) && value >= 0)) {
        throw new ParseError(`Cannot read the option "padding=${describeValue(value)}": expected a number of 0 or more (pixels)`)
    }

    return value
}

/**
 * What each axis of the coordinate system shows, from the parameters of the layout:
 * - `axis`: both axes; `axisX` or `axisY`: only that one;
 * - a value is the step of the graduation: `axis=1`, `axis=0.5`, `axisX=pi/2` (`axis=pi` is for the x axis, the y axis gets a step of 1);
 * - `axisXname=x`, `axisYname=y`: the name of the axis (the axis is shown).
 *
 * @param extra the options of the entries (see {@link splitAxisOptions}) for each axis. An axis that has a selection of ticks or of
 * numbers is graduated, with a step of 1 when it has no step.
 * @returns for each axis what it shows, or `false` when it is not drawn.
 * @throws ParseError if a step is not valid (see {@link parseStep}), or a name is not a text.
 */
export function buildAxes(parameters: IAxisParameters, extra: { x?: IAxisExtra, y?: IAxisExtra } = {}): { x: IAxisDisplay | false, y: IAxisDisplay | false } {
    const both = given(parameters.axis) ? parseStep(parameters.axis, 'axis') : null
    const axisOf = (
        own: IParserParameters | undefined, ownKey: string, name: IParserParameters | undefined, nameKey: string,
        bothStep: IAxisDisplay | undefined, more: IAxisExtra | undefined
    ) => {
        const shown = given(parameters.axis) || given(own) || given(name)

        if (!shown) {
            return false
        }

        const step = given(own) ? parseStep(own, ownKey) : null
        const base: IAxisDisplay = step === null
            ? {...bothStep}
            : {step: step.step, labels: step.pi ? 'pi' : 'numbers'}
        // A selection of ticks is for a graduated axis: its step is 1 when it has none.
        const graduated: IAxisDisplay = more?.marks !== undefined || more?.numbers !== undefined
            ? {step: 1, labels: 'numbers', ...base}
            : base
        const display: IAxisDisplay = {...graduated, ...more}

        return given(name) ? {...display, name: nameOf(name, nameKey)} : display
    }

    return {
        x: axisOf(parameters.axisX, 'axisX', parameters.axisXname, 'axisXname', both === null ? undefined : {step: both.step, labels: both.pi ? 'pi' : 'numbers'}, extra.x),
        // A step in pi is for the x axis.
        y: axisOf(parameters.axisY, 'axisY', parameters.axisYname, 'axisYname', both === null ? undefined : {step: both.pi ? 1 : both.step, labels: 'numbers'}, extra.y)
    }
}

const EXPECTED = 'two points (the zero, then the unit), then a step: a number (0.5) or a number of pi (pi/2)'

/**
 * The config of the graduated line that a line of code defines (`axis`), by the values it gives:
 * - `A,B`: the line through the points `A` (its zero) and `B` (the unit), with a tick and a number every unit;
 * - `A,B,0.5`, `A,B,pi/2`: a tick every 0.5 units, or every pi/2 (the numbers are then fractions of pi; `pi` alone is pi/2).
 *
 * The options of the line (after the `->`) are not read: see {@link applyAxisOption}.
 *
 * @throws ParseError if the key is not `axis`, or the values are none of those: fewer than two points, a name that is not a point of the
 * drawing, a step that is not greater than 0, more values than that.
 */
export function buildAxis(item: PARSER, figures: Record<string, AbstractFigure>): BuildResult<IAxisConfig> {
    if (item.key !== PARSER_TYPE.AXIS.toString()) {
        throw new ParseError(`Cannot build "${item.name}" (${item.key}): the key does not define an axis`)
    }

    const [A, B, ...rest] = convertIdToFigure(item.values, figures)

    if (!isPoint(A) || !isPoint(B) || rest.length > 1) {
        return buildError(item, EXPECTED, item.values.length === 0 ? 'no value' : item.values.map(describeValue).join(', '))
    }

    if (rest.length === 0) {
        return {create: 'axis', config: {through: {A, B}, ticks: {}}}
    }

    const step = parseStepValue(rest[0])

    if (step === null) {
        return buildError(item, EXPECTED, describeValue(rest[0]))
    }

    return {create: 'axis', config: {through: {A, B}, ticks: {step: step.step, labels: step.pi ? 'pi' : 'numbers'}}}
}

/** The options of an axis. */
export type AxisOption = 'ticks' | 'numbers' | 'name' | 'side' | 'padding'

/**
 * Apply an option to an axis:
 * - `ticks=5`, `ticks=first`, `ticks=5/first`: which ticks are drawn (the axis is graduated, with a step of 1 if it was not);
 * - `numbers=2`, `numbers=5/first`, `numbers=none`: on which ticks a number is written;
 * - `name=t`: the name written beyond the arrow;
 * - `side=left` or `side=right`: the side of the axis that has the numbers;
 * - `padding=40`: how far the axis stops from the borders, in pixels.
 *
 * @throws OptionError if the figure is not an axis, or the value is not valid.
 */
export function applyAxisOption(figure: AbstractFigure, option: AxisOption, parameter: IParserParameters): void {
    if (!(figure instanceof Axis)) {
        throw new OptionError(option, `The option "${option}" is for an axis, and "${figure.name}" is not one`)
    }

    const {value, options} = parameter
    const config = figure.config as IAxisConfig
    const fail = (expected: string) => new OptionError(option, `Invalid value ${describeValue(value)} for the option "${option}" of "${figure.name}": expected ${expected}`)
    let next: IAxisConfig

    try {
        switch (option) {
            case 'ticks':
                next = {...config, ticks: {...config.ticks, marks: parseSelection(parameter, option, false)}}
                break
            case 'numbers':
                next = {...config, ticks: {...config.ticks, numbers: parseSelection(parameter, option, true)}}
                break
            case 'padding':
                next = {...config, padding: paddingOf(parameter)}
                break
            case 'name':
                if ((typeof value !== 'string' && typeof value !== 'number') || options.length > 0 || String(value).trim() === '') {
                    throw fail('a name (name=t)')
                }

                next = {...config, name: String(value)}
                break
            case 'side':
                if ((value !== 'left' && value !== 'right') || options.length > 0) {
                    throw fail('left or right')
                }

                next = {...config, side: value}
                break
        }

        figure.config = next
    } catch (error) {
        if (error instanceof OptionError) {
            throw error
        }

        if (error instanceof InvalidArgumentError || error instanceof ParseError) {
            throw new OptionError(option, `Invalid option "${option}" of "${figure.name}": ${error.message}`, {cause: error})
        }

        throw error
    }
}

const axisHandler = (option: AxisOption): FigureOptionHandler => (figure, parameter) => {
    applyAxisOption(figure, option, parameter)
}

/** The options of the parser for an axis, ready for the registry of options. */
export const AXIS_OPTION_HANDLERS: Record<AxisOption, FigureOptionHandler> = {
    ticks: axisHandler('ticks'),
    numbers: axisHandler('numbers'),
    name: axisHandler('name'),
    side: axisHandler('side'),
    padding: axisHandler('padding')
}

/** The kind of axis of the syntax, by key. */
export const AXIS_ITEMS: ParserItems = {
    [PARSER_TYPE.AXIS]: {
        name: 'axis',
        description: 'Draw a graduated line through two points: the first is its zero, the second its unit. It does not change the axes of the graph',
        forms: ['a=axis <point>,<point>[,<step>]'],
        summary: 'a=axis A,B — graduated line',
        build: buildAxis
    }
}
