import {InvalidArgumentError} from "../../errors"
import type {IGridConfig} from "./Grid.types"

/** The step of a grid, in units, when the config does not give one. */
export const DEFAULT_STEP = {x: 1, y: 1}

/** The most subdivisions of a step: more would be lines too close to be seen. */
export const MAX_SUBDIVISIONS = 20

/** The step of a grid, in units. */
export function stepOf(config: IGridConfig): { x: number, y: number } {
    return config.step === undefined ? {...DEFAULT_STEP} : {x: config.step.x, y: config.step.y}
}

/**
 * Check the config of a grid.
 * @throws InvalidArgumentError if the step is not made of two finite numbers greater than 0, or the subdivisions are not an integer
 * from 2 to {@link MAX_SUBDIVISIONS}.
 */
export function checkGrid(config: IGridConfig, name: string): void {
    const step = config.step as { x?: unknown, y?: unknown } | undefined
    const valid = (value: unknown) => typeof value === 'number' && Number.isFinite(value) && value > 0

    if (step !== undefined && (typeof step !== 'object' || !valid(step.x) || !valid(step.y))) {
        throw new InvalidArgumentError(`Invalid step ${JSON.stringify(config.step)} for the grid "${name}": expected {x, y}, two finite numbers greater than 0`)
    }

    const interval = (value: unknown) => typeof value === 'object' && value !== null
        && Number.isFinite((value as { min?: unknown }).min) && Number.isFinite((value as { max?: unknown }).max)
        && (value as { min: number }).min < (value as { max: number }).max

    if ((config.x === undefined) !== (config.y === undefined)) {
        throw new InvalidArgumentError(`The grid "${name}" needs both x and y to be a part of the drawing, or none for all of it`)
    }

    for (const [key, value] of [['x', config.x], ['y', config.y]] as const) {
        if (value !== undefined && !interval(value)) {
            throw new InvalidArgumentError(`Invalid ${key} ${JSON.stringify(value)} for the grid "${name}": expected {min, max}, two finite numbers with the minimum lower than the maximum`)
        }
    }

    const parts = config.subdivisions as unknown

    if (parts !== undefined && !(typeof parts === 'number' && Number.isInteger(parts) && parts >= 2 && parts <= MAX_SUBDIVISIONS)) {
        throw new InvalidArgumentError(`Invalid subdivisions ${JSON.stringify(parts)} for the grid "${name}": expected an integer from 2 to ${MAX_SUBDIVISIONS}`)
    }
}
