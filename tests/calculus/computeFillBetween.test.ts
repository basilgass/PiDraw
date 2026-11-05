import {describe, expect, test} from 'vitest'
import {
    type CurveSampling,
    fillBetweenArea,
    fillBetweenPath,
    fillBetweenRuns,
    nowhere
} from '../../src/calculus'
import type {XY} from '../../src/pidraw.common'

// A drawing of 800 x 600 pixels with the origin in the middle and 50 pixels per unit.
const pixel = (x: number, y: number): XY => ({x: 400 + 50 * x, y: 300 - 50 * y})
const curve = (f: (x: number) => number) => (x: number): XY => {
    const y = f(x)

    return Number.isNaN(y) ? nowhere() : pixel(x, y)
}
const toX = (p: number) => (p - 400) / 50
const baseline = 300

const sampling: CurveSampling = {
    intervals: 8,
    tolerance: 0.5,
    maxDepth: 6,
    view: {left: 0, right: 800, top: 0, bottom: 600},
    bound: 6000
}

const runs = (first: (x: number) => number, second: ((x: number) => number) | null, min: number, max: number) =>
    fillBetweenRuns(curve(first), second === null ? null : curve(second), baseline, {min, max}, toX, sampling)

describe('fillBetweenRuns', () => {
    test('between a curve and the x axis, the second side is the axis', () => {
        const [run] = runs(x => x, null, 0, 2)

        expect(run.second.every(p => p.y === baseline)).toBe(true)
        expect(run.first[0]).toEqual(pixel(0, 0))
        expect(run.first[run.first.length - 1]).toEqual(pixel(2, 2))
    })

    test('the ends of the domain are exact', () => {
        const [run] = runs(x => x * x, x => 1 + x, -1, 1.5)

        expect(run.first[0].x).toBeCloseTo(pixel(-1, 0).x, 9)
        expect(run.first[run.first.length - 1].x).toBeCloseTo(pixel(1.5, 0).x, 9)
    })

    test('both sides have the same abscissas', () => {
        const [run] = runs(x => Math.sin(x), x => x / 3, 0, 3)

        expect(run.second.map(p => p.x)).toEqual(run.first.map(p => p.x))
    })

    test('a line needs no more than a few points, a parabola more', () => {
        const [line] = runs(x => x, null, 0, 3)
        const [parabola] = runs(x => x * x, null, 0, 3)

        expect(line.first.length).toBeLessThanOrEqual(3)
        expect(parabola.first.length).toBeGreaterThan(line.first.length)
    })

    test('is cut where a curve does not exist', () => {
        const found = runs(x => 1 / x, null, -2, 2).filter(run => run.first.length > 1)

        expect(found.length).toBeGreaterThanOrEqual(1)
        expect(found.every(run => run.first.every(p => Number.isFinite(p.y)))).toBe(true)
    })

    test('is cut at an asymptote: the pieces do not join the two branches', () => {
        const found = runs(x => Math.tan(x), null, 0, 3)

        expect(found).toHaveLength(2)
    })

    test('is cut where the second curve does not exist', () => {
        const found = runs(() => 3, x => Math.sqrt(x), -2, 2)

        expect(found).toHaveLength(1)
        expect(found[0].first[0].x).toBeCloseTo(pixel(0, 0).x, 1)
    })

    test('a curve that does not exist anywhere gives no piece', () => {
        expect(runs(() => NaN, null, 0, 1)).toEqual([])
        expect(runs(x => x, () => NaN, 0, 1)).toEqual([])
    })
})

describe('fillBetweenPath', () => {
    test('goes along the first curve, then back along the second one, and is closed', () => {
        const path = fillBetweenPath([{
            first: [{x: 0, y: 0}, {x: 10, y: 0}],
            second: [{x: 0, y: 20}, {x: 10, y: 20}]
        }])

        expect(path).toBe('M 0 0 L 10 0 L 10 20 L 0 20 Z')
    })

    test('each piece is a closed path of its own', () => {
        const run = {first: [{x: 0, y: 0}, {x: 1, y: 0}], second: [{x: 0, y: 1}, {x: 1, y: 1}]}

        expect(fillBetweenPath([run, run]).match(/Z/g)).toHaveLength(2)
    })

    test('nothing is a point that is nowhere to be seen', () => {
        expect(fillBetweenPath([])).toBe('M 0 0')
    })
})

describe('fillBetweenArea', () => {
    test('is the area of a rectangle', () => {
        expect(fillBetweenArea([{first: [{x: 0, y: 0}, {x: 10, y: 0}], second: [{x: 0, y: 20}, {x: 10, y: 20}]}])).toBe(200)
    })

    test('is the area of a triangle', () => {
        expect(fillBetweenArea([{first: [{x: 0, y: 0}, {x: 10, y: 0}], second: [{x: 0, y: 0}, {x: 10, y: 10}]}])).toBe(50)
    })

    test('counts both sides of a crossing, not their difference', () => {
        // The curves cross in the middle: two triangles of 5 x 10 / 2 each.
        const crossing = {first: [{x: 0, y: 0}, {x: 10, y: 10}], second: [{x: 0, y: 10}, {x: 10, y: 0}]}

        expect(fillBetweenArea([crossing])).toBeCloseTo(50, 9)
    })

    test('is the area of the pieces together', () => {
        const run = {first: [{x: 0, y: 0}, {x: 1, y: 0}], second: [{x: 0, y: 2}, {x: 1, y: 2}]}

        expect(fillBetweenArea([run, run])).toBe(4)
    })

    test('is the exact area of a parabola within the tolerance of the sampling', () => {
        // x^2 from 0 to 3 is 9 units squared, 9 * 2500 pixels squared.
        expect(fillBetweenArea(runs(x => x * x, null, 0, 3)) / 2500).toBeCloseTo(9, 1)
    })

    test('no piece has no area', () => {
        expect(fillBetweenArea([])).toBe(0)
    })
})
