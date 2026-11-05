import {InvalidArgumentError} from "../../errors"
import {type Domain, isDomain} from "../../pidraw.common"
import {curveDomain} from "../Curve/Curve.constraints"
import {Plot} from "../Plot/Plot"
import type {IFillBetweenConfig} from "./FillBetween.types"

/**
 * The abscissas that the config asks for: its domain, or else where all of its plots are drawn (the domain of each plot, and
 * everywhere for a plot that has none).
 *
 * @returns the domain, which is empty (`min >= max`) if the plots have no abscissa in common; `null` for no limit, then what is seen.
 */
export function domainOf(config: IFillBetweenConfig): Domain | null {
    return curveDomain(config.domain, [config.plot, config.other].flatMap(plot => plot === undefined ? [] : [plot]))
}

/**
 * Check the config of an area between plots.
 * @throws InvalidArgumentError if `plot` or `other` is not a `Plot`, the domain is not an interval of finite numbers with its minimum
 * below its maximum, or the plots have no abscissa in common.
 */
export function checkFillBetween(config: IFillBetweenConfig, name: string): void {
    const plot: unknown = config.plot
    const other: unknown = config.other

    if (!(plot instanceof Plot)) {
        throw new InvalidArgumentError(`The area "${name}" needs a plot`)
    }

    if (other !== undefined && !(other instanceof Plot)) {
        throw new InvalidArgumentError(`The area "${name}" can only be between plots, got ${JSON.stringify(other)} as the second one`)
    }

    if (config.domain !== undefined
        && !(isDomain(config.domain) && Number.isFinite(config.domain.min) && Number.isFinite(config.domain.max))) {
        throw new InvalidArgumentError(`Invalid domain ${JSON.stringify(config.domain)} for the area "${name}": expected finite numbers`)
    }

    const domain = domainOf(config)

    if (domain !== null && domain.min >= domain.max) {
        throw new InvalidArgumentError(config.domain === undefined
            ? `The plots of the area "${name}" have no abscissa in common: give a domain`
            : `Invalid domain ${JSON.stringify(config.domain)} for the area "${name}": the minimum must be below the maximum`)
    }
}
