import type {Domain, IGraphConfig, XY} from "../pidraw.common"
import {toCoordinates, toPixels} from "./coordinates"
import {isDefinedPosition} from "./geometry"

// Where a point that is dragged is allowed to go. Pure maths: `Graph` reads the events of the mouse, this puts the position where the
// rules say.

/** What limits the position of a point that is dragged. Each rule is optional. */
export interface DragRules {
    /**
     * Move on the screen along `axis` only: the point keeps its other coordinate, which is the one of `keep`, in pixels (`'x'` keeps the
     * `y` of `keep`).
     */
    along?: { axis: 'x' | 'y', keep: XY },
    /** The part of each axis the point stays in, in units of the coordinate system. */
    bounds?: { x?: Domain, y?: Domain },
    /** Put the point on the nearest line of a grid with this step, in units of the axes, from the origin. */
    step?: { x: number, y: number }
}

/** The number between `min` and `max` that is the closest to `value`. */
function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max))
}

/**
 * The candidates that are at most `radius` pixels from `position`, the closest first. A candidate that is not a position is left out.
 */
export function snapCandidates<T extends XY>(position: XY, candidates: readonly T[], radius: number): T[] {
    return candidates
        .filter(isDefinedPosition)
        .map(candidate => ({candidate, distance: Math.hypot(candidate.x - position.x, candidate.y - position.y)}))
        .filter(({distance}) => distance <= radius)
        .sort((a, b) => a.distance - b.distance)
        .map(({candidate}) => candidate)
}

/**
 * The position, in pixels, that a point dragged to `position` takes, by the rules in this order: `along`, the grid (`step`), then
 * `bounds`, which no other rule can go beyond.
 *
 * @throws MathError if a grid is asked for while the two axes of `config` are collinear.
 */
export function constrainDrag(position: XY, rules: DragRules, config: IGraphConfig): XY {
    let {x, y} = position

    if (rules.along) {
        const {axis, keep} = rules.along

        if (axis === 'x') {
            y = keep.y
        } else {
            x = keep.x
        }
    }

    if (rules.step) {
        // In units, so that the lines of the grid are where the origin puts them.
        const units = toCoordinates({x, y}, config)

        ;({x, y} = toPixels({
            x: Math.round(units.x / rules.step.x) * rules.step.x,
            y: Math.round(units.y / rules.step.y) * rules.step.y
        }, config))
    }

    if (rules.bounds?.x) {
        const {min, max} = toPixels(rules.bounds.x, config, 'x')

        x = clamp(x, min, max)
    }

    if (rules.bounds?.y) {
        const {min, max} = toPixels(rules.bounds.y, config, 'y')

        y = clamp(y, min, max)
    }

    return {x, y}
}
