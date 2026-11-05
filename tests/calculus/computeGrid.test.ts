import {describe, expect, test} from 'vitest'
import {gridBoxLines, gridLines} from '../../src/calculus'
import type {XY} from '../../src/pidraw.common'

// A drawing of 800 x 600 pixels with the origin in the middle and 50 pixels per unit.
const origin: XY = {x: 400, y: 300}
const lines = (along: XY, across: XY, minSpacing = 3, at: XY = origin) => gridLines(at, along, across, 800, 600, minSpacing)

describe('gridLines', () => {
    test('horizontal lines are one step apart, from one border to the other', () => {
        const found = lines({x: 50, y: 0}, {x: 0, y: -50})

        // From the top to the bottom: 13 lines, the ones on the borders included.
        expect(found).toHaveLength(13)
        expect(found.map(([a]) => a.y).sort((a, b) => a - b)).toEqual([0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600])
        expect(found.every(([a, b]) => Math.min(a.x, b.x) === 0 && Math.max(a.x, b.x) === 800)).toBe(true)
    })

    test('vertical lines are one step apart, from one border to the other', () => {
        const found = lines({x: 0, y: -50}, {x: 50, y: 0})

        expect(found).toHaveLength(17)
        expect(found.map(([a]) => a.x).sort((a, b) => a - b)[0]).toBe(0)
        expect(found.every(([a, b]) => Math.min(a.y, b.y) === 0 && Math.max(a.y, b.y) === 600)).toBe(true)
    })

    test('the line through the origin is one of them', () => {
        expect(lines({x: 50, y: 0}, {x: 0, y: -100}).some(([a, b]) => a.y === 300 && b.y === 300)).toBe(true)
    })

    test('a bigger step has fewer lines', () => {
        expect(lines({x: 50, y: 0}, {x: 0, y: -100})).toHaveLength(7)
    })

    test('the direction of the move does not change the lines', () => {
        const up = lines({x: 50, y: 0}, {x: 0, y: -50}).map(([a]) => a.y).sort((a, b) => a - b)
        const down = lines({x: 50, y: 0}, {x: 0, y: 50}).map(([a]) => a.y).sort((a, b) => a - b)

        expect(down).toEqual(up)
    })

    test('lines are found whatever the origin, even out of the drawing', () => {
        const found = lines({x: 50, y: 0}, {x: 0, y: -50}, 3, {x: -1000, y: 325})

        expect(found.map(([a]) => a.y).sort((a, b) => a - b)[0]).toBe(25)
        expect(found).toHaveLength(12)
    })

    test('oblique lines are all parallel to the direction and inside of the drawing', () => {
        const found = lines({x: 50, y: 50}, {x: 0, y: -50})

        expect(found.length).toBeGreaterThan(20)
        for (const [a, b] of found) {
            expect((b.x - a.x) * 50 - (b.y - a.y) * 50).toBeCloseTo(0, 6)
            expect(Math.min(a.x, b.x)).toBeGreaterThanOrEqual(-1e-9)
            expect(Math.max(a.x, b.x)).toBeLessThanOrEqual(800 + 1e-9)
            expect(Math.min(a.y, b.y)).toBeGreaterThanOrEqual(-1e-9)
            expect(Math.max(a.y, b.y)).toBeLessThanOrEqual(600 + 1e-9)
        }
    })

    test('oblique lines are one step apart, measured across them', () => {
        const found = lines({x: 50, y: 50}, {x: 0, y: -50})
        // The distance between two lines of the family is the move projected on the normal: 50 / sqrt(2).
        const offsets = found.map(([a]) => (a.y - a.x)).sort((a, b) => a - b)

        for (let i = 1; i < offsets.length; i++) {
            expect(offsets[i] - offsets[i - 1]).toBeCloseTo(50, 6)
        }
    })

    test('lines closer than the minimum are not drawn', () => {
        expect(lines({x: 50, y: 0}, {x: 0, y: -2})).toEqual([])
        expect(lines({x: 50, y: 0}, {x: 0, y: -3})).not.toEqual([])
    })

    test.each([
        ['a null direction', {x: 0, y: 0}, {x: 0, y: -50}],
        ['a move along the lines', {x: 50, y: 0}, {x: 50, y: 0}],
        ['no move', {x: 50, y: 0}, {x: 0, y: 0}],
        ['a move that is not a number', {x: 50, y: 0}, {x: 0, y: NaN}]
    ])('%s gives no line', (_, along, across) => {
        expect(lines(along, across)).toEqual([])
    })
})

describe('gridBoxLines', () => {
    // 50 pixels per unit, the origin in the middle of 800 x 600 pixels, y pointing up.
    const project = (p: XY): XY => ({x: 400 + 50 * p.x, y: 300 - 50 * p.y})
    const view = {x: {min: -8, max: 8}, y: {min: -6, max: 6}}
    const box = (x: [number, number], y: [number, number], step = {x: 1, y: 1}, parts = 1, v = view) =>
        gridBoxLines({x: {min: x[0], max: x[1]}, y: {min: y[0], max: y[1]}}, v, step, project, 3, parts)
    const horizontal = (found: [XY, XY][]) => found.filter(([a, b]) => a.y === b.y)
    const vertical = (found: [XY, XY][]) => found.filter(([a, b]) => a.x === b.x)

    test('has a line at each multiple of the step, across the box', () => {
        const found = box([0, 4], [0, 2])

        expect(vertical(found).map(([a]) => a.x)).toEqual([400, 450, 500, 550, 600])
        expect(horizontal(found).map(([a]) => a.y)).toEqual([300, 250, 200])
    })

    test('the lines go from one edge of the box to the other, and no farther', () => {
        const found = box([0, 4], [0, 2])

        for (const [a, b] of vertical(found)) {
            expect([a.y, b.y].sort((p, q) => p - q)).toEqual([200, 300])
        }

        for (const [a, b] of horizontal(found)) {
            expect([a.x, b.x].sort((p, q) => p - q)).toEqual([400, 600])
        }
    })

    test('the edges of the box have a line, even when they are not multiples of the step', () => {
        const found = box([0.5, 3.2], [0, 1])

        // The multiples of 1 in [0.5, 3.2] are 1, 2, 3: and the edges 0.5 and 3.2 close the box.
        expect(vertical(found).map(([a]) => a.x)).toEqual([400 + 25, 450, 500, 550, 400 + 160])
    })

    test('a multiple of the step on an edge is not drawn twice', () => {
        const found = box([0, 3], [0, 2])

        expect(vertical(found)).toHaveLength(4)
        expect(horizontal(found)).toHaveLength(3)
    })

    test('has a step for each axis', () => {
        const found = box([0, 4], [0, 4], {x: 2, y: 1})

        expect(vertical(found)).toHaveLength(3)
        expect(horizontal(found)).toHaveLength(5)
    })

    test('has the values without rounding errors', () => {
        const found = box([0, 0.5], [0, 0.5], {x: 0.1, y: 0.1})

        expect(vertical(found).map(([a]) => a.x)).toEqual([400, 405, 410, 415, 420, 425])
    })

    test('is cut by what is seen: the lines out of the view are not made', () => {
        const found = box([-100, 100], [-100, 100], {x: 1, y: 1}, 1, view)

        expect(vertical(found)).toHaveLength(17)
        expect(horizontal(found)).toHaveLength(13)
        // The edges of the box are out of the view: no line on them.
        expect(found.every(([a, b]) => Math.max(a.x, b.x) <= 800 && Math.min(a.x, b.x) >= 0)).toBe(true)
    })

    test('is nothing for a box out of the view', () => {
        expect(box([20, 30], [0, 1])).toEqual([])
        expect(box([0, 1], [20, 30])).toEqual([])
    })

    test('the lines of a direction that are closer than the minimum are not drawn', () => {
        const found = box([0, 4], [0, 2], {x: 0.05, y: 1})

        expect(vertical(found)).toEqual([])
        expect(horizontal(found)).toHaveLength(3)
    })

    test('is right for axes that are not orthogonal', () => {
        const sheared = (p: XY): XY => ({x: 400 + 50 * p.x + 25 * p.y, y: 300 - 50 * p.y})
        const found = gridBoxLines({x: {min: 0, max: 2}, y: {min: 0, max: 2}}, view, {x: 1, y: 1}, sheared, 3)
        const slanted = found.filter(([a, b]) => a.y !== b.y)

        expect(slanted).toHaveLength(3)
        for (const [a, b] of slanted) {
            // The lines of the other direction go along the y axis: (25, -50) on the screen.
            expect((b.x - a.x) * -50 - (b.y - a.y) * 25).toBeCloseTo(0, 9)
        }
    })

    test('the subdivisions are the lines between the multiples, without the multiples', () => {
        const found = box([0, 2], [0, 1], {x: 1, y: 1}, 4)

        expect(vertical(found).map(([a]) => a.x)).toEqual([412.5, 425, 437.5, 462.5, 475, 487.5])
        expect(horizontal(found).map(([a]) => a.y)).toEqual([287.5, 275, 262.5])
    })

    test('the subdivisions do not close the box', () => {
        const found = box([0.2, 0.8], [0, 1], {x: 1, y: 1}, 2)

        // Only the line at 0.5: the edges 0.2 and 0.8 are not subdivisions.
        expect(vertical(found).map(([a]) => a.x)).toEqual([425])
    })
})

describe('gridLines with lines left out', () => {
    test('the lines whose index is a multiple are not drawn: the lines of the subdivisions that are lines of the grid', () => {
        // Every 25 pixels, without the multiples of 4: the lines of the grid are every 100 pixels.
        const found = lines({x: 50, y: 0}, {x: 0, y: -25}, 3, origin)
        const sub = gridLines(origin, {x: 50, y: 0}, {x: 0, y: -25}, 800, 600, 3, 4)
        const main = gridLines(origin, {x: 50, y: 0}, {x: 0, y: -100}, 800, 600, 3)

        expect(found).toHaveLength(25)
        expect(sub).toHaveLength(25 - main.length)
        const mainY = new Set(main.map(([a]) => a.y))

        expect(sub.some(([a]) => mainY.has(a.y))).toBe(false)
    })

    test('the line through the origin is left out too', () => {
        const sub = gridLines(origin, {x: 50, y: 0}, {x: 0, y: -25}, 800, 600, 3, 4)

        expect(sub.some(([a]) => a.y === 300)).toBe(false)
    })

    test('0 leaves none out', () => {
        expect(gridLines(origin, {x: 50, y: 0}, {x: 0, y: -50}, 800, 600, 3, 0)).toHaveLength(13)
    })
})
