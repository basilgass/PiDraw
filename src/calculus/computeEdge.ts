import type {XY} from "../pidraw.common"
import type {BezierSegment} from "./computeBezier"
import {isDefinedPosition} from "./geometry"

// The geometry of an edge: the curve that joins two ends and stops at their borders, or that leaves an end and comes back to it (a loop).
// Everything is in pixels of the svg, the y axis pointing down.

/** The side of a node where a loop is: top, right, bottom or left. */
export type EdgeSide = 't' | 'r' | 'b' | 'l'

/** The sides of a loop. */
export const EDGE_SIDES: readonly EdgeSide[] = ['t', 'r', 'b', 'l']

/** The side of a loop that is not given one. */
export const DEFAULT_LOOP_SIDE: EdgeSide = 't'

/** An end of an edge: where it is, and where its border is on a half line from it (its position itself for an end that has no border). */
export interface IEdgeEnd {
    position: XY
    boundary(toward: XY): XY
}

/** How far from the middle of its side a loop leaves and comes back to the node, in degrees. */
const LOOP_ANGLE = 35

/** How far the control points of a loop are from the node, in pixels. */
const LOOP_REACH = 40

const SIDE_DIRECTIONS: Record<EdgeSide, XY> = {t: {x: 0, y: -1}, r: {x: 1, y: 0}, b: {x: 0, y: 1}, l: {x: -1, y: 0}}

/** A cubic curve that is a straight line: its control points are a third and two thirds of the way. */
function straight(start: XY, end: XY): BezierSegment {
    return {
        start,
        control1: {x: start.x + (end.x - start.x) / 3, y: start.y + (end.y - start.y) / 3},
        control2: {x: start.x + 2 * (end.x - start.x) / 3, y: start.y + 2 * (end.y - start.y) / 3},
        end
    }
}

/** The cubic curve that has the same shape as the quadratic one from `start` to `end` pulled by `control`. */
function quadratic(start: XY, control: XY, end: XY): BezierSegment {
    const toward = (from: XY) => ({x: from.x + 2 * (control.x - from.x) / 3, y: from.y + 2 * (control.y - from.y) / 3})

    return {start, control1: toward(start), control2: toward(end), end}
}

/**
 * The curve from the border of an end to the border of another, where a half line from each one toward the other end meets it. With a
 * `curve` it is bent: its middle is moved sideways by `curve` times the distance between the ends, to the left of the way (as seen on the
 * screen) for a positive number, to the right for a negative one; the ends are then on the half lines toward the point that pulls the curve.
 *
 * @param curve 0 for a straight line.
 * @returns the curve, or `null` if an end has no position, or if the two ends are at the same place.
 */
export function edgeSegments(from: IEdgeEnd, to: IEdgeEnd, curve: number): BezierSegment[] | null {
    const [a, b] = [from.position, to.position]

    if (!isDefinedPosition(a) || !isDefinedPosition(b)) {
        return null
    }

    const length = Math.hypot(b.x - a.x, b.y - a.y)

    if (length === 0) {
        return null
    }

    if (curve === 0) {
        return [straight(from.boundary(b), to.boundary(a))]
    }

    // The left of the way (dx, dy) is (dy, -dx) on the screen. A quadratic curve bends by half of the distance to the point that pulls it.
    const pull = {
        x: (a.x + b.x) / 2 + (b.y - a.y) / length * 2 * curve * length,
        y: (a.y + b.y) / 2 - (b.x - a.x) / length * 2 * curve * length
    }

    return [quadratic(from.boundary(pull), pull, to.boundary(pull))]
}

/**
 * The curve that leaves an end by the side of it that is asked, and comes back to it: it starts and ends on the border, a little before and
 * a little after the middle of the side, and goes out from it.
 *
 * @returns the curve, or `null` if the end has no position.
 */
export function loopSegments(end: IEdgeEnd, side: EdgeSide): BezierSegment[] | null {
    const {position} = end

    if (!isDefinedPosition(position)) {
        return null
    }

    const turn = (direction: XY, degrees: number): XY => {
        const angle = degrees * Math.PI / 180

        return {x: direction.x * Math.cos(angle) - direction.y * Math.sin(angle), y: direction.x * Math.sin(angle) + direction.y * Math.cos(angle)}
    }
    const [out, back] = [turn(SIDE_DIRECTIONS[side], -LOOP_ANGLE), turn(SIDE_DIRECTIONS[side], LOOP_ANGLE)]
    const at = (direction: XY): XY => end.boundary({x: position.x + direction.x, y: position.y + direction.y})
    const [start, finish] = [at(out), at(back)]

    return [{
        start,
        control1: {x: start.x + out.x * LOOP_REACH, y: start.y + out.y * LOOP_REACH},
        control2: {x: finish.x + back.x * LOOP_REACH, y: finish.y + back.y * LOOP_REACH},
        end: finish
    }]
}

/** The direction, on the screen, in which a loop on a side goes out of its node. */
export function loopDirection(side: EdgeSide): XY {
    return {...SIDE_DIRECTIONS[side]}
}
