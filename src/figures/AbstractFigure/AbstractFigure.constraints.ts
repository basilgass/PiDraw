import {InvalidArgumentError} from "../../errors"
import {isXY, type XY} from "../../pidraw.common"

/** @throws InvalidArgumentError if `value` is not a `{x, y}` of finite numbers. */
export function checkVector(value: unknown, method: string): XY {
    if (!isXY(value) || !Number.isFinite(value.x) || !Number.isFinite(value.y)) {
        throw new InvalidArgumentError(`${method} expects a finite number or a {x, y} of finite numbers, got ${JSON.stringify(value)}`)
    }

    return value
}
