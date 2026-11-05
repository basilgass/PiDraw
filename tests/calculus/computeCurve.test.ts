import {describe, expect, test} from 'vitest'
import {curvePath, type CurveSampling, directionAlong, endOfCurve, isDefinedPosition, nearestOnPolyline, nowhere, sampleCurve} from '../../src/calculus'
import type {XY} from '../../src/pidraw.common'

// 50 pixels per unit, the origin in the middle of 800 x 600 pixels, y pointing up.
const pixels = (x: number, y: number): XY => Number.isFinite(y) ? {x: 400 + 50 * x, y: 300 - 50 * y} : nowhere()
const graph = (f: (x: number) => number) => (x: number) => pixels(x, f(x))

const sampling = (overrides: Partial<CurveSampling> = {}): CurveSampling => ({
    intervals: 100,
    tolerance: 0.5,
    maxDepth: 6,
    view: {left: 0, right: 800, top: 0, bottom: 600},
    bound: 6000,
    ...overrides
})

/** The distance from a point to a polyline whose pieces are cut at the points that do not exist. */
function distanceToPolyline(point: XY, polyline: XY[]): number {
    let best = Infinity

    for (let i = 1; i < polyline.length; i++) {
        const a = polyline[i - 1]
        const b = polyline[i]

        if (!isDefinedPosition(a) || !isDefinedPosition(b)) {
            continue
        }

        const dx = b.x - a.x
        const dy = b.y - a.y
        const length2 = dx * dx + dy * dy
        const t = length2 === 0 ? 0 : Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / length2))
        best = Math.min(best, Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy)))
    }

    return best
}

/** How far the true curve is from the polyline, looking at 20 times as many points as the polyline has pixels. */
function deviation(f: (x: number) => number, polyline: XY[], from: number, to: number): number {
    let worst = 0

    for (let i = 0; i <= 4000; i++) {
        const p = pixels(from + (to - from) * i / 4000, f(from + (to - from) * i / 4000))

        if (isDefinedPosition(p) && p.y >= 0 && p.y <= 600) {
            worst = Math.max(worst, distanceToPolyline(p, polyline))
        }
    }

    return worst
}

describe('sampleCurve of a curve that is a line', () => {
    test('is its two ends, whatever the number of intervals', () => {
        const points = sampleCurve(graph(x => 2 * x + 1), -4, 4, sampling({intervals: 500}))

        expect(points).toHaveLength(2)
        expect(points[0]).toEqual(pixels(-4, -7))
        expect(points[1]).toEqual(pixels(4, 9))
    })

    test('ends exactly at the end of the range', () => {
        const points = sampleCurve(graph(x => x * x), 0, 3.3, sampling({intervals: 7}))

        expect(points[points.length - 1]).toEqual(pixels(3.3, 3.3 * 3.3))
    })
})

describe('sampleCurve of a curve that bends', () => {
    test.each([
        ['x^2', (x: number) => x * x],
        ['sin(x)', Math.sin],
        ['x^3', (x: number) => x ** 3],
        ['1/(1+x^2)', (x: number) => 1 / (1 + x * x)],
        ['sin(10x)', (x: number) => Math.sin(10 * x)]
    ])('%s stays within the tolerance of the real curve, with far fewer points than pixels', (_, f) => {
        const points = sampleCurve(graph(f), -8, 8, sampling())

        expect(deviation(f, points, -8, 8)).toBeLessThanOrEqual(0.5)
        expect(points.length).toBeLessThan(450)
    })

    test('a curve that crosses its chord at the middle is not taken for a line', () => {
        // x^3 on [-1, 1]: the middle is on the chord, the quarters are not.
        const f = (x: number) => x ** 3 * 3
        const points = sampleCurve(graph(f), -1, 1, sampling({intervals: 1, tolerance: 0.1}))

        expect(points.length).toBeGreaterThan(2)
        expect(deviation(f, points, -1, 1)).toBeLessThanOrEqual(0.1)
    })

    test('a smaller tolerance gives more points, and a deviation that is smaller', () => {
        const f = Math.sin
        const rough = sampleCurve(graph(f), -8, 8, sampling({tolerance: 2}))
        const fine = sampleCurve(graph(f), -8, 8, sampling({tolerance: 0.05}))

        expect(fine.length).toBeGreaterThan(rough.length)
        expect(deviation(f, fine, -8, 8)).toBeLessThan(deviation(f, rough, -8, 8))
    })

    test('a depth of 0 only keeps the points of the intervals that are needed', () => {
        const points = sampleCurve(graph(Math.sin), -8, 8, sampling({intervals: 20, maxDepth: 0, tolerance: 0.01}))

        expect(points.length).toBeLessThanOrEqual(21)
    })

    test('a curve far outside of the view is not refined', () => {
        const calls = { inside: 0, outside: 0 }
        const f = (x: number) => 40 + Math.sin(30 * x)
        sampleCurve((x) => { calls.outside++; return pixels(x, f(x)) }, -8, 8, sampling({intervals: 50}))
        sampleCurve((x) => { calls.inside++; return pixels(x, Math.sin(30 * x)) }, -8, 8, sampling({intervals: 50}))

        expect(calls.outside).toBeLessThan(calls.inside / 4)
    })
})

describe('sampleCurve of a curve that stops to exist', () => {
    test('reaches the edge of its definition, not the sample before it', () => {
        // sqrt(4 - x^2) is vertical where it ends: a sample that is too early leaves a gap.
        const f = (x: number) => Math.sqrt(4 - x * x)
        const points = sampleCurve(graph(f), -4, 4, sampling({intervals: 20}))
        const defined = points.filter(isDefinedPosition)
        const last = defined[defined.length - 1]
        const first = defined[0]

        expect(last.x).toBeCloseTo(500, 0)
        expect(last.y).toBeGreaterThan(299)
        expect(first.x).toBeCloseTo(300, 0)
        expect(first.y).toBeGreaterThan(299)
    })

    test('reaches the edge when the curve starts to exist', () => {
        const points = sampleCurve(graph(Math.sqrt), -4, 4, sampling({intervals: 10}))
        const first = points.find(isDefinedPosition)

        expect(first?.x).toBeCloseTo(400, 0)
        expect(first?.y).toBeCloseTo(300, 0)
    })

    test('a hole in the middle cuts the polyline in two', () => {
        const f = (x: number) => Math.abs(x) < 1 ? NaN : x
        const points = sampleCurve(graph(f), -4, 4, sampling({intervals: 16}))
        const cuts = points.filter(p => !isDefinedPosition(p))

        expect(cuts.length).toBeGreaterThanOrEqual(1)
        expect(points.filter(isDefinedPosition).every(p => Math.abs(p.x - 400) >= 50 - 0.5)).toBe(true)
    })

    test('a curve that does not exist anywhere is a cut and no more', () => {
        const points = sampleCurve(graph(() => NaN), -4, 4, sampling())

        expect(points.filter(isDefinedPosition)).toHaveLength(0)
    })

    test('a point beyond the bound does not exist', () => {
        const points = sampleCurve(graph(x => x * 1e6), -4, 4, sampling({bound: 1000}))
        const defined = points.filter(isDefinedPosition)

        expect(defined.every(p => Math.abs(p.y) <= 1000)).toBe(true)
        expect(defined.length).toBeGreaterThan(0)
    })

    test('an asymptote leaves the curve cut on each side, with points that are beyond the view', () => {
        const f = (x: number) => 1 / x
        const points = sampleCurve(graph(f), -8, 8, sampling({intervals: 160}))
        const path = curvePath(points, 6000)

        expect(path.match(/M/g)?.length).toBeGreaterThanOrEqual(2)
        expect(deviation(f, points, -8, 8)).toBeLessThanOrEqual(0.5)
    })
})

describe('sampleCurve of a curve that is not a function', () => {
    test('a circle given by its angle stays within the tolerance', () => {
        const at = (t: number): XY => ({x: 400 + 100 * Math.cos(t), y: 300 - 100 * Math.sin(t)})
        const points = sampleCurve(at, 0, 2 * Math.PI, sampling({intervals: 12}))

        for (const p of points) {
            expect(Math.hypot(p.x - 400, p.y - 300)).toBeCloseTo(100, 6)
        }

        let worst = 0
        for (let i = 0; i < 2000; i++) {
            worst = Math.max(worst, distanceToPolyline(at(i * 2 * Math.PI / 2000), points))
        }
        expect(worst).toBeLessThanOrEqual(0.5)
    })
})

describe('curvePath', () => {
    test('is a move then lines, with 2 decimals', () => {
        expect(curvePath([{x: 1.006, y: 2}, {x: 3.14159, y: 4.5}, {x: 6, y: 7}], 1000)).toBe('M 1.01 2 L 3.14 4.5 L 6 7')
    })

    test('does not write the noise of floating point', () => {
        expect(curvePath([{x: 400.00000000000006, y: 299.99999999999994}], 1000)).toBe('M 400 300')
    })

    test('a point that does not exist starts a new piece', () => {
        expect(curvePath([{x: 0, y: 0}, {x: 1, y: 1}, nowhere(), {x: 5, y: 5}, {x: 6, y: 6}], 1000)).toBe('M 0 0 L 1 1 M 5 5 L 6 6')
    })

    test('a leap farther than the jump starts a new piece', () => {
        expect(curvePath([{x: 0, y: 0}, {x: 1, y: 5000}, {x: 2, y: -5000}, {x: 3, y: -4990}], 6000)).toBe('M 0 0 L 1 5000 M 2 -5000 L 3 -4990')
    })

    test('nothing to draw is a path that draws nothing', () => {
        expect(curvePath([], 1000)).toBe('M 0 0')
        expect(curvePath([nowhere(), nowhere()], 1000)).toBe('M 0 0')
    })
})

describe('endOfCurve', () => {
    const width = 800
    const height = 600

    test('is the last point of a polyline that stays in the drawing, and the way it goes', () => {
        const end = endOfCurve([{x: 100, y: 100}, {x: 300, y: 200}], width, height)

        expect(end?.point).toEqual({x: 300, y: 200})
        expect(end?.direction).toEqual({x: 200, y: 100})
    })

    test('is where the last piece crosses the border when the curve leaves the drawing', () => {
        const end = endOfCurve([{x: 600, y: 300}, {x: 1000, y: 300}], width, height)

        expect(end?.point.x).toBeCloseTo(800, 8)
        expect(end?.point.y).toBeCloseTo(300, 8)
        expect(end?.direction.x).toBeCloseTo(200, 8)
    })

    test('skips what is after a piece that is not seen, and what does not exist', () => {
        const end = endOfCurve([{x: 100, y: 100}, {x: 200, y: 100}, nowhere(), {x: 2000, y: 2000}, {x: 3000, y: 2000}], width, height)

        expect(end?.point).toEqual({x: 200, y: 100})
    })

    test('a lone point in the drawing has no direction', () => {
        const end = endOfCurve([nowhere(), {x: 100, y: 100}], width, height)

        expect(end).toEqual({point: {x: 100, y: 100}, direction: {x: 0, y: 0}})
    })

    test.each([
        ['nothing', []],
        ['nothing that exists', [nowhere(), nowhere()]],
        ['a point that is out of the drawing', [{x: 900, y: 100}]],
        ['a piece that is out of the drawing', [{x: 900, y: 100}, {x: 1000, y: 900}]]
    ])('%s has no end: null', (_, points) => {
        expect(endOfCurve(points, width, height)).toBeNull()
    })
})

describe('nearestOnPolyline', () => {
    const line = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}]

    test('is the projection on the closest piece', () => {
        expect(nearestOnPolyline(line, {x: 40, y: 30})).toEqual({x: 40, y: 0})
        expect(nearestOnPolyline(line, {x: 130, y: 60})).toEqual({x: 100, y: 60})
    })

    test('stays at the end of the polyline', () => {
        expect(nearestOnPolyline(line, {x: -50, y: -50})).toEqual({x: 0, y: 0})
        expect(nearestOnPolyline(line, {x: 100, y: 500})).toEqual({x: 100, y: 100})
    })

    test('does not join the pieces that a point that does not exist cuts', () => {
        const cut = [{x: 0, y: 0}, {x: 10, y: 0}, nowhere(), {x: 90, y: 0}, {x: 100, y: 0}]

        expect(nearestOnPolyline(cut, {x: 50, y: 5}).x).toBeCloseTo(10, 8)
        expect(nearestOnPolyline(cut, {x: 60, y: 5}).x).toBeCloseTo(90, 8)
    })

    test('a lone point is a piece of its own', () => {
        expect(nearestOnPolyline([nowhere(), {x: 5, y: 5}, nowhere()], {x: 0, y: 0})).toEqual({x: 5, y: 5})
    })

    test('is a point of its own, not the one of the polyline', () => {
        const found = nearestOnPolyline(line, {x: 0, y: 0})
        found.x = 999

        expect(line[0].x).toBe(0)
    })

    test.each([['nothing', []], ['nothing that exists', [nowhere(), nowhere()]]])('%s has no nearest point: nowhere', (_, points) => {
        expect(nearestOnPolyline(points, {x: 1, y: 1}).x).toBeNaN()
    })
})

describe('directionAlong', () => {
    // A figure that a point follows: the closest point of the line y = a x + b.
    const alongLine = (slope: number, offset: number) => (x: number, y: number) => {
        const length2 = 1 + slope * slope
        const t = (x + slope * (y - offset)) / length2

        return {x: t, y: slope * t + offset}
    }

    test.each([0, 1, -1, 0.3, 4, -0.5, 100])('finds a line of slope %d', (slope) => {
        const follow = alongLine(slope, 10)
        const point = follow(30, 60)
        const direction = directionAlong(follow, point) ?? {x: NaN, y: NaN}

        expect(direction.y / direction.x).toBeCloseTo(slope, 6)
    })

    test('finds the tangent of a circle', () => {
        const onCircle = (x: number, y: number) => {
            const d = Math.hypot(x - 400, y - 300)

            return {x: 400 + (x - 400) / d * 100, y: 300 + (y - 300) / d * 100}
        }
        const direction = directionAlong(onCircle, {x: 500, y: 300}) ?? {x: NaN, y: NaN}

        // At the rightmost point the tangent is vertical.
        expect(Math.abs(direction.x)).toBeLessThan(Math.abs(direction.y) * 1e-3)
    })

    test('has no direction for a figure that is a point, or does not exist', () => {
        expect(directionAlong(() => ({x: 5, y: 5}), {x: 5, y: 5})).toBeNull()
        expect(directionAlong(() => nowhere(), {x: 5, y: 5})).toBeNull()
    })
})
