import type {IGraphConfig} from "../../pidraw.common"
import {InvalidArgumentError} from "../../errors"
import {
    type CircleDefinition,
    circleTangentTo,
    circleWithDiameter,
    circumcircle,
    incircle
} from "../../calculus"
import {constraintIn, positions, radiusOf} from "../constraints"
import {Line} from "../Line/Line"
import type {
    CircleByRadius,
    CircleDiameter,
    CircleInscribed,
    CircleTangent,
    CircleThrough,
    ICircleConfig
} from "./Circle.types"

/** The constructions of a circle, by the key of the config that holds them (the radius goes with a center). */
type Constructions = 'radius' | 'through' | 'tangent' | 'diameter' | 'inscribed'

/** How to find each construction of a circle, as its center and its radius in pixels. */
const RESOLVERS = {
    radius: ({center, radius}: CircleByRadius, graph: IGraphConfig): CircleDefinition => {
        const position = positions({center}, 'circle').center

        return {center: position, radius: radiusOf(radius, position, graph)}
    },

    through: ({through}: CircleThrough): CircleDefinition => {
        const {A, B, C} = positions(through, 'points of the circle')

        return circumcircle(A, B, C)
    },

    tangent: ({tangent}: CircleTangent): CircleDefinition => {
        const {center} = positions({center: tangent.center}, 'circle')
        const {to} = tangent

        if (!(to instanceof Line)) {
            throw new InvalidArgumentError('Invalid tangent: "to" is neither a line nor an axis')
        }

        return circleTangentTo(center, to.start, to.end)
    },

    diameter: ({diameter}: CircleDiameter): CircleDefinition => {
        const {A, B} = positions(diameter, 'diameter')

        return circleWithDiameter(A, B)
    },

    inscribed: ({inscribed}: CircleInscribed): CircleDefinition => {
        const {A, B, C} = positions(inscribed, 'triangle')

        return incircle(A, B, C)
    }
}

/**
 * The construction that gives a circle.
 * @throws InvalidArgumentError if the config has none, or several, or a center that does not go with a radius.
 */
export function constructionOf(config: ICircleConfig, name: string): Constructions {
    const construction = constraintIn(RESOLVERS, config, name, 'circle')

    if (construction !== 'radius' && config.center !== undefined) {
        throw new InvalidArgumentError(`The circle "${name}" has a center, which goes with a radius, and a ${construction}`)
    }

    if (construction === 'radius' && config.center === undefined) {
        throw new InvalidArgumentError(`The circle "${name}" has a radius and needs a center`)
    }

    return construction
}

/**
 * Find the circle of a construction, as its center and its radius in pixels.
 * @throws InvalidArgumentError if a value is not valid (a radius that is a number but not finite and greater than 0, a
 * position that is not {x, y}, a line that is not a line). A circle that does not exist (aligned points, a center on its
 * tangent) is not an error: its center and its radius are `NaN`.
 */
export function resolveConstraint(construction: Constructions, config: ICircleConfig, graph: IGraphConfig): CircleDefinition {
    // The table types each resolver for its own construction; the key and the config go together.
    const resolver = RESOLVERS[construction] as (config: unknown, graph: IGraphConfig) => CircleDefinition

    return resolver(config, graph)
}
