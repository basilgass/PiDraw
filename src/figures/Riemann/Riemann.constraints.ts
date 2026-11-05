import {InvalidArgumentError} from "../../errors"
import {type Domain, isDomain} from "../../pidraw.common"
import {curveDomain} from "../Curve/Curve.constraints"
import {Plot} from "../Plot/Plot"
import type {IRiemannConfig} from "./Riemann.types"

/** How many rectangles there are when the config does not say. */
export const DEFAULT_RECTANGLES = 5

/** The most rectangles: more would be slow to draw, and are too thin to be seen. */
export const MAX_RECTANGLES = 1000

/** Where the plot is read when the config does not say: at the left end of each interval. */
export const DEFAULT_POSITION = 0

/**
 * The domain of a Riemann sum: the one of its config, or the one of its plot.
 * @returns `null` if neither has one.
 */
export function domainOf(config: IRiemannConfig): Domain | null {
    return curveDomain(config.domain, [config.plot])
}

/**
 * Check the config of a Riemann sum.
 * @throws InvalidArgumentError if the plot is not a `Plot`, there is no domain (the config has none and the plot has none), the domain
 * is not an interval of finite numbers with its minimum below its maximum, the number of rectangles is not an integer from 1 to
 * {@link MAX_RECTANGLES}, or the position is not a number from 0 to 1.
 */
export function checkRiemann(config: IRiemannConfig, name: string): void {
    const plot: unknown = config.plot

    if (!(plot instanceof Plot)) {
        throw new InvalidArgumentError(`The Riemann sum "${name}" needs a plot`)
    }

    const domain = domainOf(config)

    if (domain === null) {
        throw new InvalidArgumentError(`The Riemann sum "${name}" needs a domain: give one, or give a domain to the plot "${config.plot.name}"`)
    }

    if (!isDomain(domain) || !Number.isFinite(domain.min) || !Number.isFinite(domain.max) || domain.min >= domain.max) {
        throw new InvalidArgumentError(`Invalid domain ${JSON.stringify(domain)} for the Riemann sum "${name}": expected finite numbers with the minimum below the maximum`)
    }

    const {rectangles, position} = config

    if (rectangles !== undefined && !(Number.isInteger(rectangles) && rectangles >= 1 && rectangles <= MAX_RECTANGLES)) {
        throw new InvalidArgumentError(`Invalid number of rectangles ${JSON.stringify(rectangles)} for the Riemann sum "${name}": expected an integer from 1 to ${MAX_RECTANGLES}`)
    }

    if (position !== undefined && !(typeof position === 'number' && position >= 0 && position <= 1)) {
        throw new InvalidArgumentError(`Invalid position ${JSON.stringify(position)} for the Riemann sum "${name}": expected a number from 0 (left) to 1 (right)`)
    }
}
