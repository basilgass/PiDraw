import {describe, expect, test} from 'vitest'
import {bisectorOfAngle, bisectorOfLines, clipSegment, computeLine, mediatorOf} from '../../src/calculus/computeLine'
import {mathLine} from '../../src/calculus/geometry'
import type {XY} from '../../src/pidraw.common'

// A canvas of 400 x 300 pixels, and the origin of the coordinate system at (100, 200).
const WIDTH = 400
const HEIGHT = 300
const O: XY = {x: 100, y: 200}

function line(direction: XY, padding?: number, half?: boolean, length?: number, origin = O) {
    return computeLine(origin, direction, WIDTH, HEIGHT, padding, half, length)
}

function expectLine(result: [XY, XY] | null, [x1, y1, x2, y2]: [number, number, number, number]) {
    if (result === null) {
        expect.unreachable("the line should be visible")
    }

    const [start, end] = result
    expect([start.x, start.y, end.x, end.y].map(v => v + 0)).toEqual([x1, y1, x2, y2].map(v => v + 0))
}

describe('computeLine across the canvas', () => {
    test('a horizontal line goes from border to border, in the direction of the vector', () => {
        expectLine(line({x: 10, y: 0}), [0, 200, 400, 200])
        expectLine(line({x: -10, y: 0}), [400, 200, 0, 200])
    })

    test('a vertical line goes from border to border, in the direction of the vector', () => {
        expectLine(line({x: 0, y: -20}), [100, 300, 100, 0])
        expectLine(line({x: 0, y: 20}), [100, 0, 100, 300])
    })

    test('a diagonal line goes from border to border', () => {
        expectLine(line({x: 10, y: -10}), [0, 300, 400, -100])
        expectLine(line({x: -10, y: 10}), [400, -100, 0, 300])
    })

    test('the padding keeps the line away from the borders', () => {
        expectLine(line({x: 10, y: 0}, 10), [10, 200, 390, 200])
        expectLine(line({x: 0, y: -20}, 10), [100, 290, 100, 10])
    })
})

describe('computeLine as a half axis', () => {
    test('starts behind the origin by the padding and goes to the border', () => {
        expectLine(line({x: 10, y: 0}, 5, true), [95, 200, 395, 200])
        expectLine(line({x: 0, y: -20}, 5, true), [100, 205, 100, 5])
    })

    test('starts behind the origin whatever the direction points to', () => {
        expectLine(line({x: -10, y: 0}, 5, true), [105, 200, 5, 200])
        expectLine(line({x: 0, y: 20}, 5, true), [100, 195, 100, 295])
    })

    test('a diagonal half axis starts at the origin without padding', () => {
        expectLine(line({x: 10, y: -10}, 0, true), [100, 200, 400, -100])
    })
})

describe('computeLine with a length', () => {
    test('the line ends at origin + length * direction, in every direction', () => {
        expectLine(line({x: 10, y: 0}, 0, false, 5), [0, 200, 150, 200])
        expectLine(line({x: -10, y: 0}, 0, false, 5), [400, 200, 50, 200])
        expectLine(line({x: 0, y: -20}, 0, false, 3), [100, 300, 100, 140])
        expectLine(line({x: 0, y: 20}, 0, false, 2), [100, 0, 100, 240])
    })

    test('a half axis with a length', () => {
        expectLine(line({x: 10, y: 0}, 5, true, 5), [95, 200, 150, 200])
    })

    test('a diagonal line extends by the length on both sides', () => {
        expectLine(line({x: 10, y: -10}, 0, false, 2), [80, 220, 120, 180])
    })

    test('a length of 0 means no length', () => {
        expectLine(line({x: 10, y: 0}, 0, false, 0), [0, 200, 400, 200])
    })
})

describe('computeLine returns null', () => {
    test('for a line outside of the canvas', () => {
        expect(line({x: 10, y: 0}, 0, false, undefined, {x: 100, y: -5})).toBeNull()
        expect(line({x: 10, y: 0}, 0, false, undefined, {x: 100, y: 350})).toBeNull()
        expect(line({x: 0, y: 10}, 0, false, undefined, {x: 450, y: 100})).toBeNull()
        expect(line({x: 0, y: 10}, 0, false, undefined, {x: -1, y: 100})).toBeNull()
    })

    test('for a null direction', () => {
        expect(line({x: 0, y: 0})).toBeNull()
    })
})

// Two vectors point the same way: their cross product is null and their dot product is positive.
function expectSameDirection(actual: XY, expected: XY) {
    expect(actual.x * expected.y - actual.y * expected.x).toBeCloseTo(0, 9)
    expect(actual.x * expected.x + actual.y * expected.y).toBeGreaterThan(0)
}

describe('bisectorOfLines', () => {
    test('of two lines that cross goes through their common point, between their directions', () => {
        const d1 = new mathLine({x: 0, y: 0}, {x: 1, y: 0})
        const d2 = new mathLine({x: 0, y: 0}, {x: 0, y: 1})

        const bisector = bisectorOfLines(d1, d2)

        expect(bisector.point).toEqual({x: 0, y: 0})
        expectSameDirection(bisector.direction, {x: 1, y: 1})
    })

    test('of two lines that cross far from their points goes through the common point', () => {
        const d1 = new mathLine({x: 1, y: 1}, {x: 2, y: 1})
        const d2 = new mathLine({x: 3, y: 0}, {x: 3, y: 5})

        const bisector = bisectorOfLines(d1, d2)

        expect(bisector.point.x).toBeCloseTo(3, 9)
        expect(bisector.point.y).toBeCloseTo(1, 9)
    })

    test('of two parallel lines is the line in the middle of them', () => {
        const d1 = new mathLine({x: 0, y: 0}, {x: 1, y: 0})
        const d2 = new mathLine({x: 0, y: 2}, {x: 1, y: 2})

        const bisector = bisectorOfLines(d1, d2)

        expect(bisector.point).toEqual({x: 0, y: 1})
        expectSameDirection(bisector.direction, {x: 1, y: 0})
    })

    test('of two lines that are the same is that line', () => {
        const d1 = new mathLine({x: 0, y: 0}, {x: 1, y: 1})
        const d2 = new mathLine({x: 2, y: 2}, {x: 3, y: 3})

        const bisector = bisectorOfLines(d1, d2)

        expect(bisector.point.x).toBeCloseTo(bisector.point.y, 9)
        expectSameDirection(bisector.direction, {x: 1, y: 1})
    })
})

describe('bisectorOfLines, the other bisector', () => {
    test('of two lines that cross is perpendicular to the first one and goes through the same point', () => {
        const d1 = new mathLine({x: 0, y: 0}, {x: 1, y: 0})
        const d2 = new mathLine({x: 0, y: 0}, {x: 2, y: 2})

        const first = bisectorOfLines(d1, d2)
        const other = bisectorOfLines(d1, d2, true)

        expect(other.point).toEqual(first.point)
        expect(other.direction.x * first.direction.x + other.direction.y * first.direction.y).toBeCloseTo(0, 9)
        expect(Math.hypot(other.direction.x, other.direction.y)).toBeGreaterThan(0)
    })

    test('of two lines at a right angle is the other diagonal', () => {
        const d1 = new mathLine({x: 0, y: 0}, {x: 1, y: 0})
        const d2 = new mathLine({x: 0, y: 0}, {x: 0, y: 1})

        expectSameDirection(bisectorOfLines(d1, d2).direction, {x: 1, y: 1})
        expectSameDirection(bisectorOfLines(d1, d2, true).direction, {x: 1, y: -1})
    })

    test.each([
        ['parallel lines', new mathLine({x: 0, y: 0}, {x: 1, y: 0}), new mathLine({x: 0, y: 2}, {x: 1, y: 2})],
        ['the same line', new mathLine({x: 0, y: 0}, {x: 1, y: 1}), new mathLine({x: 2, y: 2}, {x: 3, y: 3})]
    ])('of %s does not exist: they have only one bisector', (_, d1, d2) => {
        const other = bisectorOfLines(d1, d2, true)

        expect(other.point.x).toBeNaN()
        expect(other.point.y).toBeNaN()
        expect(other.direction.x).toBeNaN()
        expect(other.direction.y).toBeNaN()
    })
})

describe('bisectorOfAngle', () => {
    test('goes through the vertex, between the two sides', () => {
        const bisector = bisectorOfAngle({x: 0, y: 0}, {x: 4, y: 0}, {x: 0, y: 2})

        expect(bisector.point).toEqual({x: 0, y: 0})
        expectSameDirection(bisector.direction, {x: 1, y: 1})
    })

    test('is not changed by the length of the sides', () => {
        const near = bisectorOfAngle({x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2})
        const far = bisectorOfAngle({x: 1, y: 1}, {x: 11, y: 1}, {x: 1, y: 21})

        expectSameDirection(far.direction, near.direction)
    })

    test('of a straight angle is perpendicular to the sides', () => {
        const bisector = bisectorOfAngle({x: 0, y: 0}, {x: 3, y: 0}, {x: -2, y: 0})

        expect(bisector.direction.x).toBeCloseTo(0, 9)
        expect(Math.abs(bisector.direction.y)).toBeGreaterThan(0)
    })

    test('has no direction when a side is reduced to the vertex', () => {
        const bisector = bisectorOfAngle({x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 1})

        expect(Number.isNaN(bisector.direction.x)).toBe(true)
    })
})

describe('mediatorOf', () => {
    test('goes through the middle of the two points', () => {
        expect(mediatorOf({x: 0, y: 0}, {x: 2, y: 4}).point).toEqual({x: 1, y: 2})
    })

    test('is perpendicular to the segment', () => {
        const {direction} = mediatorOf({x: 1, y: 1}, {x: 5, y: 3})

        expect(direction.x * 4 + direction.y * 2).toBeCloseTo(0, 9)
        expect(Math.hypot(direction.x, direction.y)).toBeGreaterThan(0)
    })
})

describe('clipSegment', () => {
    test('a segment inside the canvas is not changed', () => {
        expectLine(clipSegment({x: 10, y: 10}, {x: 100, y: 200}, WIDTH, HEIGHT), [10, 10, 100, 200])
    })

    test('a segment that leaves the canvas stops at the border', () => {
        expectLine(clipSegment({x: 100, y: 100}, {x: 500, y: 100}, WIDTH, HEIGHT), [100, 100, 400, 100])
    })

    test('a segment that crosses the canvas from outside to outside is cut at both borders', () => {
        expectLine(clipSegment({x: -100, y: 150}, {x: 500, y: 150}, WIDTH, HEIGHT), [0, 150, 400, 150])
    })

    test('a diagonal segment is cut by the top and the left border as well as by the sides', () => {
        expectLine(clipSegment({x: 0, y: 300}, {x: 400, y: -100}, WIDTH, HEIGHT), [0, 300, 300, 0])
        expectLine(clipSegment({x: -100, y: 400}, {x: 500, y: -200}, WIDTH, HEIGHT), [0, 300, 300, 0])
    })

    test('the direction of the segment is kept', () => {
        expectLine(clipSegment({x: 400, y: -100}, {x: 0, y: 300}, WIDTH, HEIGHT), [300, 0, 0, 300])
    })

    test.each([
        ['a segment beside the canvas', {x: 500, y: 0}, {x: 600, y: 100}],
        ['a segment above the canvas', {x: 0, y: -50}, {x: 400, y: -10}],
        ['a diagonal segment that misses a corner', {x: 350, y: -100}, {x: 550, y: 100}],
        ['a point outside the canvas', {x: 500, y: 500}, {x: 500, y: 500}]
    ])('%s is not visible', (_, a, b) => {
        expect(clipSegment(a, b, WIDTH, HEIGHT)).toBeNull()
    })

    test('a point inside the canvas is kept', () => {
        expectLine(clipSegment({x: 10, y: 10}, {x: 10, y: 10}, WIDTH, HEIGHT), [10, 10, 10, 10])
    })
})
