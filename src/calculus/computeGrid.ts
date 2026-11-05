import type {XY} from "../pidraw.common"
import {clipSegment, computeLine} from "./computeLine"
import {numberCorrection} from "./numbers"

// The lines of a grid, in pixels. Pure maths: the figure gives the axes and the step, and draws the lines.

/** A line this much beyond the border, in lines, is still taken for one that touches it (rounding). */
const EDGE_TOLERANCE = 1e-9

/**
 * The lines of a family of parallel lines that are seen in a canvas of `width` x `height` pixels: the lines that go in the direction
 * `along`, one through `origin`, the next ones each moved by `across` from the one before, on both sides.
 *
 * The first and the last line that touch the canvas are found by projecting its corners, so the cost is the number of lines that
 * are seen, whatever the directions are.
 *
 * @param along the direction of the lines, in pixels.
 * @param across the move from a line to the next one, in pixels. Its component along the lines does not matter.
 * @param minSpacing the lines are not drawn if they are closer than this, in pixels.
 * @param skipEvery when given (not 0), the lines whose index is a multiple of it are left out: the lines of a subdivision that are
 * already lines of the main grid.
 * @returns the seen part of each line, from the lowest index to the highest one. No line if `along` is a null vector, the lines are
 * merged with each other (`across` along `along`) or closer than `minSpacing`.
 */
export function gridLines(origin: XY, along: XY, across: XY, width: number, height: number, minSpacing: number, skipEvery = 0): [XY, XY][] {
    const length = Math.hypot(along.x, along.y)
    // The normal of the lines, as a unit vector.
    const normal = {x: -along.y / length, y: along.x / length}
    const spacing = across.x * normal.x + across.y * normal.y

    if (!(Math.abs(spacing) >= minSpacing) || !Number.isFinite(spacing)) {
        return []
    }

    // How far, along the normal, the corners are from the line through the origin.
    const distances = [[0, 0], [width, 0], [0, height], [width, height]]
        .map(([x, y]) => (x - origin.x) * normal.x + (y - origin.y) * normal.y)
    // The line k is at k times the spacing from the line through the origin: it touches the canvas between the nearest and the farthest corner.
    const ends = [Math.min(...distances) / spacing, Math.max(...distances) / spacing]
    const first = Math.ceil(Math.min(...ends) - EDGE_TOLERANCE)
    const last = Math.floor(Math.max(...ends) + EDGE_TOLERANCE)
    const lines: [XY, XY][] = []

    for (let k = first; k <= last; k++) {
        if (skipEvery > 0 && k % skipEvery === 0) {
            continue
        }

        const point = {x: origin.x + k * across.x, y: origin.y + k * across.y}
        const reach = computeLine(point, along, width, height)
        const seen = reach === null ? null : clipSegment(reach[0], reach[1], width, height)

        if (seen !== null) {
            lines.push(seen)
        }
    }

    return lines
}

/** An interval of the coordinate system. */
export interface GridInterval {
    min: number,
    max: number
}

/** The part of the interval `range` that is in `view`, or `null` if there is none. */
function overlap(range: GridInterval, view: GridInterval): GridInterval | null {
    const min = Math.max(range.min, view.min)
    const max = Math.min(range.max, view.max)

    return min <= max ? {min, max} : null
}

/**
 * Where the lines of one direction are: the multiples of `step / parts` in the part of `range` that is seen, without the multiples of
 * `step` when the lines are subdivisions; and, for the grid itself, the two ends of `range` when they are seen and not multiples (they
 * close the box).
 */
function linePositions(range: GridInterval, view: GridInterval, step: number, parts: number): number[] {
    const seen = overlap(range, view)

    if (seen === null) {
        return []
    }

    const sub = step / parts
    const first = Math.ceil(seen.min / sub - EDGE_TOLERANCE)
    const last = Math.floor(seen.max / sub + EDGE_TOLERANCE)
    const found: number[] = []

    for (let k = first; k <= last; k++) {
        if (parts === 1 || k % parts !== 0) {
            found.push(numberCorrection(k * sub))
        }
    }

    if (parts === 1) {
        for (const edge of [range.min, range.max]) {
            const inside = edge >= view.min && edge <= view.max
            const known = found.some(position => Math.abs(position - edge) <= EDGE_TOLERANCE * Math.max(1, Math.abs(edge)))

            if (inside && !known) {
                found.push(edge)
            }
        }
    }

    return found.sort((a, b) => a - b)
}

/**
 * The lines of a grid on a part of the coordinate system, in pixels. They are at the multiples of the step (the lines of the grid of
 * the graph, cut), and on the edges of the part: a box.
 *
 * The lines are made in the units of the coordinate system and then projected, so they are right for any axes.
 *
 * @param box the part of the coordinate system that has the grid.
 * @param view the part that is seen: nothing is made outside of it.
 * @param step the distance between two lines, in units of each axis.
 * @param project the position in pixels of a position in units.
 * @param minSpacing the lines of a direction are not drawn if they are closer than this, in pixels.
 * @param parts the lines are the subdivisions of each step in so many parts (the lines of the steps themselves are left out); 1 for the grid.
 * @returns the lines parallel to the x axis, then the ones parallel to the y axis.
 */
export function gridBoxLines(
    box: { x: GridInterval, y: GridInterval },
    view: { x: GridInterval, y: GridInterval },
    step: { x: number, y: number },
    project: (position: XY) => XY,
    minSpacing: number,
    parts = 1
): [XY, XY][] {
    const across = overlap(box.x, view.x)
    const along = overlap(box.y, view.y)

    if (across === null || along === null) {
        return []
    }

    // The distance in pixels between two lines of a direction.
    const spacing = (axis: 'x' | 'y') => {
        const zero = project({x: 0, y: 0})
        const next = project(axis === 'x' ? {x: step.x / parts, y: 0} : {x: 0, y: step.y / parts})

        return Math.hypot(next.x - zero.x, next.y - zero.y)
    }
    const dense = (axis: 'x' | 'y') => !(spacing(axis) >= minSpacing)

    const parallelToX = dense('y')
        ? []
        : linePositions(box.y, view.y, step.y, parts).map((y): [XY, XY] => [project({x: across.min, y}), project({x: across.max, y})])
    const parallelToY = dense('x')
        ? []
        : linePositions(box.x, view.x, step.x, parts).map((x): [XY, XY] => [project({x, y: along.min}), project({x, y: along.max})])

    return [...parallelToX, ...parallelToY]
}
