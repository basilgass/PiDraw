import {describe, expect, test} from 'vitest'
import {
    type BezierNode,
    type BezierSegment,
    bezierMiddle,
    bezierPath,
    bezierPolyline,
    controlBezierSegments,
    nearestOnPolyline,
    smoothBezierSegments
} from '../../src/calculus'
import {InvalidArgumentError} from '../../src/errors'
import type {XY} from '../../src/pidraw.common'

const node = (x: number, y: number, rest: Partial<BezierNode> = {}): BezierNode => ({point: {x, y}, ...rest})

/** The middle of a curve, that must exist. */
function found<T>(value: T | null): T {
    if (value === null) {
        throw new Error('the curve has no middle')
    }

    return value
}

function expectPoint(actual: XY, expected: XY) {
    expect(actual.x).toBeCloseTo(expected.x, 8)
    expect(actual.y).toBeCloseTo(expected.y, 8)
}

/** The curve of the first version of the smooth curve, written the way it was: angles of the line between the neighbours. */
function reference(nodes: BezierNode[]): BezierSegment[] {
    const control = (i: number, reverse: boolean): XY => {
        const current = nodes[i]
        const previous = nodes[i - 1] as BezierNode | undefined
        const next = nodes[i + 1] as BezierNode | undefined
        const p = previous ?? current
        const n = next ?? current
        const angle = Math.atan2(n.point.y - p.point.y, n.point.x - p.point.x) + (reverse ? Math.PI : 0)
        const length = Math.hypot(n.point.x - p.point.x, n.point.y - p.point.y) * (current.ratio ?? 0.2)

        return {x: current.point.x + Math.cos(angle) * length, y: current.point.y + Math.sin(angle) * length}
    }

    return nodes.slice(1).map((end, k) => ({
        start: nodes[k].point,
        control1: control(k, false),
        control2: control(k + 1, true),
        end: end.point
    }))
}

describe('smoothBezierSegments', () => {
    test('is the curve it has always been when there is no direction', () => {
        const nodes = [node(0, 0), node(100, -80), node(220, 30, {ratio: 0.35}), node(300, 120), node(420, 60, {ratio: 0.1})]
        const segments = smoothBezierSegments(nodes)
        const expected = reference(nodes)

        expect(segments).toHaveLength(4)
        segments.forEach((segment, i) => {
            expectPoint(segment.start, expected[i].start)
            expectPoint(segment.control1, expected[i].control1)
            expectPoint(segment.control2, expected[i].control2)
            expectPoint(segment.end, expected[i].end)
        })
    })

    test('two points are a straight curve, with the control points on the line at a part of its length', () => {
        const [segment] = smoothBezierSegments([node(0, 0), node(100, 0)])

        expectPoint(segment.control1, {x: 20, y: 0})
        expectPoint(segment.control2, {x: 80, y: 0})
    })

    test('the ratio is the distance of the control points, as a part of the distance between the neighbours', () => {
        const nodes = (ratio: number) => [node(0, 0), node(100, 0, {ratio}), node(200, 0)]
        const near = smoothBezierSegments(nodes(0.1))[0]
        const far = smoothBezierSegments(nodes(0.4))[0]

        // The distance between the neighbours of the second point is 200.
        expect(near.control2.x).toBeCloseTo(100 - 20, 8)
        expect(far.control2.x).toBeCloseTo(100 - 80, 8)
    })

    test('less than two points are no curve', () => {
        expect(smoothBezierSegments([])).toEqual([])
        expect(smoothBezierSegments([node(1, 1)])).toEqual([])
    })

    test('the control points of a point are on both sides of it, so the curve is smooth', () => {
        const nodes = [node(0, 0), node(100, -80), node(220, 30), node(300, 120)]
        const segments = smoothBezierSegments(nodes)

        for (let i = 1; i < 3; i++) {
            const before = segments[i - 1].control2
            const after = segments[i].control1

            expectPoint({x: (before.x + after.x) / 2, y: (before.y + after.y) / 2}, nodes[i].point)
        }
    })

    describe('with a direction', () => {
        test.each([
            ['to the right', 100, 'right'],
            ['to the left', -100, 'left']
        ])('horizontal goes %s toward a neighbour that is %s', (_, neighbour, side) => {
            const [segment] = smoothBezierSegments([node(0, 0, {direction: 'horizontal'}), node(neighbour, 50)])

            expect(segment.control1.y).toBeCloseTo(0, 8)
            expect(side === 'right' ? segment.control1.x > 0 : segment.control1.x < 0).toBe(true)
        })

        test.each([
            ['below', 100],
            ['above', -100]
        ])('vertical goes toward a neighbour that is %s', (_, neighbour) => {
            const [segment] = smoothBezierSegments([node(0, 0, {direction: 'vertical'}), node(50, neighbour)])

            expect(segment.control1.x).toBeCloseTo(0, 8)
            expect(Math.sign(segment.control1.y)).toBe(Math.sign(neighbour))
        })

        test('horizontal at the end of the curve goes the way the curve comes from', () => {
            const [segment] = smoothBezierSegments([node(0, 0), node(100, 50, {direction: 'horizontal'})])

            // The control point before the end is on the left of it, the curve goes into it to the right.
            expect(segment.control2.y).toBeCloseTo(50, 8)
            expect(segment.control2.x).toBeLessThan(100)
        })

        test.each([
            [0, 1, 0],
            [90, 0, -1],
            [180, -1, 0],
            [-90, 0, 1],
            [45, Math.SQRT1_2, -Math.SQRT1_2]
        ])('an angle of %d degrees goes exactly that way, counterclockwise as seen on the screen', (angle, x, y) => {
            const [segment] = smoothBezierSegments([node(0, 0, {direction: angle}), node(100, 0)])
            // The distance between the neighbours of the first point is 100, so the control point is at 100 * 0.2 = 20.
            expectPoint(segment.control1, {x: 20 * x, y: 20 * y})
        })

        test('an angle goes that way even toward away from the neighbour', () => {
            const [segment] = smoothBezierSegments([node(0, 0, {direction: 180}), node(100, 0)])

            expect(segment.control1.x).toBeLessThan(0)
        })

        test('the other control point of the point is on the other side', () => {
            const nodes = [node(-100, 0), node(0, 0, {direction: 90}), node(100, 0)]
            const segments = smoothBezierSegments(nodes)

            expectPoint(segments[0].control2, {x: 0, y: 40})
            expectPoint(segments[1].control1, {x: 0, y: -40})
        })
    })

    describe('closed', () => {
        const nodes = [node(0, 0), node(100, -50), node(200, 0), node(100, 100)]

        test('has a curve for each point, the last one coming back to the first', () => {
            const segments = smoothBezierSegments(nodes, true)

            expect(segments).toHaveLength(4)
            expectPoint(segments[3].end, nodes[0].point)
            expectPoint(segments[3].start, nodes[3].point)
        })

        test('is smooth where it closes', () => {
            const segments = smoothBezierSegments(nodes, true)
            const before = segments[3].control2
            const after = segments[0].control1

            expectPoint({x: (before.x + after.x) / 2, y: (before.y + after.y) / 2}, nodes[0].point)
        })

        test('a point at the start has two neighbours, so its control point is not the one of an open curve', () => {
            expect(smoothBezierSegments(nodes, true)[0].control1).not.toEqual(smoothBezierSegments(nodes)[0].control1)
        })
    })
})

describe('controlBezierSegments', () => {
    test('4 points are a cubic curve', () => {
        const points = [{x: 0, y: 0}, {x: 10, y: 50}, {x: 60, y: 50}, {x: 100, y: 0}]

        expect(controlBezierSegments(points)).toEqual([{start: points[0], control1: points[1], control2: points[2], end: points[3]}])
    })

    test('3 points are a quadratic curve, written as the cubic curve that is the same', () => {
        const [start, control, end] = [{x: 0, y: 0}, {x: 50, y: 100}, {x: 100, y: 0}]
        const [segment] = controlBezierSegments([start, control, end])

        // The middle of a quadratic curve is (start + 2 control + end) / 4, that of a cubic one (s + 3 c1 + 3 c2 + e) / 8.
        const quadratic = {x: (start.x + 2 * control.x + end.x) / 4, y: (start.y + 2 * control.y + end.y) / 4}
        const cubic = {
            x: (segment.start.x + 3 * segment.control1.x + 3 * segment.control2.x + segment.end.x) / 8,
            y: (segment.start.y + 3 * segment.control1.y + 3 * segment.control2.y + segment.end.y) / 8
        }

        expectPoint(cubic, quadratic)
        expectPoint(segment.control1, {x: 100 / 3, y: 200 / 3})
        expectPoint(segment.control2, {x: 200 / 3, y: 200 / 3})
    })

    test.each([[0], [1], [2], [5]])('%d points are an InvalidArgumentError', (count) => {
        expect(() => controlBezierSegments(Array.from({length: count}, (_, i) => ({x: i, y: i})))).toThrow(InvalidArgumentError)
    })
})

describe('bezierPath', () => {
    test('is a move then a cubic curve for each segment', () => {
        const path = bezierPath([
            {start: {x: 0, y: 0}, control1: {x: 1, y: 2}, control2: {x: 3, y: 4}, end: {x: 5, y: 6}},
            {start: {x: 5, y: 6}, control1: {x: 7, y: 8}, control2: {x: 9, y: 10}, end: {x: 11, y: 12}}
        ])

        expect(path).toBe('M 0,0 C 1,2 3,4 5,6 C 7,8 9,10 11,12')
    })

    test('a closed path ends with Z', () => {
        const segment = {start: {x: 0, y: 0}, control1: {x: 1, y: 2}, control2: {x: 3, y: 4}, end: {x: 0, y: 0}}

        expect(bezierPath([segment], true)).toBe('M 0,0 C 1,2 3,4 0,0 Z')
    })

    test('the numbers have 2 decimals at most', () => {
        const segment = {start: {x: 0.00000001, y: 399.99999999}, control1: {x: 1.006, y: 2}, control2: {x: 3, y: 4}, end: {x: 5.123, y: 6}}

        expect(bezierPath([segment])).toBe('M 0,400 C 1.01,2 3,4 5.12,6')
    })

    test('nothing to draw is a path that draws nothing', () => {
        expect(bezierPath([])).toBe('M 0 0')
    })
})

describe('bezierMiddle', () => {
    test('of a straight curve is half way, going along it', () => {
        const [segment] = smoothBezierSegments([node(0, 0), node(200, 0)])
        const middle = found(bezierMiddle([segment]))

        expectPoint(middle.point, {x: 100, y: 0})
        expect(middle.direction.x).toBeGreaterThan(0)
        expect(middle.direction.y).toBeCloseTo(0, 8)
    })

    test('of two curves of the same length is the point they share', () => {
        const segments = smoothBezierSegments([node(0, 0), node(100, 100), node(200, 0)])
        const middle = found(bezierMiddle(segments))

        expect(middle.point.x).toBeCloseTo(100, 0)
        expect(middle.point.y).toBeCloseTo(100, 0)
    })

    test('of no curve is null', () => {
        expect(bezierMiddle([])).toBeNull()
    })
})

describe('bezierPolyline', () => {
    const arch: BezierSegment = {start: {x: 0, y: 0}, control1: {x: 0, y: 100}, control2: {x: 100, y: 100}, end: {x: 100, y: 0}}

    test('a curve that is straight needs no more than its two ends', () => {
        const straight: BezierSegment = {start: {x: 0, y: 0}, control1: {x: 30, y: 0}, control2: {x: 70, y: 0}, end: {x: 100, y: 0}}
        const points = bezierPolyline([straight])

        expect(points[0]).toEqual({x: 0, y: 0})
        expect(points[points.length - 1]).toEqual({x: 100, y: 0})
        expect(points.every(point => point.y === 0)).toBe(true)
    })

    test('a curve that bends is within the tolerance of its polyline', () => {
        const points = bezierPolyline([arch], 0.5)
        // The point of the curve at t = 0.5 is (50, 75).
        const closest = nearestOnPolyline(points, {x: 50, y: 75})

        expect(points.length).toBeGreaterThan(4)
        expect(Math.hypot(closest.x - 50, closest.y - 75)).toBeLessThan(0.5)
    })

    test('the end of a curve is the start of the next one, written once', () => {
        const next: BezierSegment = {start: {x: 100, y: 0}, control1: {x: 100, y: -100}, control2: {x: 200, y: -100}, end: {x: 200, y: 0}}
        const points = bezierPolyline([arch, next])

        expect(points.filter(point => point.x === 100 && point.y === 0)).toHaveLength(1)
        expect(points[points.length - 1]).toEqual({x: 200, y: 0})
    })

    test('no curve gives no point', () => {
        expect(bezierPolyline([])).toEqual([])
    })
})
