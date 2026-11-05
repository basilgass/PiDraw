import {describe, expect, test} from 'vitest'
import {labelEvery, piFraction, selects, tickLabel, tickPositions, type TickSelection} from '../../src/calculus'
import type {XY} from '../../src/pidraw.common'

// A drawing of 800 x 600 pixels with the origin in the middle and 50 pixels per unit.
const zero: XY = {x: 400, y: 300}
const ticks = (step: number, start: XY, end: XY, unit: XY = {x: 50, y: 0}, minSpacing = 4, at: XY = zero) =>
    tickPositions(at, unit, step, start, end, minSpacing)

describe('tickPositions', () => {
    test('are one step apart along the axis, from the lowest value to the highest', () => {
        const found = ticks(2, {x: 20, y: 300}, {x: 780, y: 300})

        expect(found.map(tick => tick.value)).toEqual([-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].filter(v => v % 2 === 0))
        expect(found.map(tick => tick.point.x)).toEqual([100, 200, 300, 400, 500, 600, 700])
        expect(found.every(tick => tick.point.y === 300)).toBe(true)
    })

    test('the zero is a tick, with the index 0', () => {
        const found = ticks(1, {x: 20, y: 300}, {x: 780, y: 300})

        expect(found.find(tick => tick.index === 0)).toEqual({index: 0, value: 0, point: {x: 400, y: 300}})
    })

    test('a step that does not divide the length gives the ticks inside', () => {
        const found = ticks(0.4, {x: 400, y: 300}, {x: 500, y: 300})

        // 0, 0.4, 0.8, 1.2, 1.6, 2.0 would be at 0, 20, 40... pixels: up to 100 pixels is the value 2.
        expect(found.map(tick => tick.value)).toEqual([0, 0.4, 0.8, 1.2, 1.6, 2])
    })

    test('the ends of the segment are ticks when they fall on one', () => {
        const found = ticks(1, {x: 450, y: 300}, {x: 550, y: 300})

        expect(found.map(tick => tick.value)).toEqual([1, 2, 3])
    })

    test('are found whatever the way the segment goes', () => {
        const forward = ticks(1, {x: 450, y: 300}, {x: 550, y: 300}).map(tick => tick.value)
        const backward = ticks(1, {x: 550, y: 300}, {x: 450, y: 300}).map(tick => tick.value)

        expect(backward).toEqual(forward)
    })

    test('a zero out of the segment gives ticks of other values', () => {
        const found = ticks(1, {x: 520, y: 300}, {x: 680, y: 300})

        expect(found.map(tick => tick.value)).toEqual([3, 4, 5])
    })

    test('follow a vertical axis, the unit pointing up on the screen', () => {
        const found = ticks(1, {x: 400, y: 380}, {x: 400, y: 220}, {x: 0, y: -50})

        expect(found.map(tick => tick.value)).toEqual([-1, 0, 1])
        expect(found.map(tick => tick.point.y)).toEqual([350, 300, 250])
    })

    test('follow an oblique axis', () => {
        const unit = {x: 30, y: -40}
        const found = ticks(1, {x: 400 - 60, y: 300 + 80}, {x: 400 + 90, y: 300 - 120}, unit)

        expect(found.map(tick => tick.value)).toEqual([-2, -1, 0, 1, 2, 3])
        for (const tick of found) {
            expect(tick.point.x).toBeCloseTo(400 + tick.value * 30, 9)
            expect(tick.point.y).toBeCloseTo(300 - tick.value * 40, 9)
        }
    })

    test('are none when they would be closer than the minimum', () => {
        expect(ticks(0.05, {x: 20, y: 300}, {x: 780, y: 300})).toEqual([])
        expect(ticks(0.1, {x: 20, y: 300}, {x: 780, y: 300}).length).toBeGreaterThan(0)
    })

    test.each([
        ['a unit that is null', {x: 0, y: 0}],
        ['a unit that is not a number', {x: NaN, y: 0}]
    ])('are none with %s', (_, unit) => {
        expect(ticks(1, {x: 20, y: 300}, {x: 780, y: 300}, unit)).toEqual([])
    })

    test('the values are rounded: no 0.30000000000000004', () => {
        const found = ticks(0.1, {x: 400, y: 300}, {x: 450, y: 300}, {x: 500, y: 0})

        expect(found.map(tick => tick.value)).toEqual([0, 0.1])
        expect(ticks(0.1, {x: 400, y: 300}, {x: 575, y: 300}, {x: 500, y: 0}).map(tick => tick.value)).toContain(0.3)
    })
})

describe('labelEvery', () => {
    test.each([
        [50, 36, 1],
        [36, 36, 1],
        [30, 36, 2],
        [12, 36, 3],
        [10, 36, 4],
        [5, 36, 8]
    ])('ticks %d pixels apart, numbers %d pixels apart: one in %d', (spacing, min, expected) => {
        expect(labelEvery(spacing, min)).toBe(expected)
    })

    test('is 1 for a spacing that is not valid', () => {
        expect(labelEvery(0, 36)).toBe(1)
        expect(labelEvery(NaN, 36)).toBe(1)
    })
})

describe('piFraction', () => {
    test.each([
        [0, 0, 1],
        [Math.PI, 1, 1],
        [-Math.PI, -1, 1],
        [Math.PI / 2, 1, 2],
        [3 * Math.PI / 2, 3, 2],
        [Math.PI / 3, 1, 3],
        [2 * Math.PI / 3, 2, 3],
        [Math.PI / 4, 1, 4],
        [-5 * Math.PI / 6, -5, 6],
        [Math.PI / 12, 1, 12],
        [2 * Math.PI, 2, 1]
    ])('%d is %d/%d of pi', (value, p, q) => {
        expect(piFraction(value)).toEqual({p, q})
    })

    test.each([1, 0.5, Math.PI / 13, 3])('%d is not a fraction of pi with a denominator up to 12', (value) => {
        expect(piFraction(value)).toBeNull()
    })
})

describe('tickLabel', () => {
    test.each([
        [0, '0'],
        [2, '2'],
        [-3, '-3'],
        [0.5, '0.5'],
        [1.25, '1.25'],
        [1 / 3, '0.33'],
        [0.1 + 0.2, '0.3']
    ])('the number %d is written %s', (value, text) => {
        expect(tickLabel(value, 'numbers', 2)).toEqual({text, latex: text})
    })

    test('the number of decimals is the one that is asked', () => {
        expect(tickLabel(1 / 3, 'numbers', 4).text).toBe('0.3333')
        expect(tickLabel(1.6, 'numbers', 0).text).toBe('2')
    })

    test.each([
        [0, '0', '0'],
        [Math.PI, 'π', '\\pi'],
        [-Math.PI, '-π', '-\\pi'],
        [2 * Math.PI, '2π', '2\\pi'],
        [Math.PI / 2, 'π/2', '\\frac{\\pi}{2}'],
        [-Math.PI / 2, '-π/2', '-\\frac{\\pi}{2}'],
        [3 * Math.PI / 2, '3π/2', '\\frac{3\\pi}{2}'],
        [Math.PI / 3, 'π/3', '\\frac{\\pi}{3}']
    ])('%d is written %s in pi, %s in LaTeX', (value, text, latex) => {
        expect(tickLabel(value, 'pi', 2)).toEqual({text, latex})
    })

    test('a value that is not a fraction of pi is written as a number', () => {
        expect(tickLabel(1, 'pi', 2)).toEqual({text: '1', latex: '1'})
    })
})

describe('selects', () => {
    const kept = (selection: TickSelection | undefined) => [-6, -5, -2, -1, 0, 1, 2, 3, 4, 5, 6, 10].filter(index => selects(index, selection))

    test('keeps every tick without a selection, or with an empty one', () => {
        expect(kept(undefined)).toEqual([-6, -5, -2, -1, 0, 1, 2, 3, 4, 5, 6, 10])
        expect(kept({})).toEqual([-6, -5, -2, -1, 0, 1, 2, 3, 4, 5, 6, 10])
    })

    test('every n keeps the multiples of n, on both sides, and the zero', () => {
        expect(kept({every: 2})).toEqual([-6, -2, 0, 2, 4, 6, 10])
        expect(kept({every: 5})).toEqual([-5, 0, 5, 10])
    })

    test('first alone keeps the first tick after the zero, and not the one before it', () => {
        expect(kept({first: true})).toEqual([0, 1])
    })

    test('first with every n keeps the multiples of n and the first tick', () => {
        expect(kept({every: 5, first: true})).toEqual([-5, 0, 1, 5, 10])
    })

    test('first: false is no selection of the first tick', () => {
        expect(kept({every: 5, first: false})).toEqual([-5, 0, 5, 10])
        expect(kept({first: false})).toEqual([-6, -5, -2, -1, 0, 1, 2, 3, 4, 5, 6, 10])
    })
})
