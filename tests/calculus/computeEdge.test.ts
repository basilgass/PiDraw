import {describe, expect, test} from 'vitest'
import {
    DEFAULT_LOOP_SIDE,
    EDGE_SIDES,
    edgeSegments,
    type EdgeSide,
    type IEdgeEnd,
    loopDirection,
    loopSegments,
    nodeBoundary,
    type NodeShape
} from '../../src/calculus'

/** A node of a shape and a size, centered at a position. */
function node(shape: NodeShape, x: number, y: number, width = 40, height = 20): IEdgeEnd {
    return {
        position: {x, y},
        boundary: toward => {
            const offset = nodeBoundary(shape, {width, height}, {x: toward.x - x, y: toward.y - y})

            return {x: x + offset.x, y: y + offset.y}
        }
    }
}

/** A point that has no border. */
function mark(x: number, y: number): IEdgeEnd {
    return {position: {x, y}, boundary: () => ({x, y})}
}

describe('edgeSegments', () => {
    test('is a straight line between the borders of two nodes, and not between their centers', () => {
        const [segment] = edgeSegments(node('rect', 0, 0), node('rect', 100, 0), 0) ?? []

        expect(segment.start).toEqual({x: 20, y: 0})
        expect(segment.end).toEqual({x: 80, y: 0})
    })

    test('keeps its control points on the line, a third and two thirds of the way', () => {
        const [segment] = edgeSegments(mark(0, 0), mark(90, 0), 0) ?? []

        expect(segment.control1).toEqual({x: 30, y: 0})
        expect(segment.control2).toEqual({x: 60, y: 0})
    })

    test('stops at the border of the shape that a node has', () => {
        const [segment] = edgeSegments(node('diamond', 0, 0), node('circle', 0, 100, 20, 20), 0) ?? []

        expect(segment.start.y).toBeCloseTo(10)
        expect(segment.end.y).toBeCloseTo(90)
    })

    test('ends exactly on an end that has no border', () => {
        const [segment] = edgeSegments(node('rect', 0, 0), mark(100, 50), 0) ?? []

        expect(segment.end).toEqual({x: 100, y: 50})
        expect(segment.start.x).toBeCloseTo(20)
        expect(segment.start.y).toBeCloseTo(10)
    })

    test('goes along the diagonal to the corner of two boxes that face each other by their corners', () => {
        const [segment] = edgeSegments(node('rect', 0, 0), node('rect', 40, 20), 0) ?? []

        expect(segment.start).toEqual({x: 20, y: 10})
        expect(segment.end).toEqual({x: 20, y: 10})
    })

    test('is bent to the left of the way for a positive curve, as seen on the screen', () => {
        // Going to the right, the left is up on the screen: the y axis points down.
        const [segment] = edgeSegments(mark(0, 0), mark(100, 0), 0.2) ?? []

        expect(segment.control1.y).toBeLessThan(0)
        expect(segment.control2.y).toBeLessThan(0)
    })

    test('is bent to the right for a negative curve', () => {
        const [segment] = edgeSegments(mark(0, 0), mark(100, 0), -0.2) ?? []

        expect(segment.control1.y).toBeGreaterThan(0)
    })

    test('has the middle of the curve moved sideways by the curve times the distance', () => {
        const [segment] = edgeSegments(mark(0, 0), mark(100, 0), 0.25) ?? []
        // The point of a cubic curve at its middle: (start + 3 control1 + 3 control2 + end) / 8.
        const middle = (segment.start.y + 3 * segment.control1.y + 3 * segment.control2.y + segment.end.y) / 8

        expect(middle).toBeCloseTo(-25)
    })

    test('leaves the border of a node toward the point that pulls the curve', () => {
        const [segment] = edgeSegments(node('rect', 0, 0), node('rect', 200, 0), 0.5) ?? []

        // Pulled upward: the curve leaves by the top of the right side, not by the middle of it.
        expect(segment.start.y).toBeLessThan(0)
        expect(segment.start.x).toBeGreaterThan(0)
    })

    test('is the same curve reversed when the ends are swapped and the curve changes its sign', () => {
        const [forward] = edgeSegments(mark(0, 0), mark(100, 40), 0.3) ?? []
        const [backward] = edgeSegments(mark(100, 40), mark(0, 0), 0.3) ?? []

        expect(backward.control1.x).not.toBeCloseTo(forward.control2.x)
        expect(backward.start).toEqual(forward.end)
    })

    test('has no curve when an end has no position, or when the ends are at the same place', () => {
        expect(edgeSegments(mark(NaN, 0), mark(10, 0), 0)).toBeNull()
        expect(edgeSegments(mark(0, 0), mark(0, NaN), 0.2)).toBeNull()
        expect(edgeSegments(mark(5, 5), mark(5, 5), 0)).toBeNull()
    })
})

describe('loopSegments', () => {
    const rect = node('rect', 100, 100)

    test('has the sides that it can be on, and the top by default', () => {
        expect(EDGE_SIDES).toEqual(['t', 'r', 'b', 'l'])
        expect(DEFAULT_LOOP_SIDE).toBe('t')
    })

    test.each<[EdgeSide, number, number]>([
        ['t', 0, -1],
        ['r', 1, 0],
        ['b', 0, 1],
        ['l', -1, 0]
    ])('goes out of the %s side, away from the center of the node', (side, dx, dy) => {
        const [segment] = loopSegments(rect, side) ?? []

        for (const point of [segment.control1, segment.control2]) {
            expect((point.x - 100) * dx + (point.y - 100) * dy).toBeGreaterThan(10)
        }

        expect(loopDirection(side)).toEqual({x: dx, y: dy})
    })

    test('starts and ends on the border of the node, one on each side of the middle of the side', () => {
        const [segment] = loopSegments(rect, 't') ?? []

        expect(segment.start.y).toBeCloseTo(90)
        expect(segment.end.y).toBeCloseTo(90)
        expect(segment.start.x).toBeLessThan(100)
        expect(segment.end.x).toBeGreaterThan(100)
        expect(100 - segment.start.x).toBeCloseTo(segment.end.x - 100)
    })

    test('is the same on the right as on the top, turned', () => {
        const [top] = loopSegments(rect, 't') ?? []
        const [right] = loopSegments(rect, 'r') ?? []

        // The node is wider than high, so the distances to the border differ: the control points keep the same reach from the border.
        expect(Math.hypot(top.control1.x - top.start.x, top.control1.y - top.start.y)).toBeCloseTo(40)
        expect(Math.hypot(right.control1.x - right.start.x, right.control1.y - right.start.y)).toBeCloseTo(40)
    })

    test('is a small loop on an end that has no border', () => {
        const [segment] = loopSegments(mark(10, 10), 't') ?? []

        expect(segment.start).toEqual({x: 10, y: 10})
        expect(segment.end).toEqual({x: 10, y: 10})
        expect(segment.control1.y).toBeLessThan(10)
    })

    test('has no curve for an end that has no position', () => {
        expect(loopSegments(mark(NaN, 0), 't')).toBeNull()
    })
})
