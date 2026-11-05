import {InvalidArgumentError} from "../../errors"
import {
    type BezierDirection,
    type BezierNode,
    type BezierSegment,
    controlBezierSegments,
    isDefinedPosition,
    smoothBezierSegments
} from "../../calculus"
import {constraintIn, positionList, positions, resolveIn} from "../constraints"
import type {BezierConstraints, BezierPoint, IBezierConfig} from "./Bezier.types"

// What a Bézier curve is made of, according to its construction: pure functions from the value of the construction to the cubic curves,
// in pixels. Nothing here touches the svg.

/** @throws InvalidArgumentError if the direction is not `'horizontal'`, `'vertical'` or a finite angle. */
function checkDirection(direction: BezierDirection | undefined): void {
    if (direction !== undefined && direction !== 'horizontal' && direction !== 'vertical'
        && !(typeof direction === 'number' && Number.isFinite(direction))) {
        throw new InvalidArgumentError(`Invalid direction ${JSON.stringify(direction)}: expected 'horizontal', 'vertical' or an angle in degrees`)
    }
}

/** @throws InvalidArgumentError if the ratio is not a finite number greater than 0. */
function checkRatio(ratio: number | undefined): void {
    if (ratio !== undefined && !(typeof ratio === 'number' && Number.isFinite(ratio) && ratio > 0)) {
        throw new InvalidArgumentError(`Invalid ratio ${JSON.stringify(ratio)}: expected a finite number greater than 0`)
    }
}

/** How to find the curves of each construction, or `null` if the curve does not exist. */
const RESOLVERS: { [K in keyof BezierConstraints]: (value: BezierConstraints[K], closed: boolean) => BezierSegment[] | null } = {
    through: (points: BezierPoint[], closed) => {
        const minimum = closed ? 3 : 2

        if (!Array.isArray(points) || points.length < minimum) {
            throw new InvalidArgumentError(
                `A ${closed ? 'closed ' : ''}curve needs at least ${minimum} points, got ${Array.isArray(points) ? points.length : typeof points}`
            )
        }

        const nodes: BezierNode[] = points.map((node, index) => {
            const {point} = positions({point: (node as Partial<BezierPoint> | null)?.point}, `point ${index} of the curve`)
            checkDirection(node.direction)
            checkRatio(node.ratio)

            // A position of its own: the figure keeps the curves, not the points it was given.
            return {point: {x: point.x, y: point.y}, direction: node.direction, ratio: node.ratio}
        })

        return nodes.every(node => isDefinedPosition(node.point)) ? smoothBezierSegments(nodes, closed) : null
    },

    controls: (points: BezierConstraints['controls']) => {
        if (!Array.isArray(points) || (points.length !== 3 && points.length !== 4)) {
            throw new InvalidArgumentError(`A curve of control points has 3 or 4 points, got ${Array.isArray(points) ? points.length : typeof points}`)
        }

        const places = positionList(points, 'control point of the curve')

        return places.every(isDefinedPosition) ? controlBezierSegments(places.map(p => ({x: p.x, y: p.y}))) : null
    }
}

/** The only construction of a curve. @throws InvalidArgumentError if the config has none, or several. */
export function constructionOf(config: IBezierConfig, name: string): keyof BezierConstraints {
    return constraintIn(RESOLVERS, config, name, 'curve')
}

/**
 * Find the cubic curves of the construction `key` of a config that holds it, in pixels.
 * @returns the curves, or `null` if the curve does not exist (a position that does not exist).
 * @throws InvalidArgumentError if a value is not valid: too few points, a position that is not `{x, y}`, a direction or a ratio that is
 * not valid, or `closed` with control points.
 */
export function resolveConstraint(key: keyof BezierConstraints, config: IBezierConfig, name: string): BezierSegment[] | null {
    if (config.closed === true && key !== 'through') {
        throw new InvalidArgumentError(`The curve "${name}" has control points and cannot be closed: only a curve through points can`)
    }

    return resolveIn(RESOLVERS, key, config, config.closed === true)
}
