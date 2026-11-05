import {InvalidArgumentError} from "../../errors"
import type {IAxisDisplay, IGraphDisplay} from "../../Graph.types"
import type {XY} from "../../pidraw.common"
import {constraintOf} from "../Line/Line.constraints"
import type {IAxisConfig, IAxisOptions, IAxisTicks} from "./Axis.types"

/** How far the drawn axis stops from the borders of the drawing, in pixels, when the config does not say. */
export const AXIS_PADDING = 20

/** The graduation of an axis with its defaults: the selections of ticks and numbers stay as they are (none is all). */
export type ResolvedTicks = Required<Omit<IAxisTicks, 'marks' | 'numbers'>> & Pick<IAxisTicks, 'marks' | 'numbers'>

/** The graduation of an axis when the config does not say. */
export const TICK_DEFAULTS: ResolvedTicks = {step: 1, labels: 'numbers', digits: 2, size: 6, zero: true}

/** The most decimals of a number. */
export const MAX_DIGITS = 8

/** The greatest `every` of a selection of ticks. */
export const MAX_EVERY = 1000

/**
 * Check a selection of ticks.
 * @throws InvalidArgumentError if `every` is not an integer from 1 to {@link MAX_EVERY}, or `first` is not a boolean.
 */
function checkSelection(selection: unknown, key: string, name: string): void {
    const fail = (expected: string) => new InvalidArgumentError(`Invalid ${key} ${JSON.stringify(selection)} for the graduation of the axis "${name}": expected ${expected}`)

    if (typeof selection !== 'object' || selection === null) {
        throw fail("{every, first}")
    }

    const {every, first} = selection as { every?: unknown, first?: unknown }

    if (every !== undefined && !(typeof every === 'number' && Number.isInteger(every) && every >= 1 && every <= MAX_EVERY)) {
        throw fail(`an integer from 1 to ${MAX_EVERY} for every`)
    }

    if (first !== undefined && typeof first !== 'boolean') {
        throw fail('true or false for first')
    }
}

/** The graduation of an axis with the defaults, or `null` for an axis that is not graduated. */
export function ticksOf(config: IAxisOptions): ResolvedTicks | null {
    return config.ticks === undefined ? null : {...TICK_DEFAULTS, ...config.ticks}
}

/**
 * Check the options of an axis.
 * @throws InvalidArgumentError if the padding is not a finite number of 0 or more, the graduation has a step or a size that is not a
 * finite number greater than 0, labels that are neither `'numbers'` nor `'pi'`, decimals that are not an integer from 0 to 8, or a zero that
 * is not a boolean; the name is not a text, or the side is not `'left'` or `'right'`; or the axis is graduated but is not given by
 * `director` or `through` (it has no zero).
 */
export function checkAxis(config: IAxisConfig, name: string): void {
    const padding = config.padding as unknown

    if (padding !== undefined && !(typeof padding === 'number' && Number.isFinite(padding) && padding >= 0)) {
        throw new InvalidArgumentError(`Invalid padding ${JSON.stringify(padding)} for the axis "${name}": expected a finite number of 0 or more`)
    }

    const side = config.side as unknown

    if (side !== undefined && side !== 'left' && side !== 'right') {
        throw new InvalidArgumentError(`Invalid side ${JSON.stringify(side)} for the axis "${name}": expected 'left' or 'right'`)
    }

    const axisName = config.name as unknown

    if (axisName !== undefined && !(typeof axisName === 'string' && axisName.trim() !== '')) {
        throw new InvalidArgumentError(`Invalid name ${JSON.stringify(axisName)} for the axis "${name}": expected a text`)
    }

    if (config.ticks === undefined) {
        return
    }

    const ticks = config.ticks as Record<keyof IAxisTicks, unknown>
    const positive = (value: unknown) => typeof value === 'number' && Number.isFinite(value) && value > 0
    const invalid = (key: string, expected: string, value: unknown) =>
        new InvalidArgumentError(`Invalid ${key} ${JSON.stringify(value)} for the graduation of the axis "${name}": expected ${expected}`)

    if (ticks.step !== undefined && !positive(ticks.step)) {
        throw invalid('step', 'a finite number greater than 0', ticks.step)
    }

    if (ticks.size !== undefined && !positive(ticks.size)) {
        throw invalid('size', 'a finite number greater than 0', ticks.size)
    }

    if (ticks.labels !== undefined && ticks.labels !== 'numbers' && ticks.labels !== 'pi') {
        throw invalid('labels', "'numbers' or 'pi'", ticks.labels)
    }

    if (ticks.digits !== undefined
        && !(typeof ticks.digits === 'number' && Number.isInteger(ticks.digits) && ticks.digits >= 0 && ticks.digits <= MAX_DIGITS)) {
        throw invalid('digits', `an integer from 0 to ${MAX_DIGITS}`, ticks.digits)
    }

    if (ticks.zero !== undefined && typeof ticks.zero !== 'boolean') {
        throw invalid('zero', 'true or false', ticks.zero)
    }

    if (ticks.marks !== undefined) {
        checkSelection(ticks.marks, 'marks', name)
    }

    if (ticks.numbers !== undefined && ticks.numbers !== 'none') {
        checkSelection(ticks.numbers, 'numbers', name)
    }

    const constraint = constraintOf(config, name)

    if (constraint !== 'director' && constraint !== 'through') {
        throw new InvalidArgumentError(`The axis "${name}" is given by ${constraint}, which has no zero: a graduated axis is given by two points (through) or a point and a vector (director)`)
    }
}

/** What each axis of a graph shows: `false` for an axis that is not drawn. Both when the display says `true`, none without it. */
export function axesDisplay(axis: IGraphDisplay['axis']): { x: IAxisDisplay | false, y: IAxisDisplay | false } {
    if (axis === true) {
        return {x: {}, y: {}}
    }

    return axis === undefined || axis === false ? {x: false, y: false} : axis
}

/**
 * The config of an axis of the graph from what the display shows of it. An axis that is not drawn (`false`) stays whole, to be built
 * from. The zero is left to the other axis, and a selection of ticks (`step`) gives the graduation.
 * @param director the point of the axis and its vector of one unit, in pixels.
 */
export function axisConfigOf(director: { A: XY, d: XY }, side: 'left' | 'right', display: IAxisDisplay | false): IAxisConfig {
    const shown: IAxisDisplay = display === false ? {} : display
    const padding = display === false ? 0 : shown.padding
    const ticks: IAxisTicks | undefined = shown.step === undefined
        ? undefined
        : {
            step: shown.step,
            labels: shown.labels ?? 'numbers',
            zero: false,
            ...(shown.marks === undefined ? {} : {marks: shown.marks}),
            ...(shown.numbers === undefined ? {} : {numbers: shown.numbers})
        }

    return {
        director,
        side,
        ...(padding === undefined ? {} : {padding}),
        ...(ticks === undefined ? {} : {ticks}),
        ...(shown.name === undefined ? {} : {name: shown.name})
    }
}

/**
 * The ends of a segment moved toward each other, along it, by `padding` pixels.
 * @returns `null` if the segment is not longer than twice the padding: there is nothing left to draw.
 */
export function insetEnds(start: XY, end: XY, padding: number): [XY, XY] | null {
    const length = Math.hypot(end.x - start.x, end.y - start.y)

    if (!(length > 2 * padding)) {
        return null
    }

    const dx = (end.x - start.x) / length
    const dy = (end.y - start.y) / length

    return [
        {x: start.x + padding * dx, y: start.y + padding * dy},
        {x: end.x - padding * dx, y: end.y - padding * dy}
    ]
}
