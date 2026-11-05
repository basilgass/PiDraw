import {describe, expect, test} from 'vitest'
import {arcLength, counterclockwiseSweep, nearestOnArc, sectorArea} from '../../src/calculus'
import type {XY} from '../../src/pidraw.common'

const center: XY = {x: 400, y: 300}

function expectPoint(actual: XY, expected: XY) {
    expect(actual.x).toBeCloseTo(expected.x, 6)
    expect(actual.y).toBeCloseTo(expected.y, 6)
}

describe('counterclockwiseSweep', () => {
    test.each([
        [0, 90, 90],
        [90, 0, 270],
        [350, 10, 20],
        [10, 350, 340],
        [180, 270, 90],
        [-90, 90, 180],
        [0, 450, 90],
        [720, 30, 30]
    ])('from %d to %d is %d degrees', (from, to, expected) => {
        expect(counterclockwiseSweep(from, to)).toBeCloseTo(expected, 9)
    })

    test.each([
        [30, 30],
        [0, 360],
        [90, -270],
        [0, 360 - 1e-12]
    ])('the same direction (%d and %d) is 0, never a full turn', (from, to) => {
        expect(counterclockwiseSweep(from, to)).toBe(0)
    })
})

// A quarter of a circle of 100 pixels, from the east to the north; the y axis of the screen points down.
describe('nearestOnArc', () => {
    const near = (position: XY, clockwise = false) => nearestOnArc(center, 100, 0, 90, clockwise, position)

    test('in the angle of the arc, the point is on the circle in the direction of the position', () => {
        expectPoint(near({x: 500, y: 200}), {x: 400 + 100 * Math.SQRT1_2, y: 300 - 100 * Math.SQRT1_2})
        expectPoint(near({x: 410, y: 290}), {x: 400 + 100 * Math.SQRT1_2, y: 300 - 100 * Math.SQRT1_2})
    })

    test('out of the angle, the point is the end that is the closest', () => {
        expectPoint(near({x: 450, y: 400}), {x: 500, y: 300})
        expectPoint(near({x: 350, y: 250}), {x: 400, y: 200})
    })

    test('with clockwise, the arc goes the other way from its start', () => {
        expectPoint(near({x: 500, y: 400}, true), {x: 400 + 100 * Math.SQRT1_2, y: 300 + 100 * Math.SQRT1_2})
        expectPoint(near({x: 500, y: 200}, true), {x: 500, y: 300})
    })

    test('the ends are on the arc', () => {
        expectPoint(near({x: 600, y: 300}), {x: 500, y: 300})
        expectPoint(near({x: 400, y: 100}), {x: 400, y: 200})
    })

    test.each([
        ['the position is the center', center, 100, 90],
        ['the arc has no sweep', {x: 500, y: 200}, 100, NaN],
        ['the arc has no radius', {x: 500, y: 200}, NaN, 90]
    ])('there is no point when %s', (_, position, radius, sweep) => {
        const found = nearestOnArc(center, radius, 0, sweep, false, position)

        expect(found.x).toBeNaN()
        expect(found.y).toBeNaN()
    })
})

describe('arcLength and sectorArea', () => {
    test('are the part of the circle that the angle covers', () => {
        expect(arcLength(2, 90)).toBeCloseTo(Math.PI, 9)
        expect(sectorArea(2, 90)).toBeCloseTo(Math.PI, 9)
        expect(arcLength(1, 360)).toBeCloseTo(2 * Math.PI, 9)
        expect(sectorArea(1, 360)).toBeCloseTo(Math.PI, 9)
    })
})
