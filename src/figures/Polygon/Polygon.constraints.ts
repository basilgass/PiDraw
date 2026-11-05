import type {IGraphConfig} from "../../pidraw.common"
import {InvalidArgumentError} from "../../errors"
import {
    type PolygonShape,
    regularPolygon,
    regularPolygonOnSide
} from "../../calculus"
import {constraintIn, positionList, positions, radiusOf, resolveIn} from "../constraints"
import type {IPolygonConfig, PolygonConstraints, PolygonOnSide, PolygonRegular} from "./Polygon.types"

// What a polygon is made of, according to its construction: pure functions from the value of the construction to the vertices (in
// pixels) and the closed paths through them. Nothing here touches the svg.

/** The most sides a regular polygon has. */
export const MAXIMUM_SIDES = 1000

/** @throws InvalidArgumentError if the number of sides is not an integer from 3 to `MAXIMUM_SIDES`, or the step of the star not an integer from 1 to less than half of it. */
function checkSides(sides: number, star: number | undefined): number {
    if (!Number.isInteger(sides) || sides < 3 || sides > MAXIMUM_SIDES) {
        throw new InvalidArgumentError(`Invalid number of sides ${sides}: expected an integer from 3 to ${MAXIMUM_SIDES}`)
    }

    if (star !== undefined && (!Number.isInteger(star) || star < 1 || 2 * star >= sides)) {
        throw new InvalidArgumentError(`Invalid star ${star} for ${sides} sides: expected an integer from 1 to less than ${sides / 2}`)
    }

    return star ?? 1
}

/** How to find the polygon of each construction, or `null` if it does not exist. */
const RESOLVERS: { [K in keyof PolygonConstraints]: (value: PolygonConstraints[K], graph: IGraphConfig) => PolygonShape | null } = {
    vertices: (vertices) => {
        if (!Array.isArray(vertices) || vertices.length < 3) {
            throw new InvalidArgumentError(`A polygon needs at least 3 vertices, got ${Array.isArray(vertices) ? vertices.length : typeof vertices}`)
        }

        const places = positionList(vertices, 'vertex of the polygon')

        if (places.some(p => !Number.isFinite(p.x) || !Number.isFinite(p.y))) {
            return null
        }

        return {vertices: places.map(p => ({x: p.x, y: p.y})), cycles: [places.map((_, i) => i)]}
    },

    regular: ({center, radius, sides, star}: PolygonRegular, graph) => {
        const step = checkSides(sides, star)
        const place = positions({center}, 'polygon').center

        return regularPolygon(place, radiusOf(radius, place, graph), sides, step)
    },

    onSide: ({A, B, sides, star}: PolygonOnSide) => {
        const step = checkSides(sides, star)
        const places = positions({A, B}, 'side of the polygon')

        return regularPolygonOnSide(places.A, places.B, sides, step)
    }
}

/** The only construction of a polygon. @throws InvalidArgumentError if the config has none, or several. */
export function constructionOf(config: IPolygonConfig, name: string): keyof PolygonConstraints {
    return constraintIn(RESOLVERS, config, name, 'polygon')
}

/**
 * Find the polygon of the construction `key` of a config that holds it, in pixels.
 * @returns the vertices and the closed paths through them, or `null` if the polygon does not exist (a position that does not
 * exist, a radius that is not greater than 0, `A` and `B` at the same place).
 * @throws InvalidArgumentError if a value is not valid: fewer than 3 vertices, a position that is not `{x, y}`, a number of sides or
 * a star that is not valid, a radius that is a number but not finite and greater than 0.
 */
export function resolveConstraint(key: keyof PolygonConstraints, config: IPolygonConfig, graph: IGraphConfig): PolygonShape | null {
    return resolveIn(RESOLVERS, key, config, graph)
}
