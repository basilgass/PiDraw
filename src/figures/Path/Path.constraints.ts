import {type PathCommand, parsePath} from "../../calculus"
import {InvalidArgumentError} from "../../errors"
import type {IPathConfig} from "./Path.types"

/**
 * Check the config of a path and read its data.
 *
 * @returns the commands of the path: absolute lines and cubic curves (see {@link parsePath}).
 * @throws InvalidArgumentError if `d` is not a text, or `units` is not a boolean.
 * @throws ParseError if `d` is not the data of an SVG path.
 */
export function readPath(config: IPathConfig, name: string): PathCommand[] {
    const d = config.d as unknown
    const units = config.units as unknown

    if (typeof d !== 'string') {
        throw new InvalidArgumentError(`Invalid data ${JSON.stringify(d)} for the path "${name}": expected the text of an SVG path`)
    }

    if (units !== undefined && typeof units !== 'boolean') {
        throw new InvalidArgumentError(`Invalid units ${JSON.stringify(units)} for the path "${name}": expected true or false`)
    }

    return parsePath(d)
}
