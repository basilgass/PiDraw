import type {XY} from "../pidraw.common"
import {clipSegment} from "./computeLine"
import {isDefinedPosition, nowhere} from "./geometry"

// Drawing a curve given by a function of one parameter (`y = f(x)`, or `(x(t), y(t))`) as a polyline in pixels: sample it where
// it bends, not everywhere. Pure maths, shared by every figure that draws such a curve.

/** A curve starts from one sample every this many pixels, before it is refined where it bends. */
export const PIXELS_PER_SAMPLE = 8

/** The part of the drawing that is seen, in pixels. */
export interface CurveView {
    left: number,
    right: number,
    top: number,
    bottom: number
}

export interface CurveSampling {
    /** How many intervals the parameter range is first cut into; each one is then refined where the curve bends. */
    intervals: number,
    /** How far from the curve the polyline may be, in pixels. */
    tolerance: number,
    /** How many times an interval may be cut in two. */
    maxDepth: number,
    /** An interval whose two ends are outside of it, on the same side, is not refined. */
    view: CurveView,
    /** A point farther than this from the origin of the pixels (or a curve that jumps farther than this) is not drawn. */
    bound: number
}

/** How many times the edge of the definition of a curve is searched for: the interval is divided by 2 each time. */
const EDGE_STEPS = 12

/** The distance from `point` to the segment `[a, b]`. */
function distanceToSegment(point: XY, a: XY, b: XY): number {
    const dx = b.x - a.x
    const dy = b.y - a.y
    const length2 = dx * dx + dy * dy

    if (length2 === 0) {
        return Math.hypot(point.x - a.x, point.y - a.y)
    }

    const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / length2))

    return Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy))
}

/** Whether both ends are outside of the view, on the same side. */
function outsideTogether(a: XY, b: XY, view: CurveView): boolean {
    return (a.x < view.left && b.x < view.left) || (a.x > view.right && b.x > view.right)
        || (a.y < view.top && b.y < view.top) || (a.y > view.bottom && b.y > view.bottom)
}

/**
 * Remove the points that are within `tolerance` of the segment their neighbours make (Douglas-Peucker), run by run: the
 * undefined points, which cut the curve, stay.
 */
function simplify(points: XY[], tolerance: number): XY[] {
    const result: XY[] = []
    let index = 0

    while (index < points.length) {
        if (!isDefinedPosition(points[index])) {
            // Two undefined points in a row cut the curve once.
            if (result.length > 0 && isDefinedPosition(result[result.length - 1])) {
                result.push(points[index])
            }

            index++
            continue
        }

        let end = index
        while (end + 1 < points.length && isDefinedPosition(points[end + 1])) {
            end++
        }

        result.push(...simplifyRun(points.slice(index, end + 1), tolerance))
        index = end + 1
    }

    return result
}

/** Douglas-Peucker on points that all exist. */
function simplifyRun(run: XY[], tolerance: number): XY[] {
    if (run.length < 3) {
        return run
    }

    const keep = new Array<boolean>(run.length).fill(false)
    keep[0] = keep[run.length - 1] = true
    const pending: [number, number][] = [[0, run.length - 1]]

    for (let range = pending.pop(); range !== undefined; range = pending.pop()) {
        const [first, last] = range
        let farthest = -1
        let distance = tolerance

        for (let k = first + 1; k < last; k++) {
            const d = distanceToSegment(run[k], run[first], run[last])

            if (d > distance) {
                distance = d
                farthest = k
            }
        }

        if (farthest >= 0) {
            keep[farthest] = true
            pending.push([first, farthest], [farthest, last])
        }
    }

    return run.filter((_, k) => keep[k])
}

/**
 * Sample a curve into a polyline, in pixels.
 *
 * The parameter range is cut into `intervals`; an interval is cut in two where the curve leaves the chord by more than
 * `tolerance` (the middle and the two quarters are looked at, so that a curve that crosses its chord is not taken for a line),
 * where the curve stops to exist (the edge of its definition is found), and nowhere it is not seen. The points that the
 * polyline does not need are then removed.
 *
 * @param at the point of the curve at a parameter, in pixels: a point that does not exist ({@link nowhere}) cuts the curve.
 * @returns the points in the order of the parameter; a point that does not exist cuts the polyline in two. A point that is
 * beyond `bound` does not exist.
 */
export function sampleCurve(at: (t: number) => XY, from: number, to: number, sampling: CurveSampling): XY[] {
    const {tolerance, maxDepth, view, bound} = sampling
    const intervals = Math.max(1, Math.ceil(sampling.intervals))
    const points: XY[] = []

    const point = (t: number): XY => {
        const p = at(t)

        return isDefinedPosition(p) && Math.abs(p.x) <= bound && Math.abs(p.y) <= bound ? p : nowhere()
    }

    const near = (p: XY, a: XY, b: XY) => isDefinedPosition(p) && distanceToSegment(p, a, b) <= tolerance

    // The point of `defined` that is the closest to the edge of the definition, between it and `undefined`.
    const edge = (tDefined: number, pDefined: XY, tUndefined: number): [number, XY] => {
        let tIn = tDefined
        let pIn = pDefined
        let tOut = tUndefined

        for (let step = 0; step < EDGE_STEPS; step++) {
            const tMiddle = (tIn + tOut) / 2
            const pMiddle = point(tMiddle)

            if (isDefinedPosition(pMiddle)) {
                tIn = tMiddle
                pIn = pMiddle
            } else {
                tOut = tMiddle
            }
        }

        return [tIn, pIn]
    }

    // Push the points between two points of the curve, not the two ends.
    const refine = (t1: number, p1: XY, t2: number, p2: XY, depth: number): void => {
        const defined1 = isDefinedPosition(p1)
        const defined2 = isDefinedPosition(p2)

        if (!defined1 && !defined2) {
            return
        }

        if (defined1 !== defined2) {
            // The curve stops to exist in this interval: go to the edge, and refine what is on the defined side.
            if (defined1) {
                const [tEdge, pEdge] = edge(t1, p1, t2)
                refine(t1, p1, tEdge, pEdge, depth + 1)
                points.push(pEdge)
            } else {
                const [tEdge, pEdge] = edge(t2, p2, t1)
                points.push(pEdge)
                refine(tEdge, pEdge, t2, p2, depth + 1)
            }

            return
        }

        if (depth >= maxDepth || Math.hypot(p2.x - p1.x, p2.y - p1.y) > bound || outsideTogether(p1, p2, view)) {
            return
        }

        const tMiddle = (t1 + t2) / 2
        const pMiddle = point(tMiddle)

        if (isDefinedPosition(pMiddle) && near(pMiddle, p1, p2)
            && near(point(t1 + (t2 - t1) / 4), p1, p2) && near(point(t1 + 3 * (t2 - t1) / 4), p1, p2)) {
            points.push(pMiddle)
            return
        }

        refine(t1, p1, tMiddle, pMiddle, depth + 1)
        points.push(pMiddle)
        refine(tMiddle, pMiddle, t2, p2, depth + 1)
    }

    let tPrevious = from
    let pPrevious = point(from)
    points.push(pPrevious)

    for (let i = 1; i <= intervals; i++) {
        // The last one is exactly the end, whatever the rounding.
        const t = i === intervals ? to : from + i * (to - from) / intervals
        const p = point(t)

        refine(tPrevious, pPrevious, t, p, 0)
        points.push(p)
        tPrevious = t
        pPrevious = p
    }

    return simplify(points, tolerance / 2)
}

/**
 * The end of the last piece of a polyline that is inside a drawing of `width` x `height` pixels: where a label of the curve
 * goes. A piece that leaves the drawing ends where it crosses the border.
 *
 * @returns the point, and the direction the curve goes there (in pixels, not a unit vector; null vector for a lone point), or
 * `null` if no part of the polyline is inside the drawing.
 */
export function endOfCurve(points: XY[], width: number, height: number): { point: XY, direction: XY } | null {
    for (let index = points.length - 1; index >= 0; index--) {
        const end = points[index]
        const start = index > 0 ? points[index - 1] : undefined

        if (!isDefinedPosition(end)) {
            continue
        }

        if (start === undefined || !isDefinedPosition(start)) {
            if (end.x >= 0 && end.x <= width && end.y >= 0 && end.y <= height) {
                return {point: end, direction: {x: 0, y: 0}}
            }

            continue
        }

        const seen = clipSegment(start, end, width, height)

        if (seen !== null) {
            return {point: seen[1], direction: {x: seen[1].x - seen[0].x, y: seen[1].y - seen[0].y}}
        }
    }

    return null
}

/**
 * The point of a polyline that is the closest to a position. The points that do not exist cut the polyline in pieces, and a lone
 * point is a piece of its own.
 *
 * @returns the point (a position of its own), or `nowhere()` if the polyline has no point that exists.
 */
export function nearestOnPolyline(points: XY[], position: XY): XY {
    let best = nowhere()
    let distance = Infinity

    const consider = (candidate: XY) => {
        const d = Math.hypot(candidate.x - position.x, candidate.y - position.y)

        if (d < distance) {
            distance = d
            best = candidate
        }
    }

    points.forEach((end, index) => {
        if (!isDefinedPosition(end)) {
            return
        }

        const start = index > 0 ? points[index - 1] : undefined

        if (start === undefined || !isDefinedPosition(start)) {
            consider({x: end.x, y: end.y})
            return
        }

        const dx = end.x - start.x
        const dy = end.y - start.y
        const length2 = dx * dx + dy * dy
        const t = length2 === 0 ? 0 : Math.max(0, Math.min(1, ((position.x - start.x) * dx + (position.y - start.y) * dy) / length2))

        consider({x: start.x + t * dx, y: start.y + t * dy})
    })

    return best
}

/**
 * The direction a figure goes at a point of it, found from its `follow` function (the closest point of the figure to a position): the
 * difference between the points that two positions on both sides of the point give. Two pairs of positions are looked at (along the
 * diagonal and the anti-diagonal of the screen), and the one that gives the longest difference is kept, so that a line is found at
 * every angle.
 *
 * @param step how far from the point the positions are, in pixels.
 * @returns the direction (not a unit vector), or `null` if the figure does not move around the point (it is not there, or a point).
 */
export function directionAlong(follow: (x: number, y: number) => XY, point: XY, step = 0.5): XY | null {
    let best: XY | null = null
    let longest = 1e-9

    for (const [dx, dy] of [[step, step], [step, -step]]) {
        const after = follow(point.x + dx, point.y + dy)
        const before = follow(point.x - dx, point.y - dy)

        if (!isDefinedPosition(after) || !isDefinedPosition(before)) {
            continue
        }

        const length = Math.hypot(after.x - before.x, after.y - before.y)

        if (length > longest) {
            longest = length
            best = {x: after.x - before.x, y: after.y - before.y}
        }
    }

    return best
}

/** A number of a path, with 2 decimals at most: the finest a screen shows, and a path that is three times shorter. */
export function pathNumber(value: number): number {
    return Math.round(value * 100) / 100 + 0
}

/**
 * The svg path of a polyline. A point that does not exist, or a point farther than `jump` from the previous one (a curve that
 * leaps to the other side of an asymptote), starts a new piece: nothing is drawn between them.
 */
export function curvePath(points: XY[], jump: number): string {
    const parts: string[] = []
    let previous: XY | null = null

    for (const p of points) {
        if (!isDefinedPosition(p)) {
            previous = null
            continue
        }

        const connected = previous !== null && Math.hypot(p.x - previous.x, p.y - previous.y) <= jump
        parts.push(`${connected ? 'L' : 'M'} ${pathNumber(p.x)} ${pathNumber(p.y)}`)
        previous = p
    }

    return parts.length > 0 ? parts.join(' ') : 'M 0 0'
}
