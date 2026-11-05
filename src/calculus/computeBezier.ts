import type {XY} from "../pidraw.common"
import {InvalidArgumentError} from "../errors"
import {pathNumber, sampleCurve} from "./computeCurve"

// Cubic Bézier curves in pixels: the smooth curve through points (the control points come from the neighbours of each point, see
// https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74), and the curve pulled by control points.

/**
 * The direction of a curve at a point it goes through. `horizontal` and `vertical` pick, of the two senses, the one that goes toward
 * the neighbours; a number is an angle in degrees, counterclockwise as seen on the screen, and the curve goes exactly that way.
 */
export type BezierDirection = 'horizontal' | 'vertical' | number

/** A point a smooth curve goes through. */
export interface BezierNode {
    point: XY,
    /** The direction of the curve at the point. By default the one of the line between its neighbours. */
    direction?: BezierDirection,
    /** How far the control points are from the point, as a part of the distance between its neighbours. 0.2 by default. */
    ratio?: number
}

/** A cubic Bézier curve: from `start` to `end`, pulled by two control points. */
export interface BezierSegment {
    start: XY,
    control1: XY,
    control2: XY,
    end: XY
}

export const DEFAULT_RATIO = 0.2

/** The direction a smooth curve goes at a node, as a unit vector in pixels (null for a node whose neighbours are at the same place). */
function heading(direction: BezierDirection | undefined, chord: XY): XY {
    const length = Math.hypot(chord.x, chord.y)

    if (typeof direction === 'number') {
        const radians = direction * Math.PI / 180

        // The y axis of the screen points down.
        return {x: Math.cos(radians), y: -Math.sin(radians)}
    }

    if (direction === 'horizontal') {
        return {x: chord.x < 0 ? -1 : 1, y: 0}
    }

    if (direction === 'vertical') {
        return {x: 0, y: chord.y > 0 ? 1 : -1}
    }

    return length === 0 ? {x: 0, y: 0} : {x: chord.x / length, y: chord.y / length}
}

/**
 * The cubic curves of the smooth curve that goes through the nodes, from one to the next. Of each node the two control points are on
 * its direction, on both sides, at `ratio` times the distance between its neighbours (the first and last node of an open curve have
 * only one neighbour). Without a direction it is the line between the neighbours, which makes the curve smooth.
 *
 * @param closed the last node is joined to the first one, and the curve is smooth there too.
 * @returns no curve for less than 2 nodes.
 */
export function smoothBezierSegments(nodes: BezierNode[], closed = false): BezierSegment[] {
    const count = nodes.length

    if (count < 2) {
        return []
    }

    const controls = nodes.map((node, i) => {
        const previous = closed ? nodes[(i - 1 + count) % count] : nodes[Math.max(i - 1, 0)]
        const next = closed ? nodes[(i + 1) % count] : nodes[Math.min(i + 1, count - 1)]
        const chord = {x: next.point.x - previous.point.x, y: next.point.y - previous.point.y}
        const length = Math.hypot(chord.x, chord.y) * (node.ratio ?? DEFAULT_RATIO)
        const way = heading(node.direction, chord)

        return {
            forward: {x: node.point.x + way.x * length, y: node.point.y + way.y * length},
            backward: {x: node.point.x - way.x * length, y: node.point.y - way.y * length}
        }
    })

    return Array.from({length: closed ? count : count - 1}, (_, i) => {
        const j = (i + 1) % count

        return {start: nodes[i].point, control1: controls[i].forward, control2: controls[j].backward, end: nodes[j].point}
    })
}

/**
 * The Bézier curve pulled by 3 control points (a quadratic curve, written as the cubic curve that is the same) or 4 (a cubic curve):
 * it starts at the first, ends at the last, and is not on the others.
 *
 * @throws InvalidArgumentError if there are not 3 or 4 points.
 */
export function controlBezierSegments(points: XY[]): BezierSegment[] {
    if (points.length === 4) {
        return [{start: points[0], control1: points[1], control2: points[2], end: points[3]}]
    }

    if (points.length === 3) {
        const [start, control, end] = points
        const toward = (from: XY) => ({x: from.x + 2 * (control.x - from.x) / 3, y: from.y + 2 * (control.y - from.y) / 3})

        return [{start, control1: toward(start), control2: toward(end), end}]
    }

    throw new InvalidArgumentError(`A Bézier curve of control points has 3 or 4 points, got ${points.length}`)
}

/** The svg path of the curves, with 2 decimals at most. A closed path ends with `Z`. */
export function bezierPath(segments: BezierSegment[], closed = false): string {
    if (segments.length === 0) {
        return 'M 0 0'
    }

    const at = (p: XY) => `${pathNumber(p.x)},${pathNumber(p.y)}`
    const curves = segments.map(({control1, control2, end}) => `C ${at(control1)} ${at(control2)} ${at(end)}`)

    return [`M ${at(segments[0].start)}`, ...curves, ...(closed ? ['Z'] : [])].join(' ')
}

/** The point of a curve at `t` (0 at its start, 1 at its end), and the direction it goes there. */
function onSegment({start, control1, control2, end}: BezierSegment, t: number): { point: XY, direction: XY } {
    const u = 1 - t
    const mix = (a: number, b: number, c: number, d: number) => u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d
    const slope = (a: number, b: number, c: number, d: number) => 3 * u * u * (b - a) + 6 * u * t * (c - b) + 3 * t * t * (d - c)

    return {
        point: {x: mix(start.x, control1.x, control2.x, end.x), y: mix(start.y, control1.y, control2.y, end.y)},
        direction: {x: slope(start.x, control1.x, control2.x, end.x), y: slope(start.y, control1.y, control2.y, end.y)}
    }
}

/** Every curve is first cut in this many intervals, then refined where it bends. */
const POLYLINE_INTERVALS = 4

/** The whole plane: a curve that is not seen is still followed. */
const EVERYWHERE = 1e9

/**
 * The curves as a polyline in pixels, within `tolerance` pixels of them, with a point only where they bend. The end of a curve is
 * the start of the next one, and is written once.
 */
export function bezierPolyline(segments: BezierSegment[], tolerance = 0.5): XY[] {
    return segments.flatMap((segment, index) => {
        const at = (t: number) => onSegment(segment, t).point
        const points = sampleCurve(at, 0, 1, {
            intervals: POLYLINE_INTERVALS,
            tolerance,
            maxDepth: 8,
            view: {left: -EVERYWHERE, right: EVERYWHERE, top: -EVERYWHERE, bottom: EVERYWHERE},
            bound: EVERYWHERE
        })

        return index === 0 ? points : points.slice(1)
    })
}

/** How many points of each curve are looked at to find the middle of a path. */
const MIDDLE_STEPS = 24

/**
 * The point half way along the curves, in length, and the direction the curves go there (not a unit vector). Used to put a label.
 *
 * @returns `null` for no curve.
 */
export function bezierMiddle(segments: BezierSegment[]): { point: XY, direction: XY } | null {
    const steps = segments.flatMap(segment => Array.from({length: MIDDLE_STEPS}, (_, k) => onSegment(segment, (k + 1) / MIDDLE_STEPS)))

    if (steps.length === 0) {
        return null
    }

    const path = [onSegment(segments[0], 0), ...steps]
    const lengths = path.map((p, i) => i === 0 ? 0 : Math.hypot(p.point.x - path[i - 1].point.x, p.point.y - path[i - 1].point.y))
    const half = lengths.reduce((sum, length) => sum + length, 0) / 2
    let walked = 0

    for (let i = 1; i < path.length; i++) {
        if (walked + lengths[i] >= half) {
            const part = lengths[i] === 0 ? 0 : (half - walked) / lengths[i]
            const a = path[i - 1]
            const b = path[i]

            return {
                point: {x: a.point.x + (b.point.x - a.point.x) * part, y: a.point.y + (b.point.y - a.point.y) * part},
                direction: {x: b.point.x - a.point.x, y: b.point.y - a.point.y}
            }
        }

        walked += lengths[i]
    }

    return path[path.length - 1]
}
