import {
    type BezierSegment,
    DEFAULT_LOOP_SIDE,
    EDGE_SIDES,
    edgeSegments,
    type IEdgeEnd,
    loopSegments
} from "../../calculus"
import {InvalidArgumentError} from "../../errors"
import {Point} from "../Point/Point"
import type {IEdgeConfig} from "./Edge.types"

// What an edge is made of: pure functions from the config of the edge to its curve, in pixels. Nothing here touches the svg.

/** Whether the edge starts and ends at the same point. */
export function isLoop(config: Pick<IEdgeConfig, 'from' | 'to'>): boolean {
    return config.from === config.to
}

/**
 * @throws InvalidArgumentError if an end is not a point, if the curve is not a finite number, if the side of a loop is not `'t'`, `'r'`, `'b'` or
 * `'l'`, or if the edge has a side without being a loop, or a curve while being one.
 */
export function checkEdge(config: IEdgeConfig, name: string): void {
    for (const key of ['from', 'to'] as const) {
        if (!(config[key] instanceof Point)) {
            throw new InvalidArgumentError(`Invalid "${key}" for the edge "${name}": expected a point`)
        }
    }

    if (config.curve !== undefined && !(typeof config.curve === 'number' && Number.isFinite(config.curve))) {
        throw new InvalidArgumentError(`Invalid curve ${JSON.stringify(config.curve)} for the edge "${name}": expected a finite number`)
    }

    if (config.loopSide !== undefined && !EDGE_SIDES.includes(config.loopSide)) {
        throw new InvalidArgumentError(`Invalid loopSide "${config.loopSide}" for the edge "${name}": expected ${EDGE_SIDES.map(side => `'${side}'`).join(', ')}`)
    }

    if (config.loopSide !== undefined && !isLoop(config)) {
        throw new InvalidArgumentError(`The edge "${name}" has a side for a loop, and it goes from "${config.from.name}" to "${config.to.name}": a loop starts and ends at the same point`)
    }

    if (config.curve !== undefined && isLoop(config)) {
        throw new InvalidArgumentError(`The edge "${name}" is a loop, and a loop has no curve: its side is its shape`)
    }
}

/** An end of an edge: the position of a point, and its border. */
function endOf(point: Point): IEdgeEnd {
    return {position: point.pixels, boundary: toward => point.boundaryPoint(toward)}
}

/**
 * The curve of an edge, in pixels.
 * @returns the curve, or `null` if the edge does not exist: a point has no position, or the two points are at the same place.
 */
export function resolveEdge(config: IEdgeConfig): BezierSegment[] | null {
    if (isLoop(config)) {
        return loopSegments(endOf(config.from), config.loopSide ?? DEFAULT_LOOP_SIDE)
    }

    return edgeSegments(endOf(config.from), endOf(config.to), config.curve ?? 0)
}
