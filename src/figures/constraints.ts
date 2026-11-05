import {distanceAB, toPixels} from "../calculus"
import {InvalidArgumentError} from "../errors"
import type {IGraphConfig, XY} from "../pidraw.common"
import type {CircleRadius} from "./Circle/Circle.types"

// What every figure with constraints shares: the choice of the construction, the call of its resolver, and the checks of positions.

/**
 * The only constraint of a figure among the ones it knows. A figure is defined by exactly one of them (see `Exclusive`).
 *
 * @param keys the names of the constraints of the figure.
 * @param name name of the figure, for the message.
 * @param kind what the figure is (`'point'`, `'line'`), for the message.
 * @throws InvalidArgumentError if the config has no constraint, or several.
 */
export function singleConstraint<K extends string>(
    config: Partial<Record<K, unknown>>,
    keys: readonly K[],
    name: string,
    kind: string
): K {
    const found = keys.filter(key => config[key] !== undefined)

    if (found.length !== 1) {
        throw new InvalidArgumentError(
            `The ${kind} "${name}" needs exactly one constraint (${keys.join(', ')}), got ${found.length === 0 ? 'none' : found.join(', ')}`
        )
    }

    return found[0]
}

/**
 * The only constraint of a figure, among the keys of its table of resolvers.
 *
 * @param resolvers the table of the figure: one resolver for each constraint it knows.
 * @throws InvalidArgumentError if the config has no constraint, or several.
 */
export function constraintIn<K extends string>(resolvers: Record<K, unknown>, config: Partial<Record<NoInfer<K>, unknown>>, name: string, kind: string): K {
    return singleConstraint(config, Object.keys(resolvers) as K[], name, kind)
}

/**
 * Call the resolver of a constraint with the value that the config holds for it.
 *
 * @param resolvers the table of the figure, typed for each constraint: a resolver takes the value of its own key.
 * @param extra the second argument of the resolvers (the config of the graph, most of the time).
 */
export function resolveIn<K extends string, R, E>(
    resolvers: Record<K, (value: never, extra: E) => R>,
    key: K,
    config: Partial<Record<NoInfer<K>, unknown>>,
    extra: E
): R {
    // The table types each resolver for its own key; the key and the value of the config go together.
    const resolver = resolvers[key] as (value: unknown, extra: E) => R

    return resolver(config[key], extra)
}

const isPosition = (value: unknown): value is XY =>
    typeof value === 'object' && value !== null && 'x' in value && 'y' in value
    && typeof value.x === 'number' && typeof value.y === 'number'

/**
 * The values of a construction, checked to be positions.
 * @param what what the values are, for the message.
 * @throws InvalidArgumentError if a value is not a position.
 */
export function positions<T extends Record<string, unknown>>(values: T, what: string): { [K in keyof T]: XY } {
    for (const [key, value] of Object.entries(values)) {
        if (!isPosition(value)) {
            throw new InvalidArgumentError(`Invalid ${what}: "${key}" is not a position {x, y}`)
        }
    }

    return values as { [K in keyof T]: XY }
}

/**
 * A list of values, checked to be positions.
 * @param what what each value is, for the message (`'vertex of the polygon'`).
 * @throws InvalidArgumentError if a value is not a position.
 */
export function positionList(values: readonly unknown[], what: string): XY[] {
    return Object.values(positions(Object.fromEntries(values.map((value, index) => [String(index), value])), what))
}

/** The radius of a circle, of an arc or of a polygon in pixels. @throws InvalidArgumentError if it is a number that is not finite and greater than 0. */
export function radiusOf(radius: CircleRadius, center: XY, graph: IGraphConfig): number {
    if (typeof radius === 'number') {
        if (!Number.isFinite(radius) || radius <= 0) {
            throw new InvalidArgumentError(`Invalid radius ${radius}: expected a finite number greater than 0`)
        }

        return Math.abs(toPixels(radius, graph))
    }

    if (typeof radius === 'object' && 'point1' in radius) {
        const {point1, point2} = positions(radius, 'radius')

        return distanceAB(point1, point2)
    }

    return distanceAB(center, positions({radius}, 'radius').radius)
}
