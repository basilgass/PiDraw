import type {Domain, XY} from "../pidraw.common"
import {type CurveSampling, pathNumber, sampleCurve} from "./computeCurve"
import {isDefinedPosition} from "./geometry"

// The area between two curves `y = f(x)` (or between a curve and the x axis), as closed polygons in pixels. Pure maths: the figure
// gives the curves and draws the polygons.

/**
 * A piece of the area where both curves exist and do not jump: the points of the first curve and the points of the second one (or of
 * the axis), from left to right. The two lists have the same abscissas, so the same length.
 */
export interface FillBetweenRun {
    first: XY[],
    second: XY[]
}

/** Two abscissas closer than this (in the units of the coordinate system) are the same one. */
const SAME_ABSCISSA = 1e-9

/**
 * The pieces of the area between two curves over a domain.
 *
 * Each curve is sampled where it bends (see `sampleCurve`), the abscissas of both are put together, and both curves are read at each
 * of them, so the area follows each curve within the tolerance. The pieces are cut where a curve does not exist, is beyond `bound`, or
 * jumps by more than `bound` (an asymptote). The ends of the domain are exact.
 *
 * @param first the first curve: the point of the curve at an abscissa, in pixels. A point that does not exist cuts the area.
 * @param second the second curve, in the same way; `null` for the x axis.
 * @param baseline the ordinate in pixels of the x axis, used when there is no second curve.
 * @param domain the abscissas, in the units of the coordinate system.
 * @param toX the abscissa in the units of the coordinate system, of a position in pixels.
 * @returns the pieces from left to right, each with at least two points: a piece of one point has no area.
 */
export function fillBetweenRuns(
    first: (x: number) => XY,
    second: ((x: number) => XY) | null,
    baseline: number,
    domain: Domain,
    toX: (pixel: number) => number,
    sampling: CurveSampling
): FillBetweenRun[] {
    const {bound} = sampling
    const exists = (p: XY) => isDefinedPosition(p) && Math.abs(p.x) <= bound && Math.abs(p.y) <= bound
    const abscissas = [domain.min, domain.max]

    for (const curve of second === null ? [first] : [first, second]) {
        for (const point of sampleCurve(curve, domain.min, domain.max, sampling)) {
            if (isDefinedPosition(point)) {
                abscissas.push(Math.min(domain.max, Math.max(domain.min, toX(point.x))))
            }
        }
    }

    abscissas.sort((a, b) => a - b)

    const xs = abscissas.filter((x, index) => index === 0 || x - abscissas[index - 1] > SAME_ABSCISSA)
    const runs: FillBetweenRun[] = []
    let run: FillBetweenRun = {first: [], second: []}

    const close = () => {
        if (run.first.length >= 2) {
            runs.push(run)
        }

        run = {first: [], second: []}
    }

    for (const x of xs) {
        const p1 = first(x)
        const p2 = second === null ? {x: p1.x, y: baseline} : second(x)

        if (!exists(p1) || !exists(p2)) {
            close()
            continue
        }

        const last = run.first.length - 1

        if (last >= 0 && (Math.abs(p1.y - run.first[last].y) > bound || Math.abs(p2.y - run.second[last].y) > bound)) {
            close()
        }

        run.first.push(p1)
        run.second.push(p2)
    }

    close()

    return runs
}

/** The svg path of the pieces: each one goes along the first curve, then back along the second one, and is closed. */
export function fillBetweenPath(runs: FillBetweenRun[]): string {
    if (runs.length === 0) {
        return 'M 0 0'
    }

    const at = (p: XY) => `${pathNumber(p.x)} ${pathNumber(p.y)}`

    return runs
        .map(({first, second}) => `M ${first.map(at).join(' L ')} L ${[...second].reverse().map(at).join(' L ')} Z`)
        .join(' ')
}

/**
 * The area of the pieces, in pixels squared: the area between the curves, not signed (where they cross, both sides count). Each
 * interval is a trapezoid, cut in two triangles where the curves cross.
 */
export function fillBetweenArea(runs: FillBetweenRun[]): number {
    let area = 0

    for (const {first, second} of runs) {
        for (let i = 1; i < first.length; i++) {
            const width = first[i].x - first[i - 1].x
            const before = second[i - 1].y - first[i - 1].y
            const after = second[i].y - first[i].y

            if (before * after >= 0) {
                area += width * (Math.abs(before) + Math.abs(after)) / 2
            } else {
                area += width * (before * before + after * after) / (2 * (Math.abs(before) + Math.abs(after)))
            }
        }
    }

    return area
}
