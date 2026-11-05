import type {XY, IGraphConfig} from "../../pidraw.common"
import {InvalidArgumentError} from "../../errors"
import {Axis} from "../Axis/Axis"
import {Line} from "../Line/Line"
import {distanceAB, mathVector, nowhere, toPixels} from "../../calculus"
import {constraintIn, resolveIn} from "../constraints"
import {mathLineOf} from "../Line/Line.constraints"
import type {IPointConfig, PointConstraints, PointCoordinateType} from "./Point.types"

// Where a point is, according to its constraint: pure functions from the value of the constraint to a position in
// pixels. Nothing here touches the svg or a `Point`, but for what a constraint refers to (`Line`, `Circle`, `Plot`...).

/** The position of each constraint of a point, in pixels. */
const RESOLVERS: { [K in keyof PointConstraints]: (value: PointConstraints[K], config: IGraphConfig) => XY } = {
    coordinates: ({x, y}, config) => toPixels({x: coordinateToNumber(x), y: coordinateToNumber(y)}, config),
    direction: moveAlong,
    evaluation: ({fx, x}) => fx.evaluate(coordinateToNumber(x)),
    intersection: ({A, B}) => mathLineOf(A).intersection(mathLineOf(B)) ?? nowhere(),
    intersectionBetweenCircles: ({A, B, index}) => A.intersectionWithCircle(B)?.[index] ?? nowhere(),
    intersectionWithCircle: ({A, B, index}) => A.intersectionWithLine(B)?.[index] ?? nowhere(),
    middle: ({A, B}) => ({x: (A.x + B.x) / 2, y: (A.y + B.y) / 2}),
    projection: project,
    symmetry: reflect
}

/** The only constraint of a point. @throws InvalidArgumentError if the config has none, or several. */
export function constraintOf(config: IPointConfig, name: string): keyof PointConstraints {
    return constraintIn(RESOLVERS, config, name, 'point')
}

/** The position, in pixels, given by the constraint `key` of a config that holds it. */
export function resolveConstraint(key: keyof PointConstraints, config: IPointConfig, graph: IGraphConfig): XY {
    return resolveIn(RESOLVERS, key, config, graph)
}

export function coordinateToNumber(coord: PointCoordinateType): number {
    if (typeof coord === "number") return coord

    if ('point' in coord && 'axis' in coord) {
        return coord.point.coordinates[coord.axis]
    }

    if ('point1' in coord && 'point2' in coord) {
        return distanceAB(coord.point1.coordinates, coord.point2.coordinates)
    }

    throw new InvalidArgumentError(`Invalid coordinate ${JSON.stringify(coord)}: expected a number, {point, axis} or {point1, point2}`)
}

/** The foot of the perpendicular from `point` to a line (an axis is one). */
function project({point, axis}: PointConstraints['projection']): XY {
    const {x: x0, y: y0} = axis.start
    const direction = axis.direction
    const dx = point.x - x0
    const dy = point.y - y0
    const dotProduct = dx * direction.x + dy * direction.y
    const dotProductLength = direction.x * direction.x + direction.y * direction.y

    return {
        x: x0 + dotProduct * direction.x / dotProductLength,
        y: y0 + dotProduct * direction.y / dotProductLength
    }
}

/** The symmetric of `A` about a point or a line (an axis is one). */
function reflect({A, B}: PointConstraints['symmetry']): XY {
    if (B instanceof Line) {
        const normal = new mathVector(B.direction).normal
        const BA = new mathVector(A, B.start)
        const proj = BA.projection(normal)

        return {x: A.x + 2 * proj.x, y: A.y + 2 * proj.y}
    }

    // The vector from B to A, taken from B to the other side.
    return {x: B.x - (A.x - B.x), y: B.y - (A.y - B.y)}
}

/**
 * `point` moved by `distance` (in units) along a line, or by a factor of a vector. The unit along an axis that has one (the axes of the
 * graph, a graduated line) is its own; along any other line it is the unit of the x axis.
 */
function moveAlong({point, direction, distance, perpendicular}: PointConstraints['direction'], config: IGraphConfig): XY {
    if (direction instanceof Line) {
        const unit = new mathVector(perpendicular ? direction.normal : direction.direction).unit
        const own = direction instanceof Axis ? direction.unit : null
        const pixels = own === null ? toPixels(distance, config) : distance * Math.hypot(own.x, own.y)

        return {x: point.x + pixels * unit.x, y: point.y + pixels * unit.y}
    }

    const vector = new mathVector(direction.A, direction.B)

    return {x: point.x + distance * vector.x, y: point.y + distance * vector.y}
}
