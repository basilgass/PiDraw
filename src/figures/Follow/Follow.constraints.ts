import {InvalidArgumentError} from "../../errors"
import {AbstractFigure} from "../AbstractFigure/AbstractFigure"
import type {IFollowConfig} from "./Follow.types"

/** The diameter of the point, in pixels, when the config does not give one. */
export const DEFAULT_SIZE = 10

/**
 * Check the config of a `Follow`.
 * @throws InvalidArgumentError if the figure to follow is not one that a point can follow, the size is not a finite number greater than 0,
 * or the starting position is not `{x, y}`.
 */
export function checkFollow(config: IFollowConfig, name: string): void {
    const target = config.follow as AbstractFigure | undefined

    if (!(target instanceof AbstractFigure)) {
        throw new InvalidArgumentError(`The point "${name}" needs a figure to follow`)
    }

    if (!target.followable) {
        throw new InvalidArgumentError(`The point "${name}" cannot follow the figure "${target.name}": a point follows a line, a circle, a plot or a parametric curve`)
    }

    if (config.size !== undefined && !(typeof config.size === 'number' && Number.isFinite(config.size) && config.size > 0)) {
        throw new InvalidArgumentError(`Invalid size ${JSON.stringify(config.size)} for the point "${name}": expected a finite number greater than 0`)
    }

    const at = config.at as { x?: unknown, y?: unknown } | undefined

    if (at !== undefined && !(typeof at === 'object' && typeof at.x === 'number' && typeof at.y === 'number')) {
        throw new InvalidArgumentError(`Invalid starting position ${JSON.stringify(at)} for the point "${name}": expected a position {x, y}`)
    }
}
