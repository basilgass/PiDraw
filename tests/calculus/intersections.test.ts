import {describe, expect, test} from 'vitest'
import {intersectionCircleCircle, intersectionCircleLine} from '../../src/calculus/intersections'
import type {XY} from '../../src/pidraw.common'

const O = {x: 0, y: 0}

function expectPoints(actual: XY[] | null, expected: [number, number][]) {
    if (actual === null) {
        expect.unreachable('there should be intersections')
    }

    expect(actual).toHaveLength(expected.length)
    expected.forEach(([x, y], index) => {
        expect(actual[index].x).toBeCloseTo(x, 9)
        expect(actual[index].y).toBeCloseTo(y, 9)
    })
}

describe('intersectionCircleLine', () => {
    test('of a line that crosses the circle gives two points, in the order of the line', () => {
        expectPoints(intersectionCircleLine(O, 2, {x: -3, y: 0}, {x: 3, y: 0}), [[-2, 0], [2, 0]])
        expectPoints(intersectionCircleLine(O, 2, {x: 3, y: 0}, {x: -3, y: 0}), [[2, 0], [-2, 0]])
    })

    test('does not depend on the points that give the line: it is the whole line', () => {
        expectPoints(intersectionCircleLine(O, 2, {x: -0.5, y: 0}, {x: 0.5, y: 0}), [[-2, 0], [2, 0]])
    })

    test('of a line that touches the circle is one point', () => {
        expectPoints(intersectionCircleLine(O, 2, {x: -3, y: 2}, {x: 3, y: 2}), [[0, 2]])
    })

    test('of a tangent that is not exact, because of the floating point numbers, is one point', () => {
        const result = intersectionCircleLine({x: 0.1 + 0.2, y: 0}, 0.3, {x: -1, y: 0.3}, {x: 1, y: 0.3})

        expect(result).toHaveLength(1)
    })

    test('of a line that misses the circle is null', () => {
        expect(intersectionCircleLine(O, 2, {x: -3, y: 5}, {x: 3, y: 5})).toBeNull()
    })

    test.each([
        ['a line reduced to a point', {x: 1, y: 1}, {x: 1, y: 1}],
        ['a line that is not a number', {x: NaN, y: 1}, {x: 1, y: 1}]
    ])('with %s is null', (_, start, end) => {
        expect(intersectionCircleLine(O, 2, start, end)).toBeNull()
    })

    test('with a circle that is not a number is null', () => {
        expect(intersectionCircleLine({x: NaN, y: 0}, 2, {x: -3, y: 0}, {x: 3, y: 0})).toBeNull()
        expect(intersectionCircleLine(O, NaN, {x: -3, y: 0}, {x: 3, y: 0})).toBeNull()
    })
})

describe('intersectionCircleCircle', () => {
    test('of two circles that cross gives two points', () => {
        const result = intersectionCircleCircle(O, 5, {x: 6, y: 0}, 5)

        expect(result).toHaveLength(2)
        expect(result?.map(p => p.x)).toEqual([expect.closeTo(3, 9), expect.closeTo(3, 9)])
        expect(result?.map(p => Math.abs(p.y)).sort()).toEqual([expect.closeTo(4, 9), expect.closeTo(4, 9)])
    })

    test('of two circles that touch from outside is one point', () => {
        expectPoints(intersectionCircleCircle(O, 2, {x: 4, y: 0}, 2), [[2, 0]])
    })

    test('of two circles that touch from inside is one point', () => {
        expectPoints(intersectionCircleCircle(O, 4, {x: 1, y: 0}, 3), [[4, 0]])
    })

    test('of two circles that touch, with floating point numbers, is one point', () => {
        expect(intersectionCircleCircle(O, 0.1 + 0.2, {x: 0.6, y: 0}, 0.3)).toHaveLength(1)
        expect(intersectionCircleCircle(O, 15.000000000000002, {x: 30, y: 0}, 15)).toHaveLength(1)
    })

    test.each([
        ['circles that are apart', O, 2, {x: 10, y: 0}, 2],
        ['a circle inside the other', O, 5, {x: 1, y: 0}, 1],
        ['concentric circles', O, 2, O, 3],
        ['the same circle', O, 2, O, 2],
        ['a circle that is not a number', O, 2, {x: NaN, y: 0}, 2],
        ['a radius that is not a number', O, 2, {x: 3, y: 0}, NaN]
    ])('of %s is null', (_, c0, r0, c1, r1) => {
        expect(intersectionCircleCircle(c0, r0, c1, r1)).toBeNull()
    })
})
