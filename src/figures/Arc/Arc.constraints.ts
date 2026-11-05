import type {IGraphConfig, XY} from "../../pidraw.common"
import {InvalidArgumentError} from "../../errors"
import {cartesianToAngle, distanceAB, polarToCartesian} from "../../calculus"
import {constraintIn, positions, radiusOf, resolveIn} from "../constraints"
import type {ArcByAngles, ArcByPoints, ArcByRotation, ArcConstraints, IArcConfig} from "./Arc.types"

// Where an arc is, according to its construction: pure functions from the value of the construction to the center, the two ends
// and the radius of the arc, in pixels. The direction of the arc and the drawing are the business of the figure.

/** An arc found from its construction, in pixels. Its values are `NaN` when a position it relies on does not exist. */
export interface ArcDefinition {
    center: XY,
    /** The end that the arc starts from (counterclockwise). */
    start: XY,
    end: XY,
    radius: number
}

/** @throws InvalidArgumentError if `value` is not a finite number. */
function finite(value: number, what: string): number {
    if (!Number.isFinite(value)) {
        throw new InvalidArgumentError(`Invalid ${what} ${value}: expected a finite number`)
    }

    return value
}

/** The radius given, or the distance from the center to `start`. */
function radiusOrDistance(radius: ArcByPoints['radius'], center: XY, start: XY, graph: IGraphConfig): number {
    return radius === undefined ? distanceAB(center, start) : radiusOf(radius, center, graph)
}

/** How to find each construction of an arc. */
const RESOLVERS: { [K in keyof ArcConstraints]: (value: ArcConstraints[K], graph: IGraphConfig) => ArcDefinition } = {
    points: ({start, center, end, radius}: ArcByPoints, graph) => {
        const places = positions({start, center, end}, 'arc')

        return {...places, radius: radiusOrDistance(radius, places.center, places.start, graph)}
    },

    angles: ({center, radius, from, to}: ArcByAngles, graph) => {
        const place = positions({center}, 'arc').center
        const size = radiusOf(radius, place, graph)
        const end = (angle: number) => polarToCartesian(place.x, place.y, size, finite(angle, 'angle'))

        return {center: place, start: end(from), end: end(to), radius: size}
    },

    rotation: ({start, center, angle, radius}: ArcByRotation, graph) => {
        const places = positions({start, center}, 'arc')
        const turn = finite(angle, 'angle')
        const distance = distanceAB(places.center, places.start)
        const turned = polarToCartesian(
            places.center.x, places.center.y, distance, cartesianToAngle(places.center, places.start) + turn
        )
        const size = radiusOrDistance(radius, places.center, places.start, graph)

        // The arc is always drawn counterclockwise from its start: a turn clockwise starts at the turned end.
        return turn >= 0
            ? {center: places.center, start: places.start, end: turned, radius: size}
            : {center: places.center, start: turned, end: places.start, radius: size}
    }
}

/** The only construction of an arc. @throws InvalidArgumentError if the config has none, or several. */
export function constructionOf(config: IArcConfig, name: string): keyof ArcConstraints {
    return constraintIn(RESOLVERS, config, name, 'arc')
}

/**
 * Find the arc of the construction `key` of a config that holds it, in pixels.
 * @throws InvalidArgumentError if a value is not valid (a radius that is a number but not finite and greater than 0, an
 * angle that is not finite, a position that is not `{x, y}`). A position that does not exist is not an error: the values are `NaN`.
 */
export function resolveConstraint(key: keyof ArcConstraints, config: IArcConfig, graph: IGraphConfig): ArcDefinition {
    return resolveIn(RESOLVERS, key, config, graph)
}
